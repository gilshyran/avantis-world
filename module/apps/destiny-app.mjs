export class AvantisDestiny extends Application {

    constructor(options) {
        super(options);
        this.currentResult = {};
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "avantis-destiny",
            title: "Navigateur de Destinée",
            template: "systems/avantis/templates/apps/destiny-explorer.html",
            width: 800,
            height: 700,
            resizable: true,
            classes: ["avantis-destiny-window"]
        });
    }

    // --- LES TABLES DE DESTINÉE ---
    get tables() {
        return {
            d4: { // Activité
                1: "Exploration (Recherche active)",
                2: "Rencontre (PNJ, Créature, Groupe)",
                3: "Obstacle (Bloque la progression)",
                4: "Conflit (Combat, Dispute, Dilemme)"
            },
            d6: { // Météo / Ambiance
                1: "Clair et ensoleillé",
                2: "Brouillard épais",
                3: "Pluie, Tempête, Orage",
                4: "Chaleur accablante ou Froid extrême",
                5: "Nuit noire",
                6: "Calme pesant"
            },
            d8: { // Complication / Ressource
                1: "Terrain Instable (Effondrement, glissement)",
                2: "Faune Hostile (Rôdeurs)",
                3: "Végétation particulière (Utile ou Dangereuse)",
                4: "Vestiges Technologiques (Avant)",
                5: "Vrill Intense (Perturbation magique)",
                6: "Route Bloquée (Nécessite solution créative)",
                7: "Ressource naturelle abondante",
                8: "Toxines ou Polluants (Danger immédiat)"
            },
            d10: { // Lieu
                1: "Campement, tour, construction récente",
                2: "Ruines anciennes, Temple caché",
                3: "Chute d'eau, source ou rivière",
                4: "Marécage, sable mouvant, enlisement",
                5: "Ravin, cratère",
                6: "Grottes profondes, labyrinthe naturel",
                7: "Pont ou passage étroit",
                8: "Clairière, zone exposée",
                9: "Trace de vie (habitation isolée, caravane)",
                10: "Formation rocheuse étrange"
            },
            d12: { // Événement
                1: "Danger imminent (Piège, Attaque)",
                2: "Découverte (Objet, Indice, Artefact)",
                3: "Trahison (Allié ou PNJ suspect)",
                4: "Rencontre amicale (Aide)",
                5: "Piège (Naturel ou Fabriqué)",
                6: "Mystère (Énigme, Phénomène)",
                7: "Complication (Lieu étrange, Embuscade)",
                8: "Repos forcé (Blessures, Fatigue)",
                9: "Indice caché (Secret, Message)",
                10: "Sauvetage (Personne en danger)",
                11: "Guerre des Factions (Pris entre deux feux)",
                12: "Renfort inespéré (Allié surprise)"
            },
            d20: { // Motivation / Verbe
                1: "Chercher", 2: "Fuir", 3: "Aider", 4: "Détruire", 5: "Découvrir",
                6: "Protéger", 7: "Capturer", 8: "Éviter", 9: "Parler", 10: "Observer",
                11: "Voler", 12: "Construire", 13: "Poursuivre", 14: "Piéger", 15: "Explorer",
                16: "Soigner", 17: "Esquiver", 18: "Réparer", 19: "Tendre une embuscade", 20: "Négocier"
            }
        };
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('#roll-destiny-btn').click(ev => this._rollDestiny(html));
        html.find('#share-chat-btn').click(ev => this._shareChat());
    }

    async _rollDestiny(html) {
        // Lancer les dés (On utilise la classe Roll de Foundry pour le bruit et l'aléatoire)
        // On fait un seul Roll groupé : "1d4 + 1d6 + 1d8 + 1d10 + 1d12 + 1d20"
        const roll = new Roll("1d4 + 1d6 + 1d8 + 1d10 + 1d12 + 1d20");
        await roll.evaluate();

        // Récupération des résultats individuels (terms[0] = 1d4, terms[2] = 1d6, etc. car terms[1] est un "+")
        // Une méthode plus sûre est de parcourir les termes de type Die
        const diceResults = roll.dice.map(d => ({ faces: d.faces, result: d.total }));

        // Mapping des résultats
        const r4 = diceResults.find(d => d.faces === 4).result;
        const r6 = diceResults.find(d => d.faces === 6).result;
        const r8 = diceResults.find(d => d.faces === 8).result;
        const r10 = diceResults.find(d => d.faces === 10).result;
        const r12 = diceResults.find(d => d.faces === 12).result;
        const r20 = diceResults.find(d => d.faces === 20).result;

        const data = this.tables;
        
        const res = {
            biome: html.find('#biome-select').val(),
            act: data.d4[r4],
            amb: data.d6[r6],
            comp: data.d8[r8],
            loc: data.d10[r10],
            evt: data.d12[r12],
            mot: data.d20[r20],
            dice: { r4, r6, r8, r10, r12, r20 }
        };

        this.currentResult = res;

        // Mise à jour UI
        html.find('#res-d4').text(`${r4} - ${res.act}`);
        html.find('#res-d6').text(`${r6} - ${res.amb}`);
        html.find('#res-d8').text(`${r8} - ${res.comp}`);
        html.find('#res-d10').text(`${r10} - ${res.loc}`);
        html.find('#res-d12').text(`${r12} - ${res.evt}`);
        html.find('#res-d20').text(`${r20} - ${res.mot}`);

        // Synthèse narrative
        const summary = `En explorant le biome <strong>${res.biome}</strong>, le groupe est occupé à <strong>${res.act}</strong>. 
        L'ambiance est <strong>${res.amb}</strong>. 
        Ils arrivent près de : <strong>${res.loc}</strong>. 
        Soudain, une complication surgit : <strong>${res.comp}</strong>, suivie d'un événement : <strong>${res.evt}</strong>. 
        Le mot d'ordre de la scène semble être : <strong>${res.mot}</strong>.`;

        html.find('#synthesis-text').html(summary);
        html.find('#results-section').removeClass('hidden');
    }

    _shareChat() {
        if (!this.currentResult.biome) return;
        const r = this.currentResult;

        const content = `
            <div class="avantis-roll">
                <h3 style="color:#9b59b6; border-bottom:2px solid #9b59b6;">🔮 Destinée : ${r.biome}</h3>
                <ul style="list-style:none; padding:0; font-size:0.9em;">
                    <li><strong>Activité (d4):</strong> ${r.act}</li>
                    <li><strong>Ambiance (d6):</strong> ${r.amb}</li>
                    <li><strong>Ressource (d8):</strong> ${r.comp}</li>
                    <li><strong>Lieu (d10):</strong> ${r.loc}</li>
                    <li><strong>Événement (d12):</strong> ${r.evt}</li>
                    <li><strong>Motivation (d20):</strong> ${r.mot}</li>
                </ul>
                <div style="margin-top:10px; font-style:italic; border-top:1px solid #ccc; padding-top:5px;">
                    "${r.mot} dans ${r.loc}..."
                </div>
            </div>
        `;

        ChatMessage.create({
            user: game.user.id,
            content: content,
            speaker: { alias: "Le Destin" }
        });
    }
}