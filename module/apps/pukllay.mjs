export class PukllayArbiter {

    static COLORS = {
        soleil: "#e4d68a",   
        tenebres: "#987bad", 
        neutre: "#FFFFFF"
    };

    static OFFSETS = {
        n:  {x: 0,  y: -1}, ne: {x: 1,  y: -1}, e:  {x: 1,  y: 0}, se: {x: 1,  y: 1},
        s:  {x: 0,  y: 1}, so: {x: -1, y: 1}, o:  {x: -1, y: 0}, no: {x: -1, y: -1}
    };

    /**
     * Initialisation
     */
    static async onTokenCreated(tokenDoc) {
        const flags = tokenDoc.flags?.avantis?.pukllay;
        if (!flags) return;

        const comboActive = game.settings.get("avantis", "pukllayCombo");
        const modeText = comboActive 
            ? `<span style="color:#d35400; font-weight:bold;">🔥 Mode COMBO Actif</span>` 
            : `<span style="color:#27ae60;">🍃 Mode Standard</span>`;

        const faction = await new Promise(resolve => {
            new Dialog({
                title: "Pukllay",
                content: `<div style="text-align:center;">
                            <h3>${tokenDoc.name}</h3>
                            <p>Pour qui jouez-vous ?</p>
                            <p style="font-size:0.8em; margin-top:5px; border-top:1px solid #ccc; padding-top:5px;">Règle : ${modeText}</p>
                          </div>`,
                buttons: {
                    soleil: { label: `☀️ Le Soleil`, callback: () => resolve("soleil") },
                    tenebres: { label: `🌑 Les Ténèbres`, callback: () => resolve("tenebres") }
                },
                default: "soleil",
                close: () => resolve(null)
            }).render(true);
        });

        if (!faction) return;

        await tokenDoc.update({
            "texture.tint": this.COLORS[faction],
            "flags.avantis.pukllay.couleur": faction
        });

        setTimeout(() => {
            this.resolveCombat(tokenDoc, faction);
        }, 200);
    }

    /**
     * Moteur de Combat
     */
    static async resolveCombat(attackerDoc, attackerFaction) {
        const attackerData = attackerDoc.flags.avantis.pukllay;
        const gridSize = canvas.grid.size; 
        const capturedTokens = []; 
        let attackerIsDestroyed = false; 

        // =========================================================
        // PHASE 0 : EFFETS IMMÉDIATS (Destruction / Conversion)
        // =========================================================

        // --- POUVOIR ACTIF : DÉMOLISSEUR (D) ---
        if (attackerData.pouvoirs?.actif?.toLowerCase().includes("démolisseur")) {
            const destroyed = [];
            
            for (const t of canvas.tokens.placeables) {
                if (t.id === attackerDoc.id) continue; 
                const sameRow = Math.abs(t.y - attackerDoc.y) < 5;
                const sameCol = Math.abs(t.x - attackerDoc.x) < 5;

                if (sameRow || sameCol) {
                    destroyed.push(t.id);
                }
            }

            if (destroyed.length > 0) {
                await canvas.scene.deleteEmbeddedDocuments("Token", destroyed);
                
                // EFFET VISUEL & SONORE
                this.showSplashText("💣 DÉMOLISSEUR", "#7f8c8d");
                this.playSound("explosion");

                ChatMessage.create({
                    speaker: { alias: attackerDoc.name },
                    content: `<div style="background:#2c3e50; border:1px solid #000; padding:5px; border-radius:5px; color:#ecf0f1;"><strong>💣 DÉMOLISSEUR</strong><br>Destruction de ${destroyed.length} jeton(s) sur la ligne !</div>`
                });
            }
        }

        // --- POUVOIR ACTIF : ALPHA (A) ---
        if (attackerData.pouvoirs?.actif?.toLowerCase().includes("alpha")) {
            const myFamily = attackerData.famille;
            if (myFamily) {
                const alphaUpdates = [];
                for (const offset of Object.values(this.OFFSETS)) {
                    const tX = attackerDoc.x + (offset.x * gridSize);
                    const tY = attackerDoc.y + (offset.y * gridSize);
                    const neighbor = canvas.tokens.placeables.find(t => Math.abs(t.x - tX) < 5 && Math.abs(t.y - tY) < 5);
                    
                    if (neighbor) {
                        const nFlags = neighbor.document.flags?.avantis?.pukllay;
                        if (nFlags && nFlags.famille === myFamily && nFlags.couleur !== attackerFaction) {
                            alphaUpdates.push({
                                _id: neighbor.id,
                                "texture.tint": this.COLORS[attackerFaction],
                                "flags.avantis.pukllay.couleur": attackerFaction
                            });
                        }
                    }
                }
                if (alphaUpdates.length > 0) {
                    await canvas.scene.updateEmbeddedDocuments("Token", alphaUpdates);
                    
                    // EFFET VISUEL & SONORE
                    this.showSplashText("🐺 ALPHA", "#d35400");
                    this.playSound("alpha");

                    ChatMessage.create({
                        speaker: { alias: attackerDoc.name },
                        content: `<div style="background:#fff3e0; border:1px solid #e67e22; padding:5px; border-radius:5px; color:#d35400;"><strong>🐺 ALPHA</strong><br>Ralliement de ${alphaUpdates.length} ${myFamily}(s) !</div>`
                    });
                }
            }
        }

        // =========================================================
        // PHASE 1 : CALCUL DES BONUS (Attaque & Défense)
        // =========================================================

        // --- POUVOIR ACTIF : RENFORT (R) ---
        let bonusAtk = 0;
        if (attackerData.pouvoirs?.actif?.toLowerCase().includes("renfort")) {
            const alliesCount = this.countNeighbors(attackerDoc, attackerFaction, false); 
            if (alliesCount > 0) {
                bonusAtk += alliesCount;
                
                // EFFET VISUEL & SONORE
                this.showSplashText("🦾 RENFORT", "#2980b9");
                this.playSound("buff");

                ChatMessage.create({
                    speaker: { alias: attackerDoc.name },
                    content: `<div style="background:#e3f2fd; border:1px solid #2196f3; padding:5px; border-radius:5px; color:#0d47a1;"><strong>🦾 RENFORT</strong><br>+${alliesCount} Force</div>`
                });
            }
        }

        // --- POUVOIR PASSIF : SOUTIEN (S) ---
        const supportAtk = this.countNeighbors(attackerDoc, attackerFaction, true); 
        if (supportAtk > 0) {
            bonusAtk += supportAtk;
            // On ne met pas de gros effet visuel ici pour ne pas spammer, juste log
            console.log(`PUKLLAY | ${attackerDoc.name} reçoit du SOUTIEN (+${supportAtk})`);
        }

        // =========================================================
        // PHASE 2 : COMBAT DIRECTIONNEL
        // =========================================================
        
        for (const [dir, offset] of Object.entries(this.OFFSETS)) {
            if (!attackerData.directions[dir]) continue; 

            const targetX = attackerDoc.x + (offset.x * gridSize);
            const targetY = attackerDoc.y + (offset.y * gridSize);

            const targetTokenObj = canvas.tokens.placeables.find(t => 
                Math.abs(t.x - targetX) < 5 && Math.abs(t.y - targetY) < 5 && t.id !== attackerDoc.id
            );

            if (!targetTokenObj) continue; 
            const targetDoc = targetTokenObj.document;
            const targetFlags = targetDoc.flags?.avantis?.pukllay;
            
            if (!targetFlags || targetFlags.couleur === "neutre" || targetFlags.couleur === attackerFaction) continue; 

            // --- CALCULS ---
            let defForce = parseInt(targetFlags.force) || 0;

            // Pouvoir Passif : CARAPACE (C)
            if (targetFlags.pouvoirs?.passif?.toLowerCase().includes("carapace")) {
                defForce += 2;
                
                // EFFET VISUEL (Plus petit ou rapide)
                this.showSplashText("🛡️ CARAPACE", "#27ae60", true); 
                this.playSound("shield");

                ChatMessage.create({speaker: {alias:targetDoc.name}, content: `<div style="background:#e8f5e9; border:1px solid #4caf50; padding:5px; border-radius:5px; color:#1b5e20;"><strong>🛡️ CARAPACE</strong><br>+2 Défense</div>`});
            }

            // Pouvoir Passif : SOUTIEN (S)
            const supportDef = this.countNeighbors(targetDoc, targetFlags.couleur, true);
            if (supportDef > 0) {
                defForce += supportDef;
            }

            // Pouvoir Passif : IMMUABLE (I)
            if (targetFlags.pouvoirs?.passif?.toLowerCase().includes("immuable")) {
                 // EFFET VISUEL
                this.showSplashText("🗿 IMMUABLE", "#95a5a6");
                this.playSound("metal");

                ChatMessage.create({
                    speaker: { alias: targetDoc.name },
                    content: `<div style="background:#7f8c8d; border:1px solid #34495e; padding:5px; border-radius:5px; color:#fff;"><strong>🗿 IMMUABLE</strong><br>L'attaque rebondit !</div>`
                });
                continue; 
            }

            // --- CALCUL FINAL ---
            let finalAtkForce = (parseInt(attackerData.force) || 0) + bonusAtk;

            // Pouvoir Actif : VENGEUR (V)
            const rawTargetForce = parseInt(targetFlags.force) || 0;
            if (attackerData.pouvoirs?.actif?.toLowerCase().includes("vengeur") && rawTargetForce >= 9) {
                finalAtkForce = 999; 
                
                // EFFET VISUEL
                this.showSplashText("🗡️ VENGEUR", "#c0392b");
                this.playSound("crit");

                ChatMessage.create({speaker: {alias:attackerDoc.name}, content: `<div style="background:#c0392b; border:1px solid #922b21; padding:5px; border-radius:5px; color:#fff;"><strong>🗡️ VENGEUR</strong><br>Assassinat de géant !</div>`});
            }

            console.log(`PUKLLAY | ${attackerDoc.name}(${finalAtkForce}) vs ${targetDoc.name}(${defForce})`);

            if (finalAtkForce > defForce) {
                capturedTokens.push(targetDoc);

                // Pouvoir Passif : TOXIQUE (T)
                if (targetFlags.pouvoirs?.passif?.toLowerCase().includes("toxique")) {
                    attackerIsDestroyed = true;
                    
                    // EFFET VISUEL
                    this.showSplashText("☠️ TOXIQUE", "#8e44ad");
                    this.playSound("poison");

                    ChatMessage.create({
                        speaker: { alias: targetDoc.name },
                        content: `<div style="background:#f3e5f5; border:1px solid #8e44ad; padding:5px; border-radius:5px; color:#4a235a;"><strong>☠️ TOXIQUE</strong><br>${targetDoc.name} empoisonne ${attackerDoc.name} !</div>`
                    });
                }
            }
        }

        // =========================================================
        // PHASE 3 : APPLICATION
        // =========================================================
        if (capturedTokens.length > 0) {
            const updates = capturedTokens.map(t => ({
                _id: t.id,
                "texture.tint": this.COLORS[attackerFaction],
                "flags.avantis.pukllay.couleur": attackerFaction
            }));

            await canvas.scene.updateEmbeddedDocuments("Token", updates);
            
            // SON DE CAPTURE GÉNÉRIQUE
            this.playSound("capture");
            
            ui.notifications.info(`⚔️ ${attackerDoc.name} capture ${capturedTokens.length} jeton(s).`);

            if (attackerIsDestroyed) {
                setTimeout(async () => {
                    await attackerDoc.delete();
                }, 600);
            }

            const comboActive = game.settings.get("avantis", "pukllayCombo");
            if (comboActive) {
                for (const victimDoc of capturedTokens) {
                    setTimeout(() => {
                        const freshDoc = canvas.tokens.get(victimDoc.id)?.document; 
                        if (freshDoc) this.resolveCombat(freshDoc, attackerFaction);
                    }, 500);
                }
            }
        }
    }

    /**
     * Helper : Compte les voisins alliés
     */
    static countNeighbors(centerDoc, factionColor, requireSupportTrait) {
        let count = 0;
        const gridSize = canvas.grid.size;
        
        for (const offset of Object.values(this.OFFSETS)) {
            const tX = centerDoc.x + (offset.x * gridSize);
            const tY = centerDoc.y + (offset.y * gridSize);
            const neighbor = canvas.tokens.placeables.find(t => Math.abs(t.x - tX) < 5 && Math.abs(t.y - tY) < 5);
            
            if (neighbor) {
                const nFlags = neighbor.document.flags?.avantis?.pukllay;
                if (nFlags && nFlags.couleur === factionColor) {
                    if (requireSupportTrait) {
                        if (nFlags.pouvoirs?.passif?.toLowerCase().includes("soutien")) count++;
                    } else {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    // =========================================================
    // NOUVELLES FONCTIONS : AUDIO & VISUEL
    // =========================================================

    /**
     * Affiche un texte au centre de l'écran qui disparaît
     */
    static showSplashText(text, color, isSmall = false) {
        const id = "pukllay-splash-" + Date.now();
        const fontSize = isSmall ? "3em" : "5em";
        
        const splash = $(`
            <div id="${id}" style="
                position: fixed;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%) scale(0.5);
                font-family: 'Modesto Condensed', serif;
                font-size: ${fontSize};
                font-weight: bold;
                color: ${color};
                text-shadow: 0 0 10px black, 0 0 20px black;
                pointer-events: none;
                z-index: 10000;
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            ">
            ${text}
            </div>
        `);

        $('body').append(splash);

        setTimeout(() => {
            $(`#${id}`).css({
                opacity: 1,
                transform: "translate(-50%, -50%) scale(1)"
            });
        }, 50);

        setTimeout(() => {
            $(`#${id}`).css({
                opacity: 0,
                transform: "translate(-50%, -50%) scale(1.5)"
            });
        }, 1200);

        setTimeout(() => {
            $(`#${id}`).remove();
        }, 1500);
    }

    /**
     * Joue un son
     */
    static playSound(type) {
        const basePath = "systems/avantis/sounds/pukllay/"; 
        let file = "";
        
        switch(type) {
            case "explosion": file = "demolition.mp3"; break;
            case "alpha":     file = "howl.mp3"; break;
            case "buff":      file = "buff.wav"; break;
            case "shield":    file = "clank.wav"; break;
            case "poison":    file = "liquid.wav"; break;
            case "crit":      file = "critical.wav"; break;
            case "metal":     file = "immovable.wav"; break;
            case "capture":   file = "flip.wav"; break;
            default: return;
        }
        
        AudioHelper.play({src: basePath + file, volume: 0.8, autoplay: true, loop: false}, false);
    }
}