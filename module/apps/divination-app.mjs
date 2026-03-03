export class AvantisDivination extends Application {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "avantis-divination",
            title: "Le Voile du Destin",
            template: "systems/avantis/templates/apps/divination.html",
            width: 600,
            height: 500,
            resizable: true,
            classes: ["avantis-divination"],
            // --- AJOUT IMPORTANT POUR LES ONGLETS ---
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".content", initial: "vision" }]
        });
    }

    get tarotData() {
        return [
            { id: 1, name: "Le Voyageur", desc: "Changement, exploration, départ. Quête de nouvelles expériences." },
            { id: 2, name: "Le Sage", desc: "Sagesse intérieure, enseignement, patience. Solution dans la réflexion." },
            { id: 3, name: "L’Ombre", desc: "Peur, tromperie, tentation. Menace cachée ou épreuve morale." },
            { id: 4, name: "L'Arbre de Vie", desc: "Harmonie, renouveau, croissance. Guérison ou évolution." },
            { id: 5, name: "Le Soleil", desc: "Clarté, succès, illumination. Une force majeure éclaire le chemin." },
            { id: 6, name: "Le Jugement", desc: "Décision, rédemption, choix décisif. Le moment de vérité approche." },
            { id: 7, name: "Le Temple Ancien", desc: "Tradition, héritage, mystère. Une ancienne vérité refait surface." },
            { id: 8, name: "La Tempête", desc: "Chaos, conflit, agitation. Une situation va déraper." },
            { id: 9, name: "L'Équilibre", desc: "Paix intérieure, équilibre des forces. Chemin de modération." },
            { id: 10, name: "Les Ténèbres", desc: "Dangers inconnus, mystère. Affronter ses peurs et l'inconnu." },
            { id: 11, name: "La Flamme", desc: "Inspiration, énergie, motivation. Une nouvelle passion." },
            { id: 12, name: "La Lune", desc: "Intuition, mystère, rêves. Forces cachées et subtiles." },
            { id: 13, name: "L’Ancien", desc: "Tradition, conseils avisés, mentorat. Savoir ancestral." },
            { id: 14, name: "Le Guerrier", desc: "Force, courage, résilience. Un combat approche." },
            { id: 15, name: "Le Passeur", desc: "Transition, passage d’un état à un autre. Transformation." },
            { id: 16, name: "Le Vortex", desc: "Désorientation, tourment intérieur, confusion. Période de doute." },
            { id: 17, name: "Le Temps", desc: "Passage du temps, patience, évolution. Événement inéluctable." },
            { id: 18, name: "L’Oiseau", desc: "Liberté, voyage, indépendance. Nouvelles perspectives." },
            { id: 19, name: "L'Oracle", desc: "Prophétie, vision, message caché. Un signe éclaire le futur." },
            { id: 20, name: "La Porte", desc: "Opportunité, nouvelle voie, choix important. Un chemin inédit." }
        ];
    }

    getData() {
        return {
            actor: this.options.actor || null
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        // --- ONGLET VISION ---
        html.find('#roll-vision-btn').click(async () => {
            const actor = this.options.actor;
            if (!actor) return ui.notifications.warn("Veuillez sélectionner un acteur avant d'ouvrir la Divination.");

            // Calcul du score : Expression + Intuition
            // Sécurité : On vérifie que les chemins existent
            const expression = actor.system.meridiens?.expression?.value || 0;
            const intuition = actor.system.aptitudes?.intuition?.value || 0;
            const pool = expression + intuition;
            
            // Lancer de dé
            const roll = await new Roll(`1d10`).evaluate();
            const dieResult = roll.total;
            
            let message = "";
            let cssClass = "";

            if (dieResult === 10) {
                message = "💀 MALADRESSE ! Le destin se retourne contre vous. La vision ne se réalisera jamais et vous attirez l'attention du Voile (Test de Stress immédiat).";
                cssClass = "critical-failure";
            } else if (dieResult <= pool) {
                const margin = pool - dieResult;
                message = `✨ SUCCÈS (Marge : ${margin}). Le destin est scellé. L'événement se produira.`;
                cssClass = "success";
            } else {
                message = "❌ ÉCHEC. Cette voie est fermée. L'événement ne pourra jamais se produire de cette façon.";
                cssClass = "failure";
            }

            // Affichage du résultat dans la fenêtre
            const resultBox = html.find('#vision-result');
            resultBox.removeClass('hidden').html(`<div class="${cssClass}" style="padding:10px; border-radius:5px;"><strong>Résultat du dé : ${dieResult} (Score : ${pool})</strong><p>${message}</p></div>`);
            
            // Envoi dans le chat
            ChatMessage.create({
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                content: `<h3>Tentative de Vision</h3>${resultBox.html()}`
            });
        });

        // --- ONGLET CARTOMANCIE ---
        html.find('#draw-cards-btn').click(() => {
            const deck = this.tarotData;
            // Tirage de 2 cartes distinctes
            const idx1 = Math.floor(Math.random() * deck.length);
            let idx2 = Math.floor(Math.random() * deck.length);
            while(idx1 === idx2) { idx2 = Math.floor(Math.random() * deck.length); } // Éviter doublon

            const card1 = deck[idx1];
            const card2 = deck[idx2];

            const renderCard = (c) => `
                <div class="tarot-card">
                    <div class="card-number">${c.id}</div>
                    <div class="card-name">${c.name}</div>
                    <div class="card-desc">${c.desc}</div>
                </div>
            `;

            html.find('#tarot-display').html(renderCard(card1) + renderCard(card2));
            html.find('#tarot-instruction').removeClass('hidden');

            // Envoi dans le chat
            ChatMessage.create({
                content: `<h3>Tirage du Tarot d'Avantis</h3>
                          <div style="display:flex; justify-content:space-around;">
                              <div><strong>${card1.name}</strong><br><em>${card1.desc}</em></div>
                              <div><strong>${card2.name}</strong><br><em>${card2.desc}</em></div>
                          </div>
                          <p style="margin-top:10px;"><em>Interprétez les échos du destin...</em></p>`
            });
        });
    }
}