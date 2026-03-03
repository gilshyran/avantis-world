export class AvantisArmorSmith extends Application {

    constructor(options) {
        super(options);
        this.currentArmorData = {};
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "avantis-armor-smith",
            title: "Façonneur de Protections",
            template: "systems/avantis/templates/apps/armor-generator.html",
            width: 800,
            height: 700,
            resizable: true,
            classes: ["avantis-armor-smith-window"]
        });
    }

    // --- DATA ---
    get armorData() {
        return {
            names: {
                tete: ["Casque", "Heaume", "Capuche", "Diadème", "Couronne", "Masque"],
                torse: ["Plastron", "Tunique", "Manteau", "Veste", "Cuirasse"],
                bras: ["Gantelets", "Protège-bras", "Brassards", "Gants"],
                jambes: ["Jambières", "Bottes", "Grèves", "Sandales", "Chausses"],
                integral: ["Tenue", "Robe", "Ensemble", "Combinaison", "Harnois"]
            },
            adjectives: {
                q1: ["simple", "de cuir", "renforcé", "de soldat"],
                q2: ["de qualité", "d'acier", "élégant", "robuste"],
                q3: ["orné", "de maître", "supérieur", "runique"],
                q4: ["divin", "ancestral", "du Héros", "éternel"]
            },
            // Collections pour les Sets
            collections: [
                { name: "de la Convergence noire", bonus: "Set (3) : Shura +1" },
                { name: "des Rivières Tressées", bonus: "Set (1) : Confortable, Set (2) : Résistance aux Intempéries" },
                { name: "du Serpent de Cuivre", bonus: "Set (1) : Survie +1, Set (2) : Vigueur +1" },
                { name: "de l’Aube Dorée", bonus: "Set (2) : Magnétisme +1" },
                { name: "de la Lune Obscure", bonus: "Set (1) : Commandement +1, Set (2) : Coordination +1" },
                { name: "de l’Aigle de Nuit", bonus: "Set (1) : Finesse +1, Set (3) : Portée +60, Set (4) : Réflexe +1" },
                { name: "des Trois Lunes", bonus: "Set (1) : Érudition +1, Set (3) : Savoir +1" },
                { name: "de la Cité du Crépuscule", bonus: "Set (2) : Persuasion +1" },
                { name: "de Brise-Peste", bonus: "Set (2) : Force +1, Set (4) : Intimidation +1, Set (6) : Puissance +2" },
                { name: "du Puma des Cimes", bonus: "Set (2) : VIgueur +1, Set (4) : Force +1" },
                { name: "de la Main Sépulcrale", bonus: "Set (1) : Intimidation +1, Set (2) : Force +1" },
                { name: "de l'Escrimeur élégant", bonus: "Set (2) : Finesse +1, Set (4) : Réflexe +1" },
                { name: "de la Sentinelle", bonus: "Set (2) : Constitution +1, Set (4) : Vigueur +1" }
            ],
            // Bonus pour Tenue de Maître (Intégral)
            masterBonuses: [
                "Coordination +1", "Technique +1", "Vigueur +1", "Robustesse +1", 
                "Commandement +1", "Réflexe +1", "Concentration +1", "Volonté +1", "Persuasion +1"
            ],
            properties: {
                "Confortable": "Permet de dormir avec sans malus.",
                "Résistance aux Intempéries": "Protège du froid et de la pluie.",
                "Encombrant": "Donne un Désavantage aux tests de Mouvement.",
                "Indestructible": "Ne peut pas être détruit par des moyens conventionnels.",
                "Adaptable": "S'ajuste à la taille du porteur.",
                "Dissimulé": "Peut être porté sous des vêtements civils.",
                "Chasse +1": "Possède un emplacement de Pierre de Vrill.",
                "Vigueur +1": "Augmente la défense Parer.",
                "Réflexe +1": "Augmente la défense Esquive.",
                "Robustesse +1": "Augmente la défense Encaisser."
            },
            basePrices: { tete: 150, torse: 250, bras: 120, jambes: 130, integral: 400 },
            qualityMult: { q1: 1, q2: 2.5, q3: 6, q4: 15, legendary: 50 }
        };
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('#generate-btn').click(ev => this._generate(html));
        html.find('#create-item-btn').click(ev => this._createItemInFoundry(html));
    }

    _generate(html) {
        const slot = html.find('#armor-slot').val();
        const quality = html.find('#armor-quality').val();
        const data = this.armorData;

        // 1. Déterminer le nombre de propriétés
        let numProps = (quality === 'legendary') ? 4 : parseInt(quality.replace('q', ''), 10);
        if (numProps < 1) numProps = 1;

        let finalProps = [];
        let isSet = false;
        let setInfo = null;
        let baseName = data.names[slot][Math.floor(Math.random() * data.names[slot].length)];
        let finalName = "";

        // 2. Logique Spécifique (Intégral vs Autres)
        if (slot === 'integral') {
            // Règle : Toujours "Tenue de maître" si Q2+
            if (numProps >= 2 || quality === 'legendary') {
                const bonus = data.masterBonuses[Math.floor(Math.random() * data.masterBonuses.length)];
                finalProps.push({ 
                    name: "Tenue de maître", 
                    desc: `Remplace toutes les autres protections. Bonus : ${bonus}` 
                });
                numProps--; // Ça consomme un slot de propriété
            }
            // Intégral n'a JAMAIS de Set
        } else {
            // Les autres peuvent être un Set (25% de chance par défaut, ou plus si haute qualité)
            if (Math.random() < 0.3) {
                isSet = true;
                setInfo = data.collections[Math.floor(Math.random() * data.collections.length)];
                finalProps.push({
                    name: "Set (Collection)",
                    desc: `Fait partie de la collection <strong>${setInfo.name}</strong>.<br>Bonus : ${setInfo.bonus}`
                });
                numProps--;
            }
        }

        // 3. Remplissage avec des propriétés aléatoires
        const availableProps = Object.keys(data.properties);
        for(let i=0; i < numProps; i++) {
            const pName = availableProps[Math.floor(Math.random() * availableProps.length)];
            // On évite les doublons
            if (!finalProps.find(fp => fp.name === pName)) {
                finalProps.push({ name: pName, desc: data.properties[pName] });
            }
        }

        // 4. Nommage
        if (isSet) {
            finalName = `${baseName} ${setInfo.name}`;
        } else {
            const adjList = data.adjectives[quality === 'legendary' ? 'q4' : quality];
            const adj = adjList[Math.floor(Math.random() * adjList.length)];
            finalName = `${baseName} ${adj}`;
        }

        // 5. Prix
        const basePrice = data.basePrices[slot];
        const mult = data.qualityMult[quality];
        const price = Math.floor(basePrice * mult);

        // 6. Mise à jour Interface
        this.currentArmorData = { name: finalName, slot, quality, price, props: finalProps };
        
        html.find('#armor-name').val(finalName);
        html.find('#armor-type-display').text(slot.toUpperCase());
        html.find('#armor-quality-display').text(quality.toUpperCase());
        html.find('#armor-price').text(price);

        const list = html.find('#properties-list');
        list.empty();
        finalProps.forEach(p => {
            list.append(`<div class="property-item"><h4>${p.name}</h4><p>${p.desc}</p></div>`);
        });
        
        // Texte d'ambiance
        html.find('#generated-desc').text(isSet ? "Cette pièce semble vibrer en présence d'autres éléments de sa collection..." : "Une pièce d'artisanat solide.");
        
        html.find('#sheet-section').removeClass('hidden');
    }

    async _createItemInFoundry(html) {
        const d = this.currentArmorData;
        if (!d.name) return;

        // 1. DÉTECTION INTELLIGENTE DE L'ICÔNE
        let img = "icons/svg/shield.svg";
        const nameLower = d.name.toLowerCase();

        if (d.slot === 'tete') {
            if (nameLower.includes("capuche")) img = "icons/equipment/head/hood-cowl-cloth-brown.webp";
            else if (nameLower.includes("masque")) img = "icons/equipment/head/mask-carved-wood-brown.webp";
            else if (nameLower.includes("couronne") || nameLower.includes("diadème") || nameLower.includes("tiare") || nameLower.includes("cercle")) img = "icons/equipment/head/crown-gold.webp";
            else if (nameLower.includes("heaume")) img = "icons/equipment/head/helm-great-steel.webp";
            else img = "icons/equipment/head/helm-steel.webp"; // Casque par défaut
        } 
        else if (d.slot === 'torse') {
            if (nameLower.includes("tunique") || nameLower.includes("veste") || nameLower.includes("poncho")) img = "icons/equipment/chest/shirt-collared-leather.webp";
            else if (nameLower.includes("manteau") || nameLower.includes("himation")) img = "icons/equipment/back/cloak-hooded-brown.webp";
            else if (nameLower.includes("gambison")) img = "icons/equipment/chest/gambeson.webp";
            else img = "icons/equipment/chest/breastplate-steel.webp"; // Plastron/Cuirasse par défaut
        } 
        else if (d.slot === 'bras') {
            if (nameLower.includes("gants")) img = "icons/equipment/hands/glove-leather-black.webp";
            else if (nameLower.includes("brassards") || nameLower.includes("protège-bras")) img = "icons/equipment/hands/bracers-leather.webp";
            else img = "icons/equipment/hands/gauntlets-plate.webp"; // Gantelets par défaut
        } 
        else if (d.slot === 'jambes') {
            if (nameLower.includes("bottes") || nameLower.includes("sandales")) img = "icons/equipment/feet/boots-leather.webp";
            else if (nameLower.includes("pantalon") || nameLower.includes("chausses")) img = "icons/equipment/feet/boots-chained-steel.webp";
            else img = "icons/equipment/feet/greaves-steel.webp"; // Grèves/Jambières par défaut
        } 
        else if (d.slot === 'integral') {
            if (nameLower.includes("robe")) img = "icons/equipment/chest/robe-simple.webp";
            else if (nameLower.includes("harnois")) img = "icons/equipment/chest/plate-layered-steel.webp";
            else img = "icons/equipment/chest/clothing-noble-shirt.webp"; // Tenue/Ensemble par défaut
        }

        // 2. CONSTRUCTION DE LA DESCRIPTION
        let descHTML = `<p><strong>Type :</strong> ${d.slot.toUpperCase()} | <strong>Qualité :</strong> ${d.quality}</p>`;
        if (d.props.length > 0) {
            descHTML += `<ul>`;
            d.props.forEach(p => {
                descHTML += `<li><strong>${p.name} :</strong> ${p.desc}</li>`;
            });
            descHTML += `</ul>`;
        }

        // 3. CRÉATION DE L'ITEM
        await Item.create({
            name: html.find('#armor-name').val(), // Nom éditable
            type: "protection",
            img: img,
            system: {
                description: descHTML,
                slot: d.slot,
                qualite: (d.quality === 'legendary' ? 5 : parseInt(d.quality.replace('q',''))),
                prix: d.price,
                equipe: false,
                proprietes: d.props.map(p => p.name).join(", ")
            }
        }, { renderSheet: true });

        ui.notifications.info(`L'armure "${d.name}" a été ajoutée !`);
    }
}