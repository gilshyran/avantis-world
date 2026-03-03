export class AvantisApothecary extends Application {

    constructor(options) {
        super(options);
        this.currentMode = 'creation';
        this.currentPotionData = {};
        // Stockage des données des potions pour la fusion
        this.loadedPotions = [null, null, null, null];
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "avantis-apothecary",
            title: "Atelier de l'Apothicaire",
            template: "systems/avantis/templates/apps/apothecary.html",
            width: 900,
            height: 750,
            resizable: true,
            classes: ["avantis-apothecary-window"],
            // ACTIVER LE DRAG & DROP
            dragDrop: [{ dragSelector: null, dropSelector: ".drop-zone" }] 
        });
    }

    // --- DONNÉES DU GÉNÉRATEUR ---
    get apothecaryData() {
        return {
            qualityStats: {
                1: { properties: 1, concentration: "1%", duration: "10 minutes" },
                2: { properties: 2, concentration: "10%", duration: "1 heure" },
                3: { properties: 3, concentration: "50%", duration: "1/2 journée" },
                4: { properties: 4, concentration: "100%", duration: "1 journée" }
            },
            ingredients: {
                
  "Acérola": {
    "q1": ["Tonique"],
    "q2": ["Tonique+"],
    "q3": ["Stimulant+"],
    "q4": ["Stimulant Max"]
  },
  "Achillée millefeuille": {
    "q1": ["Régénérateur"],
    "q2": ["Antiseptique+", "Régénérateur+"],
    "q3": ["Détoxifiant+"],
    "q4": ["Régénérateur+"]
  },
  "Achiote": {
    "q1": ["Stimulant"],
    "q2": ["Antiseptique", "Stimulant"],
    "q3": ["Antiseptique+", "Stimulant+"],
    "q4": ["Détoxifiant", "Stimulant"]
  },
  "Arnica": {
    "q1": ["Régénérateur", "Antidouleur"],
    "q2": ["Antidouleur+"],
    "q3": ["Régénérateur+"],
    "q4": ["Poison+"]
  },
  "Ayahuasca": {
    "q1": ["Hallucinogène"],
    "q2": ["Hallucinogène+", "Exaltant+"],
    "q3": ["Hallucinogène+", "Exaltant+"],
    "q4": ["Hallucinogène Max"]
  },
  "Belladone": {
    "q1": ["Antidouleur"],
    "q2": ["Sédatif"],
    "q3": ["Sédatif+", "Poison+"],
    "q4": ["Poison Max"]
  },
  "Boldo": {
    "q1": ["Détoxifiant"],
    "q2": ["Tonique"],
    "q3": ["Tonique+", "Poison"],
    "q4": ["Poison+"]
  },
  "Cat’s Claw": {
    "q1": ["Régénérateur"],
    "q2": ["Détoxifiant"],
    "q3": ["Détoxifiant+"],
    "q4": ["Détoxifiant+"]
  },
  "Charbon actif": {
    "q1": ["Antitoxine", "Détoxifiant"],
    "q2": ["Antitoxine", "Détoxifiant"],
    "q3": ["Antitoxine+", "Détoxifiant+"],
    "q4": ["Antitoxine+", "Détoxifiant+"]
  },
  "Chili Rocoto": {
    "q1": ["Stimulant"],
    "q2": ["Poison"],
    "q3": ["Poison+"],
    "q4": ["Poison Max"]
  },
  "Cinchona": {
    "q1": ["Antitoxine"],
    "q2": ["Antiseptique", "Antitoxine+"],
    "q3": ["Poison"],
    "q4": ["Poison+"]
  },
  "Clou de girofle": {
    "q1": ["Régénérateur"],
    "q2": ["Antiseptique", "Sédatif"],
    "q3": ["Antiseptique+", "Sédatif+"],
    "q4": ["Détoxifiant", "Sédatif+"]
  },
  "Coca": {
    "q1": ["Tonique", "Stimulant"],
    "q2": ["Tonique", "Stimulant+"],
    "q3": ["Tonique+", "Stimulant+"],
    "q4": ["Poison", "Stimulant Max"]
  },
  "Copal": {
    "q1": ["Calmant"],
    "q2": ["Hallucinogène", "Calmant+"],
    "q3": ["Exaltant", "Hallucinogène"],
    "q4": ["Exaltant+", "Hallucinogène+"]
  },
  "Défense de reek": {
    "q1": ["Tonique"],
    "q2": ["Stimulant", "Poison"],
    "q3": ["Stimulant+", "Poison"],
    "q4": ["Stimulant Max", "Poison+"]
  },
  "Digitale": {
    "q1": ["Stimulant"],
    "q2": ["Antidouleur+", "Poison"],
    "q3": ["Antidouleur Max", "Poison+"],
    "q4": ["Poison Max"]
  },
  "Gingembre": {
    "q1": ["Tonique"],
    "q2": ["Stimulant", "Tonique"],
    "q3": ["Stimulant+", "Tonique+"],
    "q4": ["Poison", "Stimulant Max"]
  },
  "Ginkgo Biloba": {
    "q1": ["Tonique"],
    "q2": ["Exaltant", "Sédatif"],
    "q3": ["Exaltant+", "Sédatif+"],
    "q4": ["Hallucinogène+", "Sédatif Max"]
  },
  "Ginseng": {
    "q1": ["Tonique"],
    "q2": ["Régénérateur"],
    "q3": ["Régénérateur+"],
    "q4": ["Régénérateur+", "Stimulant"]
  },
  "Guarana": {
    "q1": ["Stimulant"],
    "q2": ["Stimulant"],
    "q3": ["Stimulant+", "Tonique+"],
    "q4": ["Stimulant Max"]
  },
  "Haurvatat": {
    "q1": ["Régénérateur", "Antitoxine"],
    "q2": ["Régénérateur", "Antitoxine"],
    "q3": ["Régénérateur+", "Antitoxine+"],
    "q4": ["Régénérateur Max", "Antitoxine Max"]
  },
  "Ipecacuanha": {
    "q1": ["Détoxifiant"],
    "q2": ["Détoxifiant", "Antitoxine"],
    "q3": ["Détoxifiant+"],
    "q4": ["Poison"]
  },
  "Lavande": {
    "q1": ["Calmant"],
    "q2": ["Antiseptique", "Sédatif"],
    "q3": ["Antiseptique+", "Sédatif"],
    "q4": ["Détoxifiant", "Sédatif+"]
  },
  "Maca": {
    "q1": ["Tonique"],
    "q2": ["Stimulant"],
    "q3": ["Stimulant+"],
    "q4": ["Tonique", "Stimulant+"]
  },
  "Millepertuis": {
    "q1": ["Régénérateur"],
    "q2": ["Calmant", "Sédatif"],
    "q3": ["Calmant+", "Sédatif+"],
    "q4": ["Hallucinogène", "Sédatif+"]
  },
  "Passiflore": {
    "q1": ["Sédatif"],
    "q2": ["Calmant", "Sédatif"],
    "q3": ["Calmant+", "Sédatif+"],
    "q4": ["Hallucinogène+", "Sédatif+"]
  },
  "Sacha Inchi": {
    "q1": ["Tonique"],
    "q2": ["Régénérateur", "Tonique"],
    "q3": ["Régénérateur+", "Tonique+"],
    "q4": ["Régénérateur+", "Tonique Max"]
  },
  "Uña de Gato": {
    "q1": ["Régénérateur", "Antiseptique"],
    "q2": ["Régénérateur", "Antiseptique"],
    "q3": ["Antiseptique+"],
    "q4": ["Détoxifiant+", "Antiseptique+"]
  },
  "Valériane": {
    "q1": ["Calmant", "Régénérateur"],
    "q2": ["Calmant+", "Sédatif+"],
    "q3": ["Calmant+", "Sédatif+"],
    "q4": ["Hallucinogène+", "Sédatif+"]
  },
  "Venin de k’ayra mapa": {
    "q1": ["Hallucinogène"],
    "q2": ["Poison", "Hallucinogène+"],
    "q3": ["Poison+", "Hallucinogène Max"],
    "q4": ["Poison+", "Hallucinogène Max"]
  },
  "Yopo": {
    "q1": ["Hallucinogène", "Exaltant"],
    "q2": ["Hallucinogène", "Exaltant"],
    "q3": ["Hallucinogène+", "Exaltant+"],
    "q4": ["Hallucinogène Max"]
  }


            },
            properties: {
                "Antidouleur": "Ignore la prochaine blessure subie sur le Vrill externe.",
            "Antiseptique": "Régénère +1PVE.",
            "Antitoxine": "Neutralise l’effet d’un Poison",
            "Calmant": "Permet de relancer un test de Stress raté.",
            "Corrosif": "Diminue de 1 le bonus de Constitution d'un équipement non-métallique adverse.",
            "Détoxifiant": "Régénération +1",
            "Exaltant": "Donne un Avantage au prochain test de Perception ou d’Intuition.",
            "Hallucinogène": "La cible subit un Désavantage à ses tests de Perception.",
            "Poison": "Perte -1 PVE.",
            "Régénérateur": "Régénère +1PVE ou +1PVI.",
            "Sédatif": "Confère l'effet Somnolence.",
            "Stimulant": "Ajout l'effet Stimulant (+1 dans les trois méridiens externe mais -1 en Domination).",
            "Tonique": "Lutte contre la fatigue, nausée, mal de mer.",
            "Antidouleur+": "Reporte les pertes de PVE à la fin une scène.",
            "Antiseptique+": "Régénère +2PVE.",
            "Antitoxine+": "Neutralise l’effet d’un Poison+",
            "Calmant+": "Annule un effet de stress mental.",
            "Corrosif+": "Diminue de 1 le bonus de Constitution d'un équipement adverse.",
            "Détoxifiant+": "Régénère +1PVE. Régénération +1",
            "Exaltant+": "Donne un Avantage à tous les tests basés sur la Savoir et la Expression.",
            "Hallucinogène+": "La cible subit un Désavantage à ses tests de Perception. La cible subit l'effet Hallucination (le MJ influence ses actions).",
            "Poison+": "Perte -1 PVE/minute.",
            "Régénérateur+": "Régénère +2PVE ou PVI.",
            "Sédatif+": "Confère l'effet Somnolence Profonde.",
            "Stimulant+": "Ajout l'effet Stimulant (+1 dans les trois méridiens externe mais -1 en Domination). Retire l'effet Somnolence.",
            "Tonique+": "Nervosité légère. Perception et Réflexe +1",
            "Antidouleur Max": "Reporte les pertes de PVE à la fin une scène. la cible devient insensible à la peur",
            "Antiseptique Max": "Régénère +3PVE, Puissance -1.",
            "Antitoxine Max": "Neutralise l’effet d’un Poison Max. Ajoute l'effet Faiblesse (Retire la défense) sur tout type de vers (slive compris).",
            "Calmant Max": "Impose l'état Somnolence à la cible.",
            "Corrosif Max": "Détruit un équipement de Qualité 1 ou inflige -2 à la Qualité d'un équipement supérieur.",
            "Détoxifiant Max": "Régénère +2PVE. Régénération et Résistance +1",
            "Exaltant Max": "Confère l'effet Surcharge Sensorielle mais donne un Avantage à tous les tests d'Arcanes.",
            "Hallucinogène Max": "La cible est plongée dans un état de transe et de visions",
            "Poison Max": "Perte -1 PVE/tour.",
            "Régénérateur Max": "Régénère +1D10 PVE ou PVI.",
            "Sédatif Max": "Confère l'effet Somnolence Profonde.",
            "Stimulant Max": "Ajoute soit : -l'effet Essouflement (-1 en Puissance et Mouvement) -l'effet Insomnie (ne peux pas faire de repos long). -l'effet Dépendance (perte de PVE)",
            "Tonique Max": "Ajoute l'effet Nerveux (-1 en Savoir et Domination)."
            },
            nameGenerator: {
                titles: {
                
                soin: ["Élixir", "Philtre", "Onguent", "Remède", "Baume", "Gouttes", "Lotion", "Sirop", "Potion", "Nectar", "Liqueur", "Collyre", "Cataplasme", "Breuvage Guérisseur"],
                poison: ["Poison", "Venin", "Toxine", "Miasme", "Peste", "Suc Noir", "Larme de Mort", "Souffle Empoisonné", "Corruption", "Nuage Nocif", "Sève Maudite", "Émanation", "Fiel", "Liqueur des Ombres", "Poudre Mortelle"],
                mental: ["Breuvage", "Essence", "Poussière", "Encens", "Paix", "Harmonie", "Aura", "Souffle", "Murmure","Rêve", "Silence", "Chuchotement", "Méditation", "Hypnose", "Éther", "Éclat Mental", "Brume Onirique"],
                destructeur: [ "Flammèche", "Acide", "Lave", "Orage", "Tempête corrosive", "Soufre","Rune de Ruine"],
                nirvana: ["Extase", "Oubli", "Fumée", "Illusion", "Vide", "Éveil", "Transcendance", "Vapeur","Nuage", "Brume", "Lumière Intérieure"],
                bonus: ["Tonic", "Boost", "Infusion", "Poudre énergisante", "Stimuli", "Concentré d'énergie", "Quintessence", "Élixir tonic","Bénédiction stimulante", "Énergie", "Flammèche"]
            },
                keywords: {
                
                
                "Antiseptique": { theme: "soin", word: ["de Pureté", "du Sang Net", "des Blessures Fermées", "de l’Asepsie", "du Renouveau"] },
                "Antitoxine": { theme: "soin", word: ["du Contre-Poison", "de l’Immunité", "des Venins Brisés", "de la Résistance", "du Corps Sain"] },
                "Calmant": { theme: "mental", word: ["du Sommeil Paisible", "de la Nuit Tranquille", "des Rêves Apaisés", "de l’Esprit Léger", "du Repos Éternel"] },
                "Corrosif": { theme: "destructeur", word: ["de la Rouille Vivante", "des Os Fondus", "du Métal Rongé", "de la Chair Dévorée", "de l’Acide Noir"] },
                "Détoxifiant": { theme: "soin", word: ["du Corps Nettoyé", "des Poisons Chassés", "de la Purge", "de la Détoxication", "de l’Équilibre Retrouvé"] },
                "Exaltant": { theme: "mental", word: ["des Songes Éthérés", "de l’Extase Pure", "de l’Euphorie", "des Idées Brillantes", "de l’Inspiration"] },
                "Régénérateur": { theme: "soin", word: ["de Régénération", "des Cellules Renouvelées", "de la Vie Retrouvée", "du Temps Inversé", "de la Jeunesse"] },
                "Tonique": { theme: "soin", word: ["de Vitalité", "de Vigueur", "du Renouveau", "de l’Énergie Inépuisable", "du Dynamisme"] },
                "Poison": { theme: "poison", word: ["du Serpent", "de la Vipère", "des Ombres", "du Scorpion", "de la Mort Lente", "du Désespoir"] },
                "Sédatif": { theme: "mental", word: ["du Sommeil Profond", "de l’Oubli Doux", "du Val Endormi", "du Repos Sans Fin", "de la Paix Absolue"] },
                "Hallucinogène": { theme: "nirvana", word: ["des Visions", "des Mirages", "de la Folie Colorée", "des Mondes voilés", "de l’Illusion Parfaite"] },
                "Stimulant": { theme: "bonus", word: ["de Célérité", "de la Course Éternelle", "des Réflexes Foudroyants", "de l’Agilité", "de l'énergie Infinie'"] },
                "Antidouleur": { theme: "bonus", word: ["du Calme Profond", "de l’Insensibilité", "de la Douleur Oubliée", "de la Sérénité", "du Soulagement"] },
                "Explosif": { theme: "destructeur", word: ["du Chaos", "de la Détonation", "des Flammes Soudaines", "de la Ruine", "de l’Anéantissement"] },
                "Paralysant": { theme: "poison", word: ["de la Pierre", "du Gel Éternel", "des Membre Raides", "de l’Immobilité", "du Temps Figé"] }
            },
                suffixes: ["basique", "de base","de réactif simple","de réactif clair","primaire","rudimentaire","basique","fondamental","rapide","pur","ordinaire","délié","éthéré","agréable","élégant","allégé", "simple"],
            quality4Suffixes: ["Ultime", "Suprême", "Parfait", "Absolu", "Divin", "du Maître Apothicaire"]
            }
        };
    }

    getData() {
        return {
            ingredients: Object.keys(this.apothecaryData.ingredients).sort()
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        // 1. Remplissage des Selects (Mode Création)
        const ingredients = Object.keys(this.apothecaryData.ingredients).sort();
        const selects = html.find('.ingredient-select');
        selects.each((i, el) => {
            let opts = '<option value="">-- Ingrédient --</option>';
            ingredients.forEach(ing => opts += `<option value="${ing}">${ing}</option>`);
            $(el).html(opts);
        });

        // 2. Prévisualisation (Mode Création)
        selects.change(ev => {
            const slot = ev.target.dataset.slot;
            const ingredientName = ev.target.value;
            const quality = html.find('#potion-quality').val();
            const preview = html.find(`#creation-view .property-preview[data-slot="${slot}"]`);
            
            if (ingredientName && this.apothecaryData.ingredients[ingredientName]) {
                const props = this.apothecaryData.ingredients[ingredientName]['q' + quality] || [];
                preview.text(`Propriétés : ${props.join(', ')}`);
            } else {
                preview.text('');
            }
        });

        // 3. Changement Qualité
        html.find('#potion-quality').change(() => selects.trigger('change'));

        // 4. Onglets
        html.find('.tab-btn').click(ev => {
            const mode = ev.currentTarget.dataset.mode;
            this.currentMode = mode;
            html.find('.tab-btn').removeClass('active');
            $(ev.currentTarget).addClass('active');
            
            html.find('.component-view').addClass('hidden');
            html.find('#result-panel').addClass('hidden');
            
            if (mode === 'creation') {
                html.find('#creation-view').removeClass('hidden');
                html.find('.avantis-apothecary').css('background-image', "url('https://avantis.world/gen/perso/IMG/creation_potion.jpg')");
            } else {
                html.find('#fusion-view').removeClass('hidden');
                html.find('.avantis-apothecary').css('background-image', "url('https://avantis.world/gen/perso/IMG/fusion_potion.jpg')");
            }
        });

        // 5. Bouton Préparer
        html.find('#generate-btn').click(ev => {
            if (this.currentMode === 'creation') this._generateCreation(html);
            else this._generateFusion(html);
        });

        // 6. Bouton Créer Item
        html.find('#create-item-btn').click(ev => this._createItemInFoundry());

        // 7. Modale
        html.find('#property-selector-cancel').click(() => html.find('#property-selector-modal').addClass('hidden'));
        html.find('#property-selector-confirm').click(() => this._finalizeMasterPotion(html));

        // 8. Bouton Reset Slot (Fusion)
        html.find('.clear-slot').click(ev => {
            const slot = ev.target.dataset.slot;
            this.loadedPotions[slot] = null;
            const zone = html.find(`.drop-zone[data-slot="${slot}"]`);
            zone.find('.placeholder').html('<i class="fas fa-flask"></i> Emplacement vide');
            zone.find('.property-preview').html('');
            $(ev.target).addClass('hidden');
        });
    }

    // =========================================================================
    // GESTION DRAG & DROP (FUSION)
    // =========================================================================
    async _onDrop(event) {
        const data = TextEditor.getDragEventData(event);
        // On vérifie qu'on a bien droppé un Item
        if (data.type !== "Item") return;

        // On récupère l'item depuis Foundry
        const item = await Item.implementation.fromDropData(data);
        
        // On vérifie que c'est une potion
        if (!item || item.type !== "potion") {
            return ui.notifications.warn("Vous devez glisser un objet de type 'Potion'.");
        }

        // On identifie la zone de drop (slot 0, 1, 2 ou 3)
        const zone = event.target.closest(".drop-zone");
        if (!zone) return;
        const slot = zone.dataset.slot;

        // On stocke les données utiles pour la fusion
        // Note : On lit 'system.proprietes' qui est un tableau d'objets {nom, desc}
        // Pour la fusion, on a juste besoin des noms des propriétés
        const propNames = (item.system.proprietes || []).map(p => p.nom);

        const potionData = {
            nom: item.name,
            qualite: item.system.qualite || 1,
            proprietes: propNames // Stocke ["Antidouleur", "Poison", etc.]
        };

        this.loadedPotions[slot] = potionData;

        // Mise à jour visuelle
        const html = $(this.element);
        const preview = html.find(`.property-preview[data-slot="${slot}"]`);
        
        html.find(`.drop-zone[data-slot="${slot}"] .placeholder`).html(`<strong>${potionData.nom}</strong>`);
        preview.html(`<small>Q${potionData.qualite} - ${propNames.join(', ')}</small>`);
        html.find(`.clear-slot[data-slot="${slot}"]`).removeClass('hidden');
    }

    // =========================================================================
    // LOGIQUE DE GÉNÉRATION
    // =========================================================================

    // --- MODE CRÉATION (Ingrédients) ---
    _generateCreation(html) {
        const quality = html.find('#potion-quality').val();
        const numProps = this.apothecaryData.qualityStats[quality].properties;
        let propertyPool = [];
        let componentsUsed = [];

        html.find('.ingredient-select').each((i, el) => {
            const val = $(el).val();
            if (val) {
                componentsUsed.push(val);
                const props = this.apothecaryData.ingredients[val]['q' + quality] || [];
                propertyPool.push(...props);
            }
        });

        if (propertyPool.length === 0) return ui.notifications.warn("Aucun ingrédient sélectionné !");

        const isMaster = html.find('#master-workshop-toggle').is(':checked');

        if (isMaster) {
            this._openPropertySelector(html, propertyPool, numProps, componentsUsed);
        } else {
            let finalProperties = [];
            let tempPool = [...new Set(propertyPool)];
            for (let i = 0; i < numProps && tempPool.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * tempPool.length);
                finalProperties.push(tempPool.splice(randomIndex, 1)[0]);
            }
            this._finalizePotion(html, finalProperties, componentsUsed, quality);
        }
    }

    // --- MODE FUSION (Potions existantes) ---
    _generateFusion(html) {
        const quality = html.find('#potion-quality').val(); // Qualité cible
        const numProps = this.apothecaryData.qualityStats[quality].properties;
        
        let propertyPool = [];
        let componentsUsed = [];
        let totalQualityInput = 0;
        let count = 0;

        // On parcourt les slots de potions chargées
        this.loadedPotions.forEach(potion => {
            if (potion) {
                propertyPool.push(...potion.proprietes);
                componentsUsed.push(potion.nom);
                totalQualityInput += potion.qualite;
                count++;
            }
        });

        if (count < 2) return ui.notifications.warn("Il faut au moins 2 potions pour une fusion.");

        // Règle : Moyenne des qualités (arrondie inf)
        const avgQuality = Math.floor(totalQualityInput / count);
        
        // Si la qualité demandée est supérieure à la moyenne des ingrédients, c'est dur !
        if (parseInt(quality) > avgQuality + 1) {
            return ui.notifications.warn(`Impossible de créer une Potion Q${quality} avec ces ingrédients (Moyenne Q${avgQuality}).`);
        }

        const isMaster = html.find('#master-workshop-toggle').is(':checked');

        if (isMaster) {
            this._openPropertySelector(html, propertyPool, numProps, componentsUsed);
        } else {
            let finalProperties = [];
            let tempPool = [...new Set(propertyPool)];
            // Logique simple : on prend au hasard
            for (let i = 0; i < numProps && tempPool.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * tempPool.length);
                finalProperties.push(tempPool.splice(randomIndex, 1)[0]);
            }
            this._finalizePotion(html, finalProperties, componentsUsed, quality);
        }
    }

    // --- ETAPES COMMUNES ---

    _openPropertySelector(html, pool, max, components) {
        const uniquePool = [...new Set(pool)];
        const list = html.find('#property-selector-list');
        list.empty();

        html.find('#property-selector-info').text(`Choisissez jusqu'à ${max} propriétés.`);
        
        uniquePool.forEach(p => {
            list.append(`<div class="property-choice"><input type="checkbox" value="${p}"><label>${p}</label></div>`);
        });

        list.find('input').change(ev => {
            if (list.find('input:checked').length > max) {
                ev.currentTarget.checked = false;
                ui.notifications.warn(`Maximum ${max} propriétés !`);
            }
        });

        this.tempComponents = components;
        html.find('#property-selector-modal').removeClass('hidden');
    }

    _finalizeMasterPotion(html) {
        const selected = [];
        html.find('#property-selector-list input:checked').each((i, el) => selected.push($(el).val()));
        const quality = html.find('#potion-quality').val();
        this._finalizePotion(html, selected, this.tempComponents, quality);
    }

    _finalizePotion(html, properties, components, quality) {
        const info = this.apothecaryData.qualityStats[quality];
        const name = this._generateName(properties, quality);

        const finalData = {
            nom: name,
            qualite: parseInt(quality),
            concentration: info.concentration,
            duree: info.duration,
            // On transforme les strings en objets pour le système Foundry
            proprietes: properties.map(p => ({ 
                nom: p, 
                desc: this.apothecaryData.properties[p] || "Effet mystérieux..." 
            })),
            composants: components
        };

        this.currentPotionData = finalData;
        this._updateResultView(html, finalData);
        html.find('#property-selector-modal').addClass('hidden');
    }

    _updateResultView(html, data) {
        html.find('#potion-name').text(data.nom);
        html.find('#potion-quality-display').text(`Qualité ${data.qualite}`);
        html.find('#potion-concentration-display').text(data.concentration);
        html.find('#potion-duration-display').text(data.duree);

        let propsHtml = "";
        data.proprietes.forEach(p => {
            propsHtml += `<div style="margin-bottom:5px;"><strong>${p.nom}:</strong> ${p.desc}</div>`;
        });
        html.find('#potion-properties').html(propsHtml);
        
        html.find('#result-panel').removeClass('hidden');
    }

    _generateName(properties, quality) {
        if (!properties.length) return "Infusion Ratée";
        const mainProp = properties[0].replace(/(\+|Max)$/, '').trim();
        const keywords = this.apothecaryData.nameGenerator.keywords[mainProp];
        
        let title = "Potion";
        let suffix = "étrange";

        if (keywords) {
            const titles = this.apothecaryData.nameGenerator.titles[keywords.theme];
            if (titles) title = titles[Math.floor(Math.random() * titles.length)];
            
            if (keywords.word) suffix = keywords.word[Math.floor(Math.random() * keywords.word.length)];
        }

        return `${title} ${suffix} (Q${quality})`;
    }

    // --- CRÉATION DE L'OBJET FOUNDRY (TYPE POTION) ---
    async _createItemInFoundry() {
        if (!this.currentPotionData.nom) return;

        const data = this.currentPotionData;
        
        // Description HTML pour l'affichage fiche
        let description = `<p><strong>Qualité :</strong> ${data.qualite} | <strong>Durée :</strong> ${data.duree}</p>`;
        description += `<ul>`;
        data.proprietes.forEach(p => {
            description += `<li><strong>${p.nom} :</strong> ${p.desc}</li>`;
        });
        description += `</ul>`;
        description += `<p style="font-size:0.8em; color:#666;"><em>Ingrédients : ${data.composants.join(', ')}</em></p>`;

        // Création de l'Item avec le type "potion"
        await Item.create({
            name: data.nom,
            type: "potion", // Utilisation du nouveau type défini dans template.json
            img: "icons/consumables/potions/potion-bottle-corked-blue.webp",
            system: {
                description: description,
                qualite: data.qualite,
                concentration: data.concentration,
                duree: data.duree,
                proprietes: data.proprietes, // Tableau d'objets
                composants: data.composants,
                prix: data.qualite * 150,
                quantite: 1,
                poids: 0.1
            }
        }, {renderSheet: true});

        ui.notifications.info(`La potion "${data.nom}" a été créée !`);
    }
}