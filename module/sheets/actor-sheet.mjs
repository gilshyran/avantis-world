export class AvantisActorSheet extends ActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["avantis", "sheet", "actor"],
      template: "systems/avantis/templates/actor/actor-sheet.html",
      width: 900,
      height: 800,
      tabs: [
        // 1. Groupe Principal
        { navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "meridiens" },
        // 2. Groupe Personnalité
        { navSelector: ".sub-tabs", contentSelector: ".personnalite-body", initial: "biographie" },
        // 3. Groupe Arcanes (NOUVEAU)
        { navSelector: ".arcanes-nav", contentSelector: ".arcanes-body", initial: "maitrise" }
      ],
      dragDrop: [{ dragSelector: ".item", dropSelector: null }]
    });
  }

  async getData() {
    const context = await super.getData();
    context.system = context.actor.system;
    
    // SÉCURITÉ : On vérifie si la config existe
    context.config = CONFIG.AVANTIS || {};

    // --- 1. GESTION DE L'INVENTAIRE ---
    // Ajout du groupe "stones" (Pierres)
    const inventory = { weapons: [], armor: [], accessories: [], stones: [], gear: [] };
    const equipped = { weapons: [], armor: [], accessories: [], stones: [] };

    for (let i of context.items) {
        i.img = i.img || "icons/svg/item-bag.svg";
        const isEquipped = i.system.equipe === true;
        
        if (isEquipped) {
            if (i.type === 'arme') equipped.weapons.push(i);
            else if (i.type === 'protection') equipped.armor.push(i);
            else if (i.type === 'accessoire') equipped.accessories.push(i);
            else if (i.type === 'pierreVrill') equipped.stones.push(i);
            else inventory.gear.push(i);
        } else {
            if (i.type === 'arme') inventory.weapons.push(i);
            else if (i.type === 'protection') inventory.armor.push(i);
            else if (i.type === 'accessoire') inventory.accessories.push(i);
            else if (i.type === 'pierreVrill') inventory.stones.push(i);
            else inventory.gear.push(i);
        }
    }
    context.inventory = inventory;
    context.equipped = equipped;
    context.equippedWeapons = equipped.weapons;
    context.equippedStones = equipped.stones; // Transfert pour le template HTML

    // --- 2. CALCUL AUTOMATIQUE DU RANG ---
    const m = context.system.meridiens;
    if (m) {
        const totalMeridiens = 
            (m.domination?.value || 0) + (m.savoir?.value || 0) + (m.expression?.value || 0) +
            (m.puissance?.value || 0) + (m.mouvement?.value || 0) + (m.vitalite?.value || 0);
        context.rangCalcule = Math.floor((totalMeridiens - 6) / 3);
        if (context.rangCalcule < 0) context.rangCalcule = 0;
    }

    // --- 3. POINTS DE MAÎTRISE (BLINDÉ) ---
    const pm = context.system.pointsMaitrise || { value: 0, max: 10 };
    const maitriseMax = pm.max || 10;
    const maitriseVal = pm.value || 0;
    
    context.maitriseBoxes = [];
    for (let i = 1; i <= maitriseMax; i++) {
        context.maitriseBoxes.push({ index: i, filled: i <= maitriseVal });
    }

    // --- 4. CALCUL DES DEFENSES ---
    const apts = context.system.aptitudes;
    const mers = context.system.meridiens;
    if (apts && mers) {
        context.defenses = {
            volonte: Math.floor((apts.volonte?.value || 0) / 3),
            sagesse: Math.floor((apts.sagesse?.value || 0) / 3),
            intuition: Math.floor((apts.intuition?.value || 0) / 3),
            parade: Math.floor((apts.vigueur?.value || 0) / 3),
            esquive: Math.floor((apts.reflexe?.value || 0) / 3),
            encaisse: Math.floor((apts.constitution?.value || 0) / 3)
        };
    } else {
        context.defenses = { volonte: 0, sagesse: 0, intuition: 0, parade: 0, esquive: 0, encaisse: 0 };
    }

    // --- 5. PREPARATION PERSONNALITE ---
    const pTraits = context.system.personnalite.traits || {};
    const rawPos = pTraits.positifs || [];
    context.traitsPositifs = Array.isArray(rawPos) ? rawPos : Object.values(rawPos);
    const rawNeg = pTraits.negatifs || [];
    context.traitsNegatifs = Array.isArray(rawNeg) ? rawNeg : Object.values(rawNeg);

    // --- 6. PREPARATION ATOUTS ---
    const rawAtouts = context.system.atouts || [];
    context.atouts = Array.isArray(rawAtouts) ? rawAtouts : Object.values(rawAtouts);

    // --- 7. PREPARATION ARCANES (BLINDAGE) ---
    if (!context.system.arcanes) {
        context.system.arcanes = { arts: [], ecole: { techniques: [] } };
    }
    
    let rawArts = context.system.arcanes.arts || [];
    context.system.arcanes.arts = Array.isArray(rawArts) ? rawArts : Object.values(rawArts);

    let rawTechs = context.system.arcanes.ecole?.techniques || [];
    context.system.arcanes.ecole.techniques = Array.isArray(rawTechs) ? rawTechs : Object.values(rawTechs);

    // --- 8. PREPARATION GRIMOIRE (Builder) ---
    if (!context.system.arcanes.grimoire || typeof context.system.arcanes.grimoire === 'string') {
        const oldNotes = typeof context.system.arcanes.grimoire === 'string' ? context.system.arcanes.grimoire : "";
        context.system.arcanes.grimoire = {
            notes: oldNotes,
            builder: { sequence: [{}, {}, {}] } 
        };
    }
    let seq = context.system.arcanes.grimoire.builder?.sequence || [];
    if (!Array.isArray(seq)) seq = Object.values(seq);
    while(seq.length < 3) seq.push({cible:"", suffixe:""});
    context.system.arcanes.grimoire.builder.sequence = seq;

    // --- 9. LISTE DES APTITUDES (Pour le menu Initiative) ---
    context.aptitudeList = {};
    if (context.system.aptitudes) {
        for (let [key, apt] of Object.entries(context.system.aptitudes)) {
            context.aptitudeList[key] = apt.label;
        }
    }

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;

    // =========================================================
    // A. GESTION GÉNÉRALE (Maitrise, Items, Equipement)
    // =========================================================

    html.find('.maitrise-check').click(async ev => {
        ev.preventDefault();
        const index = parseInt(ev.currentTarget.dataset.index);
        const currentVal = this.actor.system.pointsMaitrise.value;
        let newVal = index;
        if (index === 1 && currentVal === 1) newVal = 0;
        await this.actor.update({"system.pointsMaitrise.value": newVal});
    });

    html.find('.open-oracle').click(ev => {
        ev.preventDefault();
        new game.avantis.Divination({actor: this.actor}).render(true);
    });

    html.find('.item-create').click(async ev => {
        const type = ev.currentTarget.dataset.type;
        let img = "icons/svg/item-bag.svg";
        if(type === 'arme') img = "icons/weapons/swords/sword-iron.webp";
        if(type === 'pierreVrill') img = "icons/commodities/gems/gem-ruby.webp";
        await Item.create({name: `Nouveau ${type}`, type: type, img: img}, {parent: this.actor});
    });

    html.find('.item-edit').click(ev => {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        item.sheet.render(true);
    });

    html.find('.item-delete').click(ev => {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        item.delete();
    });

    html.find('.item-toggle').click(async ev => {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        const targetState = !item.system.equipe;

        if (targetState === true) {
            if (item.type === 'arme') {
                const nb = this.actor.items.filter(i => i.type === 'arme' && i.system.equipe).length;
                if (nb >= 3) return ui.notifications.warn("Déjà 3 armes équipées !");
            }
            if (item.type === 'protection') {
                const slot = item.system.slot;
                const updates = [];
                const current = this.actor.items.filter(i => i.type === 'protection' && i.system.equipe);
                if (slot === 'integral') current.forEach(a => updates.push({_id: a.id, "system.equipe": false}));
                else current.forEach(a => {
                    if (a.system.slot === slot || a.system.slot === 'integral') updates.push({_id: a.id, "system.equipe": false});
                });
                if (updates.length > 0) await this.actor.updateEmbeddedDocuments("Item", updates);
            }
        }
        await item.update({"system.equipe": targetState});
    });

    // --- NOUVEAU : ACTIVATION DE LA PIERRE DE VRILL ---
    html.find('.use-stone').click(async ev => {
        ev.preventDefault();
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        
        if (!item || item.type !== "pierreVrill") return;

        // Gestion rétrocompatibilité (si la pierre a été créée avant la mise à jour)
        let currentCharges = item.system.charges?.value ?? item.system.charges ?? 0;
        let maxCharges = item.system.charges?.max ?? currentCharges;

        if (currentCharges <= 0) {
            return ui.notifications.warn(`La pierre ${item.name} est vide ! Allez la recharger.`);
        }

        // 1. On diminue la charge
        await item.update({ "system.charges.value": currentCharges - 1 });

        // 2. On affiche le message dans le chat avec le bel encadré
        const content = `
            <div class="avantis-roll">
                <h3 style="border-bottom: 2px solid #9b59b6; color: #9b59b6; padding-bottom: 5px; margin-bottom: 10px;">
                    <i class="fas fa-gem"></i> Activation : ${item.name}
                </h3>
                <div style="font-size: 1.2em; text-align: center; font-weight: bold; margin-bottom: 10px;">
                    Bonus accordé : +${item.system.bonus}
                </div>
                <div style="background: rgba(155, 89, 182, 0.1); border-left: 3px solid #9b59b6; padding: 10px; font-style: italic; color: #444; margin-bottom: 10px;">
                    "${item.system.effets || "Aucun effet détaillé."}"
                </div>
                <div style="text-align: right; font-size: 0.8em; color: #666;">
                    Charges restantes : ${currentCharges - 1} / ${maxCharges}
                </div>
            </div>
        `;

        ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: content
        });
    });


    // =========================================================
    // H. BOUTONS D'ACTION (Chance, Initiative)
    // =========================================================

    // 1. TEST DE CHANCE (1d10 pur)
    html.find('.roll-chance').click(async ev => {
        ev.preventDefault();
        
        let roll = new Roll("1d10");
        await roll.evaluate();

        const content = `
            <div class="avantis-roll">
                <h3 style="border-bottom: 2px solid #6c5ce7; padding-bottom: 5px; margin-bottom: 10px; color: #6c5ce7;">
                    <i class="fas fa-dice-d20"></i> Test de Chance
                </h3>
                <div class="roll-result" style="background: #6c5ce7; color: white; padding: 15px; border-radius: 8px; text-align: center;">
                    <span style="font-size: 2em; font-weight: bold;">${roll.total}</span>
                </div>
            </div>
        `;

        ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: content
        });
    });

    // 2. TEST D'INITIATIVE (1d10 + Aptitude)
    html.find('.roll-init').click(async ev => {
        ev.preventDefault();

        // On récupère l'aptitude choisie dans la config (ou Réflexe par défaut)
        const aptKey = this.actor.system.config.initiativeAptitude || "reflexe";
        const aptitude = this.actor.system.aptitudes[aptKey];

        if (!aptitude) return ui.notifications.error(`Aptitude '${aptKey}' introuvable.`);

        const aptVal = aptitude.value;

        // Création du jet : 1d10 + Valeur de l'aptitude
        let roll = new Roll(`1d10 + ${aptVal}`);
        await roll.evaluate();

        const content = `
            <div class="avantis-roll">
                <h3 style="border-bottom: 2px solid #e67e22; padding-bottom: 5px; margin-bottom: 10px; color: #e67e22;">
                    <i class="fas fa-bolt"></i> Initiative
                </h3>
                <div style="text-align:center; margin-bottom:5px; color:#666;">
                    Base (${aptitude.label} : ${aptVal}) + Dé (${roll.terms[0].total})
                </div>
                <div class="roll-result" style="background: #e67e22; color: white; padding: 10px; border-radius: 8px; text-align: center;">
                    <span style="font-size: 2em; font-weight: bold;">${roll.total}</span>
                </div>
            </div>
        `;

        ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: content
        });

        // Bonus : Si un combat est lancé, ça inscrit l'initiative automatiquement
        if (game.combat) {
            const token = this.token || this.actor.getActiveTokens()[0];
            if (token) {
                await game.combat.rollInitiative([token.id], {formula: `1d10 + ${aptVal}`});
            }
        }
    });


    // =========================================================
    // I. GESTION DES REPOS (Court & Long)
    // =========================================================

    // --- Fonction Utilitaire : Fenêtre de Répartition ---
    const _distributeRestPoints = (pool) => {
        if (pool <= 0) return ui.notifications.warn("Aucun point de récupération obtenu.");

        const pvi = this.actor.system.pvi;
        const pve = this.actor.system.pve;
        const missingPvi = pvi.max - pvi.value;

        const content = `
            <div class="rest-dialog">
                <div style="text-align:center; margin-bottom:15px;">
                    <h3 style="color:#27ae60; border-bottom:2px solid #27ae60; padding-bottom:5px;">Récupération</h3>
                    <p style="font-size:1.2em;">Vous avez <strong>${pool}</strong> points de Vrill à répartir.</p>
                </div>
                
                <div class="flexrow" style="align-items:center; gap:10px; margin-bottom:10px;">
                    <div style="flex:1; text-align:center;">
                        <label>PVI 🌀 (Manque: ${missingPvi})</label>
                        <input type="number" id="input-pvi" value="0" min="0" max="${pool}" 
                               style="text-align:center; font-weight:bold; background: #ffffff; color: #000; border: 2px solid #27ae60;"/>
                    </div>
                    
                    <div style="flex:1; text-align:center;">
                        <label>PVE 🔥 (Reste)</label>
                        <input type="number" id="input-pve" value="${pool}" disabled 
                               style="text-align:center; font-weight:bold; background: #d3d3d3; color: #555; border: 1px solid #999;"/>
                    </div>
                </div>
                <p style="font-size:0.8em; color:#666; text-align:center;">Le reste des points ira automatiquement dans les PVE.</p>
            </div>
            <script>
                $('#input-pvi').on('input', function() {
                    let val = parseInt($(this).val()) || 0;
                    let max = ${pool};
                    if(val > max) { val = max; $(this).val(max); }
                    if(val < 0) { val = 0; $(this).val(0); }
                    $('#input-pve').val(max - val);
                });
            </script>
        `;

        new Dialog({
            title: "Répartition du Repos",
            content: content,
            buttons: {
                apply: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Appliquer les Soins",
                    callback: async (html) => {
                        const amountPvi = parseInt(html.find('#input-pvi').val()) || 0;
                        const amountPve = parseInt(html.find('#input-pve').val()) || 0;

                        const newPvi = Math.min(pvi.value + amountPvi, pvi.max);
                        const newPve = Math.min(pve.value + amountPve, pve.max);

                        await this.actor.update({
                            "system.pvi.value": newPvi,
                            "system.pve.value": newPve
                        });

                        ChatMessage.create({
                            user: game.user.id,
                            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                            content: `
                                <div class="avantis-roll">
                                    <h3 style="color:#27ae60; border-bottom:2px solid #27ae60;">Soins Appliqués</h3>
                                    <div><strong>+${amountPvi}</strong> PVI 🌀</div>
                                    <div><strong>+${amountPve}</strong> PVE 🔥</div>
                                </div>
                            `
                        });
                    }
                }
            },
            default: "apply"
        }).render(true);
    };


    // 3. REPOS COURT (Test de Régénération)
    html.find('.repos-court').click(ev => {
        ev.preventDefault();
        
        // CORRECTION : On prend directement la valeur de l'aptitude (qui contient déjà le total)
        const scoreBase = this.actor.system.aptitudes.regeneration?.value || 0;

        new Dialog({
            title: "Repos Court",
            content: `
                <form>
                    <div class="form-group">
                        <label>Situation</label>
                        <select id="rest-mode">
                            <option value="adv1" selected>Sécurisé (Avantage)</option>
                            <option value="normal">Normale (1d10)</option>
                            <option value="dis1">Stressante (Désavantage)</option>
                        </select>
                    </div>
                    <p class="notes">Test de Régénération (Score : ${scoreBase}).</p>
                </form>
            `,
            buttons: {
                roll: {
                    icon: '<i class="fas fa-dice-d20"></i>',
                    label: "Dormir (1h)",
                    callback: async (html) => {
                        const mode = html.find('#rest-mode').val();
                        
                        let nbDice = 1; 
                        let keep = "normal";
                        if(mode === "adv1") { nbDice = 2; keep = "low"; }
                        if(mode === "dis1") { nbDice = 2; keep = "high"; }

                        let diceResults = [];
                        for(let i=0; i<nbDice; i++) {
                            let r = new Roll("1d10");
                            await r.evaluate();
                            diceResults.push(r.total);
                        }

                        let result = diceResults[0];
                        if(keep === "low") result = Math.min(...diceResults);
                        if(keep === "high") result = Math.max(...diceResults);

                        // Calcul Marge
                        const marge = Math.max(0, scoreBase - result);

                        let color = marge > 0 ? "#27ae60" : "#c0392b";
                        let label = marge > 0 ? "REPOS BÉNÉFIQUE" : "REPOS AGITÉ";
                        let displayDice = diceResults.length > 1 ? `[ ${diceResults.join(", ")} ]` : result;

                        ChatMessage.create({
                            user: game.user.id,
                            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                            content: `
                                <div class="avantis-roll">
                                    <h3 style="border-bottom: 2px solid ${color}; color:${color};">Repos Court</h3>
                                    <div style="text-align:center; font-size:1.1em; margin:5px;">Jet : ${displayDice} (vs ${scoreBase})</div>
                                    <div class="roll-result" style="background:${color}; color:white; padding:5px; border-radius:5px; text-align:center;">
                                        <strong>${label}</strong><br>
                                        Gain : ${marge} points
                                    </div>
                                </div>
                            `
                        });

                        if (marge > 0) {
                            setTimeout(() => _distributeRestPoints(marge), 500);
                        }
                    }
                }
            }
        }).render(true);
    });


    // 4. REPOS LONG (Gain automatique = Score Régénération)
    html.find('.repos-long').click(async ev => {
        ev.preventDefault();

        const gainBase = this.actor.system.aptitudes.regeneration?.value || 0;

        new Dialog({
            title: "Repos Long",
            content: `
                <form>
                    <div class="form-group">
                        <label>Qualité du Repos</label>
                        <select id="long-rest-mode">
                            <option value="normal" selected>Nuit complète (100%)</option>
                            <option value="half">Incapacité / Mauvaise nuit (50%)</option>
                        </select>
                    </div>
                    <p class="notes">Récupération : ${gainBase} PVI 🌀 ET ${gainBase} PVE 🔥</p>
                </form>
            `,
            buttons: {
                sleep: {
                    icon: '<i class="fas fa-bed"></i>',
                    label: "Dormir (8h)",
                    callback: async (html) => {
                        const mode = html.find('#long-rest-mode').val();

                        let finalGain = gainBase;
                        if (mode === "half") finalGain = Math.floor(finalGain / 2);

                        const currentPvi = this.actor.system.pvi;
                        const currentPve = this.actor.system.pve;

                        const newPvi = Math.min(currentPvi.value + finalGain, currentPvi.max);
                        const newPve = Math.min(currentPve.value + finalGain, currentPve.max);

                        await this.actor.update({
                            "system.pvi.value": newPvi,
                            "system.pve.value": newPve
                        });

                        ChatMessage.create({
                            user: game.user.id,
                            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                            content: `
                                <div class="avantis-roll">
                                    <h3 style="border-bottom: 2px solid #2980b9; color:#2980b9;">Repos Long</h3>
                                    <div style="text-align:center; margin-bottom:5px;">Nuit de sommeil</div>
                                    <div class="roll-result" style="background:#2980b9; color:white; padding:10px; border-radius:5px; text-align:center;">
                                        <strong>+${finalGain}</strong> PVI 🌀 et <strong>+${finalGain}</strong> PVE 🔥
                                    </div>
                                </div>
                            `
                        });
                    }
                }
            }
        }).render(true);
    });



    // =========================================================
    // B. IMPORT JSON (BLINDÉ)
    // =========================================================
    html.find('.import-json-btn').click(async ev => {
        ev.preventDefault();
        const jsonString = html.find('#import-json-area').val();
        
        if (!jsonString) return ui.notifications.warn("Veuillez coller le JSON d'abord.");

        try {
            const data = JSON.parse(jsonString);
            const updateData = {};

            // 1. STATS
            if (data.nom) updateData["name"] = data.nom;
            if (data.pvi_max) { updateData["system.pvi.value"] = data.pvi_max; updateData["system.pvi.max"] = data.pvi_max; }
            if (data.pve_max) { updateData["system.pve.value"] = data.pve_max; updateData["system.pve.max"] = data.pve_max; }
            if (data.budgetFinal !== undefined) updateData["system.devise.sol"] = data.budgetFinal;

            const ptsLibres = data.pointsLibres || 0;
            const ptsBase = data.points_maitrise || 0;
            updateData["system.pointsMaitrise.value"] = (ptsLibres * 10) + ptsBase;

            if (data.meridiens) {
                for (let [key, val] of Object.entries(data.meridiens)) { updateData[`system.meridiens.${key}.value`] = val; }
            }

            const cleanKey = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            if (data.aptitudes) {
                for (let [label, obj] of Object.entries(data.aptitudes)) {
                    const sysKey = cleanKey(label);
                    if (this.actor.system.aptitudes[sysKey]) { updateData[`system.aptitudes.${sysKey}.value`] = obj.valeur; }
                }
            }

            // 6. PERSONNALITE
            if(data.age) updateData["system.personnalite.biographie.age"] = data.age;
            if(data.morphologie) updateData["system.personnalite.biographie.morphologie"] = data.morphologie;
            if(data.descriptionPhysique) updateData["system.personnalite.biographie.physique"] = data.descriptionPhysique;
            if(data.regionOrigine) updateData["system.personnalite.biographie.origine"] = data.regionOrigine;
            if(data.parcoursDeVie) updateData["system.personnalite.biographie.histoire"] = data.parcoursDeVie;
            
            if(data.objectifs) {
                if(data.objectifs.moyenTerme) updateData["system.personnalite.biographie.buts.moyen"] = data.objectifs.moyenTerme;
                if(data.objectifs.longTerme) updateData["system.personnalite.biographie.buts.long"] = data.objectifs.longTerme;
            }

            if(data.traitsPositifs) {
                updateData["system.personnalite.traits.positifs"] = data.traitsPositifs.map(t => ({name: t, desc: ""}));
            }
            if(data.traitsNegatifs) {
                updateData["system.personnalite.traits.negatifs"] = data.traitsNegatifs.map(t => ({name: t, desc: ""}));
            }

            if(data.careers) {
                const newCarrieres = [];
                const steps = ["enfance", "adolescence", "jeuneAdulte", "adulte"];
                for(let step of steps) {
                    if(data.careers[step]) {
                        let jobDesc = "";
                        if(data.careerDescriptions && data.careerDescriptions[step]) jobDesc = data.careerDescriptions[step];
                        const stepLabel = step.charAt(0).toUpperCase() + step.slice(1);
                        newCarrieres.push({name: data.careers[step], desc: `[${stepLabel}] ${jobDesc}`});
                    }
                }
                updateData["system.personnalite.carrieres"] = newCarrieres;
            }

            if (data.atouts && Array.isArray(data.atouts)) {
                const newAtouts = [];
                const library = (CONFIG.AVANTIS && CONFIG.AVANTIS.atouts) ? CONFIG.AVANTIS.atouts : {};

                for (let atoutName of data.atouts) {
                    let cleanName = atoutName.trim();
                    let desc = library[cleanName] || "Description non trouvée.";
                    newAtouts.push({ name: cleanName, desc: desc });
                }
                updateData["system.atouts"] = newAtouts;
            }
            
            if (data.artsDuVrill && Array.isArray(data.artsDuVrill)) {
                const newArts = [];
                
                for (let artData of data.artsDuVrill) {
                    const artObj = {
                        name: artData.nom || "Inconnu",
                        value: artData.valeur || 0,
                        scores: {
                            "Concentration": 0, "Contrôle": 0, "Distorsion": 0,
                            "Vision": 0, "Voile": 0, "Éther": 0, "Absorption": 0
                        }
                    };

                    if (artData.arcanes) {
                        for (let [key, valObj] of Object.entries(artData.arcanes)) {
                            let systemKey = key;
                            if (key === "Limbes") systemKey = "Voile";
                            
                            if (artObj.scores.hasOwnProperty(systemKey)) {
                                artObj.scores[systemKey] = valObj.valeur || 0;
                            }
                        }
                    }
                    newArts.push(artObj);
                }
                updateData["system.arcanes.arts"] = newArts;
            }

            await this.actor.update(updateData);

            // 9. ITEMS
            const itemsToCreate = [];
            if (data.armes && Array.isArray(data.armes)) {
                for (let a of data.armes) {
                    if (a.nom && a.nom.trim() !== "") {
                        itemsToCreate.push({
                            name: a.nom, type: "arme", img: "icons/weapons/swords/sword-iron.webp",
                            system: { proprietes: a.proprietes || "", equipe: false }
                        });
                    }
                }
            }

            if (data.inventaire && Array.isArray(data.inventaire)) {
                for (let rawItem of data.inventaire) {
                    let itemName = rawItem.trim().replace(/\.$/, "");
                    if (itemName.toLowerCase().startsWith("contient ")) itemName = itemName.substring(9).trim();
                    if (!itemName) continue;

                    let quantity = 1;
                    const qtyMatch = itemName.match(/^(.*?)\s*\((\d+)\s*.*\)$/);
                    if (qtyMatch) { itemName = qtyMatch[1].trim(); quantity = parseInt(qtyMatch[2]); }
                    itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);

                    let itemType = "objet"; let itemImg = "icons/svg/item-bag.svg";
                    if (itemName.includes("(Arme :")) { itemType = "arme"; itemImg = "icons/weapons/swords/sword-iron.webp"; } 
                    else if (itemName.includes("(Protection :")) { itemType = "protection"; itemImg = "icons/svg/shield.svg"; }

                    itemsToCreate.push({
                        name: itemName, type: itemType, img: itemImg,
                        system: { quantite: quantity, description: "Importé depuis le JSON.", equipe: false, slot: "divers" }
                    });
                }
            }

            if (itemsToCreate.length > 0) await this.actor.createEmbeddedDocuments("Item", itemsToCreate);
            ui.notifications.info("Importation terminée avec succès !");

        } catch (err) {
            console.error(err);
            ui.notifications.error("Erreur JSON: " + err.message);
        }
    });

    // =========================================================
    // C. GESTION TABLEAUX (CARRIERES, TRAITS, TECHNIQUES...)
    // =========================================================
    
    const genericArrayUpdate = async (path, action, index, newItem) => {
        let rawData = foundry.utils.getProperty(this.actor.system, path);
        let arrayData = [];
        if (rawData) arrayData = Array.isArray(rawData) ? rawData : Object.values(rawData);
        
        arrayData = foundry.utils.deepClone(arrayData);

        if (action === 'add') arrayData.push(newItem);
        if (action === 'delete') arrayData.splice(index, 1);

        const updateObj = {};
        updateObj[`system.${path}`] = arrayData;
        await this.actor.update(updateObj);
    };

    html.find('.carriere-add').click(ev => genericArrayUpdate('personnalite.carrieres', 'add', null, {name: "Nouveau Métier", desc: ""}));
    html.find('.carriere-delete').click(ev => genericArrayUpdate('personnalite.carrieres', 'delete', ev.currentTarget.dataset.index));

    html.find('.trait-p-add').click(ev => genericArrayUpdate('personnalite.traits.positifs', 'add', null, {name: "Nouveau", desc: ""}));
    html.find('.trait-p-delete').click(ev => genericArrayUpdate('personnalite.traits.positifs', 'delete', ev.currentTarget.dataset.index));
    html.find('.trait-n-add').click(ev => genericArrayUpdate('personnalite.traits.negatifs', 'add', null, {name: "Nouveau", desc: ""}));
    html.find('.trait-n-delete').click(ev => genericArrayUpdate('personnalite.traits.negatifs', 'delete', ev.currentTarget.dataset.index));

    html.find('.atout-delete').click(ev => genericArrayUpdate('atouts', 'delete', ev.currentTarget.dataset.index));

    html.find('.technique-add').click(async ev => {
        let currentTechs = this.actor.system.arcanes.ecole.techniques || [];
        if (!Array.isArray(currentTechs)) currentTechs = Object.values(currentTechs);
        currentTechs = foundry.utils.deepClone(currentTechs);
        currentTechs.push({name: "Nouvelle Technique", desc: "", rank: 1});
        await this.actor.update({"system.arcanes.ecole.techniques": currentTechs});
    });
    html.find('.technique-delete').click(ev => genericArrayUpdate('arcanes.ecole.techniques', 'delete', ev.currentTarget.dataset.index));

    html.find('.art-delete').click(ev => genericArrayUpdate('arcanes.arts', 'delete', ev.currentTarget.dataset.index));


    // =========================================================
    // D. DIALOGUES SPECIFIQUES (Atouts & Arts)
    // =========================================================

    html.find('.atout-add-dialog').click(ev => {
        ev.preventDefault();
        const availableAtouts = (CONFIG.AVANTIS && CONFIG.AVANTIS.atouts) ? CONFIG.AVANTIS.atouts : {};
        
        let options = "";
        for (let name of Object.keys(availableAtouts)) {
            options += `<option value="${name}">${name}</option>`;
        }
        if (options === "") options = "<option>Aucun atout chargé</option>";

        new Dialog({
            title: "Ajouter un Atout",
            content: `<div class="form-group"><label><b>Choisissez un Atout :</b></label><select id="atout-selector" style="width:100%; margin-top:5px;">${options}</select></div>`,
            buttons: {
                add: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Ajouter",
                    callback: (html) => {
                        const name = html.find('#atout-selector').val();
                        const desc = availableAtouts[name] || "";
                        genericArrayUpdate('atouts', 'add', null, {name: name, desc: desc});
                    }
                }
            },
            default: "add"
        }).render(true);
    });

    html.find('.art-add-btn').click(ev => {
        ev.preventDefault();
        const availableArts = CONFIG.AVANTIS.artsVrill || {};
        
        let options = "";
        for (let name of Object.keys(availableArts)) {
            options += `<option value="${name}">${name}</option>`;
        }

        new Dialog({
            title: "Éveiller un Art",
            content: `
                <div class="form-group">
                    <label>Quel Art souhaitez-vous apprendre ?</label>
                    <select id="art-selector" style="width:100%; margin-top:5px;">${options}</select>
                    <p style="font-size:0.8em; color:#666; margin-top:5px;">Le score sera calculé selon vos méridiens.</p>
                </div>`,
            buttons: {
                add: {
                    icon: '<i class="fas fa-magic"></i>',
                    label: "Éveiller",
                    callback: async (html) => {
                        const artName = html.find('#art-selector').val();
                        
                        const m = this.actor.system.meridiens;
                        let val = 0;

                        const getMeridien = (key) => m[key]?.value || 0;
                        const getArtValue = (targetName) => {
                            const currentArts = this.actor.system.arcanes.arts || [];
                            const found = (Array.isArray(currentArts) ? currentArts : Object.values(currentArts))
                                          .find(a => a.name === targetName);
                            return found ? found.value : getMeridien("savoir");
                        };

                        switch (artName) {
                            case "SHURA": val = getMeridien("domination"); break;
                            case "SINDRILL": val = getMeridien("savoir"); break;
                            case "MOKU": val = getMeridien("expression"); break;
                            case "RYDAN":
                                const puissance = getMeridien("puissance");
                                const sindrill = getArtValue("SINDRILL");
                                val = Math.floor((puissance + sindrill) / 2); 
                                break;
                            case "BLISS":
                                const mouvement = getMeridien("mouvement");
                                const expression = getMeridien("expression");
                                val = Math.floor((mouvement + expression) / 2); 
                                break;
                            default: val = 0;
                        }

                        const newArt = {
                            name: artName,
                            value: val,
                            scores: {
                                "Concentration": val, "Contrôle": val, "Distorsion": val,
                                "Vision": val, "Voile": val, "Éther": val, "Absorption": val
                            }
                        };
                        
                        let currentArts = this.actor.system.arcanes.arts || [];
                        if (!Array.isArray(currentArts)) currentArts = Object.values(currentArts);
                        currentArts = foundry.utils.deepClone(currentArts);
                        
                        currentArts.push(newArt);
                        await this.actor.update({"system.arcanes.arts": currentArts});
                    }
                }
            }
        }).render(true);
    });

    // =========================================================
    // E. JETS DE DÉS
    // =========================================================

    html.find('.rollable').click(this._onRollMaitrise.bind(this));
    html.find('.roll-defense').click(this._onRollMaitrise.bind(this));
    html.find('.roll-weapon').click(this._onRollCombat.bind(this));
    html.find('.roll-arcane').click(this._onRollArcane.bind(this));

    // ---------------------------------------------------------
    // G. CONSTRUCTEUR DE PHRASE (Grimoire)
    // ---------------------------------------------------------
    
    const updatePhrase = () => {
        const dict = CONFIG.AVANTIS.quetchua;
        const actionKey = html.find('[name="system.arcanes.grimoire.builder.action"]').val();
        const isShort = html.find('[name="system.arcanes.grimoire.builder.formeCourte"]').is(':checked');
        
        let phraseParts = [];

        if (actionKey && dict.actions[actionKey]) {
            const actWord = isShort ? dict.actions[actionKey].short : dict.actions[actionKey].long;
            phraseParts.push(`<span style="color:#e74c3c;">${actWord}</span>`);
        }

        let lines = [];
        for(let i=0; i<3; i++) {
            const cKey = html.find(`[name="system.arcanes.grimoire.builder.sequence.${i}.cible"]`).val();
            const sKey = html.find(`[name="system.arcanes.grimoire.builder.sequence.${i}.suffixe"]`).val();
            
            lines.push({
                cible: (cKey && dict.cibles[cKey]) ? dict.cibles[cKey].val : null,
                suffixe: (sKey && dict.suffixes[sKey]) ? dict.suffixes[sKey].val : null
            });
        }

        let pendingSuffix = null; 

        for (let i = 0; i < lines.length; i++) {
            let current = lines[i];
            
            if (!current.cible) continue; 

            let hasNextTarget = false;
            for (let j = i + 1; j < lines.length; j++) {
                if (lines[j].cible) {
                    hasNextTarget = true;
                    break;
                }
            }

            let word = current.cible;

            if (pendingSuffix) {
                word += `<span style="color:#f1c40f;">${pendingSuffix}</span>`;
                pendingSuffix = null; 
            }

            if (current.suffixe) {
                if (hasNextTarget) {
                    pendingSuffix = current.suffixe;
                } else {
                    word += `<span style="color:#f1c40f;">${current.suffixe}</span>`;
                }
            }

            phraseParts.push(word);
        }

        const finalPhrase = phraseParts.join(" "); 
        html.find('#phrase-output').html(finalPhrase || "...");
    };

    html.find('.phrase-copy').click(ev => {
        ev.preventDefault();
        const phrase = html.find('#phrase-output').text().trim();
        
        if(phrase && phrase !== "...") {
            navigator.clipboard.writeText(phrase).then(() => {
                ui.notifications.info(`Phrase copiée : "${phrase}"`);
                const icon = html.find('.phrase-copy');
                icon.css('color', '#fff');
                setTimeout(() => icon.css('color', 'rgba(255,255,255,0.4)'), 300);
            }).catch(err => {
                ui.notifications.error("Impossible de copier le texte.");
                console.error(err);
            });
        } else {
            ui.notifications.warn("Aucune phrase à copier.");
        }
    });

    html.find('.phrase-trigger').change(ev => {
        updatePhrase();
    });

    updatePhrase();
  }

  // --- FONCTION DE JET (Maitrise + Brûlure de Vrill) ---
  async _onRollMaitrise(event) {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      const aptKey = dataset.key;
      const aptitude = this.actor.system.aptitudes[aptKey];
      
      if (!aptitude) return ui.notifications.error("Aptitude introuvable : " + aptKey);

      const internalMeridiens = ["domination", "savoir", "expression"];
      const isInternal = internalMeridiens.includes(aptitude.meridien);
      
      const poolLabel = isInternal ? "PVI 🌀" : "PVE 🔥";
      const poolKey = isInternal ? "pvi" : "pve";
      const currentPool = this.actor.system[poolKey].value;

      const content = `
        <form class="roll-dialog">
            <div class="form-group">
                <label>Bonus Temporaire</label>
                <input type="number" name="bonus" value="0" min="0" max="10" placeholder="0"/>
            </div>
            
            <div class="form-group">
                <label>Brûler ${poolLabel} <span style="font-size:0.8em; font-weight:normal;">(Dispo: ${currentPool})</span></label>
                <input type="number" name="burn" value="0" min="0" max="${currentPool}" style="border-color: #e67e22;"/>
                <p class="notes" style="font-size:0.8em; margin-top:2px;">Ajoute +1 au score par point brûlé.</p>
            </div>

            <div class="form-group">
                <label>Type de Lancer</label>
                <select name="mode">
                    <option value="classic">Classique (1d10)</option>
                    <option value="adv1">Avantage (2d10 - Garder le plus petit)</option>
                    <option value="adv2">Double Avantage (3d10 - Garder le plus petit)</option>
                    <option value="dis1">Désavantage (2d10 - Garder le plus grand)</option>
                    <option value="dis2">Double Désavantage (3d10 - Garder le plus grand)</option>
                </select>
            </div>
        </form>
      `;

      new Dialog({
          title: `Test de ${aptitude.label || aptKey}`,
          content: content,
          buttons: {
              roll: {
                  icon: '<i class="fas fa-dice-d20"></i>',
                  label: "Lancer",
                  callback: async (html) => {
                      const bonus = parseInt(html.find('[name="bonus"]').val()) || 0;
                      const burn = parseInt(html.find('[name="burn"]').val()) || 0;
                      const mode = html.find('[name="mode"]').val();
                      
                      if (burn > 0) {
                          if (burn > currentPool) return ui.notifications.error("Pas assez de points à brûler !");
                          const newVal = currentPool - burn;
                          await this.actor.update({ [`system.${poolKey}.value`]: newVal });
                      }

                      const scoreCible = aptitude.value + bonus + burn;
                      
                      let nbDice = 1; let keep = "normal"; 
                      if (mode === "adv1") { nbDice = 2; keep = "low"; }
                      if (mode === "adv2") { nbDice = 3; keep = "low"; }
                      if (mode === "dis1") { nbDice = 2; keep = "high"; }
                      if (mode === "dis2") { nbDice = 3; keep = "high"; }

                      let totalMargin = 0; let rollsLog = []; 
                      let isProuesse = false; let isMaladresse = false;
                      let loopCount = 0; let stop = false;

                      do {
                          let currentDice = [];
                          for(let i=0; i<nbDice; i++) {
                              let r = new Roll("1d10"); await r.evaluate(); currentDice.push(r.total);
                          }

                          let selectedResult = currentDice[0];
                          if (keep === "low") selectedResult = Math.min(...currentDice);
                          if (keep === "high") selectedResult = Math.max(...currentDice);

                          let rollDisplay = "";
                          if (nbDice > 1) {
                              let formattedDice = currentDice.map(d => (d === selectedResult) ? `<b style="color:#000;">${d}</b>` : `<span style="color:#999;">${d}</span>`).join(", ");
                              rollDisplay = `[ ${formattedDice} ]`;
                          } else { rollDisplay = `<strong>${selectedResult}</strong>`; }

                          if (loopCount === 0 && selectedResult === 10) isMaladresse = true;
                          
                          if (selectedResult === 1) {
                              isProuesse = true;
                              totalMargin += (scoreCible - 1);
                              rollsLog.push(`${rollDisplay} <i class="fas fa-arrow-right" style="font-size:0.8em; color:#d35400;"></i> <span style="color:#d35400; font-weight:bold;">Prouesse!</span>`);
                          } else {
                              let currentMargin = scoreCible - selectedResult;
                              if (isProuesse === true && currentMargin < 0) {
                                  rollsLog.push(`${rollDisplay} <span style="color:#999; font-size:0.8em; font-style:italic;">(Marge ${currentMargin} ignorée)</span>`);
                                  currentMargin = 0;
                              } else { rollsLog.push(rollDisplay); }
                              totalMargin += currentMargin;
                              stop = true;
                          }
                          loopCount++; if (loopCount > 10) stop = true;
                      } while (!stop);

                      let resultLabel = "ÉCHEC"; let color = "#c0392b"; let icon = '<i class="fas fa-times"></i>';
                      if (totalMargin >= 0) { resultLabel = "SUCCÈS"; color = "#27ae60"; icon = '<i class="fas fa-check"></i>'; }
                      let specialDisplay = "";
                      if (isMaladresse) { resultLabel = "MALADRESSE"; color = "#8b0000"; icon = '<i class="fas fa-skull"></i>'; specialDisplay = "maladresse-anim"; }
                      if (isProuesse) { resultLabel = "PROUESSE"; color = "#d35400"; icon = '<i class="fas fa-star"></i>'; specialDisplay = "prouesse-anim"; }

                      let burnInfo = burn > 0 ? `<div style="font-size:0.9em; color:#e67e22; margin-top:5px;">Brûlure : -${burn} ${poolLabel} (+${burn} score)</div>` : "";

                      ChatMessage.create({
                          user: game.user.id,
                          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                          content: `
                            <div class="avantis-roll">
                                <h3 style="border-bottom: 2px solid ${color}; padding-bottom: 5px; margin-bottom: 10px;">
                                    ${aptitude.label || aptKey} <span style="font-size:0.7em; float:right;">(Cible: ${scoreCible})</span>
                                </h3>
                                <div style="font-size: 0.9em; color: #666; margin-bottom: 5px;"><em>Mode : ${html.find(`option[value="${mode}"]`).text()}</em></div>
                                <div class="dice-sequence" style="text-align:center; font-size:1.1em; margin: 10px 0; line-height: 1.5;">${rollsLog.join("<br>")}</div>
                                <div class="roll-result ${specialDisplay}" style="background: ${color}; color: white; padding: 10px; border-radius: 8px; text-align: center;">
                                    <div style="font-size: 1.5em; font-weight: bold; text-transform: uppercase;">${icon} ${resultLabel}</div>
                                    <div style="font-size: 1.2em; margin-top: 5px;">Marge : ${totalMargin >= 0 ? "+" : ""}${totalMargin}</div>
                                </div>
                                ${burnInfo}
                            </div>`
                      });
                  }
              }
          },
          default: "roll"
      }).render(true);
  }

  // --- FONCTION DE COMBAT (Arme + Force/Finesse) ---
  async _onRollCombat(event) {
      event.preventDefault();
      const li = $(event.currentTarget);
      const itemId = li.data("itemId");
      const item = this.actor.items.get(itemId);

      if (!item) return;

      const force = this.actor.system.aptitudes.force;
      const finesse = this.actor.system.aptitudes.finesse;
      const bonusArme = item.system.bonusDegats || 0;

      const content = `
        <form class="roll-dialog">
            <div class="form-group">
                <label>Style de Combat</label>
                <select name="stat">
                    <option value="force">Force (Score: ${force.value})</option>
                    <option value="finesse">Finesse (Score: ${finesse.value})</option>
                </select>
            </div>
            <div class="form-group">
                <label>Bonus Arme</label>
                <input type="number" value="${bonusArme}" disabled style="background:#eee; color:#555; text-align:center; font-weight:bold;"/>
            </div>
            <div class="form-group">
                <label>Bonus Temporaire</label>
                <input type="number" name="bonus" value="0" min="0" max="10" placeholder="0"/>
            </div>
            <div class="form-group">
                <label>Type de Lancer</label>
                <select name="mode">
                    <option value="classic">Classique (1d10)</option>
                    <option value="adv1">Avantage (2d10 - Garder le plus petit)</option>
                    <option value="adv2">Double Avantage (3d10 - Garder le plus petit)</option>
                    <option value="dis1">Désavantage (2d10 - Garder le plus grand)</option>
                    <option value="dis2">Double Désavantage (3d10 - Garder le plus grand)</option>
                </select>
            </div>
        </form>
      `;

      new Dialog({
          title: `Attaque : ${item.name}`,
          content: content,
          buttons: {
              attack: {
                  icon: '<i class="fas fa-fist-raised"></i>',
                  label: "Attaquer",
                  callback: async (html) => {
                      const statKey = html.find('[name="stat"]').val();
                      const bonusTemp = parseInt(html.find('[name="bonus"]').val()) || 0;
                      const mode = html.find('[name="mode"]').val();
                      
                      const aptitude = (statKey === "force") ? force : finesse;
                      
                      const scoreCible = aptitude.value + bonusArme + bonusTemp;

                      let nbDice = 1;
                      let keep = "normal"; 
                      if (mode === "adv1") { nbDice = 2; keep = "low"; }
                      if (mode === "adv2") { nbDice = 3; keep = "low"; }
                      if (mode === "dis1") { nbDice = 2; keep = "high"; }
                      if (mode === "dis2") { nbDice = 3; keep = "high"; }

                      let totalMargin = 0;
                      let rollsLog = []; 
                      let isProuesse = false;
                      let isMaladresse = false;
                      let loopCount = 0;
                      let stop = false;

                      do {
                          let currentDice = [];
                          for(let i=0; i<nbDice; i++) {
                              let r = new Roll("1d10");
                              await r.evaluate();
                              currentDice.push(r.total);
                          }

                          let selectedResult = currentDice[0];
                          if (keep === "low") selectedResult = Math.min(...currentDice);
                          if (keep === "high") selectedResult = Math.max(...currentDice);

                          let rollDisplay = "";
                          if (nbDice > 1) {
                              let formattedDice = currentDice.map(d => {
                                  return (d === selectedResult) ? `<b style="color:#000;">${d}</b>` : `<span style="color:#999;">${d}</span>`;
                              }).join(", ");
                              rollDisplay = `[ ${formattedDice} ]`;
                          } else {
                              rollDisplay = `<strong>${selectedResult}</strong>`;
                          }

                          if (loopCount === 0 && selectedResult === 10) isMaladresse = true;
                          
                          if (selectedResult === 1) {
                              isProuesse = true;
                              totalMargin += (scoreCible - 1);
                              rollsLog.push(`${rollDisplay} <i class="fas fa-arrow-right" style="font-size:0.8em; color:#d35400;"></i> <span style="color:#d35400; font-weight:bold;">Prouesse!</span>`);
                          } else {
                              let currentMargin = scoreCible - selectedResult;
                              
                              if (isProuesse === true && currentMargin < 0) {
                                  rollsLog.push(`${rollDisplay} <span style="color:#999; font-size:0.8em; font-style:italic;">(Marge ${currentMargin} ignorée)</span>`);
                                  currentMargin = 0;
                              } else {
                                  rollsLog.push(rollDisplay);
                              }
                              
                              totalMargin += currentMargin;
                              stop = true;
                          }

                          loopCount++;
                          if (loopCount > 10) stop = true;

                      } while (!stop);

                      let resultLabel = "ÉCHEC";
                      let color = "#c0392b"; 
                      let icon = '<i class="fas fa-times"></i>';

                      if (totalMargin >= 0) {
                          resultLabel = "TOUCHÉ"; 
                          color = "#c0392b"; 
                          icon = '<i class="fas fa-fist-raised"></i>';
                      }

                      let specialDisplay = "";
                      if (isMaladresse) {
                          resultLabel = "MALADRESSE";
                          color = "#8b0000"; 
                          icon = '<i class="fas fa-skull"></i>';
                          specialDisplay = "maladresse-anim"; 
                      }
                      if (isProuesse) {
                          resultLabel = "PROUESSE";
                          color = "#d35400"; 
                          icon = '<i class="fas fa-star"></i>';
                          specialDisplay = "prouesse-anim";
                      }

                      const chatContent = `
                        <div class="avantis-roll">
                            <h3 style="border-bottom: 2px solid ${color}; padding-bottom: 5px; margin-bottom: 10px;">
                                Attaque : ${item.name}
                            </h3>
                            
                            <div style="font-size: 0.9em; color: #666; margin-bottom: 5px; text-align:center;">
                                <strong>${aptitude.label}</strong> (${aptitude.value}) + <strong>Arme</strong> (${bonusArme}) = <strong>${aptitude.value + bonusArme}</strong>
                            </div>

                            <div class="dice-sequence" style="text-align:center; font-size:1.1em; margin: 10px 0; line-height: 1.5;">
                                ${rollsLog.join("<br>")}
                            </div>

                            <div class="roll-result ${specialDisplay}" style="background: ${color}; color: white; padding: 10px; border-radius: 8px; text-align: center;">
                                <div style="font-size: 1.5em; font-weight: bold; text-transform: uppercase;">
                                    ${icon} ${resultLabel}
                                </div>
                                <div style="font-size: 1.2em; margin-top: 5px;">
                                    Dégâts : ${totalMargin >= 0 ? "+" : ""}${totalMargin}
                                </div>
                            </div>
                        </div>
                      `;

                      ChatMessage.create({
                          user: game.user.id,
                          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                          content: chatContent
                      });
                  }
              }
          },
          default: "attack"
      }).render(true);
  }

  // --- FONCTION DE JET D'ARCANE (PVI Uniquement) ---
  async _onRollArcane(event) {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      const artIndex = dataset.artIndex;
      const arcaneKey = dataset.key;

      const art = this.actor.system.arcanes.arts[artIndex];
      if (!art) return;
      
      const score = art.scores[arcaneKey];
      if (score === undefined) return;

      const currentPvi = this.actor.system.pvi.value;

      const content = `
        <form class="roll-dialog">
            <div class="form-group">
                <label>Bonus Temporaire</label>
                <input type="number" name="bonus" value="0" min="0" max="10" placeholder="0"/>
            </div>
            
            <div class="form-group">
                <label>Brûler PVI 🌀 <span style="font-size:0.8em; font-weight:normal;">(Dispo: ${currentPvi})</span></label>
                <input type="number" name="burn" value="0" min="0" max="${currentPvi}" style="border-color: #e67e22;"/>
                <p class="notes" style="font-size:0.8em; margin-top:2px;">Puiser dans le Vrill (+1 score / -1 PVI).</p>
            </div>

            <div class="form-group">
                <label>Type de Lancer</label>
                <select name="mode">
                    <option value="classic">Classique (1d10)</option>
                    <option value="adv1">Avantage (2d10 - Garder le plus petit)</option>
                    <option value="adv2">Double Avantage (3d10 - Garder le plus petit)</option>
                    <option value="dis1">Désavantage (2d10 - Garder le plus grand)</option>
                    <option value="dis2">Double Désavantage (3d10 - Garder le plus grand)</option>
                </select>
            </div>
        </form>
      `;

      new Dialog({
          title: `Arcane : ${arcaneKey} (${art.name})`,
          content: content,
          buttons: {
              roll: {
                  icon: '<i class="fas fa-magic"></i>',
                  label: "Incantation",
                  callback: async (html) => {
                      const bonus = parseInt(html.find('[name="bonus"]').val()) || 0;
                      const burn = parseInt(html.find('[name="burn"]').val()) || 0;
                      const mode = html.find('[name="mode"]').val();
                      
                      if (burn > 0) {
                          if (burn > currentPvi) return ui.notifications.error("Pas assez de PVI !");
                          const newVal = currentPvi - burn;
                          await this.actor.update({ "system.pvi.value": newVal });
                      }

                      const scoreCible = score + bonus + burn;

                      let nbDice = 1; let keep = "normal"; 
                      if (mode === "adv1") { nbDice = 2; keep = "low"; }
                      if (mode === "adv2") { nbDice = 3; keep = "low"; }
                      if (mode === "dis1") { nbDice = 2; keep = "high"; }
                      if (mode === "dis2") { nbDice = 3; keep = "high"; }

                      let totalMargin = 0; let rollsLog = []; 
                      let isProuesse = false; let isMaladresse = false;
                      let loopCount = 0; let stop = false;

                      do {
                          let currentDice = [];
                          for(let i=0; i<nbDice; i++) {
                              let r = new Roll("1d10"); await r.evaluate(); currentDice.push(r.total);
                          }
                          let selectedResult = currentDice[0];
                          if (keep === "low") selectedResult = Math.min(...currentDice);
                          if (keep === "high") selectedResult = Math.max(...currentDice);

                          let rollDisplay = "";
                          if (nbDice > 1) {
                              let formattedDice = currentDice.map(d => (d === selectedResult) ? `<b style="color:#000;">${d}</b>` : `<span style="color:#999;">${d}</span>`).join(", ");
                              rollDisplay = `[ ${formattedDice} ]`;
                          } else { rollDisplay = `<strong>${selectedResult}</strong>`; }

                          if (loopCount === 0 && selectedResult === 10) isMaladresse = true;
                          
                          if (selectedResult === 1) {
                              isProuesse = true;
                              totalMargin += (scoreCible - 1);
                              rollsLog.push(`${rollDisplay} <i class="fas fa-arrow-right" style="font-size:0.8em; color:#d35400;"></i> <span style="color:#d35400; font-weight:bold;">Prouesse!</span>`);
                          } else {
                              let currentMargin = scoreCible - selectedResult;
                              if (isProuesse === true && currentMargin < 0) {
                                  rollsLog.push(`${rollDisplay} <span style="color:#999; font-size:0.8em; font-style:italic;">(Marge ${currentMargin} ignorée)</span>`);
                                  currentMargin = 0;
                              } else { rollsLog.push(rollDisplay); }
                              totalMargin += currentMargin;
                              stop = true;
                          }
                          loopCount++; if (loopCount > 10) stop = true;
                      } while (!stop);

                      let resultLabel = "ÉCHEC"; let color = "#c0392b"; let icon = '<i class="fas fa-times"></i>';
                      if (totalMargin >= 0) { resultLabel = "SUCCÈS"; color = "#27ae60"; icon = '<i class="fas fa-check"></i>'; }
                      let specialDisplay = "";
                      if (isMaladresse) { resultLabel = "MALADRESSE"; color = "#8b0000"; icon = '<i class="fas fa-skull"></i>'; specialDisplay = "maladresse-anim"; }
                      if (isProuesse) { resultLabel = "PROUESSE"; color = "#d35400"; icon = '<i class="fas fa-star"></i>'; specialDisplay = "prouesse-anim"; }

                      let burnInfo = burn > 0 ? `<div style="font-size:0.9em; color:#e67e22; margin-top:5px;">Brûlure PVI : -${burn} (+${burn} score)</div>` : "";

                      ChatMessage.create({
                          user: game.user.id,
                          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                          content: `
                            <div class="avantis-roll">
                                <h3 style="border-bottom: 2px solid ${color}; padding-bottom: 5px; margin-bottom: 10px;">
                                    Arcane : ${arcaneKey} <span style="font-size:0.7em; float:right;">(Cible: ${scoreCible})</span>
                                </h3>
                                <div style="font-size: 0.9em; color: #666; margin-bottom: 5px;"><em>Art : ${art.name} | Mode : ${html.find(`option[value="${mode}"]`).text()}</em></div>
                                <div class="dice-sequence" style="text-align:center; font-size:1.1em; margin: 10px 0; line-height: 1.5;">${rollsLog.join("<br>")}</div>
                                <div class="roll-result ${specialDisplay}" style="background: ${color}; color: white; padding: 10px; border-radius: 8px; text-align: center;">
                                    <div style="font-size: 1.5em; font-weight: bold; text-transform: uppercase;">${icon} ${resultLabel}</div>
                                    <div style="font-size: 1.2em; margin-top: 5px;">Marge : ${totalMargin >= 0 ? "+" : ""}${totalMargin}</div>
                                </div>
                                ${burnInfo}
                            </div>`
                      });
                  }
              }
          },
          default: "roll"
      }).render(true);
  }
}