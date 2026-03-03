export class AvantisNPCGenerator extends Application {

    constructor(options) {
        super(options);
        this.currentNpcData = {};
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "avantis-npc-generator",
            title: "Générateur d'Antagonistes & PNJ",
            template: "systems/avantis/templates/apps/npc-generator.html",
            width: 900,
            height: 800,
            resizable: true,
            classes: ["avantis-npc-generator-window"]
        });
    }

    // --- 1. LES DONNÉES (Copiées et condensées pour l'exemple) ---
    get npcData() {
        // ... (Insère ici TOUT le contenu de l'objet npcData de ton fichier pnj-generator.js) ...
        // Pour que la réponse ne soit pas trop longue, je ne remets pas tout le bloc JSON ici, 
        // mais tu dois COPIER-COLLER tout le contenu de ton "const npcData = { ... };" ici.
        // Assure-toi de bien fermer les accolades !
        
        // EXEMPLE STRUCTURÉ (Remplace par ton vrai JSON) :
        return {
            "Antagoniste": {
        "Guerrier": {
            "Sbire": {
                meridiens: {
                    domination: [1, 2], savoir: [1, 1], expression: [1, 2],
                    puissance: [2, 5], mouvement: [2, 4], vitalite: [1, 3]
                },
                equipementEssentiel: {
                    arme: [
                        ["Épée courte (Qualité 0)", 15],
                        ["Hachette (Qualité 0)", 15],
                        ["Cimeterre (Qualité 0)", 10],
                        ["Marteau (Qualité 0)", 10],
                        ["Masse (Qualité 0)", 10],
                        ["Tonfa (Qualité 0)", 10],
                        ["Hache (Qualité 0)", 5],
                        ["Gourdin (Qualité 0)", 5],
                        ["Chaîne cloutée (Qualité 0)", 5],
                        ["Morgenstern (Qualité 0)", 5],
                        ["Épée courte (à identifier - Qualité 1)", 2],
                        ["Hachette (à identifier - Qualité 1)", 2],
                        ["Lance (à identifier - Qualité 1)", 0.8],
                        ["Wahaika (à identifier - Qualité 2)", 0.2]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 25],
                        ["Vêtements en lambeaux", 25],
                        ["Vêtements sales", 10],
                        ["Vêtements sales", 10],
                        ["Vêtements sales", 10],
                        ["Gambison usé", 10],
                        ["Gantelets de Brise-Peste", 3],
                        ["Gantelets de la Main Sépulcrale", 2],
                        ["Pantalon de la Main Sépulcrale", 2],
                        ["Heaume de Brise-Peste", 1],
                        ["Plastron de Brise-Peste", 1],
                        ["Jambières de Brise-Peste", 0.5],
                        ["Gambison (à identifier - Qualité 1)", 0.5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "2d6", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Pierre à aiguiser", "1", 10],
                    ["Commun", 80, "Outre vide", "1", 5],
                    ["Commun", 80, "Jeu de carte", "1", 5],
                    ["Commun", 80, "Jeu de base pukllay", "1", 5],

                    ["Incommun", 15, "Sol", "3d10", 100],
                    ["Incommun", 15, "Outre d'alcool doux", "1", 20],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Bijou d'ornement (volé)", "1", 5],

                    ["Rare", 4, "Sol", "5d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Bijou d'ornement (volé)", "1", 10],
                    ["Rare", 4, "Dague volée (à identifier - Qualité 2)", "1", 1],

                    ["Très rare", 0.9, "Sol", "10d10", 100],
                    ["Très rare", 0.9, "Dague volé (à identifier - Qualité 2)", "1", 2],
                    ["Très rare", 0.9, "Dague volé (à identifier - Qualité 2)", "1", 2],

                    ["Légendaire", 0.1, "Sol", "15d10", 100],
                    ["Légendaire", 0.1, "Pierre de Vrill (à identifier - Qualité 1)", "1", 5]
                ]
            },
            "Spécialiste": {
                meridiens: {
                    domination: [1, 3], savoir: [1, 1], expression: [1, 2],
                    puissance: [4, 6], mouvement: [3, 6], vitalite: [3, 5]
                },
                equipementEssentiel: {
                    arme: [
                        ["Épée courte (Qualité 0)", 15],
                        ["Épée bâtarde (à identifier - Qualité 1)", 15],
                        ["Cimeterre (à identifier - Qualité 1)", 10],
                        ["Marteau (à identifier - Qualité 1)", 10],
                        ["Hache double (à identifier - Qualité 1)", 10],
                        ["Tonfa (à identifier - Qualité 1)", 10],
                        ["Hache (à identifier - Qualité 1)", 5],
                        ["Sabre (à identifier - Qualité 1)", 5],
                        ["Chaîne cloutée (à identifier - Qualité 1)", 5],
                        ["Épée courte (à identifier - Qualité 2)", 5],
                        ["Tomahawk (à identifier - Qualité 2)", 2],
                        ["Khopesh (à identifier - Qualité 2)", 2],
                        ["Morgenstern (à identifier - Qualité 2)", 0.8],
                        ["Épée large (à identifier - Qualité 3)", 0.2]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 25],
                        ["Vêtements sales", 25],
                        ["Gambison usé", 10],
                        ["Pantalon de la Main Sépulcrale", 10],
                        ["Gantelets de la Main Sépulcrale", 10],
                        ["Masque du Puma des Cimes", 10],
                        ["Gantelets de Brise-Peste", 3],
                        ["Gantelets de la Main Sépulcrale", 2],
                        ["Pantalon de la Main Sépulcrale", 2],
                        ["Heaume de Brise-Peste", 1],
                        ["Plastron de Brise-Peste", 1],
                        ["Jambières de Brise-Peste", 0.5],
                        ["Torse du Puma des Cimes", 0.5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "3d10", 100],
                    ["Commun", 80, "Rations", "1d4", 10],
                    ["Commun", 80, "Pierre à aiguiser", "1", 10],
                    ["Commun", 80, "Outre d'alcool doux", "1", 5],
                    ["Commun", 80, "Bijou d'ornement (volé)", "1", 5],
                    ["Commun", 80, "Bourse volée", "5d10", 5],
                    ["Commun", 80, "Bandages", "1", 5],
                    
                    ["Incommun", 15, "Sol", "5d10", 100],
                    ["Incommun", 15, "Outre d'alcool doux", "1", 20],
                    ["Incommun", 15, "Jeu de base pukllay", "1", 20],
                    ["Incommun", 15, "Bandages", "1", 20],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Bourse volée", "5d10", 5],

                    ["Rare", 4, "Sol", "10d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Bijou d'ornement (volé)", "1", 10],
                    ["Rare", 4, "Dague volé (à identifier - Qualité 2)", "1", 2],

                    ["Très rare", 0.9, "Sol", "15d10", 100],
                    ["Très rare", 0.9, "Épée courte volée (à identifier - Qualité 2)", "1", 5],
                    ["Très rare", 0.9, "Petit coffre fermé", "1", 5],

                    ["Légendaire", 0.1, "Sol", "20d10", 100],
                    ["Légendaire", 0.1, "Bandages", "1", 80],
                    ["Légendaire", 0.1, "Outre d'alcool doux", "1", 100],
                    ["Légendaire", 0.1, "Potion (à identifier - Qualité 3)", "1", 10]
                ]
            },
            "Lieutenant": {
                meridiens: {
                    domination: [3, 4], savoir: [2, 3], expression: [2, 4],
                    puissance: [7, 9], mouvement: [6, 9], vitalite: [5, 8]
                },
                equipementEssentiel: {
                    arme: [
                        ["Bâton (à identifier - Qualité 2)", 15],
                        ["Épée bâtarde (à identifier - Qualité 2)", 15],
                        ["Cimeterre (à identifier - Qualité 2)", 10],
                        ["Lance (à identifier - Qualité 2)", 10],
                        ["Hache double (à identifier - Qualité 2)", 10],
                        ["Double-lame (à identifier - Qualité 2)", 10],
                        ["Urumi (à identifier - Qualité 2)", 5],
                        ["Sabre (à identifier - Qualité 2)", 5],
                        ["Chaîne cloutée (à identifier - Qualité 2)", 5],
                        ["Épée courte (à identifier - Qualité 2)", 5],
                        ["Faux (à identifier - Qualité 2)", 2],
                        ["Khopesh (à identifier - Qualité 2)", 2],
                        ["Double-lame (à identifier - Qualité 3)", 0.8],
                        ["Épée large (à identifier - Qualité 3)", 0.2]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 10],
                        ["Vêtements sales", 10],
                        ["Gambison usé", 10],
                        ["Pantalon de la Main Sépulcrale", 1],
                        ["Gantelets de la Main Sépulcrale", 1],
                        ["Masque du Puma des Cimes", 1],
                        ["Gantelets de Brise-Peste", 1],
                        ["Gantelets de la Main Sépulcrale", 1],
                        ["Pantalon de la Main Sépulcrale", 1],
                        ["Heaume de Brise-Peste", 1],
                        ["Plastron de Brise-Peste", 1],
                        ["Jambières de Brise-Peste", 1],
                        ["Torse du Puma des Cimes", 1]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "10d10", 100],
                    ["Commun", 80, "Outils de crochetage", "1", 10],
                    ["Commun", 80, "Chevalière", "1", 10],
                    ["Commun", 80, "Outre de rhum", "1", 5],
                    ["Commun", 80, "Bandages", "1", 5],
                    ["Commun", 80, "Sifflet d'alarme", "1", 25],
                    
                    ["Incommun", 15, "Sol", "20d10", 100],
                    ["Incommun", 15, "Bijou d'ornement (volé)", "1", 10],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Outre de rhum", "1", 10],
                    ["Incommun", 15, "Bourse volée", "5d10", 25],
                    ["Incommun", 15, "Bandages", "1d4", 50],
                    ["Incommun", 15, "Sifflet d'alarme", "1", 50],

                    ["Rare", 4, "Sol", "5d100", 100],
                    ["Rare", 4, "Jeton rare de pukllay", "1", 20],
                    ["Rare", 4, "Bijou d'ornement (volé)", "1", 10],
                    ["Rare", 4, "Lettre froisée d'un commanditaire", "1", 10],

                    ["Très rare", 0.9, "Sol", "6d100", 100],
                    ["Très rare", 0.9, "Lettre froisée d'un commanditaire", "1", 50],
                    ["Très rare", 0.9, "Lame de Velour", "1", 1],
                    ["Très rare", 0.9, "Petit coffre fermé", "1", 15],

                    ["Légendaire", 0.1, "Sol", "15d100", 100],
                    ["Légendaire", 0.1, "Lettre froisée d'un commanditaire", "1", 80],
                    ["Légendaire", 0.1, "Lame de Velour", "1", 10],
                    ["Légendaire", 0.1, "Petit coffre fermé", "1", 20]
                ]
            },
            "Némésis": {
                meridiens: {
                    domination: [5, 7], savoir: [2, 5], expression: [3, 7],
                    puissance: [9, 15], mouvement: [9, 12], vitalite: [7, 12]
                },
                equipementEssentiel: {
                    arme: [
                        ["Épée à deux mains (à identifier - Qualité 3)", 8],
                        ["Hache à deux mains (à identifier - Qualité 3)", 8],
                        ["Cimeterre (à identifier - Qualité 3)", 8],
                        ["Épée large (à identifier - Qualité 3)", 8],
                        ["Hache double (à identifier - Qualité 3)", 8],
                        ["Chaîne cloutée (à identifier - Qualité 3)", 8],
                        ["Double-lame (à identifier - Qualité 3)", 8],
                        ["Chaîne à deux kamas (à identifier - Qualité 3)", 8],
                        ["Fléau d'arme (à identifier - Qualité 3)", 8],
                        ["Morgenstern (à identifier - Qualité 3)", 8],
                        ["Hallebarde (à identifier - Qualité 3)", 5],
                        ["Marteau à long manche (à identifier - Qualité 3)", 5],
                        ["Khopesh (à identifier - Qualité 3)", 5],
                        ["Faux (à identifier - Qualité 3)", 5]
                    ],
                    tenue: [
                        ["Torse du Puma des Cimes", 25],
                        ["Plastron de Brise-Peste", 25],
                        ["Masque du Puma des Cimes", 10],
                        ["Jambières du Puma des Cimes", 10],
                        ["Jambières de Brise-Peste", 10],
                        ["Heaume de Brise-Peste", 10],
                        ["Gantelets de Brise-Peste", 3],
                        ["Gantelets de la Main Sépulcrale", 2],
                        ["Pantalon de la Main Sépulcrale", 2],
                        ["Masque du Souffle Ancien", 1],
                        ["Plastron de Brise-Peste", 1],
                        ["Jambières de Brise-Peste", 0.5],
                        ["Gantelets aux Griffes d'Ombre", 0.5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d100", 100],
                    ["Commun", 80, "Potion (à identifier - Qualité 2)", "2", 100],
                    ["Commun", 80, "Chevalière", "1", 100],
                    ["Commun", 80, "Clé étrange", "1", 80],
                    ["Commun", 80, "Carte annotée", "1", 50],
                    ["Commun", 80, "Appeau étrange", "1", 30],
                    
                    ["Incommun", 15, "Sol", "10d100", 100],
                    ["Incommun", 15, "Clé étrange", "1", 80],
                    ["Incommun", 15, "Lame de Velour", "1", 5],
                    ["Incommun", 15, "Carte annotée", "1", 80],
                    ["Incommun", 15, "Appeau étrange", "1", 80],
                    ["Incommun", 15, "Potion (à identifier - Qualité 2)", "4", 80],

                    ["Rare", 4, "Sol", "12d100", 100],
                    ["Rare", 4, "Clé étrange", "1", 50],
                    ["Rare", 4, "Lame de Velour", "1", 10],
                    ["Rare", 4, "Potion (à identifier - Qualité 3)", "2", 80],
                    ["Rare", 4, "Lettre froisée d'un commanditaire", "1", 80],

                    ["Très rare", 0.9, "Sol", "15d100", 100],
                    ["Très rare", 0.9, "Potion (à identifier - Qualité 3)", "1d4", 100],
                    ["Très rare", 0.9, "Lame de Velour", "1", 50],
                    ["Très rare", 0.9, "Pierre de Vrill (à identifier - Qualité 3)", "1", 80],

                    ["Légendaire", 0.1, "Sol", "30d100", 100],
                    ["Légendaire", 0.1, "Potion (à identifier - Qualité 3)", "1d4", 100],
                    ["Légendaire", 0.1, "Lame de Velour", "1", 90],
                    ["Légendaire", 0.1, "Pierre de Vrill (à identifier - Qualité 4)", "1", 90]
                ]
            },
        },
        "Assassin": {
            "Sbire": {
                meridiens: {
                    domination: [1, 3], savoir: [1, 3], expression: [1, 2],
                    puissance: [1, 3], mouvement: [3, 5], vitalite: [1, 3]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (Qualité 0)", 15],
                        ["Sarbacane (Qualité 0)", 15],
                        ["Couteau de lancer (Qualité 0)", 10],
                        ["Couteau (Qualité 0)", 10],
                        ["Khopesh (Qualité 0)", 10],
                        ["Épée courte (Qualité 0)", 10],
                        ["Rapière (Qualité 0)", 5],
                        ["Shuriken (Qualité 0)", 5],
                        ["Sabre (Qualité 0)", 5],
                        ["Kama (Qualité 0)", 5],
                        ["Double-lame (à identifier - Qualité 1)", 2],
                        ["Hachette (à identifier - Qualité 1)", 2],
                        ["Grand cracheur (à identifier - Qualité 1)", 0.8],
                        ["Grappin (à identifier - Qualité 2)", 0.2]
                    ],
                    tenue: [
                        ["Vêtements sombres en lambeaux", 25],
                        ["Vêtements sombres en lambeaux", 25],
                        ["Vêtements sales", 10],
                        ["Vêtements sales", 10],
                        ["Botte d'aventurier", 2],
                        ["Tunique noire usée", 20],
                        ["Bottes aux Semelles de Brume", 1],
                        ["Capuche de la Lune Obscure", 2],
                        ["Gants de la Lune Obscure", 2],
                        ["Heaume de Brise-Peste", 1],
                        ["Diadème des Songes", 1],
                        ["Botte de la Convergence noire", 0.5],
                        ["Gantelets de l'Aigle de Nuit", 0.5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "2d6", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Bolas (Qualité 0)", "1", 10],
                    ["Commun", 80, "Contrat", "1", 2],
                    ["Commun", 80, "Seringue vide", "1", 5],
                    ["Commun", 80, "Jeu de base pukllay", "1", 10],

                    ["Incommun", 15, "Sol", "3d10", 100],
                    ["Incommun", 15, "Shuriken (Qualité 0)", "1", 20],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Anneau", "1", 5],

                    ["Rare", 4, "Sol", "5d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Boucle d'oreille", "1", 10],
                    ["Rare", 4, "Sécrétion de Dendrobate", "1", 2],

                    ["Très rare", 0.9, "Sol", "10d10", 100],
                    ["Très rare", 0.9, "Venin d'Atrox", "1", 2],
                    ["Très rare", 0.9, "Sécrétion de Dendrobate", "1", 2],

                    ["Légendaire", 0.1, "Sol", "15d10", 100],
                    ["Légendaire", 0.1, "Shuriken (à identifier - Qualité 2)", "1", 5]
                ]
            },
            "Spécialiste": {
                meridiens: {
                    domination: [3, 6], savoir: [2, 3], expression: [1, 2],
                    puissance: [1, 4], mouvement: [5, 7], vitalite: [1, 3]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (Qualité 0)", 15],
                        ["Sarbacane (Qualité 0)", 15],
                        ["Couteau de lancer (à identifier - Qualité 1)", 10],
                        ["Couteau (à identifier - Qualité 1)", 10],
                        ["Khopesh (à identifier - Qualité 1)", 10],
                        ["Épée courte (à identifier - Qualité 1)", 10],
                        ["Rapière (à identifier - Qualité 1)", 5],
                        ["Shuriken (à identifier - Qualité 1)", 5],
                        ["Sabre (à identifier - Qualité 1)", 5],
                        ["Kama (à identifier - Qualité 1)", 5],
                        ["Double-lame (à identifier - Qualité 2)", 2],
                        ["Shuriken (à identifier - Qualité 2)", 2],
                        ["Grand cracheur (à identifier - Qualité 2)", 0.8],
                        ["Dague (à identifier - Qualité 2)", 0.2]
                    ],
                    tenue: [
                        ["Vêtements sombres en lambeaux", 25],
                        ["Vêtements sombres en lambeaux", 25],
                        ["Tunique des Rivières Tressées", 10],
                        ["Bottes aux Semelles de Brume", 10],
                        ["Gants de la Lune Obscure", 10],
                        ["Tunique noire usée", 10],
                        ["Botte de la Convergence noire", 3],
                        ["Capuche de la Lune Obscure", 2],
                        ["Gantelets de l'Aigle de Nuit", 2],
                        ["Heaume de Brise-Peste", 1],
                        ["Diadème des Songes", 1],
                        ["Jambières de l'Aigle de Nuit", 0.5],
                        ["Tenue de l'Adepte de l'Araignée", 0.5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "3d10", 100],
                    ["Commun", 80, "Rations", "1d4", 10],
                    ["Commun", 80, "Contrat arraché", "1", 10],
                    ["Commun", 80, "Bolas (à identifier - Qualité 1)", "1", 5],
                    ["Commun", 80, "Bourse supplémentaire", "5d10", 5],
                    
                    ["Incommun", 15, "Sol", "5d10", 100],
                    ["Incommun", 15, "Contrat", "1", 1],
                    ["Incommun", 15, "Bolas (à identifier - Qualité 2)", "1", 2],

                    ["Rare", 4, "Sol", "10d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Contrat", "1", 1],
                    ["Rare", 4, "Dague (à identifier - Qualité 2)", "1", 2],

                    ["Très rare", 0.9, "Sol", "15d10", 100],
                    ["Très rare", 0.9, "Contrat", "1", 5],
                    ["Très rare", 0.9, "Denier Voilé", "1", 2],

                    ["Légendaire", 0.1, "Sol", "20d10", 100],
                    ["Légendaire", 0.1, "Denier Voilé", "1", 5],
                    ["Légendaire", 0.1, "Contrat", "1", 10],
                    ["Légendaire", 0.1, "Dague (à identifier - Qualité 2)", "1", 10]
                ]
            },
            "Lieutenant": {
                meridiens: {
                    domination: [4, 9], savoir: [3, 5], expression: [1, 3],
                    puissance: [3, 5], mouvement: [8, 9], vitalite: [2, 6]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (Qualité 0)", 15],
                        ["Sarbacane (Qualité 0)", 15],
                        ["Couteau de lancer (à identifier - Qualité 1)", 10],
                        ["Couteau (à identifier - Qualité 1)", 10],
                        ["Khopesh (à identifier - Qualité 1)", 10],
                        ["Épée courte (à identifier - Qualité 1)", 10],
                        ["Rapière (à identifier - Qualité 1)", 5],
                        ["Shuriken (à identifier - Qualité 1)", 5],
                        ["Sabre (à identifier - Qualité 1)", 5],
                        ["Kama (à identifier - Qualité 1)", 5],
                        ["Double-lame (à identifier - Qualité 2)", 2],
                        ["Shuriken (à identifier - Qualité 2)", 2],
                        ["Grand cracheur (à identifier - Qualité 2)", 0.8],
                        ["Dague (à identifier - Qualité 2)", 0.2]
                    ],
                    tenue: [
                        ["Bottes aux Semelles de Brume", 10],
                        ["Tunique des Rivières Tressées", 10],
                        ["Tenue de l'Adepte de l'Araignée", 10],
                        ["Gants de la Lune Obscure", 10],
                        ["Tunique noire usée", 30],
                        ["Botte de la Convergence noire", 5],
                        ["Capuche de la Lune Obscure", 5],
                        ["Gantelets de l'Aigle de Nuit", 5],
                        ["Heaume de Brise-Peste", 5],
                        ["Diadème des Songes", 1],
                        ["Jambières de l'Aigle de Nuit", 5],
                        ["Protège-épaules de l'Aigle de Nuit", 4]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d10", 100],
                    ["Commun", 80, "Rations", "1d4", 10],
                    ["Commun", 80, "Contrat", "1", 25],
                    ["Commun", 80, "Bourse supplémentaire", "20d10", 30],
                    ["Commun", 80, "Denier Voilé", "1", 10],
                    
                    ["Incommun", 15, "Sol", "10d10", 100],
                    ["Incommun", 15, "Contrat", "1", 30],
                    ["Incommun", 15, "Bourse supplémentaire", "40d10", 50],
                    ["Incommun", 15, "Denier Voilé", "1", 10],

                    ["Rare", 4, "Sol", "15d10", 100],
                    ["Rare", 4, "Denier Voilé", "1", 10],
                    ["Rare", 4, "Contrat", "1", 40],
                    ["Rare", 4, "Dague (à identifier - Qualité 2)", "1", 15],

                    ["Très rare", 0.9, "Sol", "20d10", 100],
                    ["Très rare", 0.9, "Denier Voilé", "1", 10],
                    ["Très rare", 0.9, "Contrat", "1", 50],
                    ["Très rare", 0.9, "Shuriken (à identifier - Qualité 3)", "1", 25],

                    ["Légendaire", 0.1, "Sol", "5d100", 100],
                    ["Légendaire", 0.1, "Denier Voilé", "1", 50],
                    ["Légendaire", 0.1, "Sifflement de la Mort", "1", 10],
                    ["Légendaire", 0.1, "Couteau (à identifier - Qualité 3)", "1", 25]
                ]
            },
            "Némésis": {
                meridiens: {
                    domination: [8, 12], savoir: [2, 7], expression: [3, 8],
                    puissance: [5, 8], mouvement: [9, 15], vitalite: [5, 7]
                },
                equipementEssentiel: {
                    arme: [

                        ["Dague (à identifier - Qualité 4)", 8],
                        ["Sarbacane (à identifier - Qualité 4)", 8],
                        ["Couteau de lancer (à identifier - Qualité 4)", 8],
                        ["Couteau (à identifier - Qualité 4)", 8],
                        ["Khopesh (à identifier - Qualité 3)", 8],
                        ["Épée courte (à identifier - Qualité 3)", 8],
                        ["Rapière (à identifier - Qualité 3)", 8],
                        ["Shuriken (à identifier - Qualité 4)", 8],
                        ["Sabre (à identifier - Qualité 3)", 8],
                        ["Kama (à identifier - Qualité 4)", 8],
                        ["Double-lame (à identifier - Qualité 3)", 5],
                        ["Épée longue (à identifier - Qualité 3)", 5],
                        ["Kama (à identifier - Qualité 3)", 5],
                        ["Hallebarde rétractable (à identifier - Qualité 3)", 5]
                    ],
                    tenue: [
                        ["Tenue de l'Adepte de l'Araignée", 25],
                        ["Bottes aux Semelles de Brume", 25],
                        ["Protège-épaules de l'Aigle de Nuit", 10],
                        ["Casque de l'Aigle de Nuit", 10],
                        ["Gantelets de l'Aigle de Nuit", 10],
                        ["Masque du Souffle Ancien", 10],
                        ["Jambières de l'Aigle de Nuit", 3],
                        ["Capuche de la Lune Obscure", 2],
                        ["Gantelets de l'Aigle de Nuit", 2],
                        ["Heaume de Brise-Peste", 1],
                        ["Diadème des Songes", 1],
                        ["Jambières de l'Aigle de Nuit", 0.5],
                        ["Protège-épaules de l'Aigle de Nuit", 0.5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d100", 100],
                    ["Commun", 80, "Potion (à identifier - Qualité 2)", "2", 80],
                    ["Commun", 80, "Anneau (à identifier - Qualité 1)", "1", 80],
                    ["Commun", 80, "Contrat", "1", 50],
                    ["Commun", 80, "Bourse supplémentaire", "20d10", 80],
                    ["Commun", 80, "Sifflement de la Mort", "1", 30],
                    ["Commun", 80, "Denier Voilé", "1", 30],
                    
                    ["Incommun", 15, "Sol", "10d100", 100],
                    ["Incommun", 15, "Shuriken (à identifier - Qualité 3)", "1", 70],
                    ["Incommun", 15, "Contrat", "1", 70],
                    ["Incommun", 15, "Bourse supplémentaire", "20d100", 70],
                    ["Incommun", 15, "Potion (à identifier - Qualité 2)", "1d4", 100],
                    ["Incommun", 15, "Sifflement de la Mort", "1", 50],
                    ["Incommun", 15, "Denier Voilé", "1", 50],


                    ["Rare", 4, "Sol", "15d100", 100],
                    ["Rare", 4, "Contrat", "1", 70],
                    ["Rare", 4, "Documents compromettants", "1", 70],
                    ["Rare", 4, "Sifflement de la Mort", "1", 70],
                    ["Rare", 4, "Bourse supplémentaire", "20d100", 100],
                    ["Rare", 4, "Potion (à identifier - Qualité 3)", "2", 100],
                    ["Rare", 4, "Denier Voilé", "1", 70],

                    ["Très rare", 0.9, "Sol", "20d100", 100],
                    ["Très rare", 0.9, "Contrat", "1", 100],
                    ["Très rare", 0.9, "Potion (à identifier - Qualité 3)", "1d4", 100],
                    ["Très rare", 0.9, "Documents compromettants", "1", 80],
                    ["Très rare", 0.9, "Petit coffre fermé", "1", 80],
                    ["Très rare", 0.9, "Denier Voilé", "1", 80],
                    ["Très rare", 0.9, "Sifflement de la Mort", "1", 80],

                    ["Légendaire", 0.1, "Sol", "30d100", 100],
                    ["Légendaire", 0.1, "Sifflement de la Mort", "1", 90],
                    ["Légendaire", 0.1, "Contrat", "1", 100],
                    ["Légendaire", 0.1, "Documents compromettants", "1", 90],
                    ["Légendaire", 0.1, "Petit coffre fermé", "1", 90],
                    ["Légendaire", 0.1, "Potion (à identifier - Qualité 3)", "1", 100],
                    ["Légendaire", 0.1, "Bourse supplémentaire", "20d100", 100],
                    ["Légendaire", 0.1, "Denier Voilé", "1", 100],
                    ["Légendaire", 0.1, "Pierre de Vrill (à identifier - Qualité 4)", "1", 90]
                ]
            },
        },
        "Chaman": {
            "Sbire": {
                meridiens: {
                    domination: [1, 3], savoir: [2, 3], expression: [1, 2],
                    puissance: [1, 1], mouvement: [1, 2], vitalite: [1, 2]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (Qualité 0)", 35],
                        ["Bâton (Qualité 0)", 35],
                        ["Couteau (Qualité 0)", 15],
                        ["Lance (Qualité 0)", 5],
                        ["Épée courte (Qualité 0)", 6],
                        ["Javeline (Qualité 0)", 1],
                        ["Sabre (Qualité 0)", 1],
                        ["Hallebarde rétractable (Qualité 0)", 1],
                        ["Double-lame (à identifier - Qualité 1)", 1]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 50],
                        ["Vêtements sales", 40],
                        ["Botte d'aventurier", 2.5],
                        ["Tenue Kallpa d'école", 6],
                        ["Diadème des Songes", 0.5],
                        ["Protège-bras du Dévoreur de Songes", 0.5],
                        ["Masque du Dévoreur de Songes", 0.5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "2d6", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Sacoche à composantes", "1", 5],
                    ["Commun", 80, "Sacha Inchi", "1", 2],
                    ["Commun", 80, "Absinthe", "1", 2],
                    ["Commun", 80, "Belladone", "1", 2],
                    ["Commun", 80, "Digitale", "1", 2],
                    ["Commun", 80, "Passiflore", "1", 2],
                    ["Commun", 80, "Yopo", "1", 2],
                    ["Commun", 80, "Ginseng", "1", 2],
                    ["Commun", 80, "Feuille d'Harvatat", "1", 1],

                    ["Incommun", 15, "Sol", "3d10", 100],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Sacoche à composantes", "1", 5],
                    ["Incommun", 15, "Sacha Inchi", "1", 5],
                    ["Incommun", 15, "Absinthe", "1", 5],
                    ["Incommun", 15, "Belladone", "1", 5],
                    ["Incommun", 15, "Digitale", "1", 5],
                    ["Incommun", 15, "Passiflore", "1", 5],
                    ["Incommun", 15, "Yopo", "1", 5],
                    ["Incommun", 15, "Ginseng", "1", 5],
                    ["Incommun", 15, "Feuille d'Harvatat", "1", 2],

                    ["Rare", 4, "Sol", "5d10", 100],
                    ["Rare", 4, "Rations", "1d4", 20],
                    ["Rare", 4, "Sacha Inchi", "1d4", 5],
                    ["Rare", 4, "Absinthe", "1d4", 5],
                    ["Rare", 4, "Belladone", "1", 5],
                    ["Rare", 4, "Digitale", "1", 5],
                    ["Rare", 4, "Passiflore", "1d4", 5],
                    ["Rare", 4, "Yopo", "1", 5],
                    ["Rare", 4, "Ginseng", "1", 5],
                    ["Rare", 4, "Feuille d'Harvatat", "1", 2],
                    ["Rare", 4, "Boucle d'oreille", "1", 20],
                    ["Rare", 4, "Anneau (à identifier - Qualité 1)", "1", 15],

                    ["Très rare", 0.9, "Sol", "10d10", 100],
                    ["Très rare", 0.9, "Kit d'herboriste", "1", 5],
                    ["Très rare", 0.9, "Sang de lézard", "1d4", 10],
                    ["Très rare", 0.9, "Sacha Inchi", "1", 10],
                    ["Très rare", 0.9, "Absinthe", "1d4", 10],
                    ["Très rare", 0.9, "Belladone", "1d4", 10],
                    ["Très rare", 0.9, "Digitale", "1", 10],
                    ["Très rare", 0.9, "Passiflore", "1d4", 10],
                    ["Très rare", 0.9, "Yopo", "1", 10],
                    ["Très rare", 0.9, "Ginseng", "1", 10],
                    ["Très rare", 0.9, "Feuille d'Harvatat", "1", 5],

                    ["Légendaire", 0.1, "Sol", "15d10", 100],
                    ["Légendaire", 0.1, "Sacha Inchi", "1d4", 10],
                    ["Légendaire", 0.1, "Absinthe", "1d4", 10],
                    ["Légendaire", 0.1, "Belladone", "1d4", 10],
                    ["Légendaire", 0.1, "Digitale", "1d4", 10],
                    ["Légendaire", 0.1, "Passiflore", "1d4", 10],
                    ["Légendaire", 0.1, "Yopo", "1d4", 10],
                    ["Légendaire", 0.1, "Ginseng", "1d4", 10],
                    ["Légendaire", 0.1, "Feuille d'Harvatat", "1d4", 10]
                ]
            },
            "Spécialiste": {
                meridiens: {
                    domination: [3, 6], savoir: [5, 7], expression: [2, 4],
                    puissance: [1, 2], mouvement: [3, 4], vitalite: [1, 2]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (à identifier - Qualité 1)", 35],
                        ["Bâton (à identifier - Qualité 1)", 35],
                        ["Couteau (à identifier - Qualité 1)", 15],
                        ["Massue (sceptre) (à identifier - Qualité 1)", 5],
                        ["Épée courte (à identifier - Qualité 1)", 6],
                        ["Javeline (à identifier - Qualité 1)", 1],
                        ["Baton (à identifier - Qualité 2)", 1],
                        ["Hallebarde rétractable (à identifier - Qualité 2)", 1],
                        ["Double-lame (à identifier - Qualité 2)", 1]
                    ],
                    tenue: [
                        ["Vêtements sales", 25],
                        ["Vêtements sales", 25],
                        ["Protège-bras du Dévoreur de Songes", 10],
                        ["Masque du Dévoreur de Songes", 10],
                        ["Botte d'aventurier", 10],
                        ["Tenue Yachay d'école", 18],
                        ["Diadème des Songes", 1],
                        ["Protège-bras du Dévoreur de Songes", 0.5],
                        ["Masque du Dévoreur de Songes", 0.5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "3d10", 100],
                    ["Commun", 80, "Rations", "1d4", 10],
                    ["Commun", 80, "Sacoche à composantes", "1", 10],
                    ["Commun", 80, "Seringue vide", "1", 2],
                    ["Commun", 80, "Sacha Inchi", "1d4", 2],
                    ["Commun", 80, "Absinthe", "1d4", 2],
                    ["Commun", 80, "Belladone", "1d4", 2],
                    ["Commun", 80, "Digitale", "1d4", 2],
                    ["Commun", 80, "Passiflore", "1d4", 2],
                    ["Commun", 80, "Yopo", "1d4", 2],
                    ["Commun", 80, "Ginseng", "1d4", 2],
                    ["Commun", 80, "Feuille d'Harvatat", "1d4", 2],
                    ["Commun", 80, "Page du Codex - Botanica", "1", 1],
                    
                    ["Incommun", 15, "Sol", "5d10", 100],
                    ["Incommun", 15, "Sacoche à composantes", "1", 20],
                    ["Incommun", 15, "Seringue vide", "1", 10],
                    ["Incommun", 15, "Sacha Inchi", "1d4", 2],
                    ["Incommun", 15, "Absinthe", "1d4", 2],
                    ["Incommun", 15, "Belladone", "1d4", 2],
                    ["Incommun", 15, "Digitale", "1d4", 2],
                    ["Incommun", 15, "Passiflore", "1d4", 2],
                    ["Incommun", 15, "Yopo", "1d4", 2],
                    ["Incommun", 15, "Ginseng", "1d4", 2],
                    ["Incommun", 15, "Feuille d'Harvatat", "1d4", 2],
                    ["Incommun", 15, "Potion (à identifier - Qualité 1)", "2", 20],
                    ["Incommun", 15, "Page du Codex - Botanica", "1", 2],

                    ["Rare", 4, "Sol", "10d10", 100],
                    ["Rare", 4, "Sacha Inchi", "1d4", 2],
                    ["Rare", 4, "Absinthe", "1d4", 2],
                    ["Rare", 4, "Belladone", "1d4", 2],
                    ["Rare", 4, "Digitale", "1d4", 2],
                    ["Rare", 4, "Passiflore", "1d4", 2],
                    ["Rare", 4, "Yopo", "1d4", 2],
                    ["Rare", 4, "Ginseng", "1d4", 2],
                    ["Rare", 4, "Feuille d'Harvatat", "1d4", 2],
                    ["Rare", 4, "Potion (à identifier - Qualité 2)", "1", 2],
                    ["Rare", 4, "Page du Codex - Botanica", "1", 2],

                    ["Très rare", 0.9, "Sol", "15d10", 100],
                    ["Très rare", 0.9, "Dague (à identifier - Qualité 2)", "2", 5],
                    ["Très rare", 0.9, "Page du Codex - Botanica", "1", 5],
                    ["Très rare", 0.9, "Kit d'herboriste", "1", 5],
                    ["Très rare", 0.9, "Sang de lézard", "1", 20],
                    ["Très rare", 0.9, "Sacha Inchi", "1d4", 5],
                    ["Très rare", 0.9, "Absinthe", "1d4", 5],
                    ["Très rare", 0.9, "Belladone", "1d4", 5],
                    ["Très rare", 0.9, "Digitale", "1d4", 5],
                    ["Très rare", 0.9, "Passiflore", "1d4", 5],
                    ["Très rare", 0.9, "Yopo", "1d4", 5],
                    ["Très rare", 0.9, "Ginseng", "1d4", 5],
                    ["Très rare", 0.9, "Feuille d'Harvatat", "1d4", 5],

                    ["Légendaire", 0.1, "Sol", "20d10", 100],
                    ["Légendaire", 0.1, "Sacha Inchi", "1d4", 10],
                    ["Légendaire", 0.1, "Absinthe", "1d4", 10],
                    ["Légendaire", 0.1, "Belladone", "1d4", 10],
                    ["Légendaire", 0.1, "Digitale", "1d4", 10],
                    ["Légendaire", 0.1, "Passiflore", "1d4", 10],
                    ["Légendaire", 0.1, "Yopo", "1d4", 10],
                    ["Légendaire", 0.1, "Ginseng", "1d4", 10],
                    ["Légendaire", 0.1, "Feuille d'Harvatat", "1d4", 10],
                    ["Légendaire", 0.1, "Potion (à identifier - Qualité 3)", "2", 10],
                    ["Légendaire", 0.1, "Page du Codex - Botanica", "1", 10]
                ]
            },
            "Lieutenant": {
                meridiens: {
                    domination: [5, 7], savoir: [6, 9], expression: [3, 5],
                    puissance: [2, 5], mouvement: [4, 6], vitalite: [2, 4]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (à identifier - Qualité 2)", 35],
                        ["Bâton (à identifier - Qualité 2)", 35],
                        ["Couteau (à identifier - Qualité 2)", 15],
                        ["Massue (sceptre) (à identifier - Qualité 2)", 5],
                        ["Épée courte (à identifier - Qualité 2)", 6],
                        ["Javeline (à identifier - Qualité 2)", 1],
                        ["Massue (sceptre) (à identifier - Qualité 3)", 1],
                        ["Hallebarde rétractable (à identifier - Qualité 3)", 1],
                        ["Double-lame (à identifier - Qualité 3)", 1]
                    ],
                    tenue: [
                        ["Vêtements sales", 15],
                        ["Vêtements sales", 15],
                        ["Protège-bras du Dévoreur de Songes", 10],
                        ["Masque du Dévoreur de Songes", 10],
                        ["Botte d'aventurier", 10],
                        ["Tenue Sumaq d'école", 18],
                        ["Diadème des Songes", 1],
                        ["Protège-bras du Dévoreur de Songes", 0.5],
                        ["Masque du Dévoreur de Songes", 0.5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d10", 100],
                    ["Commun", 80, "Seringue vide", "1", 15],
                    ["Commun", 80, "Potion (à identifier - Qualité 2)", "1", 2],
                    ["Commun", 80, "Sacha Inchi", "1d4", 15],
                    ["Commun", 80, "Absinthe", "1d4", 10],
                    ["Commun", 80, "Belladone", "1d4", 10],
                    ["Commun", 80, "Digitale", "1d4", 10],
                    ["Commun", 80, "Passiflore", "1d4", 10],
                    ["Commun", 80, "Yopo", "1d4", 15],
                    ["Commun", 80, "Ginseng", "1d4", 10],
                    ["Commun", 80, "Feuille d'Harvatat", "1", 15],
                    ["Commun", 80, "Page du Codex - Botanica", "1", 2],
                    
                    ["Incommun", 15, "Sol", "10d10", 100],
                    ["Incommun", 15, "Seringue vide", "1", 20],
                    ["Incommun", 15, "Potion (à identifier - Qualité 3)", "2", 2],
                    ["Incommun", 15, "Sacoche à composantes", "1", 20],
                    ["Incommun", 15, "Sacha Inchi", "1d4", 15],
                    ["Incommun", 15, "Absinthe", "1d4", 10],
                    ["Incommun", 15, "Belladone", "1d4", 10],
                    ["Incommun", 15, "Digitale", "1d4", 10],
                    ["Incommun", 15, "Passiflore", "1d4", 10],
                    ["Incommun", 15, "Yopo", "1d4", 15],
                    ["Incommun", 15, "Ginseng", "1d4", 10],
                    ["Incommun", 15, "Feuille d'Harvatat", "1d4", 15],
                    ["Incommun", 15, "Potion (à identifier - Qualité 1)", "2", 20],
                    ["Incommun", 15, "Page du Codex - Botanica", "1", 5],

                    ["Rare", 4, "Sol", "15d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Potion (à identifier - Qualité 2)", "1d4", 15],
                    ["Rare", 4, "Sacha Inchi", "1d4", 15],
                    ["Rare", 4, "Absinthe", "1d4", 10],
                    ["Rare", 4, "Belladone", "1d4", 10],
                    ["Rare", 4, "Digitale", "1d4", 10],
                    ["Rare", 4, "Passiflore", "1d4", 15],
                    ["Rare", 4, "Yopo", "1d4", 10],
                    ["Rare", 4, "Ginseng", "1d4", 10],
                    ["Rare", 4, "Feuille d'Harvatat", "1d4", 10],
                    ["Rare", 4, "Page du Codex - Botanica", "1", 15],

                    ["Très rare", 0.9, "Sol", "20d10", 100],
                    ["Très rare", 0.9, "Page du Codex - Botanica", "1", 15],
                    ["Très rare", 0.9, "Potion (à identifier - Qualité 3)", "1d4", 15],
                    ["Très rare", 0.9, "Kit d'herboriste", "1", 15],
                    ["Très rare", 0.9, "Sang de lézard", "1", 40],
                    ["Très rare", 0.9, "Sacha Inchi", "1d4", 15],
                    ["Très rare", 0.9, "Absinthe", "1d4", 15],
                    ["Très rare", 0.9, "Belladone", "1d4", 25],
                    ["Très rare", 0.9, "Digitale", "1d4", 15],
                    ["Très rare", 0.9, "Passiflore", "1d4", 15],
                    ["Très rare", 0.9, "Yopo", "1d4", 15],
                    ["Très rare", 0.9, "Ginseng", "1d4", 15],
                    ["Très rare", 0.9, "Feuille d'Harvatat", "1d4", 15],

                    ["Légendaire", 0.1, "Sol", "5d100", 100],
                    ["Légendaire", 0.1, "Potion (à identifier - Qualité 4)", "1d4", 10],
                    ["Légendaire", 0.1, "Sacha Inchi", "1d4", 20],
                    ["Légendaire", 0.1, "Absinthe", "1d4", 20],
                    ["Légendaire", 0.1, "Belladone", "1d4", 20],
                    ["Légendaire", 0.1, "Digitale", "1d4", 20],
                    ["Légendaire", 0.1, "Passiflore", "1d4", 20],
                    ["Légendaire", 0.1, "Yopo", "1d4", 20],
                    ["Légendaire", 0.1, "Ginseng", "1d4", 20],
                    ["Légendaire", 0.1, "Feuille d'Harvatat", "1d4", 20],
                    ["Légendaire", 0.1, "Potion (à identifier - Qualité 3)", "1d4", 20],
                    ["Légendaire", 0.1, "Page du Codex - Botanica", "1", 20]
                ]
            },
            "Némésis": {
                meridiens: {
                    domination: [8, 12], savoir: [8, 15], expression: [5, 9],
                    puissance: [3, 7], mouvement: [6, 9], vitalite: [5, 7]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (à identifier - Qualité 4)", 35],
                        ["Bâton (à identifier - Qualité 4)", 35],
                        ["Couteau (à identifier - Qualité 4)", 15],
                        ["Massue (sceptre) (à identifier - Qualité 4)", 10],
                        ["Dague (à identifier - Qualité 3)", 1],
                        ["Bâton (à identifier - Qualité 3)", 1],
                        ["Massue (sceptre) (à identifier - Qualité 3)", 1],
                        ["Hallebarde rétractable (à identifier - Qualité 4)", 1],
                        ["Double-lame (à identifier - Qualité 4)", 1]
                    ],
                    tenue: [
                        ["Masque du Dévoreur de Songes", 15],
                        ["Tenue du Bois Fossile", 15],
                        ["Protège-bras du Dévoreur de Songes", 10],
                        ["Tenue Qhapaq d'école", 50],
                        ["Diadème des Songes", 10],
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d100", 100],
                    ["Commun", 80, "Botte d'aventurier", "1", 70],
                    ["Commun", 80, "Potion (à identifier - Qualité 4)", "1d4", 30],
                    ["Commun", 80, "Sacha Inchi", "1d4", 20],
                    ["Commun", 80, "Absinthe", "1d4", 20],
                    ["Commun", 80, "Belladone", "1d4", 20],
                    ["Commun", 80, "Digitale", "1d4", 20],
                    ["Commun", 80, "Passiflore", "1d4", 20],
                    ["Commun", 80, "Yopo", "1d4", 20],
                    ["Commun", 80, "Ginseng", "1d4", 20],
                    ["Commun", 80, "Feuille d'Harvatat", "1d4", 20],
                    ["Commun", 80, "Page du Codex - Botanica", "1", 70],
                    
                    ["Incommun", 15, "Sol", "10d100", 100],
                    ["Incommun", 15, "Protège-bras du Dévoreur de Songes", "1", 70],
                    ["Incommun", 15, "Potion (à identifier - Qualité 4)", "1d4", 50],
                    ["Incommun", 15, "Sacoche à composantes", "1", 100],
                    ["Incommun", 15, "Sacha Inchi", "1d4", 30],
                    ["Incommun", 15, "Absinthe", "1d4", 30],
                    ["Incommun", 15, "Belladone", "1d4", 30],
                    ["Incommun", 15, "Digitale", "1d4", 30],
                    ["Incommun", 15, "Passiflore", "1d4", 30],
                    ["Incommun", 15, "Yopo", "1d4", 30],
                    ["Incommun", 15, "Ginseng", "1d4", 30],
                    ["Incommun", 15, "Feuille d'Harvatat", "1d4", 30],
                    ["Incommun", 15, "Potion (à identifier - Qualité 1)", "1d6", 100],
                    ["Incommun", 15, "Page du Codex - Botanica", "1", 70],

                    ["Rare", 4, "Sol", "15d100", 100],
                    ["Rare", 4, "Protège-bras du Dévoreur de Songes", "1", 90],
                    ["Rare", 4, "Tenue Apu (école à définir)", "1", 10],
                    ["Rare", 4, "Potion (à identifier - Qualité 2)", "1d4", 100],
                    ["Rare", 4, "Sacha Inchi", "1d6", 30],
                    ["Rare", 4, "Absinthe", "1d6", 30],
                    ["Rare", 4, "Belladone", "1d6", 30],
                    ["Rare", 4, "Digitale", "1d6", 30],
                    ["Rare", 4, "Passiflore", "1d6", 30],
                    ["Rare", 4, "Yopo", "1d6", 30],
                    ["Rare", 4, "Ginseng", "1d6", 30],
                    ["Rare", 4, "Feuille d'Harvatat", "1d6", 30],
                    ["Rare", 4, "Page du Codex - Botanica", "1", 100],

                    ["Très rare", 0.9, "Sol", "20d100", 100],
                    ["Très rare", 0.9, "Page du Codex - Botanica", "1", 100],
                    ["Très rare", 0.9, "Potion (à identifier - Qualité 3)", "1d4", 100],
                    ["Très rare", 0.9, "Tenue Apu (école à définir)", "1", 50],
                    ["Très rare", 0.9, "Sang de lézard", "1", 100],
                    ["Très rare", 0.9, "Sacha Inchi", "1d6", 35],
                    ["Très rare", 0.9, "Absinthe", "1d6", 35],
                    ["Très rare", 0.9, "Belladone", "1d6", 35],
                    ["Très rare", 0.9, "Digitale", "1d6", 35],
                    ["Très rare", 0.9, "Passiflore", "1d6", 35],
                    ["Très rare", 0.9, "Yopo", "1d6", 35],
                    ["Très rare", 0.9, "Ginseng", "1d6", 35],
                    ["Très rare", 0.9, "Feuille d'Harvatat", "1d6", 35],

                    ["Légendaire", 0.1, "Sol", "30d100", 100],
                    ["Légendaire", 0.1, "Potion (à identifier - Qualité 4)", "1d4", 80],
                    ["Légendaire", 0.1, "Tenue Apu (école à définir)", "1", 90],
                    ["Légendaire", 0.1, "Sacha Inchi", "1d8", 50],
                    ["Légendaire", 0.1, "Absinthe", "1d8", 50],
                    ["Légendaire", 0.1, "Belladone", "1d8", 50],
                    ["Légendaire", 0.1, "Digitale", "1d8", 50],
                    ["Légendaire", 0.1, "Passiflore", "1d8", 50],
                    ["Légendaire", 0.1, "Yopo", "1d8", 50],
                    ["Légendaire", 0.1, "Ginseng", "1d8", 50],
                    ["Légendaire", 0.1, "Feuille d'Harvatat", "1d8", 50],
                    ["Légendaire", 0.1, "Potion (à identifier - Qualité 3)", "1d4", 100],
                    ["Légendaire", 0.1, "Page du Codex - Botanica", "1", 100]
                ]
            },
        },
        "Cultiste": {
            "Sbire": {
                meridiens: {
                    domination: [3, 4], savoir: [1, 2], expression: [1, 2],
                    puissance: [1, 1], mouvement: [2, 3], vitalite: [1, 2]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (Qualité 0)", 35],
                        ["Couteau (Qualité 0)", 33],
                        ["Épée courte (Qualité 0)", 15],
                        ["Urumi (Qualité 0)", 5],
                        ["Couteau de lancer (Qualité 0)", 8],
                        ["Fouet (à identifier - Qualité 1)", 2],
                        ["Double-lame (à identifier - Qualité 1)", 2]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 30],
                        ["Vêtements sales", 30],
                        ["Tenue de cultiste", 5],
                        ["Vêtements sombre", 30],
                        ["Gantelets aux Griffes d’Ombre", 2],
                        ["Protège-bras du Dévoreur de Songes", 1],
                        ["Robe de la Convergence noire", 2]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "2d6", 100],
                    ["Commun", 80, "Os de rongeurs", "1", 10],
                    ["Commun", 80, "Ossements gravés", "1", 5],

                    ["Incommun", 15, "Sol", "3d10", 100],
                    ["Incommun", 15, "Flasque de vin mêlé de sang", "1", 10],
                    ["Incommun", 15, "Ossements gravés", "1", 5],

                    ["Rare", 4, "Sol", "5d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Ossements gravés", "1", 10],
                    ["Rare", 4, "Idole cultiste", "1", 5],

                    ["Très rare", 0.9, "Sol", "10d10", 100],
                    ["Très rare", 0.9, "Idole cultiste", "1", 5],
                    ["Très rare", 0.9, "Page du Liber Mortiferae Stillæ", "1", 2],

                    ["Légendaire", 0.1, "Sol", "15d10", 100],
                    ["Légendaire", 0.1, "Idole cultiste", "1", 10],
                    ["Légendaire", 0.1, "Page du Liber Mortiferae Stillæ", "1", 5],
                    ["Légendaire", 0.1, "Page du Codex Umbrae Aeternae", "1", 5]
                ]
            },
            "Spécialiste": {
                meridiens: {
                    domination: [4, 8], savoir: [2, 6], expression: [2, 4],
                    puissance: [1, 2], mouvement: [2, 3], vitalite: [1, 3]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (à identifier - Qualité 1)", 25],
                        ["Couteau (à identifier - Qualité 1)", 25],
                        ["Épée courte (à identifier - Qualité 1)", 15],
                        ["Urumi (à identifier - Qualité 1)", 15],
                        ["Couteau de lancer (à identifier - Qualité 1)", 13],
                        ["Fouet (à identifier - Qualité 2)", 6],
                        ["Double-lame (à identifier - Qualité 2)", 1]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 20],
                        ["Vêtements sales", 20],
                        ["Tenue de cultiste", 10],
                        ["Vêtements sombre", 20],
                        ["Gantelets aux Griffes d’Ombre", 10],
                        ["Protège-bras du Dévoreur de Songes", 10],
                        ["Robe de la Convergence noire", 10]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "3d10", 100],
                    ["Commun", 80, "Flasque de vin mêlé de sang", "1", 10],
                    ["Commun", 80, "Ossements gravés", "1", 5],

                    ["Incommun", 15, "Sol", "5d10", 100],
                    ["Incommun", 15, "Flasque de vin mêlé de sang", "1", 10],
                    ["Incommun", 15, "Ossements gravés", "1", 5],

                    ["Rare", 4, "Sol", "10d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Anneau de la vision claire", "1", 2],
                    ["Rare", 4, "Idole cultiste", "1", 5],

                    ["Très rare", 0.9, "Sol", "15d10", 100],
                    ["Très rare", 0.9, "Idole cultiste", "1", 10],
                    ["Très rare", 0.9, "Anneau de la vision claire", "1", 5],
                    ["Très rare", 0.9, "Page du Liber Mortiferae Stillæ", "1", 5],

                    ["Légendaire", 0.1, "Sol", "20d10", 100],
                    ["Légendaire", 0.1, "Anneau de la vision claire", "1", 10],
                    ["Légendaire", 0.1, "Page du Liber Mortiferae Stillæ", "1", 10],
                    ["Légendaire", 0.1, "Page du Codex Umbrae Aeternae", "1", 10]
                ]
            },
            "Lieutenant": {
                meridiens: {
                    domination: [7, 9], savoir: [5, 7], expression: [2, 4],
                    puissance: [1, 3], mouvement: [3, 6], vitalite: [3, 6]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (à identifier - Qualité 2)", 15],
                        ["Couteau (à identifier - Qualité 2)", 15],
                        ["Épée courte (à identifier - Qualité 2)", 15],
                        ["Urumi (à identifier - Qualité 3)", 15],
                        ["Couteau de lancer (à identifier - Qualité 2)", 15],
                        ["Fouet (à identifier - Qualité 3)", 15],
                        ["Double-lame (à identifier - Qualité 3)", 10]
                    ],
                    tenue: [
                        ["Vêtements sombre", 30],
                        ["Botte de la Convergence noire", 10],
                        ["Capuche de la Convergence noire", 10],
                        ["Tenue de cultiste", 20],
                        ["Gantelets aux Griffes d’Ombre", 10],
                        ["Protège-bras du Dévoreur de Songes", 10],
                        ["Robe de la Convergence noire", 10]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d10", 100],
                    ["Commun", 80, "Flasque de vin mêlé de sang", "1", 40],
                    ["Commun", 80, "Ossements gravés", "1", 35],

                    ["Incommun", 15, "Sol", "10d10", 100],
                    ["Incommun", 15, "Flasque de vin mêlé de sang", "1", 50],
                    ["Incommun", 15, "Ossements gravés", "1", 50],

                    ["Rare", 4, "Sol", "15d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Anneau de la vision claire", "1", 20],
                    ["Rare", 4, "Idole cultiste", "1", 50],

                    ["Très rare", 0.9, "Sol", "20d10", 100],
                    ["Très rare", 0.9, "Idole cultiste", "1", 50],
                    ["Très rare", 0.9, "Anneau de la vision claire", "1", 25],
                    ["Très rare", 0.9, "Page du Liber Mortiferae Stillæ", "1", 20],

                    ["Légendaire", 0.1, "Sol", "5d100", 100],
                    ["Légendaire", 0.1, "Anneau de la vision claire", "1", 25],
                    ["Légendaire", 0.1, "Murmure d’obsidienne (Qualité 4+)", "1", 15],
                    ["Légendaire", 0.1, "Page du Liber Mortiferae Stillæ", "1", 30],
                    ["Légendaire", 0.1, "Page du Codex Umbrae Aeternae", "1", 30]
                ]
            },
            "Némésis": {
                meridiens: {
                    domination: [12, 17], savoir: [6, 9], expression: [4, 8],
                    puissance: [4, 7], mouvement: [6, 7], vitalite: [6, 9]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (à identifier - Qualité 3)", 15],
                        ["Couteau (à identifier - Qualité 4)", 15],
                        ["Épée courte (à identifier - Qualité 3)", 15],
                        ["Urumi (à identifier - Qualité 4)", 15],
                        ["Couteau de lancer (à identifier - Qualité 3)", 15],
                        ["Fouet (à identifier - Qualité 4)", 15],
                        ["Double-lame (à identifier - Qualité 4)", 10]
                    ],
                    tenue: [
                        ["Botte de la Convergence noire", 20],
                        ["Capuche de la Convergence noire", 20],
                        ["Tenue de cultiste", 10],
                        ["Gantelets aux Griffes d’Ombre", 10],
                        ["Protège-bras du Dévoreur de Songes", 20],
                        ["Robe de la Convergence noire", 20]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d100", 100],
                    ["Commun", 80, "Flasque de vin mêlé de sang", "1", 70],
                    ["Commun", 80, "Idole cultiste", "1", 70],
                    ["Commun", 80, "Anneau de la vision claire", "1", 50],
                    ["Commun", 80, "Murmure d’obsidienne (Qualité 4+)", "1", 30],
                    ["Commun", 80, "Ossements gravés", "1", 70],
                    ["Commun", 80, "Page du Liber Mortiferae Stillæ", "1", 30],
                    ["Commun", 80, "Page du Codex Umbrae Aeternae", "1", 30],

                    ["Incommun", 15, "Sol", "10d100", 100],
                    ["Incommun", 15, "Idole cultiste", "1", 100],
                    ["Incommun", 15, "Flasque de vin mêlé de sang", "1", 100],
                    ["Incommun", 15, "Anneau de la vision claire", "1", 70],
                    ["Incommun", 15, "Murmure d’obsidienne (Qualité 4+)", "1", 50],
                    ["Incommun", 15, "Ossements gravés", "1", 100],
                    ["Incommun", 15, "Page du Codex Umbrae Aeternae", "1", 50],
                    ["Incommun", 15, "Page du Liber Mortiferae Stillæ", "1", 50],

                    ["Rare", 4, "Sol", "15d100", 100],
                    ["Rare", 4, "Murmure d’obsidienne (Qualité 4+)", "1", 70],
                    ["Rare", 4, "Murmure d’obsidienne ultime (Légendaire)", "1", 10],
                    ["Rare", 4, "Idole cultiste", "1", 100],
                    ["Rare", 4, "Anneau de la vision claire", "1", 100],
                    ["Rare", 4, "Flasque de vin mêlé de sang", "1", 100],
                    ["Rare", 4, "Page du Codex Umbrae Aeternae", "1", 70],
                    ["Rare", 4, "Page du Liber Mortiferae Stillæ", "1", 70],

                    ["Très rare", 0.9, "Sol", "20d100", 100],
                    ["Très rare", 0.9, "Idole cultiste", "1", 100],
                    ["Très rare", 0.9, "Murmure d’obsidienne ultime (Légendaire)", "1", 50],
                    ["Très rare", 0.9, "Murmure d’obsidienne (Qualité 4+)", "1", 80],
                    ["Très rare", 0.9, "Page du Codex Umbrae Aeternae", "1", 80],
                    ["Très rare", 0.9, "Anneau de la vision claire", "1", 100],
                    ["Très rare", 0.9, "Page du Liber Mortiferae Stillæ", "1", 100],

                    ["Légendaire", 0.1, "Sol", "30d100", 100],
                    ["Légendaire", 0.1, "Anneau de la vision claire", "1", 100],
                    ["Légendaire", 0.1, "Murmure d’obsidienne ultime (Légendaire)", "1", 90],
                    ["Légendaire", 0.1, "Idole cultiste", "1", 100],
                    ["Légendaire", 0.1, "Flasque de vin mêlé de sang", "1", 100],
                    ["Légendaire", 0.1, "Page du Liber Mortiferae Stillæ", "1", 100],
                    ["Légendaire", 0.1, "Page du Codex Umbrae Aeternae", "1", 100]
                ]
            },
        },
        "Garde": {
            "Sbire": {
                meridiens: {
                    domination: [1, 2], savoir: [1, 1], expression: [1, 2],
                    puissance: [2, 4], mouvement: [2, 4], vitalite: [1, 4]
                },
                equipementEssentiel: {
                    arme: [
                        ["Épée courte (Qualité 0)", 7],
                        ["Épée longue (Qualité 0)", 7],
                        ["Cimeterre (Qualité 0)", 7],
                        ["Lance (Qualité 0)", 7],
                        ["Bâton (Qualité 0)", 7],
                        ["Hallebarde (Qualité 0)", 7],
                        
                        ["Marteau (Qualité 0)", 4],
                        ["Chaîne à deux kamas (Qualité 0)", 4],
                        ["Double-lame (Qualité 0)", 4],
                        ["Bardiche (Qualité 0)", 4],
                        ["Épée bâtarde (Qualité 0)", 4],
                        ["Fouet (Qualité 0)", 4],
                        ["Rapière (Qualité 0)", 4],
                        ["Sabre (Qualité 0)", 4],
                        
                        ["Épée large (Qualité 0)", 2],
                        ["Chaîne cloutée (Qualité 0)", 2],
                        ["Masse (Qualité 0)", 2],
                        ["Tonfa (Qualité 0)", 2],
                        ["Jitte (Qualité 0)", 2],
                        ["Javeline (Qualité 0)", 2],
                        ["Tomahawk (Qualité 0)", 2],
                        ["Sansetsukon (Qualité 0)", 2],
                        ["Marteau à long manche (Qualité 0)", 2],
                        ["Morgenstern (Qualité 0)", 2],
                        
                        ["Épée à deux mains (à identifier - Qualité 1)", 1],
                        ["Hallebarde rétractable (à identifier - Qualité 1)", 1],
                        ["Épée longue (à identifier - Qualité 1)", 1],
                        ["Nunchaku (à identifier - Qualité 1)", 1],
                        ["Lance (à identifier - Qualité 1)", 1],
                        ["Rapière (à identifier - Qualité 1)", 1]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 50],
                        ["Vêtements sales", 30],
                        ["Gambison usé", 10],
                        ["Botte d'aventurier", 1],
                        ["Masque du Souffle Ancien", 1],
                        ["Torse sanglant du Souffle Ancien", 1],
                        ["Tenue du Bois Fossile", 1],
                        ["Veste de l'Escrimeur élégant", 0.5],
                        ["Chapeau de l'Escrimeur élégant", 0.5],
                        ["Protège-Bras de l'Escrimeur élégant", 0.5],
                        ["Grèves de l'Escrimeur élégant", 0.5],
                        ["Casque de la Sentinelle", 0.5],
                        ["Plastron de la Sentinelle", 0.5],
                        ["Garde-Bras de la Sentinelle", 0.5],
                        ["Jambières de la Sentinelle", 0.5],
                        ["Tenue du Bastion imprenable", 0.5],
                        ["Tunique Cloutée", 0.5],-
                        ["Pantalon renforcé", 0.2],
                        ["Gantelet renforcé", 0.1],
                        ["Torse du Puma des Cimes", 0.1],
                        ["Gantelets de la Main Sépulcrale", 0.1],
                        ["Pantalon de la Main Sépulcrale", 0.1],
                        ["Masque du Puma des Cimes", 0.1],
                        ["Jambières du Puma des Cimes", 0.1],
                        ["Gantelets du Puma des Cimes", 0.1],
                        ["Gambison (à identifier - Qualité 1)", 0.1]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "2d6", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Pierre à aiguiser", "1", 15],
                    ["Commun", 80, "Laissez-passer", "1", 5],
                    ["Commun", 80, "Jeu de carte", "1", 5],
                    ["Commun", 80, "Jeu de base pukllay", "1", 5],

                    ["Incommun", 15, "Sol", "3d10", 100],
                    ["Incommun", 15, "Laissez-passer", "1", 5],
                    ["Incommun", 15, "Lettre compromettante", "1", 1],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Ordre scellé", "1", 1],

                    ["Rare", 4, "Sol", "5d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Pierre à aiguiser", "1", 50],
                    ["Rare", 4, "Torche", "1", 50],
                    ["Rare", 4, "Lettre compromettante", "1", 2],
                    ["Rare", 4, "Ordre scellé", "1", 2],
                    ["Rare", 4, "Bouclier (à identifier - Qualité 1)", "1", 2],

                    ["Très rare", 0.9, "Sol", "10d10", 100],
                    ["Très rare", 0.9, "Lettre compromettante", "1", 5],
                    ["Très rare", 0.9, "Torche", "1", 70],
                    ["Très rare", 0.9, "Ordre scellé", "1", 5],
                    ["Très rare", 0.9, "Laissez-passer", "1", 20],
                    ["Très rare", 0.9, "Pierre à aiguiser", "1", 50],

                    ["Légendaire", 0.1, "Sol", "15d10", 100],
                    ["Légendaire", 0.1, "Laissez-passer", "1", 50],
                    ["Légendaire", 0.1, "Torche", "1", 100],
                    ["Légendaire", 0.1, "Ordre scellé", "1", 10],
                    ["Légendaire", 0.1, "Lettre compromettante", "1", 10],
                    ["Légendaire", 0.1, "Pierre de Vrill (à identifier - Qualité 1)", "1", 5]
                ]
            },
            "Spécialiste": {
                meridiens: {
                    domination: [1, 2], savoir: [2, 3], expression: [1, 2],
                    puissance: [4, 6], mouvement: [3, 6], vitalite: [3, 6]
                },
                equipementEssentiel: {
                    arme: [
                        ["Épée courte (à identifier - Qualité 1)", 7],
                        ["Épée longue (à identifier - Qualité 1)", 7],
                        ["Cimeterre (à identifier - Qualité 1)", 7],
                        ["Lance (à identifier - Qualité 1)", 7],
                        ["Bâton (à identifier - Qualité 1)", 7],
                        ["Hallebarde (à identifier - Qualité 1)", 7],
                        
                        ["Marteau (à identifier - Qualité 1)", 4],
                        ["Chaîne à deux kamas (à identifier - Qualité 1)", 4],
                        ["Double-lame (à identifier - Qualité 1)", 4],
                        ["Bardiche (à identifier - Qualité 1)", 4],
                        ["Épée bâtarde (à identifier - Qualité 1)", 4],
                        ["Fouet (à identifier - Qualité 1)", 4],
                        ["Rapière (à identifier - Qualité 1)", 4],
                        ["Sabre (à identifier - Qualité 1)", 4],
                        
                        ["Épée large (à identifier - Qualité 1)", 2],
                        ["Chaîne cloutée (à identifier - Qualité 1)", 2],
                        ["Masse (à identifier - Qualité 1)", 2],
                        ["Tonfa (à identifier - Qualité 1)", 2],
                        ["Jitte (à identifier - Qualité 1)", 2],
                        ["Javeline (à identifier - Qualité 1)", 2],
                        ["Tomahawk (à identifier - Qualité 1)", 2],
                        ["Sansetsukon (à identifier - Qualité 1)", 2],
                        ["Marteau à long manche (à identifier - Qualité 1)", 2],
                        ["Morgenstern (à identifier - Qualité 1)", 2],
                        
                        ["Épée à deux mains (à identifier - Qualité 2)", 1],
                        ["Hallebarde rétractable (à identifier - Qualité 2)", 1],
                        ["Épée longue (à identifier - Qualité 2)", 1],
                        ["Nunchaku (à identifier - Qualité 2)", 1],
                        ["Lance (à identifier - Qualité 2)", 1],
                        ["Rapière (à identifier - Qualité 2)", 1]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 15],
                        ["Vêtements sales", 30],
                        ["Gambison usé", 15],
                        ["Botte d'aventurier", 2],
                        ["Masque du Souffle Ancien", 1],
                        ["Torse sanglant du Souffle Ancien", 2],
                        ["Tenue du Bois Fossile", 2],
                        ["Veste de l'Escrimeur élégant", 2],
                        ["Chapeau de l'Escrimeur élégant", 2],
                        ["Protège-Bras de l'Escrimeur élégant", 2],
                        ["Grèves de l'Escrimeur élégant", 2],
                        ["Casque de la Sentinelle", 2],
                        ["Plastron de la Sentinelle", 2],
                        ["Garde-Bras de la Sentinelle", 2],
                        ["Jambières de la Sentinelle", 2],
                        ["Tenue du Bastion imprenable", 2],
                        ["Tunique Cloutée", 2],
                        ["Pantalon renforcé", 2],
                        ["Gantelet renforcé", 2],
                        ["Torse du Puma des Cimes", 2],
                        ["Gantelets de la Main Sépulcrale", 1],
                        ["Pantalon de la Main Sépulcrale", 1],
                        ["Masque du Puma des Cimes", 1],
                        ["Jambières du Puma des Cimes", 1],
                        ["Gantelets du Puma des Cimes", 1],
                        ["Gambison (à identifier - Qualité 1)", 2]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "3d10", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Pierre à aiguiser", "1", 20],
                    ["Commun", 80, "Laissez-passer", "1", 10],
                    ["Commun", 80, "Jeu de carte", "1", 5],
                    ["Commun", 80, "Jeu de base pukllay", "1", 50],

                    ["Incommun", 15, "Sol", "5d10", 100],
                    ["Incommun", 15, "Laissez-passer", "1", 10],
                    ["Incommun", 15, "Lettre compromettante", "1", 1],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Ordre scellé", "1", 1],
                    ["Incommun", 15, "Bouclier (à identifier - Qualité 2)", "1", 1],

                    ["Rare", 4, "Sol", "10d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Pierre à aiguiser", "1", 50],
                    ["Rare", 4, "Torche", "1", 50],
                    ["Rare", 4, "Lettre compromettante", "1", 2],
                    ["Rare", 4, "Ordre scellé", "1", 2],
                    ["Rare", 4, "Bouclier (à identifier - Qualité 2)", "1", 2],

                    ["Très rare", 0.9, "Sol", "15d10", 100],
                    ["Très rare", 0.9, "Lettre compromettante", "1", 5],
                    ["Très rare", 0.9, "Torche", "1", 70],
                    ["Très rare", 0.9, "Ordre scellé", "1", 5],
                    ["Très rare", 0.9, "Laissez-passer", "1", 20],
                    ["Très rare", 0.9, "Pierre à aiguiser", "1", 50],

                    ["Légendaire", 0.1, "Sol", "20d10", 100],
                    ["Légendaire", 0.1, "Laissez-passer", "1", 50],
                    ["Légendaire", 0.1, "Torche", "1", 100],
                    ["Légendaire", 0.1, "Ordre scellé", "1", 10],
                    ["Légendaire", 0.1, "Lettre compromettante", "1", 10],
                    ["Légendaire", 0.1, "Bouclier (à identifier - Qualité 2)", "1", 10],
                    ["Légendaire", 0.1, "Pierre de Vrill (à identifier - Qualité 1)", "1", 5]
                ]
            },
            "Lieutenant": {
                meridiens: {
                    domination: [2, 4], savoir: [2, 4], expression: [2, 5],
                    puissance: [5, 9], mouvement: [6, 9], vitalite: [5, 9]
                },
                equipementEssentiel: {
                    arme: [
                        ["Épée courte (à identifier - Qualité 2)", 7],
                        ["Épée longue (à identifier - Qualité 2)", 7],
                        ["Cimeterre (à identifier - Qualité 2)", 7],
                        ["Lance (à identifier - Qualité 2)", 7],
                        ["Bâton (à identifier - Qualité 2)", 7],
                        ["Hallebarde (à identifier - Qualité 2)", 7],
                        
                        ["Marteau (à identifier - Qualité 2)", 4],
                        ["Chaîne à deux kamas (à identifier - Qualité 2)", 4],
                        ["Double-lame (à identifier - Qualité 2)", 4],
                        ["Bardiche (à identifier - Qualité 2)", 4],
                        ["Épée bâtarde (à identifier - Qualité 2)", 4],
                        ["Fouet (à identifier - Qualité 2)", 4],
                        ["Rapière (à identifier - Qualité 2)", 4],
                        ["Sabre (à identifier - Qualité 2)", 4],
                        
                        ["Épée large (à identifier - Qualité 2)", 2],
                        ["Chaîne cloutée (à identifier - Qualité 2)", 2],
                        ["Masse (à identifier - Qualité 2)", 2],
                        ["Tonfa (à identifier - Qualité 2)", 2],
                        ["Jitte (à identifier - Qualité 2)", 2],
                        ["Javeline (à identifier - Qualité 2)", 2],
                        ["Tomahawk (à identifier - Qualité 2)", 2],
                        ["Sansetsukon (à identifier - Qualité 2)", 2],
                        ["Marteau à long manche (à identifier - Qualité 2)", 2],
                        ["Morgenstern (à identifier - Qualité 2)", 2],
                        
                        ["Épée à deux mains (à identifier - Qualité 3)", 1],
                        ["Hallebarde rétractable (à identifier - Qualité 3)", 1],
                        ["Épée longue (à identifier - Qualité 3)", 1],
                        ["Nunchaku (à identifier - Qualité 3)", 1],
                        ["Lance (à identifier - Qualité 3)", 1],
                        ["Rapière (à identifier - Qualité 3)", 1]
                    ],
                    tenue: [
                        ["Vêtements sales", 15],
                        ["Gambison usé", 15],
                        ["Botte d'aventurier", 3],
                        ["Masque du Souffle Ancien", 3],
                        ["Torse sanglant du Souffle Ancien", 3],
                        ["Tenue du Bois Fossile", 3],
                        ["Veste de l'Escrimeur élégant", 5],
                        ["Chapeau de l'Escrimeur élégant", 3],
                        ["Protège-Bras de l'Escrimeur élégant", 3],
                        ["Grèves de l'Escrimeur élégant", 3],
                        ["Casque de la Sentinelle", 3],
                        ["Plastron de la Sentinelle", 5],
                        ["Garde-Bras de la Sentinelle", 3],
                        ["Jambières de la Sentinelle", 3],
                        ["Tenue du Bastion imprenable", 5],
                        ["Tunique Cloutée", 3],
                        ["Pantalon renforcé", 3],
                        ["Gantelet renforcé", 3],
                        ["Torse du Puma des Cimes", 1],
                        ["Gantelets de la Main Sépulcrale", 1],
                        ["Pantalon de la Main Sépulcrale", 1],
                        ["Masque du Puma des Cimes", 1],
                        ["Jambières du Puma des Cimes", 1],
                        ["Gantelets du Puma des Cimes", 1],
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d10", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Pierre à aiguiser", "1", 15],
                    ["Commun", 80, "Laissez-passer", "1", 10],
                    ["Commun", 80, "Jeu de carte", "1", 15],
                    ["Commun", 80, "Jeu de base pukllay", "1", 15],
                    ["Commun", 80, "Bouclier (à identifier - Qualité 2)", "1", 2],

                    ["Incommun", 15, "Sol", "10d10", 100],
                    ["Incommun", 15, "Laissez-passer", "1", 10],
                    ["Incommun", 15, "Lettre compromettante", "1", 10],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Ordre scellé", "1", 10],
                    ["Incommun", 15, "Bouclier (à identifier - Qualité 2)", "1", 5],

                    ["Rare", 4, "Sol", "15d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Pierre à aiguiser", "1", 70],
                    ["Rare", 4, "Torche", "1", 50],
                    ["Rare", 4, "Lettre compromettante", "1", 2],
                    ["Rare", 4, "Ordre scellé", "1", 2],
                    ["Rare", 4, "Bouclier (à identifier - Qualité 2)", "1", 10],

                    ["Très rare", 0.9, "Sol", "20d10", 100],
                    ["Très rare", 0.9, "Lettre compromettante", "1", 5],
                    ["Très rare", 0.9, "Torche", "1", 70],
                    ["Très rare", 0.9, "Ordre scellé", "1", 5],
                    ["Très rare", 0.9, "Laissez-passer", "1", 20],
                    ["Très rare", 0.9, "Pierre à aiguiser", "1", 100],
                    ["Très rare", 0.9, "Bouclier (à identifier - Qualité 3)", "1", 15],

                    ["Légendaire", 0.1, "Sol", "5d100", 100],
                    ["Légendaire", 0.1, "Laissez-passer", "1", 50],
                    ["Légendaire", 0.1, "Torche", "1", 100],
                    ["Légendaire", 0.1, "Ordre scellé", "1", 10],
                    ["Légendaire", 0.1, "Lettre compromettante", "1", 10],
                    ["Légendaire", 0.1, "Pierre de Vrill (à identifier - Qualité 1)", "1", 5]
                ]
            },
            "Némésis": {
                meridiens: {
                    domination: [4, 8], savoir: [4, 8], expression: [4, 8],
                    puissance: [8, 13], mouvement: [9, 13], vitalite: [8, 13]
                },
                equipementEssentiel: {
                    arme: [
                        ["Épée courte (à identifier - Qualité 3)", 7],
                        ["Épée longue (à identifier - Qualité 3)", 7],
                        ["Cimeterre (à identifier - Qualité 3)", 7],
                        ["Lance (à identifier - Qualité 3)", 7],
                        ["Bâton (à identifier - Qualité 3)", 7],
                        ["Hallebarde (à identifier - Qualité 4)", 7],
                        
                        ["Marteau (à identifier - Qualité 4)", 4],
                        ["Chaîne à deux kamas (à identifier - Qualité 4)", 4],
                        ["Double-lame (à identifier - Qualité 4)", 4],
                        ["Bardiche (à identifier - Qualité 4)", 4],
                        ["Épée bâtarde (à identifier - Qualité 4)", 4],
                        ["Fouet (à identifier - Qualité 4)", 4],
                        ["Rapière (à identifier - Qualité 3)", 4],
                        ["Sabre (à identifier - Qualité 4)", 4],
                        
                        ["Épée large (à identifier - Qualité 4)", 2],
                        ["Chaîne cloutée (à identifier - Qualité 4)", 2],
                        ["Masse (à identifier - Qualité 4)", 2],
                        ["Tonfa (à identifier - Qualité 4)", 2],
                        ["Jitte (à identifier - Qualité 4)", 2],
                        ["Javeline (à identifier - Qualité 4)", 2],
                        ["Tomahawk (à identifier - Qualité 4)", 2],
                        ["Sansetsukon (à identifier - Qualité 4)", 2],
                        ["Marteau à long manche (à identifier - Qualité 4)", 2],
                        ["Morgenstern (à identifier - Qualité 4)", 2],
                        
                        ["Épée à deux mains (à identifier - Qualité 4)", 1],
                        ["Hallebarde rétractable (à identifier - Qualité 4)", 1],
                        ["Épée longue (à identifier - Qualité 4)", 1],
                        ["Nunchaku (à identifier - Qualité 4)", 1],
                        ["Lance (à identifier - Qualité 4)", 1],
                        ["Rapière (à identifier - Qualité 4)", 1]
                    ],
                    tenue: [
                        ["Botte d'aventurier", 1],
                        ["Masque du Souffle Ancien", 1],
                        ["Torse sanglant du Souffle Ancien", 1],
                        ["Tenue du Bois Fossile", 10],
                        ["Veste de l'Escrimeur élégant", 10],
                        ["Protège-Bras de l'Escrimeur élégant", 10],
                        ["Grèves de l'Escrimeur élégant", 10],
                        ["Plastron de la Sentinelle", 0.1],
                        ["Garde-Bras de la Sentinelle", 0.1],
                        ["Jambières de la Sentinelle", 0.1],
                        ["Tenue du Bastion imprenable", 0.1],
                        ["Tunique Cloutée", 0.1],
                        ["Pantalon renforcé", 0.1],
                        ["Gantelet renforcé", 0.1],
                        ["Torse du Puma des Cimes", 0.1],
                        ["Gantelets de la Main Sépulcrale", 0.1],
                        ["Pantalon de la Main Sépulcrale", 0.1],
                        ["Masque du Puma des Cimes", 0.1],
                        ["Jambières du Puma des Cimes", 0.1],
                        ["Gantelets du Puma des Cimes", 0.1],
                        ["Gambison (à identifier - Qualité 1)", 0.1]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d100", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Pierre à aiguiser", "1", 10],
                    ["Commun", 80, "Laissez-passer", "1", 1],
                    ["Commun", 80, "Chapeau de l'Escrimeur élégant", "1", 50],
                    ["Commun", 80, "Veste de l'Escrimeur élégant", "1", 50],
                    ["Commun", 80, "Protège-Bras de l'Escrimeur élégant", "1", 50],
                    ["Commun", 80, "Grèves de l'Escrimeur élégant", "1", 50],
                    ["Commun", 80, "Casque de la Sentinelle", "1", 50],
                    ["Commun", 80, "Jeu de base pukllay", "1", 100],

                    ["Incommun", 15, "Sol", "10d100", 100],
                    ["Incommun", 15, "Laissez-passer", "1", 100],
                    ["Incommun", 15, "Lettre compromettante", "1", 70],
                    ["Incommun", 15, "Rations", "1d4", 100],
                    ["Incommun", 15, "Ordre scellé", "1", 100],
                    ["Incommun", 15, "Chapeau de l'Escrimeur élégant", "1", 70],
                    ["Incommun", 15, "Casque de la Sentinelle", "1", 50],
                    ["Incommun", 15, "Garde-Bras de la Sentinelle", "1", 50],
                    ["Incommun", 15, "Plastron de la Sentinelle", "1", 50],
                    ["Incommun", 15, "Jambières de la Sentinelle", "1", 50],

                    ["Rare", 4, "Sol", "15d100", 100],
                    ["Rare", 4, "Rations", "1d6", 100],
                    ["Rare", 4, "Pierre à aiguiser", "1", 100],
                    ["Rare", 4, "Torche", "1", 100],
                    ["Rare", 4, "Lettre compromettante", "1", 100],
                    ["Rare", 4, "Ordre scellé", "1", 100],
                    ["Rare", 4, "Chapeau de l'Escrimeur élégant", "1", 70],
                    ["Rare", 4, "Veste de l'Escrimeur élégant", "1", 70],
                    ["Rare", 4, "Protège-Bras de l'Escrimeur élégant", "1", 70],
                    ["Rare", 4, "Grèves de l'Escrimeur élégant", "1", 70],
                    ["Rare", 4, "Casque de la Sentinelle", "1", 70],
                    ["Rare", 4, "Garde-Bras de la Sentinelle", "1", 70],
                    ["Rare", 4, "Plastron de la Sentinelle", "1", 70],
                    ["Rare", 4, "Jambières de la Sentinelle", "1", 70],

                    ["Très rare", 0.9, "Sol", "20d100", 100],
                    ["Très rare", 0.9, "Lettre compromettante", "1", 100],
                    ["Très rare", 0.9, "Torche", "1", 100],
                    ["Très rare", 0.9, "Ordre scellé", "1", 100],
                    ["Très rare", 0.9, "Laissez-passer", "1", 100],
                    ["Très rare", 0.9, "Pierre à aiguiser", "1", 100],
                    ["Très rare", 0.9, "Chapeau de l'Escrimeur élégant", "1", 80],
                    ["Très rare", 0.9, "Veste de l'Escrimeur élégant", "1", 80],
                    ["Très rare", 0.9, "Protège-Bras de l'Escrimeur élégant", "1", 80],
                    ["Très rare", 0.9, "Grèves de l'Escrimeur élégant", "1", 80],
                    ["Très rare", 0.9, "Casque de la Sentinelle", "1", 80],
                    ["Très rare", 0.9, "Garde-Bras de la Sentinelle", "1", 80],
                    ["Très rare", 0.9, "Plastron de la Sentinelle", "1", 80],
                    ["Très rare", 0.9, "Jambières de la Sentinelle", "1", 80],

                    ["Légendaire", 0.1, "Sol", "30d100", 100],
                    ["Légendaire", 0.1, "Laissez-passer", "1", 100],
                    ["Légendaire", 0.1, "Torche", "1", 100],
                    ["Légendaire", 0.1, "Ordre scellé", "1", 100],
                    ["Légendaire", 0.1, "Lettre compromettante", "1", 100],
                    ["Légendaire", 0.1, "Chapeau de l'Escrimeur élégant", "1", 90],
                    ["Légendaire", 0.1, "Veste de l'Escrimeur élégant", "1", 90],
                    ["Légendaire", 0.1, "Protège-Bras de l'Escrimeur élégant", "1", 90],
                    ["Légendaire", 0.1, "Grèves de l'Escrimeur élégant", "1", 90],
                    ["Légendaire", 0.1, "Casque de la Sentinelle", "1", 90],
                    ["Légendaire", 0.1, "Garde-Bras de la Sentinelle", "1", 90],
                    ["Légendaire", 0.1, "Plastron de la Sentinelle", "1", 90],
                    ["Légendaire", 0.1, "Jambières de la Sentinelle", "1", 90],
                    ["Légendaire", 0.1, "Pierre de Vrill (à identifier - Qualité 3)", "1", 90]
                ]
            },
        },
        "Chasseur": {
            "Sbire": {
                meridiens: {
                    domination: [1, 1], savoir: [1, 2], expression: [2, 3],
                    puissance: [2, 5], mouvement: [2, 6], vitalite: [2, 3]
                },
                equipementEssentiel: {
                    arme: [
                        ["Arbalète (Qualité 0)", 16],
                        ["Arc court (Qualité 0)", 20],
                        ["Arc long (Qualité 0)", 15],
                        ["Lance (Qualité 0)", 15],
                        ["Atlatl (Qualité 0)", 10],
                        ["Boomerang (Qualité 0)", 10],
                        ["Fronde (Qualité 0)", 10],
                        ["Cracheur des Anciens (Qualité 0)", 1],
                        ["Arc court (à identifier - Qualité 1)", 1],
                        ["Arbalète (à identifier - Qualité 1)", 1],
                        ["Arc long (à identifier - Qualité 1)", 0.8],
                        ["Grand cracheur (à identifier - Qualité 1)", 0.2]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 50],
                        ["Vêtements sales", 30],
                        ["Gambison usé", 10],
                        ["Tunique des Rivières Tressées", 1],
                        ["Botte d'aventurier", 1],
                        ["Bottes du Serpent de Cuivre", 1],
                        ["Manteau du Maître Corbeau Gris", 1],
                        ["Capuche du Maître Corbeau Gris", 1],
                        ["Casque de l’Aigle de Nuit", 1],
                        ["Gantelets de l’Aigle de Nuit", 1],
                        ["Jambières de l’Aigle de Nuit", 1],
                        ["Protège-épaules de l’Aigle de Nuit", 0.5],
                        ["Protège-Bras de l'Escrimeur élégant", 0.5],
                        ["Tenue de brigand", 0.5],
                        ["Veste de l'Escrimeur élégant", 0.5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "2d6", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Fourrure épaisse", "1", 10],
                    ["Commun", 80, "Outre vide", "1", 5],
                    ["Commun", 80, "Paillasse", "1", 5],
                    ["Commun", 80, "Piège à collet", "1", 5],
                    ["Commun", 80, "Piège à mâchoires", "1", 5],
                    ["Commun", 80, "Silex et amorce", "1", 5],
                    ["Commun", 80, "Sifflet silencieux", "1", 5],

                    ["Incommun", 15, "Sol", "3d10", 100],
                    ["Incommun", 15, "Outre d'alcool fort", "1", 20],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Paillasse", "1", 5],
                    ["Incommun", 15, "Piège à collet", "1", 5],
                    ["Incommun", 15, "Piège à mâchoires", "1", 5],
                    ["Incommun", 15, "Silex et amorce", "1", 5],
                    ["Incommun", 15, "Sifflet silencieux", "1", 5],

                    ["Rare", 4, "Sol", "5d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Paillasse", "1", 10],
                    ["Rare", 4, "Piège à collet", "1", 10],
                    ["Rare", 4, "Piège à mâchoires", "1", 10],
                    ["Rare", 4, "Silex et amorce", "1", 10],
                    ["Rare", 4, "Sifflet silencieux", "1", 10],

                    ["Très rare", 0.9, "Sol", "10d10", 100],
                    ["Très rare", 0.9, "Paillasse", "1", 2],
                    ["Très rare", 0.9, "Piège à collet", "1", 2],
                    ["Très rare", 0.9, "Piège à mâchoires", "1", 2],
                    ["Très rare", 0.9, "Silex et amorce", "1", 2],
                    ["Très rare", 0.9, "Sifflet silencieux", "1", 2],

                    ["Légendaire", 0.1, "Sol", "15d10", 100],
                    ["Légendaire", 0.1, "Paillasse", "1", 5],
                    ["Légendaire", 0.1, "Piège à collet", "1", 5],
                    ["Légendaire", 0.1, "Piège à mâchoires", "1", 5],
                    ["Légendaire", 0.1, "Silex et amorce", "1", 5],
                    ["Légendaire", 0.1, "Sifflet silencieux", "1", 5]
                ]
            },
            "Spécialiste": {
                meridiens: {
                    domination: [1, 2], savoir: [2, 3], expression: [1, 2],
                    puissance: [2, 4], mouvement: [3, 7], vitalite: [3, 4]
                },
                equipementEssentiel: {
                    arme: [
                        ["Arbalète (à identifier - Qualité 1)", 16],
                        ["Arc court (à identifier - Qualité 1)", 20],
                        ["Arc long (à identifier - Qualité 1)", 15],
                        ["Lance (à identifier - Qualité 1)", 15],
                        ["Atlatl (à identifier - Qualité 1)", 10],
                        ["Boomerang (à identifier - Qualité 1)", 10],
                        ["Fronde (à identifier - Qualité 1)", 10],
                        ["Cracheur des Anciens (à identifier - Qualité 1)", 1],
                        ["Arc court (à identifier - Qualité 2)", 1],
                        ["Arbalète (à identifier - Qualité 2)", 1],
                        ["Arc long (à identifier - Qualité 2)", 0.8],
                        ["Grand cracheur (à identifier - Qualité 2)", 0.2]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 20],
                        ["Vêtements sales", 30],
                        ["Gambison usé", 10],
                        ["Tunique des Rivières Tressées", 4],
                        ["Botte d'aventurier", 4],
                        ["Bottes du Serpent de Cuivre", 4],
                        ["Manteau du Maître Corbeau Gris", 4],
                        ["Capuche du Maître Corbeau Gris", 3],
                        ["Casque de l’Aigle de Nuit", 3],
                        ["Gantelets de l’Aigle de Nuit", 3],
                        ["Jambières de l’Aigle de Nuit", 3],
                        ["Protège-épaules de l’Aigle de Nuit", 3],
                        ["Protège-Bras de l'Escrimeur élégant", 3],
                        ["Tenue de brigand", 3],
                        ["Veste de l'Escrimeur élégant", 3]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "3d10", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Fourrure épaisse", "1", 10],
                    ["Commun", 80, "Outre vide", "1", 5],
                    ["Commun", 80, "Paillasse", "1", 5],
                    ["Commun", 80, "Piège à collet", "1", 10],
                    ["Commun", 80, "Piège à mâchoires", "1", 10],
                    ["Commun", 80, "Silex et amorce", "1", 10],
                    ["Commun", 80, "Sifflet silencieux", "1", 10],

                    ["Incommun", 15, "Sol", "5d10", 100],
                    ["Incommun", 15, "Outre d'alcool fort", "1", 20],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Paillasse", "1", 10],
                    ["Incommun", 15, "Piège à collet", "1", 10],
                    ["Incommun", 15, "Piège à mâchoires", "1", 10],
                    ["Incommun", 15, "Silex et amorce", "1", 10],
                    ["Incommun", 15, "Sifflet silencieux", "1", 10],

                    ["Rare", 4, "Sol", "10d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Paillasse", "1", 10],
                    ["Rare", 4, "Piège à collet", "1", 10],
                    ["Rare", 4, "Piège à mâchoires", "1", 10],
                    ["Rare", 4, "Silex et amorce", "1", 10],
                    ["Rare", 4, "Sifflet silencieux", "1", 10],

                    ["Très rare", 0.9, "Sol", "15d10", 100],
                    ["Très rare", 0.9, "Paillasse", "1", 20],
                    ["Très rare", 0.9, "Piège à collet", "1", 20],
                    ["Très rare", 0.9, "Piège à mâchoires", "1", 20],
                    ["Très rare", 0.9, "Silex et amorce", "1", 20],
                    ["Très rare", 0.9, "Sifflet silencieux", "1", 20],

                    ["Légendaire", 0.1, "Sol", "20d10", 100],
                    ["Légendaire", 0.1, "Paillasse", "1", 5],
                    ["Légendaire", 0.1, "Piège à collet", "1", 50],
                    ["Légendaire", 0.1, "Piège à mâchoires", "1", 50],
                    ["Légendaire", 0.1, "Silex et amorce", "1", 50],
                    ["Légendaire", 0.1, "Grand cracheur (à identifier - Qualité 3)", "1", 10],
                    ["Légendaire", 0.1, "Sifflet silencieux", "1", 50]
                ]
            },
            "Lieutenant": {
                meridiens: {
                    domination: [1, 3], savoir: [3, 5], expression: [3, 4],
                    puissance: [3, 8], mouvement: [7, 9], vitalite: [4, 8]
                },
                equipementEssentiel: {
                    arme: [
                        ["Arbalète (à identifier - Qualité 2)", 16],
                        ["Arc court (à identifier - Qualité 2)", 20],
                        ["Arc long (à identifier - Qualité 2)", 15],
                        ["Lance (à identifier - Qualité 2)", 15],
                        ["Atlatl (à identifier - Qualité 2)", 10],
                        ["Boomerang (à identifier - Qualité 2)", 10],
                        ["Fronde (à identifier - Qualité 2)", 10],
                        ["Cracheur des Anciens (à identifier - Qualité 2)", 1],
                        ["Arc court (à identifier - Qualité 3)", 1],
                        ["Arbalète (à identifier - Qualité 3)", 1],
                        ["Arc long (à identifier - Qualité 3)", 0.8],
                        ["Grand cracheur (à identifier - Qualité 3)", 0.2]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 10],
                        ["Vêtements sales", 10],
                        ["Gambison usé", 10],
                        ["Tunique des Rivières Tressées", 6],
                        ["Botte d'aventurier", 6],
                        ["Bottes du Serpent de Cuivre", 6],
                        ["Manteau du Maître Corbeau Gris", 10],
                        ["Capuche du Maître Corbeau Gris", 10],
                        ["Casque de l’Aigle de Nuit", 7],
                        ["Gantelets de l’Aigle de Nuit", 7],
                        ["Jambières de l’Aigle de Nuit", 7],
                        ["Protège-épaules de l’Aigle de Nuit", 7],
                        ["Protège-Bras de l'Escrimeur élégant", 2],
                        ["Veste de l'Escrimeur élégant", 2]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d10", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Fourrure épaisse", "1", 30],
                    ["Commun", 80, "Outre vide", "1", 30],
                    ["Commun", 80, "Paillasse", "1", 30],
                    ["Commun", 80, "Piège à collet", "1", 30],
                    ["Commun", 80, "Piège à mâchoires", "1", 30],
                    ["Commun", 80, "Silex et amorce", "1", 30],
                    ["Commun", 80, "Sifflet silencieux", "1", 30],

                    ["Incommun", 15, "Sol", "10d10", 100],
                    ["Incommun", 15, "Outre d'alcool fort", "1", 50],
                    ["Incommun", 15, "Rations", "1d4", 50],
                    ["Incommun", 15, "Paillasse", "1", 50],
                    ["Incommun", 15, "Piège à collet", "1", 50],
                    ["Incommun", 15, "Piège à mâchoires", "1", 50],
                    ["Incommun", 15, "Silex et amorce", "1", 50],
                    ["Incommun", 15, "Sifflet silencieux", "1", 50],

                    ["Rare", 4, "Sol", "15d10", 100],
                    ["Rare", 4, "Rations", "1d6", 50],
                    ["Rare", 4, "Paillasse", "1", 50],
                    ["Rare", 4, "Piège à collet", "1", 50],
                    ["Rare", 4, "Piège à mâchoires", "1", 50],
                    ["Rare", 4, "Silex et amorce", "1", 50],
                    ["Rare", 4, "Sifflet silencieux", "1", 50],
                    ["Rare", 4, "Épée bâtarde (à identifier - Qualité 3)", "1", 10],

                    ["Très rare", 0.9, "Sol", "20d10", 100],
                    ["Très rare", 0.9, "Paillasse", "1", 70],
                    ["Très rare", 0.9, "Piège à collet", "1", 70],
                    ["Très rare", 0.9, "Piège à mâchoires", "1", 70],
                    ["Très rare", 0.9, "Silex et amorce", "1", 70],
                    ["Très rare", 0.9, "Sifflet silencieux", "1", 70],
                    ["Très rare", 0.9, "Arbalète (à identifier - Qualité 3)", "1", 15],
                    ["Très rare", 0.9, "Épée bâtarde (à identifier - Qualité 3)", "1", 15],

                    ["Légendaire", 0.1, "Sol", "5d100", 100],
                    ["Légendaire", 0.1, "Paillasse", "1", 70],
                    ["Légendaire", 0.1, "Piège à collet", "1", 70],
                    ["Légendaire", 0.1, "Piège à mâchoires", "1", 70],
                    ["Légendaire", 0.1, "Silex et amorce", "1", 70],
                    ["Légendaire", 0.1, "Grand cracheur (à identifier - Qualité 3)", "1", 10],
                    ["Légendaire", 0.1, "Protège-épaules de l’Aigle de Nuit", "1", 70],
                    ["Légendaire", 0.1, "Arc-Luth", "1", 10],
                    ["Légendaire", 0.1, "Sifflet silencieux", "1", 70]
                ]
            },
            "Némésis": {
                meridiens: {
                    domination: [4, 7], savoir: [5, 9], expression: [4, 6],
                    puissance: [6, 8], mouvement: [9, 18], vitalite: [7, 10]
                },
                equipementEssentiel: {
                    arme: [
                        ["Arbalète (à identifier - Qualité 3)", 16],
                        ["Arc court (à identifier - Qualité 3)", 20],
                        ["Arc long (à identifier - Qualité 3)", 15],
                        ["Lance (à identifier - Qualité 3)", 15],
                        ["Atlatl (à identifier - Qualité 3)", 10],
                        ["Boomerang (à identifier - Qualité 3)", 10],
                        ["Fronde (à identifier - Qualité 3)", 10],
                        ["Cracheur des Anciens (à identifier - Qualité 3)", 1],
                        ["Arc court (à identifier - Qualité 4)", 1],
                        ["Arbalète (à identifier - Qualité 4)", 1],
                        ["Arc long (à identifier - Qualité 4)", 0.8],
                        ["Grand cracheur (à identifier - Qualité 4)", 0.2]
                    ],
                    tenue: [
                        ["Tunique des Rivières Tressées", 10],
                        ["Bottes du Serpent de Cuivre", 10],
                        ["Manteau du Maître Corbeau Gris", 10],
                        ["Capuche du Maître Corbeau Gris", 10],
                        ["Casque de l’Aigle de Nuit", 15],
                        ["Gantelets de l’Aigle de Nuit", 15],
                        ["Jambières de l’Aigle de Nuit", 15],
                        ["Protège-épaules de l’Aigle de Nuit", 15],
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d100", 100],
                    ["Commun", 80, "Fourrure épaisse", "1", 100],
                    ["Commun", 80, "Outre d'alcool fort", "1", 100],
                    ["Commun", 80, "Piège à collet", "1", 100],
                    ["Commun", 80, "Piège à mâchoires", "1", 100],
                    ["Commun", 80, "Casque de l’Aigle de Nuit", "1", 50],
                    ["Commun", 80, "Gantelets de l’Aigle de Nuit", "1", 50],
                    ["Commun", 80, "Jambières de l’Aigle de Nuit", "1", 50],
                    ["Commun", 80, "Protège-épaules de l’Aigle de Nuit", "1", 50],
                    ["Commun", 80, "Sifflet silencieux", "1", 100],
                    ["Commun", 80, "Arbalète (à identifier - Qualité 3)", "1", 50],
                    ["Commun", 80, "Épée bâtarde (à identifier - Qualité 3)", "1", 50],

                    ["Incommun", 15, "Sol", "10d100", 100],
                    ["Incommun", 15, "Outre d'alcool fort", "1", 100],
                    ["Incommun", 15, "Piège à collet", "1", 100],
                    ["Incommun", 15, "Piège à mâchoires", "1", 100],
                    ["Incommun", 15, "Sifflet silencieux", "1", 100],
                    ["Incommun", 15, "Casque de l’Aigle de Nuit", "1", 70],
                    ["Incommun", 15, "Gantelets de l’Aigle de Nuit", "1", 70],
                    ["Incommun", 15, "Jambières de l’Aigle de Nuit", "1", 70],
                    ["Incommun", 15, "Protège-épaules de l’Aigle de Nuit", "1", 70],
                    ["Incommun", 15, "Arbalète (à identifier - Qualité 4)", "1", 50],
                    ["Incommun", 15, "Épée bâtarde (à identifier - Qualité 4)", "1", 50],

                    ["Rare", 4, "Sol", "15d100", 100],
                    ["Rare", 4, "Piège à collet", "1", 100],
                    ["Rare", 4, "Piège à mâchoires", "1", 100],
                    ["Rare", 4, "Silex et amorce", "1", 100],
                    ["Rare", 4, "Sifflet silencieux", "1", 100],
                    ["Rare", 4, "Casque de l’Aigle de Nuit", "1", 90],
                    ["Rare", 4, "Gantelets de l’Aigle de Nuit", "1", 90],
                    ["Rare", 4, "Jambières de l’Aigle de Nuit", "1", 90],
                    ["Rare", 4, "Protège-épaules de l’Aigle de Nuit", "1", 90],
                    ["Rare", 4, "Arc-Luth", "1", 70],
                    ["Rare", 4, "Épée bâtarde (à identifier - Qualité 4)", "1", 70],
                    ["Rare", 4, "Bolts-de-Verre", "1", 10],

                    ["Très rare", 0.9, "Sol", "20d100", 100],
                    ["Très rare", 0.9, "Paillasse", "1", 70],
                    ["Très rare", 0.9, "Piège à collet", "1", 70],
                    ["Très rare", 0.9, "Piège à mâchoires", "1", 70],
                    ["Très rare", 0.9, "Silex et amorce", "1", 70],
                    ["Très rare", 0.9, "Sifflet silencieux", "1", 70],
                    ["Très rare", 0.9, "Casque de l’Aigle de Nuit", "1", 90],
                    ["Très rare", 0.9, "Gantelets de l’Aigle de Nuit", "1", 90],
                    ["Très rare", 0.9, "Jambières de l’Aigle de Nuit", "1", 90],
                    ["Très rare", 0.9, "Protège-épaules de l’Aigle de Nuit", "1", 90],
                    ["Très rare", 0.9, "Arc-Luth", "1", 80],
                    ["Très rare", 0.9, "Épée bâtarde (à identifier - Qualité 4)", "1", 80],
                    ["Très rare", 0.9, "Bolts-de-Verre", "1", 50],

                    ["Légendaire", 0.1, "Sol", "30d100", 100],
                    ["Légendaire", 0.1, "Piège à collet", "1", 100],
                    ["Légendaire", 0.1, "Piège à mâchoires", "1", 100],
                    ["Légendaire", 0.1, "Silex et amorce", "1", 100],
                    ["Légendaire", 0.1, "Grand cracheur (à identifier - Qualité 4)", "1", 90],
                    ["Légendaire", 0.1, "Protège-épaules de l’Aigle de Nuit", "1", 90],
                    ["Légendaire", 0.1, "Casque de l’Aigle de Nuit", "1", 90],
                    ["Légendaire", 0.1, "Gantelets de l’Aigle de Nuit", "1", 90],
                    ["Légendaire", 0.1, "Jambières de l’Aigle de Nuit", "1", 90],
                    ["Légendaire", 0.1, "Arc-Luth", "1", 90],
                    ["Légendaire", 0.1, "Bolts-de-Verre", "1", 90],
                    ["Légendaire", 0.1, "Épée bâtarde (à identifier - Qualité 4)", "1", 90],
                    ["Légendaire", 0.1, "Sifflet silencieux", "1", 70]
                ]
            },
        },
        "Voleur": {
            "Sbire": {
                meridiens: {
                    domination: [1, 3], savoir: [1, 1], expression: [1, 3],
                    puissance: [1, 2], mouvement: [2, 5], vitalite: [1, 2]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (Qualité 0)", 25],
                        ["Couteau de lancer (Qualité 0)", 15],
                        ["Couteau (Qualité 0)", 15],
                        ["Khopesh (Qualité 0)", 10],
                        ["Épée courte (Qualité 0)", 10],
                        ["Rapière (Qualité 0)", 10],
                        ["Arbalète (Qualité 0)", 10],
                        ["Kama (Qualité 0)", 3],
                        ["Chaîne à deux kamas (à identifier - Qualité 1)", 0.5],
                        ["Nunchaku (à identifier - Qualité 1)", 0.5],
                        ["Hachette (à identifier - Qualité 1)", 0.5],
                        ["Grappin (à identifier - Qualité 1)", 0.5]
                    ],
                    tenue: [
                        ["Vêtements sombres en lambeaux", 25],
                        ["Vêtements sombres en lambeaux", 25],
                        ["Vêtements sales", 10],
                        ["Vêtements sales", 10],
                        ["Tunique noire usée", 20],
                        ["Botte d'aventurier", 2],
                        ["Bottes aux Semelles de Brume", 1],
                        ["Tenue de brigand", 1],
                        ["Capuche de la Lune Obscure", 1],
                        ["Gants de la Lune Obscure", 1],
                        ["Manteau du Maître Corbeau Gris", 1],
                        ["Tenue de l'Adepte de l'Araignée", 1],
                        ["Botte de la Convergence noire", 1],
                        ["Capuche du Maître Corbeau Gris", 1]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "2d6", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Billet de dette", "1", 1],
                    ["Commun", 80, "Onguent pour masquer les odeurs corporelles", "1", 1],
                    ["Commun", 80, "Bijou d'ornement (volé)", "1", 1],
                    ["Commun", 80, "Clé d'une maison", "1", 1],
                    ["Commun", 80, "Jeu de base pukllay", "1", 1],
                    ["Commun", 80, "Bourse supplémentaire", "3d10", 20],

                    ["Incommun", 15, "Sol", "3d10", 100],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Objet religieux volé", "1", 5],
                    ["Incommun", 15, "Onguent pour masquer les odeurs corporelles", "1", 2],
                    ["Incommun", 15, "Anneau", "1", 5],
                    ["Incommun", 15, "Billet de dette", "1", 5],
                    ["Incommun", 15, "Bijou d'ornement (volé)", "1", 5],
                    ["Incommun", 15, "Clé d'une maison", "1", 5],
                    ["Incommun", 15, "Jeu de base pukllay", "1", 5],
                    ["Incommun", 15, "Outre d'alcool doux", "1", 20],
                    ["Incommun", 15, "Bourse supplémentaire", "5d10", 20],


                    ["Rare", 4, "Sol", "5d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Objet religieux volé", "1", 5],
                    ["Rare", 4, "Anneau", "1", 5],
                    ["Rare", 4, "Billet de dette", "1", 5],
                    ["Rare", 4, "Bijou d'ornement (volé)", "1", 5],
                    ["Rare", 4, "Clé d'une maison", "1", 5],
                    ["Rare", 4, "Jeu de base pukllay", "1", 5],
                    ["Rare", 4, "Bourse supplémentaire", "5d10", 20],
                    ["Rare", 4, "Onguent pour masquer les odeurs corporelles", "1", 5],

                    ["Très rare", 0.9, "Sol", "10d10", 100],
                    ["Très rare", 0.9, "Objet religieux volé", "1", 15],
                    ["Très rare", 0.9, "Anneau", "1", 15],
                    ["Très rare", 0.9, "Billet de dette", "1", 15],
                    ["Très rare", 0.9, "Bijou d'ornement (volé)", "1", 15],
                    ["Très rare", 0.9, "Clé d'une maison", "1", 15],
                    ["Très rare", 0.9, "Jeu de base pukllay", "1", 15],
                    ["Très rare", 0.9, "Bourse supplémentaire", "5d10", 20],
                    ["Très rare", 0.9, "Onguent pour masquer les odeurs corporelles", "1", 10],

                    ["Légendaire", 0.1, "Sol", "15d10", 100],
                    ["Légendaire", 0.1, "Objet religieux volé", "1", 50],
                    ["Légendaire", 0.1, "Anneau", "1", 50],
                    ["Légendaire", 0.1, "Billet de dette", "1", 50],
                    ["Légendaire", 0.1, "Bijou d'ornement (volé)", "1", 50],
                    ["Légendaire", 0.1, "Clé d'une maison", "1", 50],
                    ["Légendaire", 0.1, "Jeu de base pukllay", "1", 50],
                    ["Légendaire", 0.1, "Bourse supplémentaire", "5d10", 20],
                    ["Légendaire", 0.1, "Couteau (à identifier - Qualité 2)", "1", 5],
                    ["Légendaire", 0.1, "Onguent pour masquer les odeurs corporelles", "1", 15],
                    ["Légendaire", 0.1, "Boucle d'oreille (à identifier - Qualité 1)", "1", 10]
                ]
            },
            "Spécialiste": {
                meridiens: {
                    domination: [2, 5], savoir: [1, 2], expression: [2, 5],
                    puissance: [1, 3], mouvement: [6, 7], vitalite: [1, 3]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (à identifier - Qualité 1)", 25],
                        ["Couteau de lancer (à identifier - Qualité 1)", 13],
                        ["Couteau (à identifier - Qualité 1)", 15],
                        ["Khopesh (à identifier - Qualité 1)", 10],
                        ["Épée courte (à identifier - Qualité 1)", 10],
                        ["Rapière (à identifier - Qualité 1)", 10],
                        ["Arbalète (à identifier - Qualité 1)", 10],
                        ["Kama (à identifier - Qualité 1)", 3],
                        ["Chaîne à deux kamas (à identifier - Qualité 1)", 2],
                        ["Nunchaku (à identifier - Qualité 2)", 3],
                        ["Hachette (à identifier - Qualité 2)", 3],
                        ["Grappin (à identifier - Qualité 2)", 2]
                    ],
                    tenue: [
                        ["Vêtements sombres en lambeaux", 30],
                        ["Vêtements sales", 10],
                        ["Tunique noire usée", 20],
                        ["Botte d'aventurier", 8],
                        ["Bottes aux Semelles de Brume", 4],
                        ["Tenue de brigand", 10],
                        ["Capuche de la Lune Obscure", 3],
                        ["Gants de la Lune Obscure", 3],
                        ["Manteau du Maître Corbeau Gris", 3],
                        ["Tenue de l'Adepte de l'Araignée", 3],
                        ["Botte de la Convergence noire", 3],
                        ["Capuche du Maître Corbeau Gris", 3]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "3d10", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Billet de dette", "1", 2],
                    ["Commun", 80, "Bijou d'ornement (volé)", "1", 2],
                    ["Commun", 80, "Clé d'une maison", "1", 2],
                    ["Commun", 80, "Jeu de base pukllay", "1", 2],
                    ["Commun", 80, "Bourse supplémentaire", "5d10", 20],
                    ["Commun", 80, "Onguent pour masquer les odeurs corporelles", "1", 1],

                    ["Incommun", 15, "Sol", "5d10", 100],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Objet religieux volé", "1", 5],
                    ["Incommun", 15, "Anneau", "1", 5],
                    ["Incommun", 15, "Billet de dette", "1", 10],
                    ["Incommun", 15, "Bijou d'ornement (volé)", "1", 10],
                    ["Incommun", 15, "Clé d'une maison", "1", 5],
                    ["Incommun", 15, "Jeu de base pukllay", "1", 5],
                    ["Incommun", 15, "Bourse supplémentaire", "5d10", 20],
                    ["Incommun", 15, "Onguent pour masquer les odeurs corporelles", "1", 5],


                    ["Rare", 4, "Sol", "10d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Objet religieux volé", "1", 5],
                    ["Rare", 4, "Anneau", "1", 5],
                    ["Rare", 4, "Billet de dette", "1", 5],
                    ["Rare", 4, "Bijou d'ornement (volé)", "1", 5],
                    ["Rare", 4, "Clé d'une maison", "1", 5],
                    ["Rare", 4, "Jeu de base pukllay", "1", 5],
                    ["Rare", 4, "Jeton rare de puklay", "1", 5],
                    ["Rare", 4, "Bourse supplémentaire", "10d10", 20],
                    ["Rare", 4, "Couteau (à identifier - Qualité 2)", "1", 2],
                    ["Rare", 4, "Onguent pour masquer les odeurs corporelles", "1", 5],

                    ["Très rare", 0.9, "Sol", "15d10", 100],
                    ["Très rare", 0.9, "Objet religieux volé", "1", 15],
                    ["Très rare", 0.9, "Anneau", "1", 15],
                    ["Très rare", 0.9, "Billet de dette", "1", 15],
                    ["Très rare", 0.9, "Bijou d'ornement (volé)", "1", 15],
                    ["Très rare", 0.9, "Clé d'une maison", "1", 15],
                    ["Très rare", 0.9, "Jeu de base pukllay", "1", 15],
                    ["Très rare", 0.9, "Tenue de brigand", "1", 5],
                    ["Très rare", 0.9, "Bourse supplémentaire", "10d10", 20],
                    ["Très rare", 0.9, "Onguent pour masquer les odeurs corporelles", "1", 15],

                    ["Légendaire", 0.1, "Sol", "20d10", 100],
                    ["Légendaire", 0.1, "Objet religieux volé", "1", 50],
                    ["Légendaire", 0.1, "Anneau", "1", 50],
                    ["Légendaire", 0.1, "Billet de dette", "1", 50],
                    ["Légendaire", 0.1, "Bijou d'ornement (volé)", "1", 50],
                    ["Légendaire", 0.1, "Clé d'une maison", "1", 50],
                    ["Légendaire", 0.1, "Jeu de base pukllay", "1", 50],
                    ["Légendaire", 0.1, "Bourse supplémentaire", "10d10", 20],
                    ["Légendaire", 0.1, "Couteau (à identifier - Qualité 2)", "1", 10],
                    ["Légendaire", 0.1, "Onguent pour masquer les odeurs corporelles", "1", 50],
                    ["Légendaire", 0.1, "Boucle d'oreille (à identifier - Qualité 1)", "1", 20]
                ]
            },
            "Lieutenant": {
                meridiens: {
                    domination: [4, 6], savoir: [1, 4], expression: [5, 8],
                    puissance: [2, 4], mouvement: [8, 9], vitalite: [2, 4]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (à identifier - Qualité 2)", 25],
                        ["Couteau de lancer (à identifier - Qualité 2)", 10],
                        ["Couteau (à identifier - Qualité 2)", 15],
                        ["Khopesh (à identifier - Qualité 2)", 10],
                        ["Épée courte (à identifier - Qualité 2)", 10],
                        ["Rapière (à identifier - Qualité 2)", 10],
                        ["Arbalète (à identifier - Qualité 2)", 10],
                        ["Kama (à identifier - Qualité 2)", 6],
                        ["Chaîne à deux kamas (à identifier - Qualité 3)", 2],
                        ["Nunchaku (à identifier - Qualité 3)", 3],
                        ["Hachette (à identifier - Qualité 3)", 3],
                        ["Grappin (à identifier - Qualité 3)", 2]
                    ],
                    tenue: [
                        ["Vêtements sombres en lambeaux", 10],
                        ["Vêtements sales", 10],
                        ["Tunique noire usée", 10],
                        ["Botte d'aventurier", 10],
                        ["Bottes aux Semelles de Brume", 10],
                        ["Tenue de brigand", 15],
                        ["Capuche de la Lune Obscure", 10],
                        ["Gants de la Lune Obscure", 5],
                        ["Manteau du Maître Corbeau Gris", 5],
                        ["Tenue de l'Adepte de l'Araignée", 5],
                        ["Botte de la Convergence noire", 5],
                        ["Capuche du Maître Corbeau Gris", 5]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d10", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Bijou d'ornement (volé)", "1", 20],
                    ["Commun", 80, "Clé d'une maison", "1", 20],
                    ["Commun", 80, "Jeu de base pukllay", "1", 20],
                    ["Commun", 80, "Bourse supplémentaire", "5d10", 30],
                    ["Commun", 80, "Onguent pour masquer les odeurs corporelles", "1", 20],

                    ["Incommun", 15, "Sol", "10d10", 100],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Bijou d'ornement (volé)", "1", 20],
                    ["Incommun", 15, "Clé d'une maison", "1", 20],
                    ["Incommun", 15, "Jeu de base pukllay", "1", 5],
                    ["Incommun", 15, "Bourse supplémentaire", "20d10", 20],
                    ["Incommun", 15, "Onguent pour masquer les odeurs corporelles", "1", 20],


                    ["Rare", 4, "Sol", "15d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Objet religieux volé", "1", 20],
                    ["Rare", 4, "Bijou d'ornement (volé)", "1", 50],
                    ["Rare", 4, "Clé d'une maison", "1", 30],
                    ["Rare", 4, "Jeu de base pukllay", "1", 50],
                    ["Rare", 4, "Jeton rare de puklay", "1", 30],
                    ["Rare", 4, "Bourse supplémentaire", "40d10", 50],
                    ["Rare", 4, "Couteau (à identifier - Qualité 2)", "1", 10],
                    ["Rare", 4, "Onguent pour masquer les odeurs corporelles", "1", 30],

                    ["Très rare", 0.9, "Sol", "20d10", 100],
                    ["Très rare", 0.9, "Bijou d'ornement (volé)", "1", 50],
                    ["Très rare", 0.9, "Clé d'une maison", "1", 50],
                    ["Très rare", 0.9, "Jeu de base pukllay", "1", 50],
                    ["Très rare", 0.9, "Tenue de brigand", "1", 50],
                    ["Très rare", 0.9, "Statuette en jade", "1", 20],
                    ["Très rare", 0.9, "Bourse supplémentaire", "40d10", 50],
                    ["Très rare", 0.9, "Couteau (à identifier - Qualité 3)", "1", 15],
                    ["Très rare", 0.9, "Onguent pour masquer les odeurs corporelles", "1", 50],

                    ["Légendaire", 0.1, "Sol", "5d100", 100],
                    ["Légendaire", 0.1, "Bijou d'ornement (volé)", "1", 50],
                    ["Légendaire", 0.1, "Clé d'une maison", "1", 50],
                    ["Légendaire", 0.1, "Jeu de base pukllay", "1", 50],
                    ["Légendaire", 0.1, "Bourse supplémentaire", "8d100", 50],
                    ["Légendaire", 0.1, "Sifflement de la Mort", "1", 5],
                    ["Légendaire", 0.1, "Onguent pour masquer les odeurs corporelles", "1", 50],
                    ["Légendaire", 0.1, "Boucle d'oreille (à identifier - Qualité 1)", "1", 50]
                ]
            },
            "Némésis": {
                meridiens: {
                    domination: [6, 9], savoir: [4, 6], expression: [7, 12],
                    puissance: [4, 8], mouvement: [11, 17], vitalite: [4, 7]
                },
                equipementEssentiel: {
                    arme: [
                        ["Dague (à identifier - Qualité 3)", 10],
                        ["Couteau de lancer (à identifier - Qualité 3)", 10],
                        ["Couteau (à identifier - Qualité 4)", 10],
                        ["Khopesh (à identifier - Qualité 3)", 8],
                        ["Épée courte (à identifier - Qualité 3)", 10],
                        ["Rapière (à identifier - Qualité 3)", 10],
                        ["Arbalète (à identifier - Qualité 4)", 10],
                        ["Kama (à identifier - Qualité 4)", 10],
                        ["Chaîne à deux kamas (à identifier - Qualité 3)", 5],
                        ["Nunchaku (à identifier - Qualité 4)", 8],
                        ["Hachette (à identifier - Qualité 3)", 6],
                        ["Grappin (à identifier - Qualité 4)", 3]
                    ],
                    tenue: [
                        ["Botte d'aventurier", 10],
                        ["Bottes aux Semelles de Brume", 11],
                        ["Tenue de brigand", 13],
                        ["Capuche de la Lune Obscure", 11],
                        ["Gants de la Lune Obscure", 11],
                        ["Manteau du Maître Corbeau Gris", 11],
                        ["Tenue de l'Adepte de l'Araignée", 11],
                        ["Botte de la Convergence noire", 11],
                        ["Capuche du Maître Corbeau Gris", 11]
                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d100", 100],
                    ["Commun", 80, "Potion (à identifier - Qualité 3)", "1d4", 100],
                    ["Commun", 80, "Anneau (à identifier - Qualité 1)", "1", 100],
                    ["Commun", 80, "Bijou d'ornement (volé)", "1", 100],
                    ["Commun", 80, "Jeu de base pukllay", "1", 100],
                    ["Commun", 80, "Bourse supplémentaire", "5d10", 100],
                    ["Commun", 80, "La Griffe de Brume", "1", 30],
                    ["Commun", 80, "Sifflement de la Mort", "1", 30],
                    ["Commun", 80, "Onguent pour masquer les odeurs corporelles", "1", 70],

                    ["Incommun", 15, "Sol", "10d100", 100],
                    ["Incommun", 15, "Rations", "1d4", 80],
                    ["Incommun", 15, "Bijou d'ornement (volé)", "1", 100],
                    ["Incommun", 15, "Jeu de base pukllay", "1", 100],
                    ["Incommun", 15, "Bourse supplémentaire", "20d10", 100],
                    ["Incommun", 15, "Sifflement de la Mort", "1", 50],
                    ["Incommun", 15, "La Griffe de Brume", "1", 50],
                    ["Incommun", 15, "Onguent pour masquer les odeurs corporelles", "1", 80],

                    ["Rare", 4, "Sol", "15d100", 100],
                    ["Rare", 4, "Objet religieux volé", "1", 100],
                    ["Rare", 4, "Bijou d'ornement (volé)", "1", 100],
                    ["Rare", 4, "Jeton rare de puklay", "1", 80],
                    ["Rare", 4, "Bourse supplémentaire", "40d10", 100],
                    ["Rare", 4, "Murmure d’obsidienne", "1", 10],
                    ["Rare", 4, "Sifflement de la Mort", "1", 70],
                    ["Rare", 4, "La Griffe de Brume", "1", 70],
                    ["Rare", 4, "Onguent pour masquer les odeurs corporelles", "1", 90],

                    ["Très rare", 0.9, "Sol", "20d100", 100],
                    ["Très rare", 0.9, "Bijou d'ornement (volé)", "1", 100],
                    ["Très rare", 0.9, "Jeu de base pukllay", "1", 100],
                    ["Très rare", 0.9, "La Griffe de Brume", "1", 80],
                    ["Très rare", 0.9, "Statuette en jade", "1", 100],
                    ["Très rare", 0.9, "Bourse supplémentaire", "40d10", 100],
                    ["Très rare", 0.9, "Couteau (à identifier - Qualité 3)", "1", 15],
                    ["Très rare", 0.9, "Murmure d’obsidienne", "1", 50],
                    ["Très rare", 0.9, "Sifflement de la Mort", "1", 80],
                    ["Très rare", 0.9, "Onguent pour masquer les odeurs corporelles", "1", 100],

                    ["Légendaire", 0.1, "Sol", "30d100", 100],
                    ["Légendaire", 0.1, "Bijou d'ornement (volé)", "1", 100],
                    ["Légendaire", 0.1, "La Griffe de Brume", "1", 90],
                    ["Légendaire", 0.1, "Bourse supplémentaire", "8d100", 100],
                    ["Légendaire", 0.1, "Couteau (à identifier - Qualité 4)", "1", 100],
                    ["Légendaire", 0.1, "Statuette en jade", "1", 100],
                    ["Légendaire", 0.1, "Sifflement de la Mort", "1", 100],
                    ["Légendaire", 0.1, "Murmure d’obsidienne", "1", 90],
                    ["Légendaire", 0.1, "Onguent pour masquer les odeurs corporelles", "1", 100],
                    ["Légendaire", 0.1, "Pierre de Vrill (à identifier - Qualité 4)", "1", 90]
                ]
            },
        },
        "Chasseur de prime": {
            "Sbire": {
                meridiens: {
                    domination: [1, 1], savoir: [1, 3], expression: [1, 2],
                    puissance: [3, 4], mouvement: [2, 4], vitalite: [1, 3]
                },
                equipementEssentiel: {
                    arme: [
                        ["Arbalète (Qualité 0)",8],
                        ["Arc court (Qualité 0)", 6],
                        ["Lance (Qualité 0)", 8],
                        ["Épée longue (Qualité 0)",8],
                        ["Cimeterre (Qualité 0)",8],
                        ["Lance (Qualité 0)",8],
                        ["Bâton (Qualité 0)",6],
                        ["Chaîne à deux kamas (Qualité 0)",6],
                        ["Double-lame (Qualité 0)",6],
                        ["Bardiche (Qualité 0)",8],
                        ["Épée bâtarde (Qualité 0)",6],
                        ["Rapière (Qualité 0)",6],
                        ["Sabre (Qualité 0)",6],
                        ["Chaîne cloutée (Qualité 0)",6],
                        ["Tonfa (à identifier - Qualité 1)", 1],
                        ["Jitte (à identifier - Qualité 1)", 1],
                        ["Fouet (à identifier - Qualité 1)", 1],
                        ["Hallebarde (à identifier - Qualité 1)", 1]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 50],
                        ["Vêtements sales", 30],
                        ["Gambison usé", 10],
                        ["Botte d'aventurier", 2.5],
                        ["Masque du Souffle Ancien", 0.3],
                        ["Torse sanglant du Souffle Ancien", 0.3],
                        ["Tenue du Bois Fossile", 0.3],
                        ["Veste de l'Escrimeur élégant", 0.3],
                        ["Chapeau de l'Escrimeur élégant", 0.3],
                        ["Protège-Bras de l'Escrimeur élégant", 0.3],
                        ["Grèves de l'Escrimeur élégant", 0.3],
                        ["Casque de la Sentinelle", 0.3],
                        ["Plastron de la Sentinelle", 0.3],
                        ["Garde-Bras de la Sentinelle", 0.3],
                        ["Jambières de la Sentinelle", 0.3],
                        ["Tenue du Bastion imprenable", 0.3],
                        ["Tunique Cloutée", 0.3],
                        ["Pantalon renforcé", 0.3],
                        ["Gantelet renforcé", 0.3],
                        ["Torse du Puma des Cimes", 0.3],
                        ["Gantelets de la Main Sépulcrale", 0.3],
                        ["Pantalon de la Main Sépulcrale", 0.3],
                        ["Masque du Puma des Cimes", 0.3],
                        ["Jambières du Puma des Cimes", 0.3],
                        ["Gantelets du Puma des Cimes", 0.3],
                        ["Casque de l’Aigle de Nuit", 0.3],
                        ["Gantelets de l’Aigle de Nuit", 0.3],
                        ["Jambières de l’Aigle de Nuit", 0.3],
                        ["Protège-épaules de l’Aigle de Nuit", 0.3]

                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "2d6", 100],
                    ["Commun", 80, "Rations", "1", 10],
                    ["Commun", 80, "Cachet de cire ou emblème de guilde", "1", 5],
                    ["Commun", 80, "Outre vide", "1", 5],
                    ["Commun", 80, "Boussole", "1", 2],
                    ["Commun", 80, "Menottes", "1", 2],
                    ["Commun", 80, "Carnet de notes avec croquis de cibles", "1", 2],
                    ["Commun", 80, "Contrat", "1", 2],
                    ["Commun", 80, "Bourse de sable", "1", 2],
                    ["Commun", 80, "Boucle d’oreille avec du sang séché", "1", 2],
                    ["Commun", 80, "Bout de vêtement déchiré appartenant à une cible", "1", 2],

                    ["Incommun", 15, "Sol", "3d10", 100],
                    ["Incommun", 15, "Outre d'alcool fort", "1", 10],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Boussole", "1", 5],
                    ["Incommun", 15, "Menottes", "1", 5],
                    ["Incommun", 15, "Carnet de notes avec croquis de cibles", "1", 5],
                    ["Incommun", 15, "Concrat", "1", 5],
                    ["Incommun", 15, "Bourse de sable", "1", 5],
                    ["Incommun", 15, "Boucle d’oreille avec du sang séché", "1", 5],
                    ["Incommun", 15, "Bout de vêtement déchiré appartenant à une cible", "1", 5],

                    ["Rare", 4, "Sol", "5d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Boussole", "1", 5],
                    ["Rare", 4, "Menottes", "1", 5],
                    ["Rare", 4, "Carnet de notes avec croquis de cibles", "1", 5],
                    ["Rare", 4, "Concrat", "1", 5],
                    ["Rare", 4, "Bourse de sable", "1", 5],
                    ["Rare", 4, "Boucle d’oreille avec du sang séché", "1", 5],
                    ["Rare", 4, "Bout de vêtement déchiré appartenant à une cible", "1", 5],

                    ["Très rare", 0.9, "Sol", "10d10", 100],
                    ["Très rare", 0.9, "Boussole", "1", 10],
                    ["Très rare", 0.9, "Menottes", "1", 10],
                    ["Très rare", 0.9, "Carnet de notes avec croquis de cibles", "1", 10],
                    ["Très rare", 0.9, "Concrat", "1", 10],
                    ["Très rare", 0.9, "Bourse de sable", "1", 10],
                    ["Très rare", 0.9, "Boucle d’oreille avec du sang séché", "1", 10],
                    ["Très rare", 0.9, "Bout de vêtement déchiré appartenant à une cible", "1", 10],

                    ["Légendaire", 0.1, "Sol", "15d10", 100],
                    ["Légendaire", 0.1, "Boussole", "1", 10],
                    ["Légendaire", 0.1, "Menottes", "1", 10],
                    ["Légendaire", 0.1, "Carnet de notes avec croquis de cibles", "1", 10],
                    ["Légendaire", 0.1, "Concrat", "1", 10],
                    ["Légendaire", 0.1, "Bourse de sable", "1", 10],
                    ["Légendaire", 0.1, "Boucle d’oreille avec du sang séché", "1", 10],
                    ["Légendaire", 0.1, "Lettre non envoyée à une famille qu’il n’a plus revue", "1", 10],
                    ["Légendaire", 0.1, "Bout de vêtement déchiré appartenant à une cible", "1", 10],
                    ["Légendaire", 0.1, "Chien dressé", "1", 2]
                ]
            },
            "Spécialiste": {
                meridiens: {
                    domination: [1, 2], savoir: [2, 5], expression: [1, 2],
                    puissance: [4, 6], mouvement: [4, 7], vitalite: [3, 5]
                },
                equipementEssentiel: {
                    arme: [
                        ["Arbalète (à identifier - Qualité 1)", 6],
                        ["Arc court (à identifier - Qualité 1)", 6],
                        ["Lance (à identifier - Qualité 1)", 6],
                        ["Épée longue (à identifier - Qualité 1)", 8],
                        ["Cimeterre (à identifier - Qualité 1)", 8],
                        ["Lance (à identifier - Qualité 1)", 8],
                        ["Bâton (à identifier - Qualité 1)", 6],
                        ["Chaîne à deux kamas (à identifier - Qualité 1)", 6],
                        ["Double-lame (à identifier - Qualité 1)", 6],
                        ["Bardiche (à identifier - Qualité 1)", 6],
                        ["Épée bâtarde (à identifier - Qualité 1)", 8],
                        ["Rapière (à identifier - Qualité 1)", 6],
                        ["Sabre (à identifier - Qualité 1)", 8],
                        ["Chaîne cloutée (à identifier - Qualité 1)", 6],
                        ["Tonfa (à identifier - Qualité 2)", 2],
                        ["Jitte (à identifier - Qualité 2)", 2],
                        ["Fouet (à identifier - Qualité 2)", 1],
                        ["Hallebarde (à identifier - Qualité 2)", 1]
                    ],
                    tenue: [
                        ["Vêtements en lambeaux", 20],
                        ["Vêtements sales", 30],
                        ["Gambison usé", 10],
                        ["Botte d'aventurier", 5],
                        ["Masque du Souffle Ancien", 1.5],
                        ["Torse sanglant du Souffle Ancien", 1.5],
                        ["Tenue du Bois Fossile", 1.5],
                        ["Veste de l'Escrimeur élégant", 1.5],
                        ["Chapeau de l'Escrimeur élégant", 1.5],
                        ["Protège-Bras de l'Escrimeur élégant", 1.5],
                        ["Grèves de l'Escrimeur élégant", 1.5],
                        ["Casque de la Sentinelle", 1.5],
                        ["Plastron de la Sentinelle", 1.5],
                        ["Garde-Bras de la Sentinelle", 1.5],
                        ["Jambières de la Sentinelle", 1.5],
                        ["Tenue du Bastion imprenable", 1.5],
                        ["Tunique Cloutée", 1.5],
                        ["Pantalon renforcé", 1.5],
                        ["Gantelet renforcé", 1.5],
                        ["Torse du Puma des Cimes", 1.5],
                        ["Gantelets de la Main Sépulcrale", 1.5],
                        ["Pantalon de la Main Sépulcrale", 1.5],
                        ["Masque du Puma des Cimes", 1.5],
                        ["Jambières du Puma des Cimes", 1.5],
                        ["Gantelets du Puma des Cimes", 1.5],
                        ["Casque de l’Aigle de Nuit", 1.5],
                        ["Gantelets de l’Aigle de Nuit", 1.5],
                        ["Jambières de l’Aigle de Nuit", 1.5],
                        ["Protège-épaules de l’Aigle de Nuit", 1.5]

                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "3d10", 100],
                    ["Commun", 80, "Rations", "1d4", 10],
                    ["Commun", 80, "Cachet de cire ou emblème de guilde", "1", 10],
                    ["Commun", 80, "Outre vide", "1", 10],
                    ["Commun", 80, "Boussole", "1", 10],
                    ["Commun", 80, "Menottes", "1", 10],
                    ["Commun", 80, "Carnet de notes avec croquis de cibles", "1", 10],
                    ["Commun", 80, "Contrat", "1", 10],
                    ["Commun", 80, "Bourse de sable", "1", 10],
                    ["Commun", 80, "Boucle d’oreille avec du sang séché", "1", 10],
                    ["Commun", 80, "Bout de vêtement déchiré appartenant à une cible", "1", 10],

                    ["Incommun", 15, "Sol", "5d10", 100],
                    ["Incommun", 15, "Outre d'alcool fort", "1", 15],
                    ["Incommun", 15, "Rations", "1d4", 10],
                    ["Incommun", 15, "Boussole", "1", 10],
                    ["Incommun", 15, "Menottes", "1", 10],
                    ["Incommun", 15, "Carnet de notes avec croquis de cibles", "1", 10],
                    ["Incommun", 15, "Concrat", "1", 10],
                    ["Incommun", 15, "Bourse de sable", "1", 10],
                    ["Incommun", 15, "Boucle d’oreille avec du sang séché", "1", 10],
                    ["Incommun", 15, "Bout de vêtement déchiré appartenant à une cible", "1", 10],

                    ["Rare", 4, "Sol", "10d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Boussole", "1", 10],
                    ["Rare", 4, "Menottes", "1", 10],
                    ["Rare", 4, "Carnet de notes avec croquis de cibles", "1", 10],
                    ["Rare", 4, "Concrat", "1", 10],
                    ["Rare", 4, "Bourse de sable", "1", 10],
                    ["Rare", 4, "Boucle d’oreille avec du sang séché", "1", 10],
                    ["Rare", 4, "Bout de vêtement déchiré appartenant à une cible", "1", 10],

                    ["Très rare", 0.9, "Sol", "15d10", 100],
                    ["Très rare", 0.9, "Boussole", "1", 10],
                    ["Très rare", 0.9, "Menottes", "1", 10],
                    ["Très rare", 0.9, "Carnet de notes avec croquis de cibles", "1", 10],
                    ["Très rare", 0.9, "Concrat", "1", 10],
                    ["Très rare", 0.9, "Bourse de sable", "1", 10],
                    ["Très rare", 0.9, "Boucle d’oreille avec du sang séché", "1", 10],
                    ["Très rare", 0.9, "Bout de vêtement déchiré appartenant à une cible", "1", 10],

                    ["Légendaire", 0.1, "Sol", "20d10", 100],
                    ["Légendaire", 0.1, "Boussole", "1", 10],
                    ["Légendaire", 0.1, "Menottes", "1", 10],
                    ["Légendaire", 0.1, "Carnet de notes avec croquis de cibles", "1", 10],
                    ["Légendaire", 0.1, "Concrat", "1", 10],
                    ["Légendaire", 0.1, "Bourse de sable", "1", 10],
                    ["Légendaire", 0.1, "Boucle d’oreille avec du sang séché", "1", 10],
                    ["Légendaire", 0.1, "Lettre non envoyée à une famille qu’il n’a plus revue", "1", 10],
                    ["Légendaire", 0.1, "Bout de vêtement déchiré appartenant à une cible", "1", 10],
                    ["Légendaire", 0.1, "Chien dressé", "1", 2]
                ]
            },
            "Lieutenant": {
                meridiens: {
                    domination: [1, 3], savoir: [3, 6], expression: [1, 4],
                    puissance: [6, 9], mouvement: [6, 8], vitalite: [4, 7]
                },
                equipementEssentiel: {
                    arme: [
                        ["Arbalète (à identifier - Qualité 2)", 6],
                        ["Arc court (à identifier - Qualité 2)", 6],
                        ["Lance (à identifier - Qualité 2)", 6],
                        ["Épée longue (à identifier - Qualité 2)", 6],
                        ["Cimeterre (à identifier - Qualité 2)", 6],
                        ["Lance (à identifier - Qualité 2)", 6],
                        ["Bâton (à identifier - Qualité 2)", 6],
                        ["Chaîne à deux kamas (à identifier - Qualité 2)", 6],
                        ["Double-lame (à identifier - Qualité 2)", 6],
                        ["Bardiche (à identifier - Qualité 2)", 6],
                        ["Épée bâtarde (à identifier - Qualité 2)", 6],
                        ["Rapière (à identifier - Qualité 2)", 6],
                        ["Sabre (à identifier - Qualité 2)", 6],
                        ["Chaîne cloutée (à identifier - Qualité 2)", 6],
                        ["Tonfa (à identifier - Qualité 3)", 4],
                        ["Jitte (à identifier - Qualité 3)", 4],
                        ["Fouet (à identifier - Qualité 3)", 4],
                        ["Hallebarde (à identifier - Qualité 3)", 4]
                    ],
                    tenue: [
                        ["Vêtements sales", 20],
                        ["Gambison usé", 10],
                        ["Botte d'aventurier", 2.5],
                        ["Masque du Souffle Ancien", 2.7],
                        ["Torse sanglant du Souffle Ancien", 2.7],
                        ["Tenue du Bois Fossile", 2.7],
                        ["Veste de l'Escrimeur élégant", 2.7],
                        ["Chapeau de l'Escrimeur élégant", 2.7],
                        ["Protège-Bras de l'Escrimeur élégant", 2.7],
                        ["Grèves de l'Escrimeur élégant", 2.7],
                        ["Casque de la Sentinelle", 2.7],
                        ["Plastron de la Sentinelle", 2.7],
                        ["Garde-Bras de la Sentinelle", 2.7],
                        ["Jambières de la Sentinelle", 2.7],
                        ["Tenue du Bastion imprenable", 2.7],
                        ["Tunique Cloutée", 2.7],
                        ["Pantalon renforcé", 2.7],
                        ["Gantelet renforcé", 2.7],
                        ["Torse du Puma des Cimes", 2.7],
                        ["Gantelets de la Main Sépulcrale", 2.7],
                        ["Pantalon de la Main Sépulcrale", 2.7],
                        ["Masque du Puma des Cimes", 2.7],
                        ["Jambières du Puma des Cimes", 2.7],
                        ["Gantelets du Puma des Cimes", 2.7],
                        ["Casque de l’Aigle de Nuit", 2.7],
                        ["Gantelets de l’Aigle de Nuit", 2.7],
                        ["Jambières de l’Aigle de Nuit", 2.7],
                        ["Protège-épaules de l’Aigle de Nuit", 2.7]

                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d10", 100],
                    ["Commun", 80, "Rations", "1d4", 30],
                    ["Commun", 80, "Cachet de cire ou emblème de guilde", "1", 30],
                    ["Commun", 80, "Outre vide", "1", 30],
                    ["Commun", 80, "Boussole", "1", 30],
                    ["Commun", 80, "Menottes", "1", 30],
                    ["Commun", 80, "Carnet de notes avec croquis de cibles", "1", 30],
                    ["Commun", 80, "Contrat", "1", 30],
                    ["Commun", 80, "Bourse de sable", "1", 30],
                    ["Commun", 80, "Boucle d’oreille avec du sang séché", "1", 30],
                    ["Commun", 80, "Bout de vêtement déchiré appartenant à une cible", "1", 30],

                    ["Incommun", 15, "Sol", "10d10", 100],
                    ["Incommun", 15, "Outre d'alcool fort", "1", 15],
                    ["Incommun", 15, "Rations", "1d4", 50],
                    ["Incommun", 15, "Boussole", "1", 50],
                    ["Incommun", 15, "Menottes", "1", 50],
                    ["Incommun", 15, "Carnet de notes avec croquis de cibles", "1", 50],
                    ["Incommun", 15, "Concrat", "1", 50],
                    ["Incommun", 15, "Bourse de sable", "1", 50],
                    ["Incommun", 15, "Boucle d’oreille avec du sang séché", "1", 50],
                    ["Incommun", 15, "Bout de vêtement déchiré appartenant à une cible", "1", 50],

                    ["Rare", 4, "Sol", "15d10", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Boussole", "1", 50],
                    ["Rare", 4, "Menottes", "1", 50],
                    ["Rare", 4, "Carnet de notes avec croquis de cibles", "1", 50],
                    ["Rare", 4, "Concrat", "1", 50],
                    ["Rare", 4, "Bourse de sable", "1", 50],
                    ["Rare", 4, "Boucle d’oreille avec du sang séché", "1", 50],
                    ["Rare", 4, "Bout de vêtement déchiré appartenant à une cible", "1", 50],

                    ["Très rare", 0.9, "Sol", "20d10", 100],
                    ["Très rare", 0.9, "Boussole", "1", 70],
                    ["Très rare", 0.9, "Menottes", "1", 70],
                    ["Très rare", 0.9, "Carnet de notes avec croquis de cibles", "1", 70],
                    ["Très rare", 0.9, "Concrat", "1", 70],
                    ["Très rare", 0.9, "Bourse de sable", "1", 70],
                    ["Très rare", 0.9, "Boucle d’oreille avec du sang séché", "1", 70],
                    ["Très rare", 0.9, "Bout de vêtement déchiré appartenant à une cible", "1", 70],
                    ["Très rare", 0.9, "Chien dressé", "1", 5],

                    ["Légendaire", 0.1, "Sol", "5d100", 100],
                    ["Légendaire", 0.1, "Boussole", "1", 80],
                    ["Légendaire", 0.1, "Menottes", "1", 80],
                    ["Légendaire", 0.1, "Carnet de notes avec croquis de cibles", "1", 80],
                    ["Légendaire", 0.1, "Concrat", "1", 80],
                    ["Légendaire", 0.1, "Bourse de sable", "1", 80],
                    ["Légendaire", 0.1, "Boucle d’oreille avec du sang séché", "1", 80],
                    ["Légendaire", 0.1, "Lettre non envoyée à une famille qu’il n’a plus revue", "1", 80],
                    ["Légendaire", 0.1, "Bout de vêtement déchiré appartenant à une cible", "1", 80],
                    ["Légendaire", 0.1, "Chien dressé", "1", 2]
                ]
            },
            "Némésis": {
                meridiens: {
                    domination: [4, 7], savoir: [7, 9], expression: [4, 7],
                    puissance: [8, 13], mouvement: [9, 14], vitalite: [7, 11]
                },
                equipementEssentiel: {
                    arme: [
                        ["Arbalète (à identifier - Qualité 4)", 6],
                        ["Arc court (à identifier - Qualité 3)", 6],
                        ["Lance (à identifier - Qualité 3)", 6],
                        ["Épée longue (à identifier - Qualité 3)", 6],
                        ["Cimeterre (à identifier - Qualité 4)", 6],
                        ["Lance (à identifier - Qualité 4)", 6],
                        ["Bâton (à identifier - Qualité 3)", 6],
                        ["Chaîne à deux kamas (à identifier - Qualité 3)", 6],
                        ["Double-lame (à identifier - Qualité 3)", 6],
                        ["Bardiche (à identifier - Qualité 4)", 6],
                        ["Épée bâtarde (à identifier - Qualité 3)", 6],
                        ["Rapière (à identifier - Qualité 3)", 6],
                        ["Sabre (à identifier - Qualité 3)", 6],
                        ["Chaîne cloutée (à identifier - Qualité 3)", 4],
                        ["Tonfa (à identifier - Qualité 4)", 4],
                        ["Jitte (à identifier - Qualité 4)", 6],
                        ["Fouet (à identifier - Qualité 4)", 4],
                        ["Hallebarde (à identifier - Qualité 4)", 4]
                    ],
                    tenue: [
                        ["Masque du Souffle Ancien", 4],
                        ["Torse sanglant du Souffle Ancien", 4],
                        ["Tenue du Bois Fossile", 4],
                        ["Veste de l'Escrimeur élégant", 4],
                        ["Chapeau de l'Escrimeur élégant", 4],
                        ["Protège-Bras de l'Escrimeur élégant", 4],
                        ["Grèves de l'Escrimeur élégant", 4],
                        ["Casque de la Sentinelle", 4],
                        ["Plastron de la Sentinelle", 4],
                        ["Garde-Bras de la Sentinelle", 4],
                        ["Jambières de la Sentinelle", 4],
                        ["Tenue du Bastion imprenable", 4],
                        ["Tunique Cloutée", 4],
                        ["Pantalon renforcé", 4],
                        ["Gantelet renforcé", 4],
                        ["Torse du Puma des Cimes", 4],
                        ["Gantelets de la Main Sépulcrale", 4],
                        ["Pantalon de la Main Sépulcrale", 4],
                        ["Masque du Puma des Cimes", 4],
                        ["Jambières du Puma des Cimes", 4],
                        ["Gantelets du Puma des Cimes", 4],
                        ["Casque de l’Aigle de Nuit", 4],
                        ["Gantelets de l’Aigle de Nuit", 4],
                        ["Jambières de l’Aigle de Nuit", 4],
                        ["Protège-épaules de l’Aigle de Nuit", 4]

                    ]
                },
                butinSupplementaire: [
                    ["Commun", 80, "Sol", "5d100", 100],
                    ["Commun", 80, "Rations", "1d4", 70],
                    ["Commun", 80, "Cachet de cire ou emblème de guilde", "1", 70],
                    ["Commun", 80, "Outre vide", "1", 70],
                    ["Commun", 80, "Boussole", "1", 70],
                    ["Commun", 80, "Menottes", "1", 70],
                    ["Commun", 80, "Carnet de notes avec croquis de cibles", "1", 70],
                    ["Commun", 80, "Contrat", "1", 70],
                    ["Commun", 80, "Bourse de sable", "1", 70],
                    ["Commun", 80, "Boucle d’oreille avec du sang séché", "1", 70],
                    ["Commun", 80, "Bout de vêtement déchiré appartenant à une cible", "1", 70],
                    ["Commun", 80, "La Griffe de Brume", "1", 20],
                    ["Commun", 80, "La Faux d’Aube", "1", 20],
                    ["Commun", 80, "Arc-Luth", "1", 20],
                    ["Commun", 80, "Sabre du Vent Brisé", "1", 20],

                    ["Incommun", 15, "Sol", "10d100", 100],
                    ["Incommun", 15, "Outre d'alcool fort", "1", 100],
                    ["Incommun", 15, "Rations", "1d4", 100],
                    ["Incommun", 15, "Boussole", "1", 100],
                    ["Incommun", 15, "Menottes", "1", 100],
                    ["Incommun", 15, "Carnet de notes avec croquis de cibles", "1", 100],
                    ["Incommun", 15, "Concrat", "1", 100],
                    ["Incommun", 15, "Bourse de sable", "1", 100],
                    ["Incommun", 15, "Boucle d’oreille avec du sang séché", "1", 100],
                    ["Incommun", 15, "Bout de vêtement déchiré appartenant à une cible", "1", 100],
                    ["Incommun", 15, "Chien dressé", "1", 2],
                    ["Incommun", 15, "La Griffe de Brume", "1", 20],
                    ["Incommun", 15, "La Faux d’Aube", "1", 20],
                    ["Incommun", 15, "Arc-Luth", "1", 20],
                    ["Incommun", 15, "Sabre du Vent Brisé", "1", 20],

                    ["Rare", 4, "Sol", "15d100", 100],
                    ["Rare", 4, "Rations", "1d6", 20],
                    ["Rare", 4, "Boussole", "1", 100],
                    ["Rare", 4, "Menottes", "1", 100],
                    ["Rare", 4, "Carnet de notes avec croquis de cibles", "1", 100],
                    ["Rare", 4, "Concrat", "1", 100],
                    ["Rare", 4, "Bourse de sable", "1", 100],
                    ["Rare", 4, "Boucle d’oreille avec du sang séché", "1", 100],
                    ["Rare", 4, "Bout de vêtement déchiré appartenant à une cible", "1", 100],
                    ["Rare", 4, "La Griffe de Brume", "1", 30],
                    ["Rare", 4, "La Faux d’Aube", "1", 30],
                    ["Rare", 4, "Arc-Luth", "1", 30],
                    ["Rare", 4, "Sabre du Vent Brisé", "1", 30],
                    ["Rare", 4, "Chien dressé", "1", 10],

                    ["Très rare", 0.9, "Sol", "20d100", 100],
                    ["Très rare", 0.9, "Boussole", "1", 100],
                    ["Très rare", 0.9, "Menottes", "1", 100],
                    ["Très rare", 0.9, "Carnet de notes avec croquis de cibles", "1", 100],
                    ["Très rare", 0.9, "Concrat", "1", 100],
                    ["Très rare", 0.9, "Bourse de sable", "1", 100],
                    ["Très rare", 0.9, "Boucle d’oreille avec du sang séché", "1", 100],
                    ["Très rare", 0.9, "Bout de vêtement déchiré appartenant à une cible", "1", 100],
                    ["Très rare", 0.9, "La Griffe de Brume", "1", 40],
                    ["Très rare", 0.9, "La Faux d’Aube", "1", 40],
                    ["Très rare", 0.9, "Arc-Luth", "1", 40],
                    ["Très rare", 0.9, "Sabre du Vent Brisé", "1", 40],
                    ["Très rare", 0.9, "Chaîne-Sifflet", "1", 40],
                    ["Très rare", 0.9, "Chien dressé", "1", 50],

                    ["Légendaire", 0.1, "Sol", "30d100", 100],
                    ["Légendaire", 0.1, "Boussole", "1", 100],
                    ["Légendaire", 0.1, "Menottes", "1", 100],
                    ["Légendaire", 0.1, "Carnet de notes avec croquis de cibles", "1", 100],
                    ["Légendaire", 0.1, "Concrat", "1", 100],
                    ["Légendaire", 0.1, "Bourse de sable", "1", 100],
                    ["Légendaire", 0.1, "Boucle d’oreille avec du sang séché", "1", 100],
                    ["Légendaire", 0.1, "Lettre non envoyée à une famille qu’il n’a plus revue", "1", 100],
                    ["Légendaire", 0.1, "Bout de vêtement déchiré appartenant à une cible", "1", 100],
                    ["Légendaire", 0.1, "La Griffe de Brume", "1", 50],
                    ["Légendaire", 0.1, "La Faux d’Aube", "1", 50],
                    ["Légendaire", 0.1, "Arc-Luth", "1", 50],
                    ["Légendaire", 0.1, "Sabre du Vent Brisé", "1", 50],
                    ["Légendaire", 0.1, "Chaîne-Sifflet", "1", 50],
                    ["Légendaire", 0.1, "Chien dressé", "1", 90]
                ]
            },
        }
    },
            "Neutre": {
        "Habitant de village/tribu": {
            meridiens: {
                domination: [1, 3], savoir: [1, 3], expression: [1, 4],
                puissance: [1, 3], mouvement: [1, 3], vitalite: [1, 3]
            },
            equipementEssentiel: {
                arme: [
                    ["(Aucune)", 100]
                ],
                tenue: [
                    ["(Aucune)", 100]
                ]
            },
            butinSupplementaire: [
                ["Commun", 80, "Sol", "2d6", 100],
                ["Commun", 80, "Chapeau de paille", "1", 4],
                ["Commun", 80, "Marteau, faucille, houe ou autre outil agricole", "1", 1],
                ["Commun", 80, "Pipe en bois", "1", 4],
                ["Commun", 80, "Corde en chanvre (15 m)", "1", 4],
                ["Commun", 80, "Paire de gants en laine", "1", 4],
                ["Commun", 80, "Appâts pêche (1 jour)", "1", 4],
                ["Commun", 80, "Canne à pêche", "1", 4],
                ["Commun", 80, "Cuir épais", "1", 4],
                ["Commun", 80, "Cuir souple", "1", 4],
                ["Commun", 80, "Déguisement", "1", 4],
                ["Commun", 80, "Flûte de pan", "1", 4],
                ["Commun", 80, "Fragment de savon", "1", 4],
                ["Commun", 80, "Petit Couteau (Qualité 0)", "1", 4],
                ["Commun", 80, "Boussole", "1", 1],
                ["Commun", 80, "Petit sac de sel", "1", 4],
                ["Commun", 80, "Vieille pièce des Anciens", "1", 1],
                ["Commun", 80, "Jeu de base pukllay", "1", 4],
                ["Commun", 80, "Kit du chasseur", "1", 1],
                ["Commun", 80, "Kit de l'herboriste", "1", 1],
                ["Commun", 80, "Kit de l'aventurier", "1", 1],
                ["Commun", 80, "Outre à pisco/eau (2 litres)", "1", 4],
                ["Commun", 80, "Patte de lapin", "1", 4],
                ["Commun", 80, "Résine d'arbre (Sac)", "1", 4],
                ["Commun", 80, "Couteau (à identifier - Qualité 1)", "1", 4],

                ["Incommun", 15, "Sol", "3d6", 100],
                ["Incommun", 15, "Chapeau de paille", "1", 6],
                ["Incommun", 15, "Marteau, faucille, houe ou autre outil agricole", "1", 6],
                ["Incommun", 15, "Pipe en bois", "1", 6],
                ["Incommun", 15, "Corde en chanvre (15 m)", "1", 6],
                ["Incommun", 15, "Paire de gants en laine", "1", 6],
                ["Incommun", 15, "Appâts pêche (1 jour)", "1", 6],
                ["Incommun", 15, "Canne à pêche", "1", 6],
                ["Incommun", 15, "Cuir épais", "1", 6],
                ["Incommun", 15, "Cuir souple", "1", 6],
                ["Incommun", 15, "Déguisement", "1", 6],
                ["Incommun", 15, "Flûte de pan", "1", 6],
                ["Incommun", 15, "Fragment de savon", "1", 6],
                ["Incommun", 15, "Petit Couteau (Qualité 0)", "1", 6],
                ["Incommun", 15, "Boussole", "1", 6],
                ["Incommun", 15, "Petit sac de sel", "1", 6],
                ["Incommun", 15, "Vieille pièce des Anciens", "1", 6],
                ["Incommun", 15, "Jeu de base pukllay", "1", 6],
                ["Incommun", 15, "Kit du chasseur", "1", 6],
                ["Incommun", 15, "Kit de l'herboriste", "1", 6],
                ["Incommun", 15, "Kit de l'aventurier", "1", 6],
                ["Incommun", 15, "Outre à pisco/eau (2 litres)", "1", 6],
                ["Incommun", 15, "Patte de lapin", "1", 6],
                ["Incommun", 15, "Résine d'arbre (Sac)", "1", 6],
                ["Incommun", 15, "Couteau (à identifier - Qualité 1)", "1", 4],

                ["Rare", 4, "Sol", "5d10", 100],
                ["Rare", 4, "Chapeau de paille", "1", 7],
                ["Rare", 4, "Marteau, faucille, houe ou autre outil agricole", "1", 7],
                ["Rare", 4, "Pipe en bois", "1", 7],
                ["Rare", 4, "Corde en chanvre (15 m)", "1", 7],
                ["Rare", 4, "Paire de gants en laine", "1", 7],
                ["Rare", 4, "Appâts pêche (1 jour)", "1", 7],
                ["Rare", 4, "Canne à pêche", "1", 7],
                ["Rare", 4, "Cuir épais", "1", 7],
                ["Rare", 4, "Cuir souple", "1", 7],
                ["Rare", 4, "Déguisement", "1", 7],
                ["Rare", 4, "Flûte de pan", "1", 7],
                ["Rare", 4, "Fragment de savon", "1", 7],
                ["Rare", 4, "Petit Couteau (Qualité 0)", "1", 7],
                ["Rare", 4, "Boussole", "1", 7],
                ["Rare", 4, "Petit sac de sel", "1", 7],
                ["Rare", 4, "Vieille pièce des Anciens", "1", 7],
                ["Rare", 4, "Jeu de base pukllay", "1", 7],
                ["Rare", 4, "Kit du chasseur", "1", 7],
                ["Rare", 4, "Kit de l'herboriste", "1", 7],
                ["Rare", 4, "Kit de l'aventurier", "1", 7],
                ["Rare", 4, "Outre à pisco/eau (2 litres)", "1", 7],
                ["Rare", 4, "Patte de lapin", "1", 7],
                ["Rare", 4, "Résine d'arbre (Sac)", "1", 7],
                ["Rare", 4, "Couteau (à identifier - Qualité 1)", "1", 7],

                ["Très rare", 0.9, "Sol", "10d10", 100],
                ["Très rare", 0.9, "Chapeau de paille", "1", 8],
                ["Très rare", 0.9, "Marteau, faucille, houe ou autre outil agricole", "1", 8],
                ["Très rare", 0.9, "Pipe en bois", "1", 8],
                ["Très rare", 0.9, "Corde en chanvre (15 m)", "1", 8],
                ["Très rare", 0.9, "Paire de gants en laine", "1", 8],
                ["Très rare", 0.9, "Appâts pêche (1 jour)", "1", 8],
                ["Très rare", 0.9, "Canne à pêche", "1", 8],
                ["Très rare", 0.9, "Cuir épais", "1", 8],
                ["Très rare", 0.9, "Cuir souple", "1", 8],
                ["Très rare", 0.9, "Déguisement", "1", 8],
                ["Très rare", 0.9, "Flûte de pan", "1", 8],
                ["Très rare", 0.9, "Fragment de savon", "1", 8],
                ["Très rare", 0.9, "Petit Couteau (Qualité 0)", "1", 8],
                ["Très rare", 0.9, "Boussole", "1", 8],
                ["Très rare", 0.9, "Petit sac de sel", "1", 8],
                ["Très rare", 0.9, "Vieille pièce des Anciens", "1", 8],
                ["Très rare", 0.9, "Jeu de base pukllay", "1", 8],
                ["Très rare", 0.9, "Kit du chasseur", "1", 8],
                ["Très rare", 0.9, "Kit de l'herboriste", "1", 8],
                ["Très rare", 0.9, "Kit de l'aventurier", "1", 8],
                ["Très rare", 0.9, "Outre à pisco/eau (2 litres)", "1", 8],
                ["Très rare", 0.9, "Patte de lapin", "1", 8],
                ["Très rare", 0.9, "Résine d'arbre (Sac)", "1", 8],
                ["Très rare", 0.9, "Couteau (à identifier - Qualité 1)", "1", 8],

                ["Légendaire", 0.1, "Sol", "15d10", 100],
                ["Légendaire", 0.1, "Chapeau de paille", "1", 20],
                ["Légendaire", 0.1, "Marteau, faucille, houe ou autre outil agricole", "1", 20],
                ["Légendaire", 0.1, "Pipe en bois", "1", 20],
                ["Légendaire", 0.1, "Corde en chanvre (15 m)", "1", 20],
                ["Légendaire", 0.1, "Paire de gants en laine", "1", 20],
                ["Légendaire", 0.1, "Appâts pêche (1 jour)", "1", 20],
                ["Légendaire", 0.1, "Canne à pêche", "1", 20],
                ["Légendaire", 0.1, "Cuir épais", "1", 20],
                ["Légendaire", 0.1, "Cuir souple", "1", 20],
                ["Légendaire", 0.1, "Déguisement", "1", 20],
                ["Légendaire", 0.1, "Flûte de pan", "1", 20],
                ["Légendaire", 0.1, "Fragment de savon", "1", 20],
                ["Légendaire", 0.1, "Petit Couteau (Qualité 0)", "1", 20],
                ["Légendaire", 0.1, "Boussole", "1", 20],
                ["Légendaire", 0.1, "Petit sac de sel", "1", 20],
                ["Légendaire", 0.1, "Vieille pièce des Anciens", "1", 20],
                ["Légendaire", 0.1, "Jeu de base pukllay", "1", 20],
                ["Légendaire", 0.1, "Kit du chasseur", "1", 10],
                ["Légendaire", 0.1, "Kit de l'herboriste", "1", 10],
                ["Légendaire", 0.1, "Kit de l'aventurier", "1", 10],
                ["Légendaire", 0.1, "Outre à pisco/eau (2 litres)", "1", 20],
                ["Légendaire", 0.1, "Patte de lapin", "1", 20],
                ["Légendaire", 0.1, "Résine d'arbre (Sac)", "1", 20],
                ["Légendaire", 0.1, "Couteau (à identifier - Qualité 1)", "1", 20]

            ]
        },
        "Habitant de cité": {
            meridiens: {
                domination: [1, 3], savoir: [1, 3], expression: [1, 4],
                puissance: [1, 3], mouvement: [1, 3], vitalite: [1, 3]
            },
            equipementEssentiel: {
                arme: [
                    ["(Aucune)", 100]
                ],
                tenue: [
                    ["(Aucune)", 100]
                ]
            },
            butinSupplementaire: [
                ["Commun", 80, "Sol", "2d6", 100],
                ["Commun", 80, "Peigne en os", "1", 4],
                ["Commun", 80, "Marteau, faucille, houe ou autre outil agricole", "1", 1],
                ["Commun", 80, "Pipe en bois", "1", 4],
                ["Commun", 80, "Trousseau d’aiguilles et fil coloré", "1", 4],
                ["Commun", 80, "Paire de gants en laine", "1", 4],
                ["Commun", 80, "Bague", "1", 4],
                ["Commun", 80, "Petit carnet de dettes", "1", 4],
                ["Commun", 80, "Flacon de parfum artisanal", "1", 4],
                ["Commun", 80, "Nécessaire d'écriture", "1", 4],
                ["Commun", 80, "Déguisement", "1", 4],
                ["Commun", 80, "Flûte de pan", "1", 4],
                ["Commun", 80, "Fragment de savon", "1", 4],
                ["Commun", 80, "Marteau d'ouvrier", "1", 4],
                ["Commun", 80, "Petit rempli de fèves de cacao", "1d20", 1],
                ["Commun", 80, "Petit sac de sel", "1", 4],
                ["Commun", 80, "Khôl ou pigment (maquillage)", "1", 1],
                ["Commun", 80, "Jeu de base pukllay", "1", 4],
                ["Commun", 80, "Kit de l'érudit", "1", 1],
                ["Commun", 80, "Kit de l'herboriste", "1", 1],
                ["Commun", 80, "Kit d'artisan", "1", 1],
                ["Commun", 80, "Outre à pisco/eau (2 litres)", "1", 4],
                ["Commun", 80, "Aiguille à cheveux", "1", 4],
                ["Commun", 80, "Dague (à identifier - Qualité 1)", "1", 4],

                ["Incommun", 15, "Sol", "3d6", 100],
                ["Incommun", 15, "Peigne en os", "1", 6],
                ["Incommun", 15, "Encens", "1", 6],
                ["Incommun", 15, "Pipe en bois", "1", 6],
                ["Incommun", 15, "Trousseau d’aiguilles et fil coloré", "1", 6],
                ["Incommun", 15, "Paire de gants en laine", "1", 6],
                ["Incommun", 15, "Bague", "1", 6],
                ["Incommun", 15, "Petit carnet de dettes", "1", 6],
                ["Incommun", 15, "Flacon de parfum artisanal", "1", 6],
                ["Incommun", 15, "Nécessaire d'écriture", "1", 6],
                ["Incommun", 15, "Déguisement", "1", 6],
                ["Incommun", 15, "Flûte de pan", "1", 6],
                ["Incommun", 15, "Fragment de savon", "1", 6],
                ["Incommun", 15, "Marteau d'ouvrier", "1", 6],
                ["Incommun", 15, "Petit rempli de fèves de cacao", "1d20", 6],
                ["Incommun", 15, "Petit sac de sel", "1", 6],
                ["Incommun", 15, "Khôl ou pigment (maquillage)", "1", 6],
                ["Incommun", 15, "Jeu de base pukllay", "1", 6],
                ["Incommun", 15, "Kit de l'érudit", "1", 6],
                ["Incommun", 15, "Kit de l'herboriste", "1", 6],
                ["Incommun", 15, "Kit d'artisan", "1", 6],
                ["Incommun", 15, "Outre à pisco/eau (2 litres)", "1", 6],
                ["Incommun", 15, "Aiguille à cheveux", "1", 6],
                ["Incommun", 15, "Dague (à identifier - Qualité 1)", "1", 6],

                ["Rare", 4, "Sol", "5d10", 100],
                ["Rare", 4, "Peigne en os", "1", 7],
                ["Rare", 4, "Encens", "1", 7],
                ["Rare", 4, "Pipe en bois", "1", 7],
                ["Rare", 4, "Trousseau d’aiguilles et fil coloré", "1", 7],
                ["Rare", 4, "Paire de gants en laine", "1", 7],
                ["Rare", 4, "Bague", "1", 7],
                ["Rare", 4, "Petit carnet de dettes", "1", 7],
                ["Rare", 4, "Flacon de parfum artisanal", "1", 7],
                ["Rare", 4, "Nécessaire d'écriture", "1", 7],
                ["Rare", 4, "Déguisement", "1", 7],
                ["Rare", 4, "Flûte de pan", "1", 7],
                ["Rare", 4, "Fragment de savon", "1", 7],
                ["Rare", 4, "Marteau d'ouvrier", "1", 7],
                ["Rare", 4, "Petit rempli de fèves de cacao", "1d20", 7],
                ["Rare", 4, "Petit sac de sel", "1", 7],
                ["Rare", 4, "Khôl ou pigment (maquillage)", "1", 7],
                ["Rare", 4, "Jeu de base pukllay", "1", 7],
                ["Rare", 4, "Kit de l'érudit", "1", 7],
                ["Rare", 4, "Kit de l'herboriste", "1", 7],
                ["Rare", 4, "Kit d'artisan", "1", 7],
                ["Rare", 4, "Outre à pisco/eau (2 litres)", "1", 7],
                ["Rare", 4, "Aiguille à cheveux", "1", 7],
                ["Rare", 4, "Dague (à identifier - Qualité 1)", "1", 7],

                ["Très rare", 0.9, "Sol", "10d10", 100],
                ["Très rare", 0.9, "Peigne en os", "1", 8],
                ["Très rare", 0.9, "Encens", "1", 8],
                ["Très rare", 0.9, "Pipe en bois", "1", 8],
                ["Très rare", 0.9, "Trousseau d’aiguilles et fil coloré", "1", 8],
                ["Très rare", 0.9, "Paire de gants en laine", "1", 8],
                ["Très rare", 0.9, "Bague", "1", 8],
                ["Très rare", 0.9, "Petit carnet de dettes", "1", 8],
                ["Très rare", 0.9, "Flacon de parfum artisanal", "1", 8],
                ["Très rare", 0.9, "Nécessaire d'écriture", "1", 8],
                ["Très rare", 0.9, "Déguisement", "1", 8],
                ["Très rare", 0.9, "Flûte de pan", "1", 8],
                ["Très rare", 0.9, "Fragment de savon", "1", 8],
                ["Très rare", 0.9, "Marteau d'ouvrier", "1", 8],
                ["Très rare", 0.9, "Petit rempli de fèves de cacao", "1d20", 8],
                ["Très rare", 0.9, "Petit sac de sel", "1", 8],
                ["Très rare", 0.9, "Khôl ou pigment (maquillage)", "1", 8],
                ["Très rare", 0.9, "Jeu de base pukllay", "1", 8],
                ["Très rare", 0.9, "Kit de l'érudit", "1", 8],
                ["Très rare", 0.9, "Kit de l'herboriste", "1", 8],
                ["Très rare", 0.9, "Kit d'artisan", "1", 8],
                ["Très rare", 0.9, "Outre à pisco/eau (2 litres)", "1", 8],
                ["Très rare", 0.9, "Aiguille à cheveux", "1", 8],
                ["Très rare", 0.9, "Dague (à identifier - Qualité 1)", "1", 8],

                ["Légendaire", 0.1, "Sol", "15d10", 100],
                ["Légendaire", 0.1, "Peigne en os", "1", 20],
                ["Légendaire", 0.1, "Encens", "1", 20],
                ["Légendaire", 0.1, "Pipe en bois", "1", 20],
                ["Légendaire", 0.1, "Trousseau d’aiguilles et fil coloré", "1", 20],
                ["Légendaire", 0.1, "Paire de gants en laine", "1", 20],
                ["Légendaire", 0.1, "Bague", "1", 20],
                ["Légendaire", 0.1, "Petit carnet de dettes", "1", 20],
                ["Légendaire", 0.1, "Flacon de parfum artisanal", "1", 20],
                ["Légendaire", 0.1, "Nécessaire d'écriture", "1", 20],
                ["Légendaire", 0.1, "Déguisement", "1", 20],
                ["Légendaire", 0.1, "Flûte de pan", "1", 20],
                ["Légendaire", 0.1, "Fragment de savon", "1", 20],
                ["Légendaire", 0.1, "Marteau d'ouvrier", "1", 20],
                ["Légendaire", 0.1, "Petit rempli de fèves de cacao", "1d20", 20],
                ["Légendaire", 0.1, "Petit sac de sel", "1", 20],
                ["Légendaire", 0.1, "Khôl ou pigment (maquillage)", "1", 20],
                ["Légendaire", 0.1, "Jeu de base pukllay", "1", 20],
                ["Légendaire", 0.1, "Kit de l'érudit", "1", 10],
                ["Légendaire", 0.1, "Kit de l'herboriste", "1", 10],
                ["Légendaire", 0.1, "Kit d'artisan", "1", 10],
                ["Légendaire", 0.1, "Outre à pisco/eau (2 litres)", "1", 20],
                ["Légendaire", 0.1, "Aiguille à cheveux", "1", 20],
                ["Légendaire", 0.1, "Dague (à identifier - Qualité 1)", "1", 20]

            ]
        },
        "Aventurier": {
            meridiens: { 
                domination: [1, 3], savoir: [2, 3], expression: [1, 4],
                puissance: [2, 3], mouvement: [2, 3], vitalite: [2, 3]
            },
            equipementEssentiel: {
                arme: [
                    ["(Aucune)", 100]
                ],
                tenue: [
                    ["(Aucune)", 100]
                ]
            },
            butinSupplementaire: [
                ["Commun", 80, "Sol", "2d6", 100],
                ["Commun", 80, "Rations", "1d4", 4],
                ["Commun", 80, "Feuille de coca", "1d10", 1],
                ["Commun", 80, "Pipe en bois", "1", 4],
                ["Commun", 80, "Corde en chanvre (15 m)", "1", 4],
                ["Commun", 80, "Paire de gants en laine", "1", 4],
                ["Commun", 80, "Fourrure épaisse", "1", 4],
                ["Commun", 80, "Canne à pêche", "1", 4],
                ["Commun", 80, "Petit Couteau (Qualité 0)", "1", 4],
                ["Commun", 80, "Couverture de survie", "1", 4],
                ["Commun", 80, "Tente", "1", 4],
                ["Commun", 80, "Flûte de pan", "1", 4],
                ["Commun", 80, "Fragment de savon", "1", 4],
                ["Commun", 80, "Couverture en laine d'alpaga", "1", 4],
                ["Commun", 80, "Boussole", "1", 1],
                ["Commun", 80, "Paillasse", "1", 4],
                ["Commun", 80, "Sac à dos d'explorateur", "1", 1],
                ["Commun", 80, "Jeu de base pukllay", "1", 4],
                ["Commun", 80, "Kit du chasseur", "1", 1],
                ["Commun", 80, "Potion (à identifier - Qualité 1)", "1", 1],
                ["Commun", 80, "Kit de l'aventurier", "1", 1],
                ["Commun", 80, "Outre à pisco/eau (2 litres)", "1", 4],
                ["Commun", 80, "Silex et amorce", "1", 4],
                ["Commun", 80, "Résine d'arbre (Sac)", "1", 4],
                ["Commun", 80, "Torche", "1", 4],

                ["Incommun", 15, "Sol", "3d6", 100],
                ["Incommun", 15, "Rations", "1d4", 4],
                ["Incommun", 15, "Feuille de coca", "1d10", 4],
                ["Incommun", 15, "Pipe en bois", "1", 4],
                ["Incommun", 15, "Corde en chanvre (15 m)", "1", 6],
                ["Incommun", 15, "Paire de gants en laine", "1", 6],
                ["Incommun", 15, "Fourrure épaisse", "1", 6],
                ["Incommun", 15, "Canne à pêche", "1", 6],
                ["Incommun", 15, "Petit Couteau (Qualité 0)", "1", 6],
                ["Incommun", 15, "Couverture de survie", "1", 6],
                ["Incommun", 15, "Tente", "1", 6],
                ["Incommun", 15, "Flûte de pan", "1", 6],
                ["Incommun", 15, "Fragment de savon", "1", 6],
                ["Incommun", 15, "Couverture en laine d'alpaga", "1", 6],
                ["Incommun", 15, "Boussole", "1", 6],
                ["Incommun", 15, "Paillasse", "1", 6],
                ["Incommun", 15, "Sac à dos d'explorateur", "1", 6],
                ["Incommun", 15, "Jeu de base pukllay", "1", 6],
                ["Incommun", 15, "Kit du chasseur", "1", 6],
                ["Incommun", 15, "Potion (à identifier - Qualité 1)", "1", 6],
                ["Incommun", 15, "Kit de l'aventurier", "1", 6],
                ["Incommun", 15, "Outre à pisco/eau (2 litres)", "1", 6],
                ["Incommun", 15, "Silex et amorce", "1", 4],
                ["Incommun", 15, "Résine d'arbre (Sac)", "1", 4],
                ["Incommun", 15, "Torche", "1", 4],

                ["Rare", 4, "Sol", "5d10", 100],
                ["Rare", 4, "Rations", "1d4", 7],
                ["Rare", 4, "Feuille de coca", "1d10", 7],
                ["Rare", 4, "Pipe en bois", "1", 7],
                ["Rare", 4, "Corde en chanvre (15 m)", "1", 7],
                ["Rare", 4, "Paire de gants en laine", "1", 7],
                ["Rare", 4, "Fourrure épaisse", "1", 7],
                ["Rare", 4, "Canne à pêche", "1", 7],
                ["Rare", 4, "Petit Couteau (Qualité 0)", "1", 7],
                ["Rare", 4, "Couverture de survie", "1", 7],
                ["Rare", 4, "Tente", "1", 7],
                ["Rare", 4, "Flûte de pan", "1", 7],
                ["Rare", 4, "Fragment de savon", "1", 7],
                ["Rare", 4, "Couverture en laine d'alpaga", "1", 7],
                ["Rare", 4, "Boussole", "1", 7],
                ["Rare", 4, "Paillasse", "1", 7],
                ["Rare", 4, "Sac à dos d'explorateur", "1", 7],
                ["Rare", 4, "Jeu de base pukllay", "1", 7],
                ["Rare", 4, "Kit du chasseur", "1", 7],
                ["Rare", 4, "Potion (à identifier - Qualité 1)", "1", 7],
                ["Rare", 4, "Kit de l'aventurier", "1", 7],
                ["Rare", 4, "Outre à pisco/eau (2 litres)", "1", 7],
                ["Rare", 4, "Silex et amorce", "1", 7],
                ["Rare", 4, "Résine d'arbre (Sac)", "1", 7],
                ["Rare", 4, "Torche", "1", 7],

                ["Très rare", 0.9, "Sol", "10d10", 100],
                ["Très rare", 0.9, "Rations", "1d4", 8],
                ["Très rare", 0.9, "Feuille de coca", "1d10", 8],
                ["Très rare", 0.9, "Pipe en bois", "1", 8],
                ["Très rare", 0.9, "Corde en chanvre (15 m)", "1", 8],
                ["Très rare", 0.9, "Paire de gants en laine", "1", 8],
                ["Très rare", 0.9, "Fourrure épaisse", "1", 8],
                ["Très rare", 0.9, "Canne à pêche", "1", 8],
                ["Très rare", 0.9, "Petit Couteau (Qualité 0)", "1", 8],
                ["Très rare", 0.9, "Couverture de survie", "1", 8],
                ["Très rare", 0.9, "Tente", "1", 8],
                ["Très rare", 0.9, "Flûte de pan", "1", 8],
                ["Très rare", 0.9, "Fragment de savon", "1", 8],
                ["Très rare", 0.9, "Couverture en laine d'alpaga", "1", 8],
                ["Très rare", 0.9, "Boussole", "1", 8],
                ["Très rare", 0.9, "Paillasse", "1", 8],
                ["Très rare", 0.9, "Sac à dos d'explorateur", "1", 8],
                ["Très rare", 0.9, "Jeu de base pukllay", "1", 8],
                ["Très rare", 0.9, "Kit du chasseur", "1", 8],
                ["Très rare", 0.9, "Potion (à identifier - Qualité 1)", "1", 8],
                ["Très rare", 0.9, "Kit de l'aventurier", "1", 8],
                ["Très rare", 0.9, "Outre à pisco/eau (2 litres)", "1", 8],
                ["Très rare", 0.9, "Silex et amorce", "1", 8],
                ["Très rare", 0.9, "Résine d'arbre (Sac)", "1", 8],
                ["Très rare", 0.9, "Torche", "1", 8],

                ["Légendaire", 0.1, "Sol", "15d10", 100],
                ["Légendaire", 0.1, "Rations", "1d4", 20],
                ["Légendaire", 0.1, "Feuille de coca", "1d10", 20],
                ["Légendaire", 0.1, "Pipe en bois", "1", 20],
                ["Légendaire", 0.1, "Corde en chanvre (15 m)", "1", 20],
                ["Légendaire", 0.1, "Paire de gants en laine", "1", 20],
                ["Légendaire", 0.1, "Fourrure épaisse", "1", 20],
                ["Légendaire", 0.1, "Canne à pêche", "1", 20],
                ["Légendaire", 0.1, "Petit Couteau (Qualité 0)", "1", 20],
                ["Légendaire", 0.1, "Couverture de survie", "1", 20],
                ["Légendaire", 0.1, "Tente", "1", 20],
                ["Légendaire", 0.1, "Flûte de pan", "1", 20],
                ["Légendaire", 0.1, "Fragment de savon", "1", 20],
                ["Légendaire", 0.1, "Couverture en laine d'alpaga", "1", 20],
                ["Légendaire", 0.1, "Boussole", "1", 20],
                ["Légendaire", 0.1, "Paillasse", "1", 20],
                ["Légendaire", 0.1, "Sac à dos d'explorateur", "1", 20],
                ["Légendaire", 0.1, "Jeu de base pukllay", "1", 20],
                ["Légendaire", 0.1, "Kit du chasseur", "1", 10],
                ["Légendaire", 0.1, "Potion (à identifier - Qualité 1)", "1", 10],
                ["Légendaire", 0.1, "Kit de l'aventurier", "1", 10],
                ["Légendaire", 0.1, "Outre à pisco/eau (2 litres)", "1", 20],
                ["Légendaire", 0.1, "Silex et amorce", "1", 20],
                ["Légendaire", 0.1, "Résine d'arbre (Sac)", "1", 20],
                ["Légendaire", 0.1, "Torche", "1", 20]

            ]
        },
        "Artiste/Saltimbanque": {
            meridiens: { 
                domination: [1, 3], savoir: [1, 3], expression: [1, 4],
                puissance: [1, 3], mouvement: [1, 3], vitalite: [1, 3]
            },
            equipementEssentiel: {
                arme: [
                    ["(Aucune)", 100]
                ],
                tenue: [
                    ["(Aucune)", 100]
                ]
            },
            butinSupplementaire: [
                ["Commun", 80, "Sol", "2d6", 100],
                ["Commun", 80, "Balles de jonglage", "1", 4],
                ["Commun", 80, "Instrument de musique", "1", 1],
                ["Commun", 80, "Feuilles de Ayahuasca", "1d6", 4],
                ["Commun", 80, "Amulette de théâtre (masque miniature porté en collier)", "1", 4],
                ["Commun", 80, "Graines de Yopo", "1d6", 4],
                ["Commun", 80, "Petites marionnettes artisanales pour spectacles de rue", "1", 4],
                ["Commun", 80, "Masques en bois peints", "1", 4],
                ["Commun", 80, "Feuille de coca", "1d10", 4],
                ["Commun", 80, "Chapeau orné de plumes ou de grelots", "1", 4],
                ["Commun", 80, "Déguisement", "1", 4],
                ["Commun", 80, "Flûte de pan", "1", 4],
                ["Commun", 80, "Un carnet de croquis", "1", 1],
                ["Commun", 80, "Khôl ou pigment (maquillage)", "1", 1],
                ["Commun", 80, "Potion (à identifier - Qualité 1)", "1", 1],
                ["Commun", 80, "Outre à pisco/eau (2 litres)", "1", 4],
                ["Commun", 80, "Patte de lapin", "1", 4],
                ["Commun", 80, "Aiguille à cheveux", "1", 4],
                ["Commun", 80, "Tarot de Divination", "1", 4],

                ["Incommun", 15, "Sol", "3d6", 100],
                ["Incommun", 15, "Balles de jonglage", "1", 4],
                ["Incommun", 15, "Instrument de musique", "1", 4],
                ["Incommun", 15, "Feuilles de Ayahuasca", "1d6", 6],
                ["Incommun", 15, "Amulette de théâtre (masque miniature porté en collier)", "1", 6],
                ["Incommun", 15, "Graines de Yopo", "1d6", 6],
                ["Incommun", 15, "Petites marionnettes artisanales pour spectacles de rue", "1", 6],
                ["Incommun", 15, "Masques en bois peints", "1", 6],
                ["Incommun", 15, "Feuille de coca", "1d10", 6],
                ["Incommun", 15, "Chapeau orné de plumes ou de grelots", "1", 6],
                ["Incommun", 15, "Déguisement", "1", 6],
                ["Incommun", 15, "Flûte de pan", "1", 6],
                ["Incommun", 15, "Un carnet de croquis", "1", 6],
                ["Incommun", 15, "Khôl ou pigment (maquillage)", "1", 6],
                ["Incommun", 15, "Potion (à identifier - Qualité 1)", "1", 6],
                ["Incommun", 15, "Outre à pisco/eau (2 litres)", "1", 6],
                ["Incommun", 15, "Patte de lapin", "1", 6],
                ["Incommun", 15, "Aiguille à cheveux", "1", 6],
                ["Incommun", 15, "Tarot de Divination", "1", 6],

                ["Rare", 4, "Sol", "5d10", 100],
                ["Rare", 4, "Balles de jonglage", "1", 7],
                ["Rare", 4, "Instrument de musique", "1", 7],
                ["Rare", 4, "Feuilles de Ayahuasca", "1d6", 7],
                ["Rare", 4, "Amulette de théâtre (masque miniature porté en collier)", "1", 7],
                ["Rare", 4, "Graines de Yopo", "1d6", 7],
                ["Rare", 4, "Petites marionnettes artisanales pour spectacles de rue", "1", 7],
                ["Rare", 4, "Masques en bois peints", "1", 7],
                ["Rare", 4, "Feuille de coca", "1d10", 7],
                ["Rare", 4, "Chapeau orné de plumes ou de grelots", "1", 7],
                ["Rare", 4, "Déguisement", "1", 7],
                ["Rare", 4, "Flûte de pan", "1", 7],
                ["Rare", 4, "Fragment de savon", "1", 7],
                ["Rare", 4, "Un carnet de croquis", "1", 7],
                ["Rare", 4, "Khôl ou pigment (maquillage)", "1", 7],
                ["Rare", 4, "Jeu de base pukllay", "1", 7],
                ["Rare", 4, "Potion (à identifier - Qualité 1)", "1", 7],
                ["Rare", 4, "Outre à pisco/eau (2 litres)", "1", 7],
                ["Rare", 4, "Patte de lapin", "1", 7],
                ["Rare", 4, "Aiguille à cheveux", "1", 7],
                ["Rare", 4, "Tarot de Divination", "1", 7],

                ["Très rare", 0.9, "Sol", "10d10", 100],
                ["Très rare", 0.9, "Balles de jonglage", "1", 8],
                ["Très rare", 0.9, "Instrument de musique", "1", 8],
                ["Très rare", 0.9, "Feuilles de Ayahuasca", "1d6", 8],
                ["Très rare", 0.9, "Amulette de théâtre (masque miniature porté en collier)", "1", 8],
                ["Très rare", 0.9, "Graines de Yopo", "1d6", 8],
                ["Très rare", 0.9, "Petites marionnettes artisanales pour spectacles de rue", "1", 8],
                ["Très rare", 0.9, "Masques en bois peints", "1", 8],
                ["Très rare", 0.9, "Feuille de coca", "1d10", 8],
                ["Très rare", 0.9, "Chapeau orné de plumes ou de grelots", "1", 8],
                ["Très rare", 0.9, "Déguisement", "1", 8],
                ["Très rare", 0.9, "Flûte de pan", "1", 8],
                ["Très rare", 0.9, "Fragment de savon", "1", 8],
                ["Très rare", 0.9, "Un carnet de croquis", "1", 8],
                ["Très rare", 0.9, "Khôl ou pigment (maquillage)", "1", 8],
                ["Très rare", 0.9, "Jeu de base pukllay", "1", 8],
                ["Très rare", 0.9, "Potion (à identifier - Qualité 1)", "1", 8],
                ["Très rare", 0.9, "Outre à pisco/eau (2 litres)", "1", 8],
                ["Très rare", 0.9, "Patte de lapin", "1", 8],
                ["Très rare", 0.9, "Aiguille à cheveux", "1", 8],
                ["Très rare", 0.9, "Tarot de Divination", "1", 8],

                ["Légendaire", 0.1, "Sol", "15d10", 100],
                ["Légendaire", 0.1, "Balles de jonglage", "1", 20],
                ["Légendaire", 0.1, "Instrument de musique", "1", 20],
                ["Légendaire", 0.1, "Feuilles de Ayahuasca", "1d6", 20],
                ["Légendaire", 0.1, "Amulette de théâtre (masque miniature porté en collier)", "1", 20],
                ["Légendaire", 0.1, "Graines de Yopo", "1d6", 20],
                ["Légendaire", 0.1, "Petites marionnettes artisanales pour spectacles de rue", "1", 20],
                ["Légendaire", 0.1, "Masques en bois peints", "1", 20],
                ["Légendaire", 0.1, "Feuille de coca", "1d10", 20],
                ["Légendaire", 0.1, "Chapeau orné de plumes ou de grelots", "1", 20],
                ["Légendaire", 0.1, "Déguisement", "1", 20],
                ["Légendaire", 0.1, "Flûte de pan", "1", 20],
                ["Légendaire", 0.1, "Fragment de savon", "1", 20],
                ["Légendaire", 0.1, "Un carnet de croquis", "1", 20],
                ["Légendaire", 0.1, "Khôl ou pigment (maquillage)", "1", 20],
                ["Légendaire", 0.1, "Jeu de base pukllay", "1", 20],
                ["Légendaire", 0.1, "Potion (à identifier - Qualité 1)", "1", 10],
                ["Légendaire", 0.1, "Outre à pisco/eau (2 litres)", "1", 20],
                ["Légendaire", 0.1, "Patte de lapin", "1", 20],
                ["Légendaire", 0.1, "Aiguille à cheveux", "1", 20],
                ["Légendaire", 0.1, "Tarot de Divination", "1", 20]

            ]
        },
        "Noble/Notable": {
            meridiens: {
                domination: [1, 3], savoir: [1, 3], expression: [1, 4],
                puissance: [1, 3], mouvement: [1, 3], vitalite: [1, 3]
            },
            equipementEssentiel: {
                arme: [
                    ["(Aucune)", 100]
                ],
                tenue: [
                    ["(Aucune)", 100]
                ]
            },
            butinSupplementaire: [
                ["Commun", 80, "Sol", "12d6", 100],
                ["Commun", 80, "Sceau personnel en métal précieux", "1", 4],
                ["Commun", 80, "Lettre cachetée", "1", 1],
                ["Commun", 80, "Feuilles de Ayahuasca", "1d6", 4],
                ["Commun", 80, "Bague d'ornement", "1", 4],
                ["Commun", 80, "Paire de gants en soie", "1", 4],
                ["Commun", 80, "Invitation officielle à un banquet, bal ou cérémonie", "1", 4],
                ["Commun", 80, "Parfum de qualité", "1", 4],
                ["Commun", 80, "Manteau en fourrure délicate", "1", 4],
                ["Commun", 80, "Chapeau ou couvre-chef distingué (avec plume rare)", "1", 4],
                ["Commun", 80, "Collier d'ornement", "1", 4],
                ["Commun", 80, "Anneau à compartiment secret", "1", 4],
                ["Commun", 80, "Anneau d'ornement", "1", 4],
                ["Commun", 80, "Carnet de dettes", "1", 4],
                ["Commun", 80, "Clef ouvragée", "1", 1],
                ["Commun", 80, "Éventail peint", "1", 4],
                ["Commun", 80, "Khôl ou pigment (maquillage)", "1", 1],
                ["Commun", 80, "Carnet de poèmes", "1", 4],
                ["Commun", 80, "Lettre d’amour interdite", "1", 1],
                ["Commun", 80, "Potion (à identifier - Qualité 1)", "1", 1],
                ["Commun", 80, "Petit miroir poli en argent", "1", 1],
                ["Commun", 80, "Outre à pisco/eau (2 litres)", "1", 4],
                ["Commun", 80, "Huile parfumée", "1", 4],
                ["Commun", 80, "Aiguille à cheveux", "1", 4],
                ["Commun", 80, "Missive codée", "1", 4],

                ["Incommun", 15, "Sol", "23d6", 100],
                ["Incommun", 15, "Sceau personnel en métal précieux", "1", 4],
                ["Incommun", 15, "Lettre cachetée", "1", 6],
                ["Incommun", 15, "Feuilles de Ayahuasca", "1d6", 6],
                ["Incommun", 15, "Bague d'ornement", "1", 6],
                ["Incommun", 15, "Paire de gants en soie", "1", 6],
                ["Incommun", 15, "Invitation officielle à un banquet, bal ou cérémonie", "1", 6],
                ["Incommun", 15, "Parfum de qualité", "1", 6],
                ["Incommun", 15, "Manteau en fourrure délicate", "1", 6],
                ["Incommun", 15, "Chapeau ou couvre-chef distingué (avec plume rare)", "1", 6],
                ["Incommun", 15, "Collier d'ornement", "1", 6],
                ["Incommun", 15, "Anneau à compartiment secret", "1", 6],
                ["Incommun", 15, "Anneau d'ornement", "1", 6],
                ["Incommun", 15, "Carnet de dettes", "1", 6],
                ["Incommun", 15, "Clef ouvragée", "1", 6],
                ["Incommun", 15, "Éventail peint", "1", 6],
                ["Incommun", 15, "Khôl ou pigment (maquillage)", "1", 6],
                ["Incommun", 15, "Carnet de poèmes", "1", 6],
                ["Incommun", 15, "Lettre d’amour interdite", "1", 6],
                ["Incommun", 15, "Potion (à identifier - Qualité 1)", "1", 6],
                ["Incommun", 15, "Petit miroir poli en argent", "1", 6],
                ["Incommun", 15, "Outre à pisco/eau (2 litres)", "1", 6],
                ["Incommun", 15, "Huile parfumée", "1", 6],
                ["Incommun", 15, "Aiguille à cheveux", "1", 6],
                ["Incommun", 15, "Missive codée", "1", 6],

                ["Rare", 4, "Sol", "25d10", 100],
                ["Rare", 4, "Sceau personnel en métal précieux", "1", 7],
                ["Rare", 4, "Lettre cachetée", "1", 7],
                ["Rare", 4, "Feuilles de Ayahuasca", "1d6", 7],
                ["Rare", 4, "Bague d'ornement", "1", 7],
                ["Rare", 4, "Paire de gants en soie", "1", 7],
                ["Rare", 4, "Invitation officielle à un banquet, bal ou cérémonie", "1", 7],
                ["Rare", 4, "Parfum de qualité", "1", 7],
                ["Rare", 4, "Manteau en fourrure délicate", "1", 7],
                ["Rare", 4, "Chapeau ou couvre-chef distingué (avec plume rare)", "1", 7],
                ["Rare", 4, "Collier d'ornement", "1", 7],
                ["Rare", 4, "Anneau à compartiment secret", "1", 7],
                ["Rare", 4, "Anneau d'ornement", "1", 7],
                ["Rare", 4, "Carnet de dettes", "1", 7],
                ["Rare", 4, "Clef ouvragée", "1", 7],
                ["Rare", 4, "Éventail peint", "1", 7],
                ["Rare", 4, "Khôl ou pigment (maquillage)", "1", 7],
                ["Rare", 4, "Carnet de poèmes", "1", 7],
                ["Rare", 4, "Lettre d’amour interdite", "1", 7],
                ["Rare", 4, "Potion (à identifier - Qualité 1)", "1", 7],
                ["Rare", 4, "Petit miroir poli en argent", "1", 7],
                ["Rare", 4, "Outre à pisco/eau (2 litres)", "1", 7],
                ["Rare", 4, "Huile parfumée", "1", 7],
                ["Rare", 4, "Aiguille à cheveux", "1", 7],
                ["Rare", 4, "Missive codée", "1", 7],

                ["Très rare", 0.9, "Sol", "30d10", 100],
                ["Très rare", 0.9, "Sceau personnel en métal précieux", "1", 8],
                ["Très rare", 0.9, "Lettre cachetée", "1", 8],
                ["Très rare", 0.9, "Feuilles de Ayahuasca", "1d6", 8],
                ["Très rare", 0.9, "Bague d'ornement", "1", 8],
                ["Très rare", 0.9, "Paire de gants en soie", "1", 8],
                ["Très rare", 0.9, "Invitation officielle à un banquet, bal ou cérémonie", "1", 8],
                ["Très rare", 0.9, "Parfum de qualité", "1", 8],
                ["Très rare", 0.9, "Manteau en fourrure délicate", "1", 8],
                ["Très rare", 0.9, "Chapeau ou couvre-chef distingué (avec plume rare)", "1", 8],
                ["Très rare", 0.9, "Collier d'ornement", "1", 8],
                ["Très rare", 0.9, "Anneau à compartiment secret", "1", 8],
                ["Très rare", 0.9, "Anneau d'ornement", "1", 8],
                ["Très rare", 0.9, "Carnet de dettes", "1", 8],
                ["Très rare", 0.9, "Clef ouvragée", "1", 8],
                ["Très rare", 0.9, "Éventail peint", "1", 8],
                ["Très rare", 0.9, "Khôl ou pigment (maquillage)", "1", 8],
                ["Très rare", 0.9, "Carnet de poèmes", "1", 8],
                ["Très rare", 0.9, "Lettre d’amour interdite", "1", 8],
                ["Très rare", 0.9, "Potion (à identifier - Qualité 1)", "1", 8],
                ["Très rare", 0.9, "Petit miroir poli en argent", "1", 8],
                ["Très rare", 0.9, "Outre à pisco/eau (2 litres)", "1", 8],
                ["Très rare", 0.9, "Huile parfumée", "1", 8],
                ["Très rare", 0.9, "Aiguille à cheveux", "1", 8],
                ["Très rare", 0.9, "Missive codée", "1", 8],

                ["Légendaire", 0.1, "Sol", "55d10", 100],
                ["Légendaire", 0.1, "Sceau personnel en métal précieux", "1", 20],
                ["Légendaire", 0.1, "Lettre cachetée", "1", 20],
                ["Légendaire", 0.1, "Feuilles de Ayahuasca", "1d6", 20],
                ["Légendaire", 0.1, "Bague d'ornement", "1", 20],
                ["Légendaire", 0.1, "Paire de gants en soie", "1", 20],
                ["Légendaire", 0.1, "Invitation officielle à un banquet, bal ou cérémonie", "1", 20],
                ["Légendaire", 0.1, "Parfum de qualité", "1", 20],
                ["Légendaire", 0.1, "Manteau en fourrure délicate", "1", 20],
                ["Légendaire", 0.1, "Chapeau ou couvre-chef distingué (avec plume rare)", "1", 20],
                ["Légendaire", 0.1, "Collier d'ornement", "1", 20],
                ["Légendaire", 0.1, "Anneau à compartiment secret", "1", 20],
                ["Légendaire", 0.1, "Anneau d'ornement", "1", 20],
                ["Légendaire", 0.1, "Carnet de dettes", "1", 20],
                ["Légendaire", 0.1, "Clef ouvragée", "1", 20],
                ["Légendaire", 0.1, "Éventail peint", "1", 20],
                ["Légendaire", 0.1, "Khôl ou pigment (maquillage)", "1", 20],
                ["Légendaire", 0.1, "Carnet de poèmes", "1", 20],
                ["Légendaire", 0.1, "Lettre d’amour interdite", "1", 10],
                ["Légendaire", 0.1, "Potion (à identifier - Qualité 1)", "1", 10],
                ["Légendaire", 0.1, "Petit miroir poli en argent", "1", 10],
                ["Légendaire", 0.1, "Outre à pisco/eau (2 litres)", "1", 20],
                ["Légendaire", 0.1, "Huile parfumée", "1", 20],
                ["Légendaire", 0.1, "Aiguille à cheveux", "1", 20],
                ["Légendaire", 0.1, "Missive codée", "1", 20]

            ]
        },
        "Érudit/Präst": {
            meridiens: { 
                domination: [1, 3], savoir: [1, 3], expression: [1, 4],
                puissance: [1, 3], mouvement: [1, 3], vitalite: [1, 3]
            },
            equipementEssentiel: {
                arme: [
                    ["(Aucune)", 100]
                ],
                tenue: [
                    ["(Aucune)", 100]
                ]
            },
            butinSupplementaire: [
                ["Commun", 80, "Sol", "2d6", 100],
                ["Commun", 80, "Manuscrit incomplet", "1", 4],
                ["Commun", 80, "Tablette de cire avec des équations ou schémas", "1", 1],
                ["Commun", 80, "Feuilles de Ayahuasca", "1d6", 4],
                ["Commun", 80, "Petit carnet de pensées", "1", 4],
                ["Commun", 80, "Graines de Yopo", "1d6", 4],
                ["Commun", 80, "Livre", "1", 4],
                ["Commun", 80, "Ébauche d’invention", "1", 4],
                ["Commun", 80, "Nécessaire d'écriture", "1", 4],
                ["Commun", 80, "Encre", "1", 4],
                ["Commun", 80, "Potion (à identifier - Qualité 1)", "1", 1],
                ["Commun", 80, "Kit de l'érudit", "1", 1],
                ["Commun", 80, "Outre à pisco/eau (2 litres)", "1", 4],
                ["Commun", 80, "Gants de l’Aube Dorée", "1", 4],
                ["Commun", 80, "Aiguille à cheveux", "1", 4],
                ["Commun", 80, "Cape de l’Aube Dorée", "1", 4],

                ["Incommun", 15, "Sol", "3d6", 100],
                ["Incommun", 15, "Manuscrit incomplet", "1", 4],
                ["Incommun", 15, "Tablette de cire avec des équations ou schémas", "1", 4],
                ["Incommun", 15, "Feuilles de Ayahuasca", "1d6", 6],
                ["Incommun", 15, "Petit carnet de pensées", "1", 6],
                ["Incommun", 15, "Graines de Yopo", "1d6", 6],
                ["Incommun", 15, "Livre", "1", 6],
                ["Incommun", 15, "Ébauche d’invention", "1", 6],
                ["Incommun", 15, "Nécessaire d'écriture", "1", 6],
                ["Incommun", 15, "Encre", "1", 6],
                ["Incommun", 15, "Potion (à identifier - Qualité 1)", "1", 6],
                ["Incommun", 15, "Kit de l'érudit", "1", 6],
                ["Incommun", 15, "Outre à pisco/eau (2 litres)", "1", 6],
                ["Incommun", 15, "Gants de l’Aube Dorée", "1", 6],
                ["Incommun", 15, "Aiguille à cheveux", "1", 6],
                ["Incommun", 15, "Cape de l’Aube Dorée", "1", 6],

                ["Rare", 4, "Sol", "5d10", 100],
                ["Rare", 4, "Manuscrit incomplet", "1", 7],
                ["Rare", 4, "Tablette de cire avec des équations ou schémas", "1", 7],
                ["Rare", 4, "Feuilles de Ayahuasca", "1d6", 7],
                ["Rare", 4, "Petit carnet de pensées", "1", 7],
                ["Rare", 4, "Graines de Yopo", "1d6", 7],
                ["Rare", 4, "Livre", "1", 7],
                ["Rare", 4, "Ébauche d’invention", "1", 7],
                ["Rare", 4, "Nécessaire d'écriture", "1", 7],
                ["Rare", 4, "Encre", "1", 7],
                ["Rare", 4, "Potion (à identifier - Qualité 1)", "1", 7],
                ["Rare", 4, "Kit de l'érudit", "1", 7],
                ["Rare", 4, "Outre à pisco/eau (2 litres)", "1", 7],
                ["Rare", 4, "Gants de l’Aube Dorée", "1", 7],
                ["Rare", 4, "Aiguille à cheveux", "1", 7],
                ["Rare", 4, "Cape de l’Aube Dorée", "1", 7],

                ["Très rare", 0.9, "Sol", "10d10", 100],
                ["Très rare", 0.9, "Manuscrit incomplet", "1", 8],
                ["Très rare", 0.9, "Tablette de cire avec des équations ou schémas", "1", 8],
                ["Très rare", 0.9, "Feuilles de Ayahuasca", "1d6", 8],
                ["Très rare", 0.9, "Petit carnet de pensées", "1", 8],
                ["Très rare", 0.9, "Graines de Yopo", "1d6", 8],
                ["Très rare", 0.9, "Livre", "1", 8],
                ["Très rare", 0.9, "Ébauche d’invention", "1", 8],
                ["Très rare", 0.9, "Nécessaire d'écriture", "1", 8],
                ["Très rare", 0.9, "Encre", "1", 8],
                ["Très rare", 0.9, "Potion (à identifier - Qualité 1)", "1", 8],
                ["Très rare", 0.9, "Kit de l'érudit", "1", 8],
                ["Très rare", 0.9, "Outre à pisco/eau (2 litres)", "1", 8],
                ["Très rare", 0.9, "Gants de l’Aube Dorée", "1", 8],
                ["Très rare", 0.9, "Aiguille à cheveux", "1", 8],
                ["Très rare", 0.9, "Cape de l’Aube Dorée", "1", 8],

                ["Légendaire", 0.1, "Sol", "15d10", 100],
                ["Légendaire", 0.1, "Manuscrit incomplet", "1", 20],
                ["Légendaire", 0.1, "Tablette de cire avec des équations ou schémas", "1", 20],
                ["Légendaire", 0.1, "Feuilles de Ayahuasca", "1d6", 20],
                ["Légendaire", 0.1, "Petit carnet de pensées", "1", 20],
                ["Légendaire", 0.1, "Graines de Yopo", "1d6", 20],
                ["Légendaire", 0.1, "Livre", "1", 20],
                ["Légendaire", 0.1, "Ébauche d’invention", "1", 20],
                ["Légendaire", 0.1, "Nécessaire d'écriture", "1", 20],
                ["Légendaire", 0.1, "Encre", "1", 20],
                ["Légendaire", 0.1, "Déguisement", "1", 20],
                ["Légendaire", 0.1, "Potion (à identifier - Qualité 1)", "1", 10],
                ["Légendaire", 0.1, "Kit de l'érudit", "1", 10],
                ["Légendaire", 0.1, "Outre à pisco/eau (2 litres)", "1", 20],
                ["Légendaire", 0.1, "Gants de l’Aube Dorée", "1", 20],
                ["Légendaire", 0.1, "Aiguille à cheveux", "1", 20],
                ["Légendaire", 0.1, "Cape de l’Aube Dorée", "1", 20]

            ]
        },
        "Herboriste/Apothicaire": {
            meridiens: { 
                domination: [1, 2], savoir: [3, 4], expression: [1, 2],
                puissance: [1, 1], mouvement: [2, 3], vitalite: [1, 1]
            },
            equipementEssentiel: {
                arme: [
                    ["(Aucune)", 100]
                ],
                tenue: [
                    ["(Aucune)", 100]
                ]
            },
            butinSupplementaire: [
                ["Commun", 80, "Sol", "2d6", 100],
                ["Commun", 80, "Couteau à herbes à lame courbe", "1", 4],
                ["Commun", 80, "Mortier de voyage", "1", 1],
                ["Commun", 80, "Feuilles de Ayahuasca", "1d6", 4],
                ["Commun", 80, "Sacoche à composantes", "1", 5],
                ["Commun", 80, "Sacha Inchi", "1", 4],
                ["Commun", 80, "Absinthe", "1", 4],
                ["Commun", 80, "Belladone", "1", 4],
                ["Commun", 80, "Digitale", "1", 4],
                ["Commun", 80, "Passiflore", "1", 4],
                ["Commun", 80, "Yopo", "1", 4],
                ["Commun", 80, "Ginseng", "1", 4],
                ["Commun", 80, "Feuille d'Harvatat", "1", 1],
                ["Commun", 80, "Potion (à identifier - Qualité 1)", "1", 1],
                ["Commun", 80, "Kit de l'herboriste", "1", 1],
                ["Commun", 80, "Carnet d’herboriste avec dessins botaniques et recettes", "1", 1],
                ["Commun", 80, "Outre à pisco/eau (2 litres)", "1", 4],
                ["Commun", 80, "Codex - Botanica", "1", 4],
                ["Commun", 80, "Aiguille à cheveux", "1", 4],
                ["Commun", 80, "Potion (à identifier - Qualité 2)", "1", 4],

                ["Incommun", 15, "Sol", "3d6", 100],
                ["Incommun", 15, "Couteau à herbes à lame courbe", "1", 6],
                ["Incommun", 15, "Mortier de voyage", "1", 6],
                ["Incommun", 15, "Feuilles de Ayahuasca", "1d6", 6],
                ["Incommun", 15, "Sacoche à composantes", "1", 5],
                ["Incommun", 15, "Sacha Inchi", "1", 5],
                ["Incommun", 15, "Absinthe", "1", 5],
                ["Incommun", 15, "Belladone", "1", 5],
                ["Incommun", 15, "Digitale", "1", 5],
                ["Incommun", 15, "Passiflore", "1", 5],
                ["Incommun", 15, "Yopo", "1", 5],
                ["Incommun", 15, "Ginseng", "1", 5],
                ["Incommun", 15, "Feuille d'Harvatat", "1", 6],
                ["Incommun", 15, "Potion (à identifier - Qualité 1)", "1", 6],
                ["Incommun", 15, "Kit de l'herboriste", "1", 6],
                ["Incommun", 15, "Carnet d’herboriste avec dessins botaniques et recettes", "1", 6],
                ["Incommun", 15, "Outre à pisco/eau (2 litres)", "1", 6],
                ["Incommun", 15, "Codex - Botanica", "1", 6],
                ["Incommun", 15, "Aiguille à cheveux", "1", 6],
                ["Incommun", 15, "Potion (à identifier - Qualité 2)", "1", 6],

                ["Rare", 4, "Sol", "5d10", 100],
                ["Rare", 4, "Couteau à herbes à lame courbe", "1", 5],
                ["Rare", 4, "Mortier de voyage", "1", 5],
                ["Rare", 4, "Feuilles de Ayahuasca", "1d6", 7],
                ["Rare", 4, "Sacha Inchi", "1", 7],
                ["Rare", 4, "Absinthe", "1", 7],
                ["Rare", 4, "Belladone", "1", 7],
                ["Rare", 4, "Digitale", "1", 7],
                ["Rare", 4, "Passiflore", "1", 7],
                ["Rare", 4, "Yopo", "1", 7],
                ["Rare", 4, "Ginseng", "1", 7],
                ["Rare", 4, "Feuille d'Harvatat", "1", 2],
                ["Rare", 4, "Boucle d'oreille", "1", 20],
                ["Rare", 4, "Potion (à identifier - Qualité 1)", "1", 7],
                ["Rare", 4, "Kit de l'herboriste", "1", 7],
                ["Rare", 4, "Carnet d’herboriste avec dessins botaniques et recettes", "1", 7],
                ["Rare", 4, "Outre à pisco/eau (2 litres)", "1", 7],
                ["Rare", 4, "Codex - Botanica", "1", 7],
                ["Rare", 4, "Aiguille à cheveux", "1", 7],
                ["Rare", 4, "Potion (à identifier - Qualité 2)", "1", 7],

                ["Très rare", 0.9, "Sol", "10d10", 100],
                ["Très rare", 0.9, "Couteau à herbes à lame courbe", "1", 8],
                ["Très rare", 0.9, "Mortier de voyage", "1", 8],
                ["Très rare", 0.9, "Feuilles de Ayahuasca", "1d6", 8],
                ["Très rare", 0.9, "Kit d'herboriste", "1", 7],
                ["Très rare", 0.9, "Sang de lézard", "1", 10],
                ["Très rare", 0.9, "Sacha Inchi", "1", 10],
                ["Très rare", 0.9, "Absinthe", "1", 10],
                ["Très rare", 0.9, "Belladone", "1", 10],
                ["Très rare", 0.9, "Digitale", "1", 10],
                ["Très rare", 0.9, "Passiflore", "1", 10],
                ["Très rare", 0.9, "Yopo", "1", 10],
                ["Très rare", 0.9, "Ginseng", "1", 10],
                ["Très rare", 0.9, "Feuille d'Harvatat", "1", 7],
                ["Très rare", 0.9, "Potion (à identifier - Qualité 1)", "1", 8],
                ["Très rare", 0.9, "Kit de l'herboriste", "1", 8],
                ["Très rare", 0.9, "Carnet d’herboriste avec dessins botaniques et recettes", "1", 8],
                ["Très rare", 0.9, "Outre à pisco/eau (2 litres)", "1", 8],
                ["Très rare", 0.9, "Codex - Botanica", "1", 8],
                ["Très rare", 0.9, "Aiguille à cheveux", "1", 8],
                ["Très rare", 0.9, "Potion (à identifier - Qualité 2)", "1", 8],

                ["Légendaire", 0.1, "Sol", "15d10", 100],
                ["Légendaire", 0.1, "Couteau à herbes à lame courbe", "1", 20],
                ["Légendaire", 0.1, "Mortier de voyage", "1", 20],
                ["Légendaire", 0.1, "Feuilles de Ayahuasca", "1d6", 20],
                ["Légendaire", 0.1, "Sacha Inchi", "1d4", 10],
                ["Légendaire", 0.1, "Absinthe", "1d4", 10],
                ["Légendaire", 0.1, "Belladone", "1d4", 10],
                ["Légendaire", 0.1, "Digitale", "1d4", 10],
                ["Légendaire", 0.1, "Passiflore", "1d4", 10],
                ["Légendaire", 0.1, "Yopo", "1d4", 10],
                ["Légendaire", 0.1, "Ginseng", "1d4", 10],
                ["Légendaire", 0.1, "Feuille d'Harvatat", "1d4", 10],
                ["Légendaire", 0.1, "Potion (à identifier - Qualité 1)", "1", 10],
                ["Légendaire", 0.1, "Kit de l'herboriste", "1", 10],
                ["Légendaire", 0.1, "Carnet d’herboriste avec dessins botaniques et recettes", "1", 10],
                ["Légendaire", 0.1, "Outre à pisco/eau (2 litres)", "1", 20],
                ["Légendaire", 0.1, "Codex - Botanica", "1", 20],
                ["Légendaire", 0.1, "Aiguille à cheveux", "1", 20],
                ["Légendaire", 0.1, "Potion (à identifier - Qualité 2)", "1", 20]

            ]
        },
        "Marchand/Caravanier": {
            meridiens: { 
                domination: [2, 3], savoir: [1, 3], expression: [3, 4],
                puissance: [1, 2], mouvement: [1, 2], vitalite: [1, 2]
            },
            equipementEssentiel: {
                arme: [
                    ["(Aucune)", 100]
                ],
                tenue: [
                    ["(Aucune)", 100]
                ]
            },
            butinSupplementaire: [
                ["Commun", 80, "Sol", "2d6", 100],
                ["Commun", 80, "Rations", "1d4", 4],
                ["Commun", 80, "Rouleaux de tissu coloré ou soie.", "1", 1],
                ["Commun", 80, "Pipe en bois", "1", 2],
                ["Commun", 80, "Petites gemmes brutes ou semi-précieuses", "1", 4],
                ["Commun", 80, "Carnet de comptes, notes de dettes.", "1", 4],
                ["Commun", 80, "Accessoires d'ornement", "1d6", 4],
                ["Commun", 80, "Chevalière d'ornement", "1", 4],
                ["Commun", 80, "Petit Couteau (Qualité 0)", "1", 4],
                ["Commun", 80, "Couverture de survie", "1", 4],
                ["Commun", 80, "Divers vêtements", "1d4", 4],
                ["Commun", 80, "Instrument de musique", "1", 4],
                ["Commun", 80, "Fragment de savon", "1", 4],
                ["Commun", 80, "Pot de miel", "1", 4],
                ["Commun", 80, "Boussole", "1", 1],
                ["Commun", 80, "Botte d'aventurier", "1", 4],
                ["Commun", 80, "Khôl ou pigment (maquillage)", "1", 1],
                ["Commun", 80, "Jeu de base pukllay", "1", 4],
                ["Commun", 80, "Potion (à identifier - Qualité 1)", "1", 1],
                ["Commun", 80, "Kit de marchand", "1", 1],
                ["Commun", 80, "Kit de l'aventurier", "1", 1],
                ["Commun", 80, "Outre à pisco/eau (2 litres)", "1", 4],
                ["Commun", 80, "Patte de lapin", "1", 4],
                ["Commun", 80, "Aiguille à cheveux", "1", 4],
                ["Commun", 80, "Torche", "1d4", 4],

                ["Incommun", 15, "Sol", "3d6", 100],
                ["Incommun", 15, "Rations", "1d4", 6],
                ["Incommun", 15, "Rouleaux de tissu coloré ou soie.", "1", 6],
                ["Incommun", 15, "Pipe en bois", "1", 6],
                ["Incommun", 15, "Petites gemmes brutes ou semi-précieuses", "1", 6],
                ["Incommun", 15, "Carnet de comptes, notes de dettes.", "1", 6],
                ["Incommun", 15, "Accessoires d'ornement", "1d10", 6],
                ["Incommun", 15, "Chevalière d'ornement", "1", 6],
                ["Incommun", 15, "Petit Couteau (Qualité 0)", "1", 6],
                ["Incommun", 15, "Couverture de survie", "1", 6],
                ["Incommun", 15, "Divers vêtements", "1d6", 6],
                ["Incommun", 15, "Instrument de musique", "1d4", 6],
                ["Incommun", 15, "Fragment de savon", "1", 6],
                ["Incommun", 15, "Pot de miel", "1", 6],
                ["Incommun", 15, "Boussole", "1", 6],
                ["Incommun", 15, "Botte d'aventurier", "1", 6],
                ["Incommun", 15, "Khôl ou pigment (maquillage)", "1", 6],
                ["Incommun", 15, "Jeu de base pukllay", "1", 6],
                ["Incommun", 15, "Potion (à identifier - Qualité 1)", "1", 6],
                ["Incommun", 15, "Kit de marchand", "1", 6],
                ["Incommun", 15, "Kit de l'aventurier", "1", 6],
                ["Incommun", 15, "Outre à pisco/eau (2 litres)", "1", 6],
                ["Incommun", 15, "Patte de lapin", "1", 6],
                ["Incommun", 15, "Aiguille à cheveux", "1", 6],
                ["Incommun", 15, "Torche", "1d4", 6],

                ["Rare", 4, "Sol", "5d10", 100],
                ["Rare", 4, "Rations", "1d4", 7],
                ["Rare", 4, "Rouleaux de tissu coloré ou soie.", "1", 7],
                ["Rare", 4, "Pipe en bois", "1", 7],
                ["Rare", 4, "Petites gemmes brutes ou semi-précieuses", "1", 7],
                ["Rare", 4, "Carnet de comptes, notes de dettes.", "1", 7],
                ["Rare", 4, "Accessoires d'ornement", "1d10", 7],
                ["Rare", 4, "Chevalière d'ornement", "1", 7],
                ["Rare", 4, "Petit Couteau (Qualité 0)", "1", 7],
                ["Rare", 4, "Couverture de survie", "1", 7],
                ["Rare", 4, "Divers vêtements", "1d10", 7],
                ["Rare", 4, "Instrument de musique", "1d4", 7],
                ["Rare", 4, "Fragment de savon", "1", 7],
                ["Rare", 4, "Pot de miel", "1", 7],
                ["Rare", 4, "Boussole", "1", 7],
                ["Rare", 4, "Botte d'aventurier", "1", 7],
                ["Rare", 4, "Khôl ou pigment (maquillage)", "1", 7],
                ["Rare", 4, "Jeu de base pukllay", "1", 7],
                ["Rare", 4, "Potion (à identifier - Qualité 1)", "1", 7],
                ["Rare", 4, "Kit de marchand", "1", 7],
                ["Rare", 4, "Kit de l'aventurier", "1", 7],
                ["Rare", 4, "Outre à pisco/eau (2 litres)", "1", 7],
                ["Rare", 4, "Patte de lapin", "1", 7],
                ["Rare", 4, "Aiguille à cheveux", "1", 7],
                ["Rare", 4, "Torche", "1d4", 7],

                ["Très rare", 0.9, "Sol", "10d10", 100],
                ["Très rare", 0.9, "Rations", "1d4", 8],
                ["Très rare", 0.9, "Rouleaux de tissu coloré ou soie.", "1", 8],
                ["Très rare", 0.9, "Pipe en bois", "1", 8],
                ["Très rare", 0.9, "Petites gemmes brutes ou semi-précieuses", "1", 8],
                ["Très rare", 0.9, "Carnet de comptes, notes de dettes.", "1", 8],
                ["Très rare", 0.9, "Accessoires d'ornement", "1d10", 8],
                ["Très rare", 0.9, "Chevalière d'ornement", "1", 8],
                ["Très rare", 0.9, "Petit Couteau (Qualité 0)", "1", 8],
                ["Très rare", 0.9, "Couverture de survie", "1", 8],
                ["Très rare", 0.9, "Divers vêtements", "1d10", 8],
                ["Très rare", 0.9, "Instrument de musique", "1d4", 8],
                ["Très rare", 0.9, "Fragment de savon", "1", 8],
                ["Très rare", 0.9, "Pot de miel", "1", 8],
                ["Très rare", 0.9, "Boussole", "1", 8],
                ["Très rare", 0.9, "Botte d'aventurier", "1", 8],
                ["Très rare", 0.9, "Khôl ou pigment (maquillage)", "1", 8],
                ["Très rare", 0.9, "Jeu de base pukllay", "1", 8],
                ["Très rare", 0.9, "Potion (à identifier - Qualité 1)", "1", 8],
                ["Très rare", 0.9, "Kit de marchand", "1", 8],
                ["Très rare", 0.9, "Kit de l'aventurier", "1", 8],
                ["Très rare", 0.9, "Outre à pisco/eau (2 litres)", "1", 8],
                ["Très rare", 0.9, "Patte de lapin", "1", 8],
                ["Très rare", 0.9, "Aiguille à cheveux", "1", 8],
                ["Très rare", 0.9, "Torche", "1d4", 8],

                ["Légendaire", 0.1, "Sol", "15d10", 100],
                ["Légendaire", 0.1, "Rations", "1d4", 20],
                ["Légendaire", 0.1, "Rouleaux de tissu coloré ou soie.", "1", 20],
                ["Légendaire", 0.1, "Pipe en bois", "1", 20],
                ["Légendaire", 0.1, "Petites gemmes brutes ou semi-précieuses", "1", 20],
                ["Légendaire", 0.1, "Carnet de comptes, notes de dettes.", "1", 20],
                ["Légendaire", 0.1, "Accessoires d'ornement", "1d10", 20],
                ["Légendaire", 0.1, "Chevalière d'ornement", "1", 20],
                ["Légendaire", 0.1, "Petit Couteau (Qualité 0)", "1", 20],
                ["Légendaire", 0.1, "Couverture de survie", "1", 20],
                ["Légendaire", 0.1, "Divers vêtements", "1d10", 20],
                ["Légendaire", 0.1, "Instrument de musique", "1d4", 20],
                ["Légendaire", 0.1, "Fragment de savon", "1", 20],
                ["Légendaire", 0.1, "Pot de miel", "1", 20],
                ["Légendaire", 0.1, "Boussole", "1", 20],
                ["Légendaire", 0.1, "Botte d'aventurier", "1", 20],
                ["Légendaire", 0.1, "Khôl ou pigment (maquillage)", "1", 20],
                ["Légendaire", 0.1, "Jeu de base pukllay", "1", 20],
                ["Légendaire", 0.1, "Potion (à identifier - Qualité 1)", "1", 10],
                ["Légendaire", 0.1, "Kit de marchand", "1", 10],
                ["Légendaire", 0.1, "Kit de l'aventurier", "1", 10],
                ["Légendaire", 0.1, "Outre à pisco/eau (2 litres)", "1", 20],
                ["Légendaire", 0.1, "Patte de lapin", "1", 20],
                ["Légendaire", 0.1, "Aiguille à cheveux", "1", 20],
                ["Légendaire", 0.1, "Torche", "1d4", 20]

            ]
        }
    }
        };
    }

    get nameData() {
        // ... (Idem, copie ici le contenu de nameData de ton fichier JS) ...
        return {
            "Le royaume d’Aletria": {
            homme: ["Aashraf Dayshi-En", "Modshan Zayndan-En", "Dom Raddharthikar-En", "Dal Kaan-En", "Aaan Hayan-En", "Vashd Shahenhi-En", "Sindan Tayan-En", "Tandanan Rakan-En", "Zayvait Don-En", "Movan Ashan-En", "Tashanikar Badshanhi-En", "Barshan Handanan-En", "Ram Ardan-En", "Ray Taan-En", "Rardanni Aayan-En", "Darsh Aandanaj-En", "Shand Kahen-En", "Ahen Raan-En", "Hah Dan-En", "Rondan Hahanhi-En", "Garsh Ivan-En", "Dodn Kahen-En", "Rarshash Sinayul-En", "Dandan Sishk-En", "Mondan Dobh-En", "Raran Krikan-En", "Tand Donni-En", "Arav Hashanul-En", "Tarav Kribhikar-En", "Tashikar Vandan-En", "Kayanash Aayin-En", "Ayar Varsh-En", "Rodn Zayn-En", "Baanni Ravin-En", "Rahanar Vashi-En", "Yabh Sishd-En", "Bhuinin Sirav-En", "Hashanikar Hahen-En", "Ray Krianni-En", "Rah Taddharthaj-En", "Sashash Han-En", "Daynay Ravinar-En", "Kriy Dand-En", "Krikan Rabh-En", "Vabhar Doin-En", "Kadshan Tashrafan-En", "Gadnul Rashk-En", "Sharsh Gavinaj-En", "Gashi Aday-En", "Dashk Sishan-En", "Doddharthikar Yain-En", "Yardan Raw-En", "Kriw Taan-En", "Krishk Rahen-En", "Zayhanikar Rashan-En", "Ardan Varavul-En", "Havanin Rashi-En", "Tashan Dobh-En", "Dahan Gadayin-En", "Rydn Krirsh-En", "Hayan Gaan-En", "Bhuravan Abhar-En", "Krivait Sahan-En", "Bahen Ashraf-En", "Zaydshan Rorsh-En", "Vaw Tarsh-En", "Dovin Krishiash-En", "Moy Dayrav-En", "Hand Vamin-En", "Bhuan Kriravin-En", "Sirsh Vavin-En", "Sishraf Dabh-En", "Siwaj Darsh-En", "Hand Ahen-En", "Krian Davan-En", "Krih Karan-En", "Aadshan Havait-En", "Akan Shain-En", "Bhush Daysh-En", "Radn Sihen-En", "Ganash Sihan-En", "Hashkhi Rakan-En", "Bhubhikar Rindanhi-En", "Siran Radshanash-En", "Tal Zaynd-En", "Kriranin Band-En", "Amhi Rysh-En", "Vashd Dom-En", "Rohen Babh-En", "Dorav Dabh-En", "Shavaitikar Garsh-En", "Rainni Bhuhan-En", "Bhursh Bavan-En", "Dash Rishd-En", "Idn Rovanhi-En", "Ryw Gashd-En", "Alash Ravan-En", "Sirshan Aday-En", "Mondan Tashiaj-En", "Varanaj Ryvan-En"],
            femme: ["Randisha Jaeelha-Na", "Baishila Jamarka-Na", "Gaurala Zae-Na", "Dhavi Zatnaviya-Na", "Jaidhya Meeela-Na", "Baikhda Galanla-Na", "Araya Ie-Na", "Revyae Dhaema-Na", "Meenjika Meesh-Na", "Naikhali Lakhita-Na", "Imrteha Aarvca-Na", "Laraeha Sandielha-Na", "Naivardhya Amela-Na", "Poovar Baiya-Na", "Aash Jayaelha-Na", "Jarvda Pooya-Na", "Lohnala Dhajaja-Na", "Gala Poomrt-Na", "Naikhe Lavyaeran-Na", "Naina Lashija-Na", "Rakh Meelanika-Na", "Sarica Nairii-Na", "Zamca Aie-Na", "Lakhe Aaraita-Na", "Lamrtidhya Loeita-Na", "Poohnaela Gaundica-Na", "Baimarali Loshi-Na", "Shaie Javi-Na", "Aeta Nieda-Na", "Akkhika Ashidhya-Na", "Ajae Niraca-Na", "Gavila Lamare-Na", "Zaria Ilaelha-Na", "Meeraita Naidu-Na", "Shapashbha Naitnavika-Na", "Lalata Nivia-Na", "Loinla Lamrtita-Na", "Lariya Loyya-Na", "Sawida Kanjda-Na", "Akshima Kavyama-Na", "Anhabha Dham-Na", "Jawija Dhay-Na", "Andu Redusha-Na", "Mavarinn Banjda-Na", "Bavare Ihaela-Na", "Zanjinn Yashinn-Na", "Akmare Akhdhya-Na", "Naishelha Remarika-Na", "Haraali Zameran-Na", "Naime Aakh-Na", "Laeelha Barve-Na", "Akla Kashya-Na", "Lawi Iwiika-Na", "Ara Aneiya-Na", "Meejai Nilabha-Na", "Sarama Meervka-Na", "Satnavidhya Zanaya-Na", "Gaeika Lanala-Na", "Baivar Haria-Na", "Gauhnaela Meelata-Na", "Zadue Andi-Na", "Sharv Alane-Na", "Haramana Saduka-Na", "Janamana Rarva-Na", "Jarvja Akvidhya-Na", "Akrveha Maebha-Na", "Zahnamana Poolaja-Na", "Poolaelha Dhash-Na", "Gawi Avyaidhya-Na", "Laraa Nivya-Na", "Meehainn Lapashja-Na", "Kahna Amarla-Na", "Gauyaela Ash-Na", "Akshla Gaumrtita-Na", "Aahaca Shashelha-Na", "Mayelha Zashisha-Na", "Ivila Dhapashja-Na", "Baine Rendiya-Na", "Akvyaeha Nirai-Na", "Ilandhya Irala-Na", "Yakhika Lahaidhya-Na", "Lavar Akdui-Na", "Pooinelha Larvya-Na", "Iyeran Rakh-Na", "Itnavika Anvi-Na", "Dhashila Deetnavika-Na", "Kahna Gaulan-Na", "Akribha Shash-Na", "Akyaela Dhahaali-Na", "Naidu Iraelha-Na", "Gaum Anrae-Na", "Iyla Poondibha-Na", "Zadumana Gaeeran-Na", "Laeiya Gaushiali-Na", "Zatnavya Naiymana-Na", "Balamana Aanasha-Na", "Amaridhya Bashia-Na", "Deehaca Irvidhya-Na", "Deenaca Mae-Na", "Laraja Gauyela-Na"]
        },
        "L’altiplano": {
            homme: ["Pelmilgone - Ami sauvage", "Enion - Cadeau du torrent déchainé", "Gashthwa - Bois blanc du vent", "Maedos - Grand ours du grand chêne", "Shanelelo - Arbre large de la vallée", "Enan - Grand sage de la colère divine", "Dangungan - Jeune félin du plateau", "Bagalor - Grand condor de la terre", "Etnlor - Étalon impétueux", "Gwileshalor - Esprit de la montagne rouge", "Bagenlow - Fils puissant", "Celatnod - Serpent à plume fort", "Gulta - Cadeau impétueux", "Nanod - Guerrier tâcheté de la colline verdoyante", "Eledrion - Bois blanc de la lune", "Garwahoth - Bois de cerf du vent", "Karrathadlo - Grand sage de l´horizon lointain", "Daeanthragan - Grand condor galopant", "Anthragan - Flocon des plaines dorées", "Maenthragoth - Grand condor de la haute montagne", "Gwirton - Écureuil volant de la rivière calme", "Naralindon - Chasseur de la rivière pourpre", "Maengalor - Esprit du grand chêne", "Brangageya - Grand sage valeureux", "Sharathadan - Grand sage du tonnerre", "Gushthwor - Grand aigle du vent", "Bradone - Fils de la rivière pourpre", "Agranras - Oeil de faucon de la terre", "Enthragoth - Vieux jaguar fort", "Peherion - Esprit de la colline verdoyante", "Fongalan - Chasseur de l´horizon lointain", "Erhatawa - Guerrier du feu sacré", "Melmilgon - Grand ours puissant", "Nanas - Flocon de la colline verdoyante", "Ashthweg - Cadeau de la montagne rouge", "Bangalas - Vieux jaguar des plaines dorées", "Nartlo - Esprit du grand chêne", "Norathadion - Esprit sauvage de la lune", "Bahere", "Enronor", "Daeabemon", "Angagos", "Eltas", "Gwirtone", "Branthragor", "Elatnu", "Ebemlo", "Gangaloch", "Aralindu", "Penthragor", "Pengungoth", "Maenronon", "Per´nawon", "Shar´nawoth", "Gwingagoch", "Narion", "Bragenlo", "Maenlo", "Daeanelok", "Arwahoth", "Baar´ir", "Bagenlor", "Molgeya", "Peralinda", "Almilgas", "Nothendas", "Brorathadoth", "Brartor", "Caeigranron", "Alatnan", "Perwahok", "Brathenda", "Shagranron", "Gar´nawow", "Arto", "Menon", "Pear´od", "Dangungoth", "Caeinroneya", "Karngungu", "Karrathadon", "Nanhelon", "Alatnoth", "Aeleor", "Enhelon", "Garwahlo", "Atnlas", "Eeleos", "Nanronoth", "Centhraglo", "Dangala", "Nayteg", "Foshthwor", "Guleshaloth", "Nashthwelo", "Maenthrago", "Maelmilgoth", "Adas", "Ganelor", "Nanronan"],
            femme: ["Milbli - Épine pointue pure", "Zaraedhee - Fleur éternelle", "Zawealyth - Perle magnifique", "Aisee - Bénie douce", "Boe´ah - Peau d'étoile de givre", "Milmyth - Ame bleu profond", "Nae´adea - Espoir magnifique", "Coalia - Épine pointue scintillante", "Glaraan - Petite soeur bleu profond", "Zatila - Aube du printemps", "Aitilee - Fille de neige", "Faelma - Fleur de maïs de givre", "Galtan - Fleur éternelle", "Glaltya - Oiseau de givre", "Gaya - Fleur de maïs douce", "Baeedee - Oiseau de rosée", "Wathaee - Panthère de neige", "Ethholah - Soeur magnifique", "Glatilan - Rivière , première à danser", "Niyoblen - Belle âme lumineuse", "Ultia - Ame éternelle", "Coawan - Pluie calme", "Waquanen - Fleur divine", "Aberieh - Peau d'étoile pure", "Nee´iah - Aurore tranquille", "Baetila - Fleur tranquille", "Zaeawa - Panthère tranquille", "Ailmi - Bénie brillante", "Abethen - Petite graine éternelle", "Neoreden - Aube tranquille", "Aie´eth - Jeune fleur du vent", "Aica´ena - Aube lumineuse", "Faelni - Pluie scintillante", "Abehtir - Aurore calme", "Erawee - Fleur de la lune", "Idraeawea - Oiseau du printemps", "Idraquanea - Soeur du soir", "Mileawa - Petite soeur de la lune montante", "Cuaoredy", "Milquanea", "Tair´an", "Lohola", "Aratileth", "Zamae", "Eratili", "Coabla", "Niyoweali", "Neeawya", "Bolae", "Cuawan", "Tyen", "Zamyth", "Niyo´adya", "Tain", "Ciin", "Aihta", "Ula", "Era´adel", "Ue´iel", "Nelny", "Nelas", "Bor´eth", "Wayiae", "Arasir", "Cuar´ia", "Arayaden", "Borahol", "Lor´iel", "Araweala", "Idra´as", "Tainah", "Boquanae", "Aber´i", "Niyotha", "Coalten", "Idrathi", "Naenir", "Borar´en", "Yaltir", "Ailna", "Nio´eth", "Kamah", "Sharaekee", "Gaholea", "Bora´a", "Niyoren", "Abe´adi", "Ciilma", "Wam", "Naehola", "Cuashya", "Eraca´enae", "Ailmy", "Nioeawir", "Aishee", "Aioredea", "Zanen", "Bothee", "Abevel", "Faehtieh"]
        },
        "Le domaine d’Astoria": {
            homme: ["Sadar Deleycluse", "Daathah Laporte", "Ab Du Boinouveau", "Yarwar Du cercledor", "Sabaman De la rivière d´Auge", "Ghaaladookr d´Adryas", "Ghaanasas De la rivière d´Auge", "Buld Du cercledor", "Daanab de Quarfitt", "Hawab Deplatoheau", "Qudhaam d´Ildorann", "Ghaqqir Deleycluse", "Ja´nar De la rivière d´Auge", "Abri Deleycluse", "Sibos Deleycluse", "Ghaabah d´Ildorann", "Jaanab Desforges", "Hab Deplatoheau", "Wanabaar d´Ildorann", "Mikas", "Qusdab", "Sisnah", "Sibos", "Ha´nah", "Yalusath", "Khubrias", "Sirwdas", "Qarwan", "Khubosookr", "Masd", "Amrael", "Khuqq", "Celus", "Qu´mas", "Ghileah", "Daa´masaam", "Juthod", "Celd", "Daathath", "Sa´masath", "Jaathas", "Qu´masod", "Juld", "Ald", "Qanab", "Lamral", "Anad", "Sathoh", "Juth", "Jad", "Yathaykr", "Daa´masah", "Samrael", "Uldah", "Simr", "Sanabar", "Dishod", "Sirw", "Jaa´ookr", "Nimran", "Ghithir", "Ma´alal", "Sibriayd", "Wathod", "Libos", "Buthath", "Maldaam", "Mabriod", "Siqq", "Wabrab", "Ghibr", "Qadhan", "Di´mas", "Jibamaar", "Habam", "Anasaad", "Jith", "Jubran", "Abamad", "Ghaabr", "Dudaad", "Asab", "Mibros", "Ghizar", "Quzooh", "Tarwdaykr", "Dish", "Ghisaykr", "Lak", "Khud", "Habosaad", "Abriaad", "Masnar", "Warw", "Daadhaal", "Jubrir", "Si´masath", "Duladikr", "Ghazan", "Jaanasoob"],
            femme: ["Suzhid Descanaux", "Wiwhar d´Adryas", "Naiyhih d´Adryas", "Jadad d´Ildorann", "Naiydir De la rivière d´Auge", "Ealllayr De la rivière d´Auge", "Khihinh d´Adryas", "Wahih desflots", "Daihar d´Arnachull", "Khirrah Maison-brûlée", "Sada De la rivière d´Auge", "Ranlryh d´Adryas", "Tiih Derive", "Mizaah De la rivière d´Auge", "Gharrayn d´Ildorann", "Firlhayr de Quarfitt", "Waninh d´Adryas", "Millih d´Adryas", "Khallayr Du Boinouveau", "Wiwhid", "Ranir", "Tarnnih", "Nullayr", "Firdand", "Jallar", "Milhih", "Didhin", "Suzshah", "Warah", "Huhayn", "Falan", "Milhar", "Wiwrrand", "Sarhir", "Hahar", "Ridnah", "Jalih", "Tirinh", "Ghaar", "Naiylah", "Suzhi", "Wasand", "Firshar", "Huzih", "Hahayn", "Tarlih", "Milran", "Ealih", "Urrinh", "Ghilar", "Khilil", "Wadih", "Hanih", "Daiwayl", "Wain", "Nihi", "Firlrayr", "Jalyh", "Tarhad", "Unih", "Tarland", "Uhih", "Dailaah", "Ghihan", "Masdar", "Wiwnnar", "Ridha", "Millayl", "Salland", "Ridnnih", "Suzrar", "Nihih", "Jalih", "Muhi", "Hawdand", "Haar", "Ridnil", "Haha", "Wiwrrayn", "Nulih", "Hannih", "Ranhin", "Jadid", "Daidyd", "Tinad", "Ghilah", "Fahyd", "Khihil", "Didli", "Mihad", "Hadir", "Wiwhinh", "Hawdah", "Halyh", "Sadih", "Ghihayn", "Miland", "Hawlih", "Hawdyd", "Gharyd"]
        },
        "La province de Rougerive": {
            homme: ["Ornrosh Desrivets", "Grolrug Descloîtres", "Salresh Desforges", "Razrle D´Aiguillée-des-Cogneries", "Aszrash Delachauffe", "Szulrosh Serres-Pulley", "Sorinoc Vapeurforge", "Vaznesh Delachauffe", "Szanzik Du Cloaque", "Szuzrike De la Rance", "Grozovug Toquet", "Vauk Descoupeaux", "Zovdovish Du Cloaque", "Zokhesh De la Rance", "Isqikug De l´Horlogerie", "Nurekoc Descoupeaux", "Zokux Desserres", "Ezuk Davre", "Ralrash Delachauffe", "Orrosh D´Aiguillée-des-Cogneries", "Zonzag Des Soufflets", "Grosonos Desaiguilles", "Edish Debastion", "Krozovish Bourg-neuf", "Zeskacke Dumarais", "Verrhin Toquet", "Shubroc Desforges", "Nunrke Du Cloaque", "Szarekika d´Achar", "Szuzovash Desaiguilles", "Vakikes De l´Horlogerie", "Alo Descloîtres", "Grorinish De la Rance", "Askle Forgefumée", "Orkdesh Delarivière", "Rakdik Des Soufflets", "Obbrosh Delatour", "Obko Destuyaux", "Szerrhin Cloîtredurivet", "Valish Cloîtredurivet", "Szedes Bourg-neuf", "Savdovonos Du Cloaque", "Vazrrash Debastion", "Nedlo d´Achar", "Shulruch Davre", "Sarrik Bourg-neuf", "Grokish Desserres", "Isvtzuk Delatour", "Sozrux Desaiguilles", "Soag", "Askacko", "Obzovonos", "Vatik", "Edur", "Zozrig", "Asosh", "Sabrrash", "Obrrhig", "Szebruch", "Isqikuk", "Szerekun", "Ovdovag", "Iskikux", "Zokeg", "Krozovur", "Sovnur", "Zeqikko", "Askrash", "Alriko", "Arnrash", "Szurekika", "Etke", "Akdlo", "Ovnonos", "Szenvle", "Valrike", "Szokikuk", "Szuvnuch", "Sokdonos", "Vevtzoc", "Isnvosh", "Orskacash", "Asrash", "Avned", "Zevdovux", "Orzovike", "Orekke", "Ozrig", "Szulag", "Rozoviko", "Szuuk", "Zavdoviko", "Zekoc", "Nukdish", "Sokuk", "Rakik", "Sonvag", "Varekoc", "Iszniko", "Vanruk"],
            femme: ["Dhukhu Debastion", "Trinzve De Rivetroche", "Jerou Davre", "Auknivu Des Cheminées", "Jadvou Des Soufflets", "Dhekno De l´Horlogerie", "Naulragen De la Cognerie", "Senzo Descoupeaux", "Dhuzyve Des Soufflets", "Niakhou Du Cloaque", "Oren Desrivets", "Sekho Desforges", "Ghakhou De l´Horlogerie", "Niardu De Rivetroche", "Revzou Du Vapeurium", "Shudra Serreschaudron", "Rero Delatour", "Odo Desrivets", "Jeru Milleaiguille", "Shudonou Des Soufflets", "Auzaï Delatour", "Jashen d´Achar", "Dhurive Bourg-neuf", "Okhaï Serres-Pulley", "Servyve Debastion", "Niarvo Desaiguilles", "Niakhou Desrivets", "Dhuvzu Des Cheminées", "Dhudvaï Serres-Pulley", "Thozlu Desrivets", "Thoknu Desrivets", "Seraï Serres-Pulley", "Niashive D´Aiguillée-des-Cogneries", "Auknivi Tisserand", "Jevyve Serreschaudron", "Niadnatard Debastion", "Orden Tisserand", "Servi Forgefumée", "Trishaï De la Cognerie", "Naurdive De la Rance", "Dhurau Tisserand", "Orou Dumarais", "Ghardou De la Rance", "Dhukho Descloîtres", "Avura Delachauffe", "Jishu Delachauffe", "Ghodonard Desaiguilles", "Nauvua Desaiguilles", "Triknu Des Soufflets", "Niavau", "Ardi", "Dhedou", "Olrago", "Dhuva", "Naudnatu", "Ovzra", "Aushve", "Siavzo", "Gharaï", "Okno", "Drelzaga", "Jidnatyve", "Niadiao", "Dargen", "Rerdu", "Jezii", "Sednatu", "Relzagou", "Eknivo", "Auvo", "Viryve", "Dhurou", "Rerou", "Dhuziaï", "Naunzo", "Siazii", "Drodnatve", "Cokho", "Aunaï", "Akno", "Daden", "Ovo", "Jeziu", "Dhadvo", "Olzagu", "Rezyve", "Dhudvo", "Dhekhou", "Edvard", "Dado", "Seziaï", "Jelzagve", "Dhuvu", "Dheryve", "Dakha", "Seziu", "Siadonu", "Ghazu", "Dhuvzi", "Dharnezo"]
        },
        "La région de Solearune": {
            homme: ["Thandaat Gamllo-En", "Palin Crinddir-En", "Monddin Rolios-En", "Slarroen Ganen-En", "Gari Helior-En", "Ekinber Helamaïm-En", "Belen Melanin-En", "Thardenin Senin-En", "Argin Gargin-En", "Byrllo Menotan-En", "Briranror Emlor-En", "Allaïm Apheius-En", "Crindaor Aphear-En", "Belender Bargi-En", "Crirodos Ekinben-En", "Selierlo Brelendor-En", "Cemlock Jairler-En", "Robor Meleran-En", "Alierat Andaaïm-En", "Bandaor Crilierer-En", "Thardenel Cenddus-En", "Enderan Banoten-En", "Thasapaïm Cenderir-En", "Banderi Elanan-En", "Herar Ari-En", "Alierir Ceranrius-En", "Galaner Bandor-En", "Epheys Risapar-En", "Bandelor Bynderor-En", "Meraïm Basapock-En", "Amlet Bybren-En", "Endamn Andalo-En", "Eleror Dandelin-En", "Brisapin Besapys-En", "Thalendor Brerroin-En", "Garlys Dandir-En", "Gaphean Helamamn-En", "Gallaïm Andius-En", "Dallamn Abros-En", "Arthlo Bamlan-En", "Aderamn Thabraïm-En", "Thazorens Andon-En", "Rogiler Quebrin-En", "Hekinbin Dandan-En", "Hendor Mobror-En", "Jaindelel Elamor-En", "Enor Jainderet-En", "Akinbi Queller-En", "Momlel Andays-En", "Serdenin Melanlo-En", "Crikinbin Dalendus-En", "Tharanren Finden-En", "Filendin Balor-En", "Ronotens Thagilos-En", "Bendelaïm Alieror-En", "Bribror Banotaïm-En", "Thablo Andelin-En", "Daror Akinber-En", "Alerer Epheen-En", "Ceonor Thakinbet-En", "Slandelus Molamer-En", "Thalian Finddat-En", "Jainotir Hesapor-En", "Argir Aranrin-En", "Enir Erlock-En", "Aranren Balamys-En", "Aranrir Pardenen-En", "Belior Bygilor-En", "Thalierius Molamen-En", "Bripheir Celaïm-En", "Quellius Mondamn-En", "Herlos Erodir-En", "Crilender Fizorus-En", "Dazoren Brerodir-En", "Aranri Belieran-En", "Ezorock Hesapon-En", "Pandin Arroor-En", "Aranrin Aonaïm-En", "Seranrens Rigili-En", "Bonotock Aner-En", "Byndat Ardenor-En", "Brirgi Brerodan-En", "Jairor Allor-En", "Ardenor Morthen-En", "Gaderor Hergius-En", "Gardenlo Jaioni-En", "Sezorer Aleren-En", "Rolami Aonlo-En", "Gakinbock Dabramn-En", "Bregilet Amlen-En", "Alerin Slagilel-En", "Crirodys Bynder-En", "Jaindaus Galamen-En", "Cergus Aramn-En", "Filanin Ebor-En", "Brisapir Aranrens-En", "Brilendaïm Alamir-En", "Galii Darroaïm-En", "Enddin Aleren-En", "Daonen Bylenden-En"],
            femme: ["Hirinwin Hiladweal-Na", "Arliel Lilwen-Na", "Aendelerlin Shirinweal-Na", "Aelenin Hiscel-Na", "Cascel Enriel-Na", "Aerin Gialin-Na", "Borlel Elanis-Na", "Siryar Rileniel-Na", "Lundelen Alenya-Na", "Erinwya Enor-Na", "Hiriel Faelisis-Na", "Aenin Melenet-Na", "Lylbin Arinwen-Na", "Anrel Talanen-Na", "Luraniel Minis-Na", "Aembya Enre-Na", "Lusciel Brishenth-Na", "Eoretiel Albis-Na", "Linriel Fillet-Na", "Silindren Aranan-Na", "Giareten Shithin-Na", "Enin Aniel-Na", "Rilwin Elbis-Na", "Mildaeral Briladren-Na", "Tandelia Enre-Na", "Bolaniel Tandelin-Na", "Ellen Brinel-Na", "Shilbal Aren-Na", "Eorlel Rilindrel-Na", "Faeretan Filadriel-Na", "Eladriel Finriel-Na", "Shitheal Erinweal-Na", "Giarlel Hiscis-Na", "Elwen Elwel-Na", "Boscen Milan-Na", "Talwen Lydiel-Na", "Riladwei Aerindin-Na", "Eladror Bonin-Na", "Firindin Talaren-Na", "Galadwyar Mirandan-Na", "Rinie Aedmin-Na", "Filbis Giariel-Na", "Eshor Filindrerlin-Na", "Lusciel Tadien-Na", "Mithor Edin-Na", "Lulindrerlin Eoraniel-Na", "Lylenor Mirinwya-Na", "Milisan Aranis-Na", "Lyranyar Alarien-Na", "Tallia Eleniel-Na", "Hinris Bonia-Na", "Erinde Calisen-Na", "Lulindren Miladrin-Na", "Filaniel Galadrin-Na", "Aescor Lullin-Na", "Fillen Mile-Na", "Endelie Firin-Na", "Faenen Elaren-Na", "Anel Ewiel-Na", "Rildaeren Aenrin-Na", "Gascin Aldaerel-Na", "Alisin Alaniel-Na", "Ludmis Brilisei-Na", "Elindriel Aedia-Na", "Tathiel Solbiel-Na", "Firinwel Liwia-Na", "Borinderlin Mirandia-Na", "Eoretet Faenral-Na", "Eladria Ewal-Na", "Alenia Lilenon-Na", "Milaria Aenrin-Na", "Endeliel Aeshien-Na", "Erinwis Aweal-Na", "Gialen Hiladwei-Na", "Hinrin Lydan-Na", "Eren Arinwin-Na", "Merinwin Boladrerlin-Na", "Hithal Mimbie-Na", "Rilenin Liladwya-Na", "Rilbiel Garyar-Na", "Elbin Gianet-Na", "Bonrel Arinwor-Na", "Enin Ambiel-Na", "Erandin Ridal-Na", "Soladrin Edmei-Na", "Eden Hilenia-Na", "Galenerlin Talwon-Na", "Alwin Caleniel-Na", "Tadin Erindenth-Na", "Eladwiel Lydmie-Na", "Sondelel Alwal-Na", "Lilia Eranon-Na", "Meranden Alei-Na", "Elenin Bombin-Na", "Lywel Hilariel-Na", "Eran Side-Na", "Fidin Embin-Na", "Sowin Taldaeriel-Na", "Aenyar Brirandin-Na", "Filwei Brildaerel-Na"]
        },
        "L’arche de cendre": {
            homme: ["Alân", "Nâshak", "Adîm", "Zônôr", "Harîd", "Zâkhîm", "Halaz", "Shâraz", "Kâ´lîd", "Zâhâm", "Shârakîb", "Manun", "Rarakir", "Núhîl", "Tamrak", "Tanîd", "Ta rîd", "Rârakim", "Khazak", "Razôr", "Zâmraz", "Kâ´kas", "Mûlûn", "Vûras", "Mahas", "Dûhaz", "Harazîd", "Fâhir", "Fashîd", "Nârazîm", "Ralaz", "Rarôr", "Shâlôr", "Zâlun", "Mûshîm", "Ghazak", "Ghamrûn", "Mahaz", "Qalun", "Na´lôr", "Mûrîm", "Falas", "Na´lîl", "Khakhîd", "Khalûn", "Jalar", "Yûhak", "Mûlîl", "Tahas", "Tarrîm", "Qalîd", "Na´dak", "Zôlôr", "Yûrîm", "Kâ´raz", "Ralîd", "Jaslîd", "Jânîm", "Alîl", "Zâlim", "Vûhim", "Thûdak", "Kâ´hîd", "Sorakak", "Qadim", "Núlim", "Shâdim", "Ghadîm", "Yûlân", "Marîl", "Ta rîd", "Thûshak", "Mûlîr", "Vûmrir", "Kâmenhaz", "Gharras", "Amîd", "Ta rhôr", "Ta razîd", "Fakhim", "Vûrrîd", "Tamîd", "Shâkhim", "Mûrak", "Mûrakir", "Jâmim", "Jalîm", "Jâshîl", "Qarôr", "Akur", "Kârim", "Thûkhîl", "Azaz", "Vûrhak", "Kâ´rân", "Kâ´mrûn", "Mûshas", "Mûhûn", "Halîd", "Yûrir"],
            femme: ["Dahfia", "Za´ha", "Awa", "Wamia", "Ila", "Nabifa", "Ja´ma", "Vafa", "Rarian", "Jama", "Ghawia", "Awa", "Fadtia", "Ibran", "Fadla", "Vaha", "Ibnma", "Dahfan", "Za´mia", "Imia", "Tada", "Raha", "Emasria", "Natisa", "Za´wa", "Ena", "Jala", "Ena", "Uhma", "Hafa", "Wala", "Awma", "Hada", "Dafa", "Jasria", "Dahla", "Elia", "Ja´mira", "Washa", "Tasha", "Ulma", "Bala", "Hana", "Dahda", "Fala", "Hala", "Uban", "Aiwan", "Inma", "Fadma", "Aran", "Catian", "Ibsra", "Ushia", "Usra", "Ratiira", "Cama", "Omaida", "Ifira", "Emamila", "Ja´da", "Salbam", "Nadia", "Adan", "Caman", "Ira", "Naria", "Fadtian", "Hatisia", "Laila", "Ja´ma", "Salla", "Dara", "Aina", "Cama", "Haham", "Ina", "Ghalran", "Dahma", "Hawma", "Omaida", "Banam", "Ghalam", "Tafifa", "Cana", "Xama", "Falia", "Fadlia", "Ibmma", "Saltisan", "Omaiha", "Maman", "Hanam", "Omaila", "Varan", "Qawira", "Umila", "Laimam", "Hamia", "Omaima"]
        },
        "Les déserts du Nord": {
            homme: ["Thuserteon", "Vanfer", "Sokor", "Azlestr", "Alr", "Alarak", "Dugnato", "Volaror", "Norvor", "Thandus", "Arind", "Varrar", "Siphyrius", "Ralestros", "Nor", "Sognisius", "Azkor", "Manthus", "Ilris", "Duphyr", "Celthius", "Vagnatos", "Drableos", "Arimados", "Thasarion", "Cerionar", "Sysertos", "Scoridius", "Zazros", "Delthon", "Somadeon", "Alestr", "Sirvador", "Thundis", "Thalestr", "Endid", "Ariphyr", "Ralestr", "Zalestrid", "Vagnatos", "Silros", "Xalarid", "Vorvadak", "Ovoson", "Nolarid", "Salestreon", "Duphoonius", "Irros", "Ariragix", "Ravos", "Scomadeon", "Sorvadok", "Thamber", "Vogabondar", "Valr", "Minevius", "Ilth", "Tharr", "Sagnisar", "Dulthis", "Osarak", "Aros", "Scorionor", "Rarionar", "Zaphoonar", "Vognatus", "Cesarion", "Varvadius", "Voridon", "Thunevus", "Dragabondus", "Irtexak", "Degnatak", "Inevos", "Quirvus", "Ignision", "Infer", "Sorionius", "Thanferar", "Emadok", "Nondar", "Vor", "Maphyror", "Noroccar", "Quaridus", "Ephyrus", "Isarid", "Quilreon", "Azlarar", "Scoridor", "Zaragis", "Dullius", "Xarrak", "Thazros", "Cenferor", "Makius", "Zaphyrius", "Gryndos", "Sindak", "Igabond"],
            femme: ["Syragaya", "Desiria", "Selanyn", "Sylara", "Kaihiryn", "Solvara", "Azulania", "Misoldynn", "Ihiraya", "Calarea", "Calysae", "Nasperina", "Erenia", "Sandre", "Deragia", "Sylani", "Esoldea", "Lyrapha", "Salaninn", "Solaraya", "Sossara", "Talara", "Silaria", "Sosiryn", "Sehiria", "Zarina", "Syvenna", "Nasire", "Cemberlynn", "Seragyn", "Kairidora", "Solarea", "Zesolda", "Alena", "Talaninn", "Sarenynn", "Dehirae", "Elana", "Mymberla", "Vevennyn", "Zendrina", "Kailesti", "Lyhira", "Zendri", "Elysa", "Amaraya", "Syra", "Nalaria", "Iphyra", "Zamberla", "Evennia", "Carena", "Razurine", "Salysia", "Kairaphyn", "Calorynn", "Thamberla", "Zaria", "Azura", "Celaria", "Kaiphyra", "Elista", "Zaphyra", "Elowia", "Ephyrine", "Sosirae", "Salorynn", "Lysirya", "Erenia", "Alania", "Sandlaryn", "Salistine", "Elvaraya", "Zaraphia", "Solena", "Velenyn", "Erena", "Varaga", "Vehiren", "Mylorae", "Kairia", "Evenna", "Zelistia", "Ceragya", "Sereniti", "Emaria", "Naraphynn", "Cavenna", "Sirina", "Alaren", "Cazuria", "Sandlaraea", "Erenaya", "Lyndrinn", "Valesten", "Eragia", "Zalanen", "Eridorae", "Emaria", "Selista"]
        },
        "La région du Grand lac": {
            homme: ["Umak", "Wayparu", "Waynpocha", "Rarqu", "Qhumak", "Llallaru", "Qoti", "Qoru", "Inti", "Waynkaru", "Purasi", "Ruric", "Qhunpu", "Yapapa", "Rumi", "Qhahu", "Isa", "Aqchocha", "Ya´llqak", "Pupi", "Qomic", "Tillasi", "Waymi", "Tiku", "Tumi", "Wimi", "Pahik", "Ipi", "Ramu", "Pantak", "Anki", "Halli", "Quchak", "Qoti", "Llaman", "Qunic", "Llamaru", "Llantic", "Waytan", "Qokasi", "Aymu", "Unta", "Ani", "Kuwan", "Qopocha", "Tiwak", "Iski", "Wipya", "Qhanpaq", "Pachaq", "Qullir", "Yamaq", "Tupi", "Wanki", "Chankir", "Tullak", "Isku", "Haqchan", "Llasku", "Hankaq", "Pu´llqasi", "Qhamocha", "Inparu", "Tiraki", "Inkya", "Qoraq", "Panu", "Runaq", "Qumu", "Tiski", "Tunti", "Llarya", "Wamu", "Anak", "Tillu", "Uwi", "Uyrqi", "Waykir", "Qenkaq", "Kunaq", "Atu", "Hapi", "Qumaq", "Qosi", "Qu´llqic", "Watu", "Wihu", "Qhantan", "Chaskik", "Pumac", "Aqchak", "Tuqchak", "Pankir", "Ankaq", "Ruma", "Illaq", "Achak", "Wankan", "Kunya", "Pupapaq"],
            femme: ["Uynkina", "Qulltiqina", "Usmaqna", "Amarara", "Pawina", "Apina", "Quchilla", "Qenkana", "Yapuliyara", "Winkana", "Yatiquna", "Timuna", "Wayrira", "Wayqchaqna", "Pantana", "Chatiqara", "Amarana", "Hasmara", "Tulansaqa", "Qullqara", "Aytiqara", "Ayaqa", "Turaqochiyara", "Qhuqchira", "Illpaqa", "Wantaqa", "Yarara", "Hachiyara", "Chaqchana", "Qupulla", "Ranapira", "Qurina", "Quqara", "Panaqa", "Rusmulla", "Kunina", "Wayqaqna", "Aychamara", "Umana", "Yanara", "Aynina", "Ariyara", "Qhalluka", "Qhuntuka", "Wankaqa", "Ichamuna", "Qopisa", "Yaraqa", "Iwara", "Tipina", "Wimisa", "Charqana", "Yanpara", "Amarina", "Imana", "Ramana", "Qhullana", "Kulansina", "Ayraqochara", "Tupulaqna", "Warina", "Wayyaqa", "Yamina", "Punana", "Umarina", "Akana", "Quntuna", "Tisilla", "Rantuna", "Qhunaqa", "Yalansara", "Harana", "Chaqaqa", "Waniyara", "Uynkuna", "Wallina", "Qesaqa", "Intara", "Chapana", "Uchamaqa", "Puchilla", "Ismara", "Qhurqira", "Pamaqa", "Imarilla", "Qenina", "Hamana", "Waywuta", "Warara", "Amaqna", "Aqchana", "Achamara", "Ichamana", "Uyntana", "Aywina", "Rusmara", "Yamara", "Lnkina", "Amana", "Chalansulla"]
        },
        "Les steppes Keldar": {
            homme: ["Rhatho", "Qelo", "Ghargo", "Thragoon", "Kharlso", "Gharzho", "Rhasho", "Qartho", "Qalshir", "Kozhar", "Pelo", "Qarrar", "Thraor", "Qotho", "Thratho", "Rhazhon", "Tharshar", "Gharlo", "Khalaro", "Vorzhor", "Zethoroth", "Qetho", "Thartho", "Pekko", "Veshak", "Morro", "Qorof", "Thrarar", "Dralo", "Vortho", "Kotho", "Drazqoon", "Jogo", "Morzqar", "Jokkir", "Kharlo", "Pethar", "Thrakon", "Kovatho", "Qogo", "Veksho", "Khalaro", "Rhakgar", "Pego", "Morgar", "Rhakko", "Zethohoth", "Vaesokoth", "Thratho", "Pezhar", "Jhokoth", "Jero", "Joko", "Thratho", "Rhakof", "Kovaloon", "Mortho", "Rakloth", "Jothoth", "Lego", "Vorgoon", "Tharror", "Vekzho", "Vegar", "Vaevo", "Thragof", "Vekzqo", "Tharzho", "Vaesoko", "Morko", "Rhaktho", "Rhakoth", "Vekho", "Qelsor", "Kovatho", "Veko", "Jhogar", "Thrazhoth", "Morro", "Tharrar", "Vorshar", "Qothar", "Veztho", "Joko", "Thraror", "Vortho", "Agrar", "Vorko", "Rhagar", "Kovaroth", "Tharzho", "Qalrof", "Vaesokkar", "Jolso", "Lezqak", "Vaesokar", "Qolso", "Tharkoth", "Vorzhoth", "Jhokak"],
            femme: ["Qeshka", "Lethri", "Qoriya", "Koven", "Rhaeshis", "Vekshoon", "Qoani", "Rhaesh", "Rhaekara", "Khaleen", "Jhireth", "Qoreth", "Qoshoon", "Vekkara", "Rhaethoon", "Zheri", "Qoyzha", "Vekara", "Jhiriya", "Jhaezha", "Kekara", "Lekshis", "Khalzhof", "Kekhara", "Vekqui", "Vekshis", "Koleesi", "Zhekari", "Khalshis", "Jezhriya", "Rhaeshoon", "Keshis", "Lekka", "Veksh", "Lekkara", "Jhileesi", "Jhizhof", "Jhaeri", "Lezha", "Qoshis", "Khakha", "Rhaekari", "Lethri", "Lekzha", "Rhaeshis", "Jhaeshis", "Khalki", "Doleesi", "Jhieen", "Khazi", "Jhithri", "Khirka", "Kokhara", "Zheka", "Mizi", "Mithra", "Veshka", "Rhaeriya", "Koyi", "Rhaekari", "Lekkara", "Kekha", "Khakha", "Khirzha", "Qoshka", "Vekven", "Zhethri", "Khazhof", "Jhariya", "Qekara", "Keka", "Zheyriya", "Zekha", "Jezhkha", "Kekara", "Khakhara", "Jhaethri", "Mikha", "Rhaeyi", "Khalani", "Rhaeka", "Jhiqui", "Rhaekha", "Qokara", "Jezhyi", "Zheythri", "Vekari", "Leshka", "Lekari", "Zheani", "Mikari", "Lekven", "Khirzha", "Kozha", "Jhiki", "Rhaekara", "Lekkari", "Rhaequi", "Lezha", "Qekhara"]
        },
        "La forêt mystique de Marveltra": {
            homme: ["Sykin", "Neywa´ki´k", "Kakan", "Kotiru", "Ryn´kan", "Neyra´la", "Tsurra´lan", "Syn´van", "Mo´alaran", "Eyndor´kar", "Akwelan", "Serika", "Torukan´tum", "Vara´li´k", "Haneera´lan", "Kan´van", "Kon´van", "Rakum", "Vala", "Kowa´kiru", "Neyra´lan", "Haneen´van", "Haneera´lan", "Tsula", "Quatu´lar", "Ryk´lan", "Vatan", "Veylar", "Quok´lum", "Ikralarum", "Tsura´lar", "Vera´lin", "Thantek´lan", "Neykan", "Mo´andor´kan", "Haneex´tan", "Eykan´tan", "Neyra´lar", "Rylan", "Vera´lan", "Talarar", "Ralulu´kan", "Rynah´lan", "Ryl´kan", "Serikan", "Aywa´ki´k", "Neytar", "Neyndor´kar", "Quok´kan", "Neyn´van", "Ikratu´lan", "Vetan", "Ayn´kan", "Kawa´kar", "Ikratum", "Eyk´kan", "Rar´kan", "Eyn´van", "Neyn´kum", "Ralura´la", "Qualar", "Ventek´lar", "Tukar", "Torun´kar", "Aylan", "Syrrel´tan", "Nykan", "Kolarum", "Neyn´van", "Haneetum", "Ran´van", "Neyn´van", "Kakum", "Than´van", "Serir´kar", "Tutan", "Zylatar", "Syrrelu´kan", "Haneentan", "Tal´tan", "Ryntek´lan", "Akwera´lar", "Mo´andor´kan", "Eyn´kar", "Haneen´var", "Vek´kar", "Talolar", "Tarra´lum", "Neywa´kar", "Neyra´kar", "Torurra´lum", "Ayx´tan", "Eynah´lar", "Ikrak´kar", "Rawa´kan", "Torun´var", "Ryndor´kan", "Haneetan", "Katar", "Nyn´kan"],
            femme: ["Rale´ra", "Kora´ra", "Senva", "Veytan´ti", "Tal´ton´vi", "Syrri´ra", "Zyleel´ra", "Vex´ti", "Neyreel´ra", "Veynvi", "Zyri", "Taka´ki", "Tol´tan´ti", "Tawa´ra", "Koror´ki", "Tala´ki", "Veyanan´ti", "Veanara", "Talor´ki", "Tondin´ki", "Kax´tu´ra", "Veyrra´ra", "Neytira", "Aylu´ra", "Rata", "Sewi", "Zyl´ta", "Kalan´ti", "Vax´tira", "Tal´tira", "Nyx´ta´ra", "Ayruk´ra", "Eyton´vi", "Kolanor´ki", "Veyrek´ra", "Quaron´vi", "Mol´tek´ra", "Awi´ra", "Seanira", "Mola´ra", "Kox´ta´ra", "Tuwa´ra", "Tarrara", "Velana", "Syrri", "Tsuani", "Syrara", "Talanara", "Neyr´ek´ra", "Ratuk´ra", "Taanuk´ra", "Totek´ra", "Quanek´ra", "Neylan´ki", "Ikrare´ra", "Quora´ra", "Tala´ra", "Sylara", "Vanviri", "Sex´tu´ra", "Eytulanek´ra", "Zylara", "Tona´ki", "Rantana", "Neyki", "Vel´tira", "Neylah´ra", "Ryntira", "Verran´ti", "Syror´ki", "Eytutira", "Quakek´ra", "Torron´vi", "Nynte´ra", "Zyrra", "Neynteel´ra", "Konvon´vi", "Veyli´ra", "Qual´ta´ra", "Veyla´ra", "Mol´tan´ti", "Seru´ra", "Tan´vara", "Vatara", "Sex´tor´ki", "Taanu´ra", "Hax´tara", "Neyaneel´ra", "Tandeel´ra", "Kaniri", "Konvor´ki", "Sywon´vi", "Neyriri", "Ryana´ra", "Sykira", "Neyanara", "Syrra", "Nykwa", "Seti", "Tsuwira"]
        },
        "Le plateau de Palmir": {
            homme: ["Waysk", "Pak", "Pach", "Punk", "Int", "Qup", "Tip", "An", "Qum", "Ar", "Qhunk", "Wap", "Im", "Llank", "Pall", "Ull", "Waynk", "Uh", "Qup", "Llall", "Tu´llq", "Irq", "Yarak", "Ruw", "Pam", "Sun", "Wank", "Ip", "Am", "Tim", "Ih", "Ham", "Yank", "Pan", "It", "Tik", "Paqch", "Am", "Ap", "Ir", "Tun", "Wan", "Yach", "Rur", "Qen", "Susk", "Kunk", "Qhan", "Rach", "Ich", "Chak", "Am", "Ap", "Quch", "Way´llq", "Par", "Wam", "Am", "Sup", "Pam", "Rach", "Im", "It", "Qem", "Qunk", "Ru´llq", "Ha´llq", "Ruch", "Pat", "Uyk", "Qhat", "In", "Kun", "Llas", "Wayr", "Yam", "Uqch", "Am", "Hat", "Hap", "Warak", "Ham", "Ruk", "Ran", "Sull", "Wayh", "Wask", "Llar", "Uh", "Ach", "Wip", "Sum", "Tuk", "Wach", "Pank", "Waynt", "Uch", "Ay´llq", "Wayll", "Llall"],
            femme: ["Qhachamu", "Chara", "Waynapa", "Qotiqy", "Timara", "Aywu", "Arqa", "Uypa", "Waynta", "Asma", "Pacha", "Qemari", "Panti", "Qhasu", "Achu", "Yallqi", "Qollqa", "Tima", "Ari", "Alansu", "Waylla", "Uynapa", "Winku", "Aypuly", "Aqcha", "Kuyu", "Sunpa", "Tunti", "Ipu", "Qullqcha", "Unka", "Kulla", "Qullqi", "Yarqa", "Rapy", "Qhalansi", "Apula", "Amari", "Hara", "Quny", "Kura", "Ilansi", "Imi", "Asmi", "Illpa", "Quma", "Rapa", "Unpa", "Ayni", "Winta", "Haqcha", "Tuna", "Qullpa", "Kuma", "Qhari", "Wallpi", "Qhullpi", "Iyu", "Waya", "Uki", "Chaka", "Suqa", "Qhucha", "Qullqi", "Hachami", "Atiqa", "Wani", "Qhaqchy", "Kullpi", "Imu", "Iqcha", "Waynta", "Pama", "Illpa", "Iya", "Qhullpi", "Hanpa", "Hanki", "Qollqu", "Kunka", "Rayu", "Wanti", "Usu", "Iwa", "Lni", "Payu", "Kumaru", "Iqcha", "Puku", "Hanty", "Qonki", "Qullra", "Inku", "Qhanka", "Kuka", "Hallqa", "Qhapi", "Wanpa", "Pani", "Unapa"]
        },
        "Les canyons de Timna": {
            homme: ["Gegnur , fils de Rorvor", "Vilund , fils de Akorn", "Eskirdein , fils de Bryntar", "Aventon , fils de Vinund", "Sir , fils de Kjerkur", "Tholl , fils de Rolgron", "Gellfr , fils de Vidlald", "Hrodleki , fils de Todleki", "Skjolmar , fils de Farkak", "Eskirl , fils de Skjolein", "Grelhuuf , fils de Thental", "Jonguuf , fils de Avuk", "Kol , fils de Thonar", "Tontar , fils de Hakar", "Rorvar , fils de Leongic", "Gelik , fils de Wirlar", "Brylhor , fils de Skjorkar", "Wilhar , fils de Jorlar", "Jord , fils de Jongald", "Gelmald , fils de Eskinjus", "Bryngorn , fils de Grerkein", "Urlur , fils de Eolstelm", "Gengar , fils de Skjorvund", "Avegnus , fils de Thellar", "Hrorar , fils de Eondur", "Avell , fils de Torbj", "Eskilhaskr , fils de Skjolstod", "Geirding , fils de Eol", "Virdal , fils de Avunjund", "Rord , fils de Sir", "Hallfreki , fils de Bryrlaskr", "Wingik , fils de Rolhorn", "Korbjar , fils de Ahtarkal", "Alelm , fils de Hrolstar", "Sirdod , fils de Grendar", "Eogius , fils de Tongel", "Hrognaskr , fils de Leorbjon", "Rordar , fils de Kjenjon", "Vingal , fils de Rorar", "Eskir , fils de Kollon", "Bardund , fils de Brynjak", "Avukor , fils de Harelm", "Eskinjon , fils de Tolald", "Hrong , fils de Leongorn", "Avelgrein , fils de Ahtalur", "Jolhof , fils de Therveki", "Bryllald , fils de Skjognal", "Andald , fils de Thontod", "Kjegnius , fils de Rordur", "Thonduuf , fils de Eontius", "Eskirkar , fils de Kjerbjius", "Hrognel , fils de Hrodlod", "Jontar , fils de Sirkel", "Avurlund , fils de Jontik", "Vinjund , fils de Rolus", "Korar , fils de Wirus", "Eskingorn , fils de Rolgric", "Thelund , fils de Eognund", "Virald , fils de Vindel", "Virar , fils de Geirlar", "Ahtallfr , fils de Bryrbjelm", "Tondund , fils de Hronjolf", "Thork , fils de Galdar", "Thogur , fils de Kjelak", "Leokorn , fils de Skjoein", "Wilgrolf , fils de Ahtalar", "Virdus , fils de Jolald", "Geidlel , fils de Sindund", "Eolgrar , fils de Hrolstund", "Therkon , fils de Faluuf", "Thorkic , fils de Avurar", "Aaskr , fils de Kollfrund", "Aver , fils de Sirvar", "Eskirkel , fils de Hrolar", "Aver , fils de Toaskr", "Avum , fils de Hrolmar", "Viror , fils de Tokolf", "Gantus , fils de Vintund", "Kjelhar , fils de Fanjur", "Vildar , fils de Kjelgrur", "Thelgrar , fils de Rognod", "Halmein , fils de Wirod", "Vingelm , fils de Eontak", "Vilgraskr , fils de Avullfrar", "Bakof , fils de Thekic", "Ahtagnolf , fils de Sik", "Garur , fils de Hror", "Roreki , fils de Vilston", "Wirvod , fils de Fantuuf", "Averdur , fils de Viluuf", "Virlel , fils de Hrondar", "Eordund , fils de Rolhaskr", "Ahtal , fils de Torar", "Koric , fils de Geildorn", "Skjondor , fils de Wilhar", "Uric , fils de Garik", "Ahtandeki , fils de Eonus", "Jonar , fils de Ul", "Leoldik , fils de Singur", "Roral , fils de Kjellfr"],
            femme: ["Agmagrid , fille de Ingrida", "Olfiria , fille de Idgun", "Helren , fille de Helga", "Grosda , fille de Haela", "Inta , fille de Hrogrid", "Ysolga , fille de Eoda", "Fioda , fille de Frena", "Hrola , fille de Ailia", "Ridis , fille de Hrota", "Fregrod , fille de Indur", "Camia , fille de Olfitra", "Ysolgrid , fille de Gerki", "Lala , fille de Hella", "Idna , fille de Sila", "Aina , fille de Olfina", "Helstrid , fille de Silda", "Liki , fille de Olfina", "Serentra , fille de Adur", "Frela , fille de Haela", "Jorla , fille de Ysolne", "Carlodia , fille de Lygun", "Carlogrid , fille de Ria", "Ysolda , fille de Nada", "Camia , fille de Grosga", "Grosda , fille de Fioa", "Olfigrod , fille de Haela", "Gergrida , fille de Orna", "Olfia , fille de Grosna", "Eogun , fille de Orne", "Fregun , fille de Camiga", "Sida , fille de Serengrid", "Riga , fille de Ysollia", "Fioda , fille de Aigrid", "Camitra , fille de Helda", "Fredur , fille de Helna", "Idtta , fille de Fioa", "Fioa , fille de Hella", "Ingrid , fille de Ligun", "Hulstrid , fille de Anna", "Orne , fille de Freki", "Frega , fille de Intra", "Freria , fille de Natra", "Rigrida , fille de Eogrid", "Helda , fille de Agmagrida", "Serenga , fille de Fiona", "Hulla , fille de Ysola", "Agmadia , fille de Rina", "Frea , fille de Sina", "Serendur , fille de Frega", "Frestrid , fille de Fregrida", "Adrianda , fille de Fioa", "Silda , fille de Frene", "Grosna , fille de Fretra", "Nagrida , fille de Haeltra", "Ysoldia , fille de Aelua", "Jorda , fille de Fredia", "Jorki , fille de Ingrod", "Ada , fille de Eoda", "Ina , fille de Helren", "Camidis , fille de Freria", "Carlola , fille de Carlone", "Siltra , fille de Anga", "Carlona , fille de Olfila", "Ristrid , fille de Olfida", "Inria , fille de Helgrid", "Carlostrid , fille de Freda", "Aeluna , fille de Olfia", "Lydia , fille de Litra", "Aia , fille de Hulria", "Helga , fille de Orren", "Nada , fille de Camiga", "Lydia , fille de Aimi", "Adrianmi , fille de Inne", "Riki , fille de Idga", "Rina , fille de Inda", "Fioda , fille de Ligrida", "Ingun , fille de Siga", "Hula , fille de Olfina", "Lana , fille de Jorne", "Iddia , fille de Ina", "Hrone , fille de Aa", "Helda , fille de Grosria", "Fiodis , fille de Hela", "Anla , fille de Naa", "Hrone , fille de Camiren", "Atra , fille de Silna", "Adrianna , fille de Ada", "Carloki , fille de Aimi", "Idlia , fille de Gerstrid", "Serengrid , fille de Carloga", "Ristrid , fille de Idda", "Fredia , fille de Aelutra", "Inga , fille de Fiola", "Ysoldis , fille de Ina", "Jordis , fille de Lidia", "Jortta , fille de Sina", "Inne , fille de Ysola", "Ordis , fille de Aelumi", "Anne , fille de Orgrid", "Frea , fille de Aelugrid"]
        },
        "La forêt sauvage de la Yavikaya": {
            homme: ["Eledrir, Écorce Éthérée", "Idris, Écume Verdoyante", "Elowar, Ciel Fougère", "Faelebor, Ombre Feuillue", "Galaden, Frondaison Rayonnante", "Faelvanin, Brume d'Émeraude", "Celedrian, Liana Étincelante", "Elthorar, Brume d'Émeraude", "Nendiron, Souffle Selva", "Thrawynond, Souffle Canopéen", "Elraor, Lierre Profond", "Aelor, Perle Sylvestre", "Eolraor, Écume Verdoyante", "Sylathar, Lueur Tropicale", "Silionor, Souffle Canopéen", "Elvanon, Aube Verdoyante", "Caluil, Liana Étincelante", "Alarel, Pluie de Pétales", "Lonon, Cascade d'Émeraude", "Endirion, Cascade d'Émeraude", "Girandin, Cœur de Palme", "Endirar, Aube Verdoyante", "Elrianar, Écho de Liana", "Erionor, Fougère Écarlate", "Eladon, Écho de Liana", "Eorionar, Écume Verdoyante", "Elvanar, Cascade d'Émeraude", "Thrarandar, Rosée Tropicale", "Cenond, Perle Sylvestre", "Elendan, Aube Verdoyante", "Liledron, Ciel Fougère", "Lolowis, Pluie de Pétales", "Harendor, Pluie de Pétales", "Lolrais, Ciel Fougère", "Elionian, Frondaison Rayonnante", "Lolrianor, Brume d'Émeraude", "Ilraen, Ciel Fougère", "Ilaror, Ciel Fougère", "Belebian, Fougère Écarlate", "Aeledrin, Perle Sylvestre", "Beldarin, Ombre du Matin", "Elvanel, Feuille de Nuit", "Belathor, Rosée Tropicale", "Eladion, Brume d'Émeraude", "Fandor, Écume Verdoyante", "Faerendis, Rayon de Jade", "Silor, Brindille Dorée", "Fandiror, Pluie de Pétales", "Lilrianir, Cascade d'Émeraude", "Galadir, Acajou Céleste", "Mawynir, Souffle Selva", "Gilraor, Brume d'Amazonie", "Elarion, Brume de Sylve", "Marendor, Frondaison Rayonnante", "Nelowar, Ombre Feuillue", "Gilarir, Écho de Liana", "Fawynian, Brise Lotus", "Faendis, Souffle Canopéen", "Lolarin, Brindille Dorée", "Galin, Écorce Éthérée", "Eladion, Lierre Profond", "Mandor, Torrent d'Azur", "Silionon, Feuille de Nuit", "Endar, Bouclier Végétal", "Faerendion, Écho de Liana", "Girionor, Écorce Éthérée", "Beldarir, Lueur Selva", "Thralaror, Perle Sylvestre", "Silrianir, Brise Lotus", "Siladen, Lueur Tropicale", "Aledren, Brume d'Émeraude", "Elraian, Lueur Selva", "Sylvalar, Ciel Fougère", "Aelthoren, Souffle Canopéen", "Erionin, Liana Étincelante", "Eolendond, Écume Verdoyante", "Nelthorin, Rayon de Sève", "Elionor, Ciel Fougère", "Elrianis, Bouclier Végétal", "Halador, Brise Lotus", "Alenan, Liana Étincelante", "Silrianon, Frondaison Rayonnante", "Nendor, Rosée Tropicale", "Ewynin, Souffle Canopéen", "Calir, Brise Lotus", "Lolor, Brume d'Émeraude", "Erendel, Écorce Éthérée", "Lorendar, Cascade d'Émeraude", "Erionir, Rosée Tropicale", "Fadror, Écume Verdoyante", "Irendis, Cœur de Palme", "Faeladen, Rayon de Jade", "Syris, Frondaison Rayonnante", "Elenen, Fougère Écarlate", "Newynorn, Fougère Écarlate", "Falrauin, Bouclier Végétal", "Aelarir, Rosée Tropicale", "Elor, Brise Lotus", "Eldaren, Cœur de Palme", "Girenduin, Écho de Liana"],
            femme: ["Galendae, Fougère Écarlate", "Ildaria, Brume de Sylve", "Synya, Cœur de Palme", "Nerothya, Ombre du Matin", "Erianae, Écho de Liana", "Silowae, Lueur Tropicale", "Eonae, Acajou Céleste", "Nelowia, Canopée Brillante", "Thalivra, Lierre Profond", "Sythorae, Écume Verdoyante", "Endrae, Lueur Tropicale", "Handia, Fougère Écarlate", "Faelendara, Souffle Selva", "Nelrina, Rayon de Sève", "Erothyn, Torrent d'Azur", "Faewynara, Canopée Brillante", "Eledrae, Ombre du Matin", "Haladryn, Torrent d'Azur", "Eladria, Cœur de Palme", "Elrinae, Lueur Selva", "Eolissa, Torrent d'Azur", "Hariana, Rayon de Jade", "Elvanah, Rosée Tropicale", "Galivra, Cascade d'Ambre", "Thariana, Fougère Écarlate", "Eladria, Cascade d'Émeraude", "Anae, Torrent d'Azur", "Gariana, Ombre Feuillue", "Thaladria, Acajou Céleste", "Finrinia, Rayon de Jade", "Erianae, Canopée Brillante", "Nelanara, Cœur de Palme", "Finrisara, Cœur de Palme", "Hana, Torrent d'Azur", "Belriani, Lueur Tropicale", "Aethori, Bouclier Végétal", "Elivrae, Lierre Profond", "Endra, Lueur Selva", "Bellendae, Perle Sylvestre", "Nelissia, Fougère Écarlate", "Thaladria, Rosée Tropicale", "Thrandira, Lierre Profond", "Garisia, Liana Étincelante", "Haladreth, Ombre du Matin", "Lolanara, Harmonie Sylvestre", "Thradalae, Canopée Brillante", "Elivrae, Brise Lotus", "Erianyn, Liana Étincelante", "Eothora, Liana Étincelante", "Erianae, Perle Sylvestre", "Thaledrae, Brindille Dorée", "Aelrinah, Feuille de Nuit", "Faewynae, Feuille de Nuit", "Aelenbrah, Écho de Liana", "Elvania, Rosée Tropicale", "Bellvana, Cascade d'Émeraude", "Ethoreth, Rayon de Jade", "Nendyn, Harmonie Sylvestre", "Nelmareth, Ombre Feuillue", "Eladra, Écume Verdoyante", "Handae, Feuille de Nuit", "Elenbria, Brume de Sylve", "Sindiria, Brume d'Émeraude", "Halenbra, Écho de Liana", "Sylaneth, Lierre Profond", "Cerianae, Cascade d'Émeraude", "Finthora, Frondaison Rayonnante", "Ceriania, Brume d'Émeraude", "Handia, Rayon de Sève", "Elenbria, Aube Verdoyante", "Halenda, Bouclier Végétal", "Sylana, Liana Étincelante", "Sirianae, Frondaison Rayonnante", "Edalia, Ombre Feuillue", "Cenae, Ombre Feuillue", "Ganis, Harmonie Sylvestre", "Sylenbra, Feuille de Nuit", "Aerianae, Ombre Feuillue", "Thranda, Ombre du Matin", "Eladra, Brume d'Amazonie", "Thariania, Brise Lotus", "Edala, Cascade d'Ambre", "Sildrirae, Écho de Liana", "Elrinae, Rayon de Sève", "Galanae, Canopée Brillante", "Thaladrah, Pluie de Pétales", "Silenbra, Brindille Dorée", "Aewyna, Souffle Canopéen", "Ania, Ombre Feuillue", "Sirothia, Souffle Selva", "Sylinia, Liana Étincelante", "Nedalae, Feuille de Nuit", "Thalana, Lueur Selva", "Galowae, Écorce Éthérée", "Aedali, Écume Verdoyante", "Malenbrara, Brume d'Émeraude", "Alenbrya, Aube Verdoyante", "Bellvania, Brume d'Émeraude", "Fandyn, Rayon de Sève"]
        }
            // ... etc ...
        };
    }

    // --- 2. LOGIQUE D'AFFICHAGE ---
    getData() {
        // On renvoie juste les clés de base pour les selects initiaux
        return {
            types: ["Antagoniste", "Neutre"],
            origins: Object.keys(this.nameData).sort()
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Remplissage initial des selects
        this._populateControls(html);

        // Ecouteurs
        html.find('#npc-type').change(() => this._populateControls(html));
        html.find('#npc-archetype').change(() => this._populateLevels(html));
        
        html.find('#generate-btn').click(ev => this._generate(html));
        html.find('#create-actor-btn').click(ev => this._createActorInFoundry(html));
    }

    _populateControls(html) {
        const type = html.find('#npc-type').val();
        const archSelect = html.find('#npc-archetype');
        const levelGroup = html.find('#level-group');
        
        // On récupère les données via le getter (ou un appel direct si tu as collé le JSON)
        // Note: Si tu as collé le JSON dans le getter, utilise this.npcData
        const data = this.npcData; 

        archSelect.empty();
        if (data[type]) {
            Object.keys(data[type]).forEach(arch => {
                archSelect.append(`<option value="${arch}">${arch}</option>`);
            });
        }

        if (type === "Antagoniste") {
            levelGroup.show();
            this._populateLevels(html);
        } else {
            levelGroup.hide();
        }
        
        // On remplit aussi les origines si ce n'est pas fait (au cas où getData ne suffise pas)
        const originSelect = html.find('#npc-origin');
        if(originSelect.children().length === 0) {
            Object.keys(this.nameData).forEach(o => originSelect.append(`<option value="${o}">${o}</option>`));
        }
    }

    _populateLevels(html) {
        const type = html.find('#npc-type').val();
        const arch = html.find('#npc-archetype').val();
        const levelSelect = html.find('#npc-level');
        const data = this.npcData;

        levelSelect.empty();
        if (type === "Antagoniste" && data[type][arch]) {
            Object.keys(data[type][arch]).forEach(lvl => {
                levelSelect.append(`<option value="${lvl}">${lvl}</option>`);
            });
        }
    }

    // --- 3. GÉNÉRATION ---
    _generate(html) {
        const type = html.find('#npc-type').val();
        const archetype = html.find('#npc-archetype').val();
        const origin = html.find('#npc-origin').val();
        const gender = html.find('#npc-appearance').val();
        const level = html.find('#npc-level').val();
        
        const data = this.npcData;
        let profile;

        if (type === "Antagoniste") profile = data[type][archetype][level];
        else profile = data[type][archetype];

        if (!profile) return ui.notifications.error("Profil introuvable.");

        // A. Méridiens
        const stats = {};
        for (const [key, range] of Object.entries(profile.meridiens)) {
            stats[key] = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        }

        // B. Calculs
        const pvi = (stats.domination || 0) + (stats.savoir || 0) + (stats.expression || 0);
        const pve = (stats.puissance || 0) + (stats.mouvement || 0) + (stats.vitalite || 0);
        const rank = Math.max(1, Math.round((pvi + pve - 6) / 3));

        // C. Nom
        const genderKey = (gender === 'Féminine') ? 'femme' : 'homme';
        const names = this.nameData[origin]?.[genderKey] || ["Inconnu"];
        const name = names[Math.floor(Math.random() * names.length)];

        // D. Loot (Weighted Random)
        const getWeighted = (table) => {
            const total = table.reduce((sum, i) => sum + i[1], 0);
            let r = Math.random() * total;
            for(let item of table) {
                if(r < item[1]) return item[0];
                r -= item[1];
            }
            return table[table.length-1][0];
        };

        const armeTxt = getWeighted(profile.equipementEssentiel.arme);
        const tenueTxt = getWeighted(profile.equipementEssentiel.tenue);

        // E. Butin Supplémentaire
        const loot = [];
        const rollRarity = Math.random() * 100;
        let rarity = "Commun";
        if (rollRarity < 0.1) rarity = "Légendaire";
        else if (rollRarity < 1) rarity = "Très rare";
        else if (rollRarity < 5) rarity = "Rare";
        else if (rollRarity < 20) rarity = "Incommun";

        profile.butinSupplementaire.forEach(row => {
            if (row[0] === rarity) {
                if (Math.random() * 100 < row[4]) {
                    // Calcul quantité (ex: "2d6")
                    let qty = 1;
                    if (typeof row[3] === 'string' && row[3].includes('d')) {
                        const [n, d] = row[3].split('d').map(Number);
                        qty = 0;
                        for(let i=0; i<n; i++) qty += Math.floor(Math.random() * d) + 1;
                    } else {
                        qty = parseInt(row[3]);
                    }
                    loot.push(`${row[2]} (x${qty})`);
                }
            }
        });

        // F. Stockage & Affichage
        this.currentNpcData = { name, type, archetype, level, rank, stats, pvi, pve, armeTxt, tenueTxt, loot };
        this._updateSheet(html);
    }

    _updateSheet(html) {
        const d = this.currentNpcData;
        html.find('#npc-name').val(d.name);
        html.find('#npc-archetype-display').text(d.archetype);
        html.find('#npc-level-display').text(d.level || "Standard");
        html.find('#npc-rank-display').text("Rang " + d.rank);

        for (const [k, v] of Object.entries(d.stats)) {
            html.find(`#stat-${k}`).text(v);
        }
        html.find('#pvi-total').text(d.pvi);
        html.find('#pve-total').text(d.pve);

        html.find('#loot-arme').html(`<li>${d.armeTxt}</li>`);
        html.find('#loot-tenue').html(`<li>${d.tenueTxt}</li>`);
        
        const lootList = html.find('#loot-supplementaire');
        lootList.empty();
        if(d.loot.length > 0) d.loot.forEach(l => lootList.append(`<li>${l}</li>`));
        else lootList.append(`<li>Rien de valeur.</li>`);

        html.find('#sheet-section').removeClass('hidden');
    }

    // --- 4. CRÉATION ACTEUR FOUNDRY ---
    async _createActorInFoundry(html) {
        const d = this.currentNpcData;
        if (!d.name) return;

        const actorType = "pnj"; 

        // 1. PRÉPARATION DES APTITUDES
        // On initialise les aptitudes par défaut en reprenant la valeur du Méridien associé
        // Cela évite d'avoir des PNJ avec 0 partout en Force/Finesse
        const aptitudes = {
            // PUISSANCE
            "force": { value: d.stats.puissance, label: "Force", meridien: "puissance" },
            "intimidation": { value: d.stats.puissance, label: "Intimidation", meridien: "puissance" },
            "magnetisme": { value: d.stats.puissance, label: "Magnétisme", meridien: "puissance" },
            "vigueur": { value: d.stats.puissance, label: "Vigueur", meridien: "puissance" },
            
            // MOUVEMENT
            "agilite": { value: d.stats.mouvement, label: "Agilité", meridien: "mouvement" },
            "coordination": { value: d.stats.mouvement, label: "Coordination", meridien: "mouvement" },
            "finesse": { value: d.stats.mouvement, label: "Finesse", meridien: "mouvement" },
            "reflexe": { value: d.stats.mouvement, label: "Réflexe", meridien: "mouvement" },

            // VITALITÉ
            "adaptation": { value: d.stats.vitalite, label: "Adaptation", meridien: "vitalite" },
            "constitution": { value: d.stats.vitalite, label: "Constitution", meridien: "vitalite" },
            "regeneration": { value: d.stats.vitalite, label: "Régénération", meridien: "vitalite" },
            "resistance": { value: d.stats.vitalite, label: "Résistance", meridien: "vitalite" },

            // DOMINATION
            "commandement": { value: d.stats.domination, label: "Commandement", meridien: "domination" },
            "logique": { value: d.stats.domination, label: "Logique", meridien: "domination" },
            "ruse": { value: d.stats.domination, label: "Ruse", meridien: "domination" },
            "volonte": { value: d.stats.domination, label: "Volonté", meridien: "domination" }, // Défense Mentale

            // SAVOIR
            "erudition": { value: d.stats.savoir, label: "Érudition", meridien: "savoir" },
            "expertise": { value: d.stats.savoir, label: "Expertise", meridien: "savoir" },
            "perception": { value: d.stats.savoir, label: "Perception", meridien: "savoir" },
            "sagesse": { value: d.stats.savoir, label: "Sagesse", meridien: "savoir" }, // Défense Mentale

            // EXPRESSION
            "creativite": { value: d.stats.expression, label: "Créativité", meridien: "expression" },
            "empathie": { value: d.stats.expression, label: "Empathie", meridien: "expression" },
            "intuition": { value: d.stats.expression, label: "Intuition", meridien: "expression" },
            "persuasion": { value: d.stats.expression, label: "Persuasion", meridien: "expression" }, // Défense Mentale
        };

        // 2. CRÉATION DE L'ACTEUR
        const actor = await Actor.create({
            name: html.find('#npc-name').val(),
            type: actorType,
            img: "icons/svg/mystery-man.svg",
            system: {
                // Méridiens
                meridiens: {
                    domination: { value: d.stats.domination, label: "Domination" },
                    savoir: { value: d.stats.savoir, label: "Savoir" },
                    expression: { value: d.stats.expression, label: "Expression" },
                    puissance: { value: d.stats.puissance, label: "Puissance" },
                    mouvement: { value: d.stats.mouvement, label: "Mouvement" },
                    vitalite: { value: d.stats.vitalite, label: "Vitalité" }
                },
                // Aptitudes (La correction est ici !)
                aptitudes: aptitudes,

                // Points de maitrise (Correctif précédent)
                pointsMaitrise: { value: 0, max: 10 }, 
                
                // Jauges
                pvi: { value: d.pvi, max: d.pvi },
                pve: { value: d.pve, max: d.pve },
                
                // Bio
                personnalite: {
                    biographie: {
                        histoire: `Archétype: ${d.archetype} (${d.level || 'Standard'})\nOrigine: ${html.find('#npc-origin').val()}`
                    }
                }
            }
        });

        // 3. CRÉATION DES OBJETS (ITEMS)
        const itemsToCreate = [];

        const parseItem = (text, type) => {
            if (!text || text === "(Aucune)") return null;
            const match = text.match(/^(.*?) \(.*Qualité (\d+)\)$/);
            const name = match ? match[1] : text;
            const quality = match ? parseInt(match[2]) : 0;
            
            // Détection auto de l'image (simplifiée)
            let img = "icons/svg/item-bag.svg";
            if (type === "arme") {
                if (name.toLowerCase().includes("arc")) img = "icons/weapons/bows/shortbow.webp";
                else if (name.toLowerCase().includes("dague")) img = "icons/weapons/daggers/dagger.webp";
                else img = "icons/weapons/swords/sword-iron.webp";
            }
            if (type === "protection") img = "icons/svg/shield.svg";

            return {
                name: name,
                type: type, 
                img: img,
                system: {
                    description: text,
                    qualite: quality,
                    equipe: true 
                }
            };
        };

        const w = parseItem(d.armeTxt, "arme");
        if (w) itemsToCreate.push(w);

        const a = parseItem(d.tenueTxt, "protection");
        if (a) itemsToCreate.push(a);

        d.loot.forEach(l => {
            itemsToCreate.push({
                name: l,
                type: "objet",
                img: "icons/svg/chest.svg",
                system: { description: "Butin généré" }
            });
        });

        if (itemsToCreate.length > 0) {
            await actor.createEmbeddedDocuments("Item", itemsToCreate);
        }

        ui.notifications.info(`PNJ "${d.name}" créé avec succès !`);
        actor.sheet.render(true);
    }
}