export class AvantisWeaponForge extends Application {

    constructor(options) {
        super(options);
        this.currentWeaponData = {};
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "avantis-weapon-forge",
            title: "Forge d'Héphaïstos",
            template: "systems/avantis/templates/apps/weapon-generator.html",
            width: 900,
            height: 800,
            resizable: true,
            classes: ["avantis-weapon-forge-window"]
        });
    }

    // --- DONNÉES DU GÉNÉRATEUR (Ton objet weaponData) ---
    get weaponData() {
        return {
            weaponBases: {
    "Arbalète": {
      "basePrice": 220,
      "propertiesByRarity": {
        "commun": ["Précis", "Perforant", "Silencieux"],
        "incommun": ["Portée +50", "Dégâts +1"],
        "rare": ["Encombrant", "Rechargement +1"],
        "tresRare": ["Chasse +1", "Rechargement +1"],
        "legendaire": ["Corrosif", "Poison"]
      }
    },
    "Arc court": {
      "basePrice": 220,
      "propertiesByRarity": {
        "commun": ["Perforant", "Silencieux"],
        "incommun": ["Précis", "Rapide", "Portée +50", "Dégâts +1"],
        "rare": ["Dégâts +1"],
        "tresRare": ["Chasse +1", "Corrosif", "Rechargement +1"],
        "legendaire": ["Corrosif", "Explosif +1", "Poison"]
      }
    },
    "Arc long": {
      "basePrice": 250,
      "propertiesByRarity": {
        "commun": ["Portée +50", "Perforant", "Dégâts +1"],
        "incommun": ["Dégâts +1", "Précis", "Portée +50"],
        "rare": ["Chasse +1", "Rechargement +1", "Portée +50"],
        "tresRare": ["Rechargement +1", "Chasse +1", "Corrosif", "Poison"],
        "legendaire": ["Corrosif", "Explosif +1", "Rechargement +1"]
      }
    },
    "Atlatl": {
      "basePrice": 60,
      "propertiesByRarity": {
        "commun": ["Perforant"],
        "incommun": ["Dégâts +1", "Précis"],
        "rare": ["Chasse +1"],
        "tresRare": ["Portée +50"],
        "legendaire": ["Explosif +1"]
      }
    },
    "Bardiche": {
      "basePrice": 200,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Allonge"],
        "incommun": ["Dégâts +1"],
        "rare": ["Brise-garde", "Impact", "Chasse +1"],
        "tresRare": [],
        "legendaire": ["Vorpal"]
      }
    },
    "Bâton": {
      "basePrice": 50,
      "propertiesByRarity": {
        "commun": ["Rapide", "Vigueur +1"],
        "incommun": ["Dégâts +1", "Impact"],
        "rare": ["Chasse +1"],
        "tresRare": [],
        "legendaire": ["Brutal"]
      }
    },
    "Bolas": {
      "basePrice": 80,
      "propertiesByRarity": {
        "commun": ["Entravant"],
        "incommun": ["Dégâts +1"],
        "rare": ["Chasse +1"],
        "tresRare": ["Portée +50"],
        "legendaire": []
      }
    },
    "Boomerang": {
      "basePrice": 60,
      "propertiesByRarity": {
        "commun": ["Rapide", "Silencieux"],
        "incommun": ["Impact"],
        "rare": ["Dégâts +1"],
        "tresRare": ["Portée +50"],
        "legendaire": ["Sifflant"]
      }
    },
    "Bouclier": {
      "basePrice": 100,
      "propertiesByRarity": {
        "commun": ["Vigueur +1"],
        "incommun": ["Vigueur +1", "Constitution +1"],
        "rare": ["Encombrant", "Chasse +1"],
        "tresRare": [],
        "legendaire": ["Impact", "Tranchant"]
      }
    },
    "Chaîne à deux kamas": {
      "basePrice": 120,
      "propertiesByRarity": {
        "commun": ["Entravant", "Allonge"],
        "incommun": ["Tranchant", "Dégâts +1"],
        "rare": ["Rapide", "Chasse +1"],
        "tresRare": ["Vorpal", "Brise-garde"],
        "legendaire": []
      }
    },
    "Chaîne cloutée": {
      "basePrice": 250,
      "propertiesByRarity": {
        "commun": ["Entravant", "Brutal"],
        "incommun": ["Perforant", "Dégâts +1"],
        "rare": ["Impact", "Dégâts +1"],
        "tresRare": [],
        "legendaire": ["Ignore la parade"]
      }
    },
    "Cimeterre": {
      "basePrice": 140,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Rapide"],
        "incommun": ["Dégâts +1", "Tranchant"],
        "rare": ["Chasse +1", "Poison"],
        "tresRare": ["Vorpal", "Dégâts +1", "Brise-garde", "Poison"],
        "legendaire": ["Corrosif", "Vigueur +1"]
      }
    },
    "Couteau": {
      "basePrice": 60,
      "propertiesByRarity": {
        "commun": ["Dissimulé", "Rapide", "Tranchant"],
        "incommun": ["Dégâts +1", "Silencieux"],
        "rare": ["Chasse +1"],
        "tresRare": ["Précis"],
        "legendaire": ["Vorpal"]
      }
    },
    "Couteau de lancer": {
      "basePrice": 100,
      "propertiesByRarity": {
        "commun": ["Dissimulé", "Rapide", "Précis"],
        "incommun": ["Dégâts +1", "Tranchant"],
        "rare": ["Tranchant"],
        "tresRare": ["Précis", "Portée +50"],
        "legendaire": ["Vorpal", "Silencieux"]
      }
    },
    "Cracheur des Anciens": {
      "basePrice": 450,
      "propertiesByRarity": {
        "commun": ["Portée +50", "Dégâts +1"],
        "incommun": ["Dégâts +1", "Portée +50"],
        "rare": ["Dégâts +1", "Ignore la parade", "Portée +50", "Précis", "Rechargement +1"],
        "tresRare": ["Ancien", "Impact", "Explosif +1", "Ignore la parade", "Perforant", "Portée +50", "Précis", "Tranchant", "Rechargement +1"],
        "legendaire": ["Explosif +1", "Corrosif", "Tranchant", "Impact", "Perforant"]
      }
    },
    "Dague": {
      "basePrice": 70,
      "propertiesByRarity": {
        "commun": ["Dissimulé", "Rapide", "Tranchant"],
        "incommun": ["Dégâts +1", "Silencieux"],
        "rare": ["Chasse +1"],
        "tresRare": ["Précis"],
        "legendaire": ["Vorpal"]
      }
    },
    "Double-lame": {
      "basePrice": 250,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Dégâts +1"],
        "incommun": ["Dégâts +1"],
        "rare": ["Allonge", "Chasse +1", "Vigueur +1", "Brise-garde"],
        "tresRare": [],
        "legendaire": ["Vorpal"]
      }
    },
    "Épée à deux mains": {
      "basePrice": 250,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Dégâts +1"],
        "incommun": ["Dégâts +1", "Vigueur +1"],
        "rare": ["Allonge", "Chasse +1", "Vigueur +1", "Brise-garde", "Brutal", "Dégâts +1", "Impact", "Vorpal"],
        "tresRare": ["Vorpal", "Ignore la parade"],
        "legendaire": ["Vorpal"]
      }
    },
    "Épée bâtarde": {
      "basePrice": 250,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Dégâts +1"],
        "incommun": ["Dégâts +1"],
        "rare": ["Allonge", "Chasse +1", "Vigueur +1", "Brise-garde"],
        "tresRare": [],
        "legendaire": ["Vorpal"]
      }
    },
    "Épée courte": {
      "basePrice": 110,
      "propertiesByRarity": {
        "commun": ["Dissimulé", "Rapide", "Tranchant"],
        "incommun": ["Dégâts +1"],
        "rare": ["Chasse +1"],
        "tresRare": ["Précis"],
        "legendaire": ["Vorpal"]
      }
    },
    "Épée large": {
      "basePrice": 250,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Dégâts +1"],
        "incommun": ["Dégâts +1", "Vigueur +1", "Tranchant", "Impact"],
        "rare": ["Allonge", "Chasse +1", "Vigueur +1", "Brise-garde", "Brutal", "Dégâts +1", "Impact", "Vorpal"],
        "tresRare": ["Vorpal", "Ignore la parade"],
        "legendaire": ["Vorpal"]
      }
    },
    "Épée longue": {
      "basePrice": 250,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Dégâts +1"],
        "incommun": ["Dégâts +1"],
        "rare": ["Allonge", "Chasse +1", "Vigueur +1", "Brise-garde"],
        "tresRare": [],
        "legendaire": ["Vorpal"]
      }
    },
    "Faux": {
      "basePrice": 210,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Dégâts +1"],
        "incommun": ["Dégâts +1", "Vigueur +1", "Brise-garde"],
        "rare": ["Allonge", "Chasse +1", "Vigueur +1", "Brise-garde", "Brutal", "Dégâts +1"],
        "tresRare": ["Ignore la parade", "Brise-garde", "Impact"],
        "legendaire": ["Vorpal"]
      }
    },
    "Fléau d'arme": {
      "basePrice": 100,
      "propertiesByRarity": {
        "commun": ["Impact", "Entravant", "Brutal"],
        "incommun": ["Brise-garde", "Dégâts +1"],
        "rare": ["Brutal", "Chasse +1", "Impact", "Dégâts +1"],
        "tresRare": ["Poison"],
        "legendaire": ["Corrosif"]
      }
    },
    "Fouet": {
      "basePrice": 85,
      "propertiesByRarity": {
        "commun": ["Entravant", "Allonge"],
        "incommun": ["Dégâts +1"],
        "rare": ["Sifflant", "Ignore la parade", "Chasse +1"],
        "tresRare": [],
        "legendaire": ["Tranchant"]
      }
    },
    "Fronde": {
      "basePrice": 65,
      "propertiesByRarity": {
        "commun": ["Précis", "Rechargement +1"],
        "incommun": ["Dégâts +1", "Rechargement +1"],
        "rare": ["Portée +50", "Chasse +1"],
        "tresRare": ["Corrosif", "Impact"],
        "legendaire": []
      }
    },
    "Gourdin": {
      "basePrice": 45,
      "propertiesByRarity": {
        "commun": ["Impact"],
        "incommun": ["Encombrant", "Brutal", "Brise-garde", "Dégâts +1"],
        "rare": ["Brutal", "Chasse +1"],
        "tresRare": [],
        "legendaire": []
      }
    },
    "Grand cracheur": {
      "basePrice": 800,
      "propertiesByRarity": {
        "commun": ["Portée +50", "Dégâts +1"],
        "incommun": ["Dégâts +1", "Portée +50"],
        "rare": ["Dégâts +1", "Ignore la parade", "Portée +50", "Précis", "Explosif +1"],
        "tresRare": ["Ancien", "Impact", "Explosif +1", "Ignore la parade", "Perforant", "Portée +50", "Précis", "Tranchant", "Rechargement +1"],
        "legendaire": ["Explosif +1", "Corrosif", "Tranchant", "Impact", "Perforant", "Portée +50", "Rechargement +1", "Poison"]
      }
    },
    "Grappin": {
      "basePrice": 70,
      "propertiesByRarity": {
        "commun": ["Entravant", "Allonge"],
        "incommun": ["Dégâts +1"],
        "rare": ["Encombrant", "Chasse +1"],
        "tresRare": ["Portée +50", "Impact", "Perforant"],
        "legendaire": []
      }
    },
    "Hache": {
      "basePrice": 150,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Dégâts +1"],
        "incommun": ["Dégâts +1", "Brutal"],
        "rare": ["Chasse +1", "Brise-garde"],
        "tresRare": ["Impact"],
        "legendaire": ["Vorpal"]
      }
    },
    "Hache à deux mains": {
      "basePrice": 180,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Dégâts +1"],
        "incommun": ["Dégâts +1"],
        "rare": ["Allonge", "Chasse +1", "Vigueur +1", "Brise-garde", "Constitution +1"],
        "tresRare": [],
        "legendaire": ["Vorpal"]
      }
    },
    "Hache de lancer": {
      "basePrice": 180,
      "propertiesByRarity": {
        "commun": ["Précis", "Tranchant"],
        "incommun": ["Dégâts +1"],
        "rare": [],
        "tresRare": [],
        "legendaire": ["Vorpal", "Sifflant"]
      }
    },
    "Hache double": {
      "basePrice": 250,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Dégâts +1"],
        "incommun": ["Dégâts +1"],
        "rare": ["Allonge", "Chasse +1", "Vigueur +1", "Brise-garde", "Constitution +1"],
        "tresRare": [],
        "legendaire": ["Vorpal"]
      }
    },
    "Hachette": {
      "basePrice": 110,
      "propertiesByRarity": {
        "commun": ["Précis", "Tranchant"],
        "incommun": ["Dégâts +1"],
        "rare": [],
        "tresRare": [],
        "legendaire": ["Vorpal", "Sifflant"]
      }
    },
    "Hallebarde": {
      "basePrice": 170,
      "propertiesByRarity": {
        "commun": ["Allonge", "Tranchant"],
        "incommun": ["Dégâts +1", "Brutal", "Ignore la parade", "Vigueur +1"],
        "rare": ["Impact", "Perforant", "Chasse +1"],
        "tresRare": ["Brise-garde", "Entravant"],
        "legendaire": ["Vorpal", "Sifflant"]
      }
    },
    "Hallebarde rétractable": {
      "basePrice": 200,
      "propertiesByRarity": {
        "commun": ["Allonge", "Tranchant"],
        "incommun": ["Dégâts +1", "Ignore la parade", "Vigueur +1"],
        "rare": ["Impact", "Perforant", "Chasse +1"],
        "tresRare": ["Brise-garde", "Entravant"],
        "legendaire": ["Vorpal", "Sifflant"]
      }
    },
    "Javeline": {
      "basePrice": 90,
      "propertiesByRarity": {
        "commun": ["Allonge", "Perforant"],
        "incommun": ["Dégâts +1", "Ignore la parade", "Vigueur +1", "Précis"],
        "rare": ["Sifflant"],
        "tresRare": ["Portée +50"],
        "legendaire": ["Sifflant"]
      }
    },
    "Jitte": {
      "basePrice": 140,
      "propertiesByRarity": {
        "commun": ["Vigueur +1", "Dissimulé", "Impact"],
        "incommun": ["Dégâts +1", "Rapide"],
        "rare": ["Chasse +1", "Constitution +1", "Silencieux"],
        "tresRare": [],
        "legendaire": []
      }
    },
    "Kama": {
      "basePrice": 100,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Rapide"],
        "incommun": ["Dégâts +1"],
        "rare": ["Dissimulé", "Précis", "Réflexe +1"],
        "tresRare": ["Chasse +1", "Silencieux"],
        "legendaire": ["Vorpal"]
      }
    },
    "Khopesh": {
      "basePrice": 130,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Rapide"],
        "incommun": ["Dégâts +1"],
        "rare": ["Dissimulé", "Précis", "Réflexe +1"],
        "tresRare": ["Chasse +1", "Silencieux"],
        "legendaire": ["Vorpal"]
      }
    },
    "Lance": {
      "basePrice": 90,
      "propertiesByRarity": {
        "commun": ["Allonge", "Perforant"],
        "incommun": ["Dégâts +1", "Ignore la parade", "Vigueur +1", "Précis"],
        "rare": ["Impact", "Chasse +1", "Rapide", "Sifflant"],
        "tresRare": ["Brise-garde", "Entravant"],
        "legendaire": ["Sifflant"]
      }
    },
    "Marteau": {
      "basePrice": 170,
      "propertiesByRarity": {
        "commun": ["Impact"],
        "incommun": ["Brutal", "Dégâts +1", "Constitution +1"],
        "rare": ["Chasse +1"],
        "tresRare": ["Brise-garde"],
        "legendaire": ["Indestructible"]
      }
    },
    "Marteau à long manche": {
      "basePrice": 250,
      "propertiesByRarity": {
        "commun": ["Impact", "Dégâts +1", "Allonge"],
        "incommun": ["Brutal", "Dégâts +1", "Constitution +1"],
        "rare": ["Chasse +1", "Brise-garde", "Ignore la parade", "Vigueur +1"],
        "tresRare": [],
        "legendaire": []
      }
    },
    "Masse": {
      "basePrice": 100,
      "propertiesByRarity": {
        "commun": ["Impact"],
        "incommun": ["Brutal", "Dégâts +1", "Constitution +1"],
        "rare": ["Chasse +1", "Dégâts +1"],
        "tresRare": [],
        "legendaire": ["Allonge", "Brise-garde"]
      }
    },
    "Morgenstern": {
      "basePrice": 100,
      "propertiesByRarity": {
        "commun": ["Impact"],
        "incommun": ["Brutal", "Dégâts +1"],
        "rare": ["Chasse +1", "Dégâts +1", "Perforant"],
        "tresRare": ["Brise-garde", "Constitution +1"],
        "legendaire": []
      }
    },
    "Nunchaku": {
      "basePrice": 80,
      "propertiesByRarity": {
        "commun": ["Rapide", "Entravant"],
        "incommun": ["Dégâts +1"],
        "rare": ["Chasse +1"],
        "tresRare": ["Précis", "Allonge"],
        "legendaire": ["Réflexe +1", "Sifflant", "Dissimulé"]
      }
    },
    "Rapière": {
      "basePrice": 150,
      "propertiesByRarity": {
        "commun": ["Précis", "Perforant"],
        "incommun": ["Tranchant", "Dégâts +1"],
        "rare": ["Réflexe +1", "Chasse +1"],
        "tresRare": ["Ignore la parade", "Vigueur +1"],
        "legendaire": ["Corrosif", "Poison"]
      }
    },
    "Sabre": {
      "basePrice": 160,
      "propertiesByRarity": {
        "commun": ["Tranchant", "Rapide", "Dégâts +1"],
        "incommun": ["Dégâts +1", "Tranchant"],
        "rare": ["Vorpal", "Chasse +1"],
        "tresRare": ["Vorpal", "Dégâts +1"],
        "legendaire": []
      }
    },
    "Sansetsukon": {
      "basePrice": 90,
      "propertiesByRarity": {
        "commun": ["Entravant"],
        "incommun": ["Dégâts +1", "Allonge"],
        "rare": ["Chasse +1", "Rapide", "Impact"],
        "tresRare": ["Précis", "Vigueur +1"],
        "legendaire": ["Sifflant", "Réflexe +1"]
      }
    },
    "Sarbacane": {
      "basePrice": 70,
      "propertiesByRarity": {
        "commun": ["Silencieux"],
        "incommun": ["Perforant", "Précis"],
        "rare": ["Chasse +1", "Dégâts +1"],
        "tresRare": ["Sifflant", "Corrosif", "Poison"],
        "legendaire": ["Portée +50", "Explosif +1"]
      }
    },
    "Shuriken": {
      "basePrice": 90,
      "propertiesByRarity": {
        "commun": ["Dissimulé", "Silencieux"],
        "incommun": ["Dégâts +1", "Précis"],
        "rare": ["Tranchant", "Perforant"],
        "tresRare": ["Poison", "Corrosif"],
        "legendaire": ["Explosif +1", "Portée +50"]
      }
    },
    "Tomahawk": {
      "basePrice": 110,
      "propertiesByRarity": {
        "commun": ["Tranchant"],
        "incommun": ["Dégâts +1", "Impact"],
        "rare": ["Précis"],
        "tresRare": ["Vorpal", "Poison"],
        "legendaire": []
      }
    },
    "Tonfa": {
      "basePrice": 80,
      "propertiesByRarity": {
        "commun": ["Vigueur +1", "Dissimulé", "Impact"],
        "incommun": ["Dégâts +1", "Rapide"],
        "rare": ["Chasse +1", "Silencieux", "Vigueur +1"],
        "tresRare": [],
        "legendaire": []
      }
    },
    "Urumi": {
      "basePrice": 230,
      "propertiesByRarity": {
        "commun": ["Entravant", "Allonge", "Tranchant"],
        "incommun": ["Dégâts +1"],
        "rare": ["Ignore la parade", "Chasse +1", "Tranchant"],
        "tresRare": ["Encombrant", "Brise-garde", "Brutal", "Ignore la parade", "Vorpal"],
        "legendaire": ["Vorpal", "Poison"]
      }
    },
    "Wahaika": {
      "basePrice": 80,
      "propertiesByRarity": {
        "commun": ["Impact"],
        "incommun": ["Brutal", "Dégâts +1"],
        "rare": ["Chasse +1"],
        "tresRare": [],
        "legendaire": []
      }
        },
            // IL FAUDRA AJOUTER UN OBJET SIMILAIRE POUR CHAQUE TYPE D'ARME
            // Par défaut, si une arme n'est pas listée ici, elle utilisera toutes les propriétés.
        },
            nameFragments: {
    "q0": [
      "rouillée",
      "usée",
      "de paysan",
      "mal équilibrée",
      "rudimentaire",
      "d'apprenti artisan",
      "porte-misère"
    ],
    "q1": [
      "de soldat",
      "fiable",
      "bien entretenue",
      "d'artisan",
      "standard",
      "améliorée",
      "de bonne facture",
      "efficace",
      "de mercenaire",
      "solide"
    ],
    "q2": [ 
      "élégante",
      "raffinée",
      "soignée",
      "ornementée",
      "supérieure",
      "de maître",
      "magnifique",
      "de prestige",
      "noble",
      "d'excellente fabrication",
      "du Moine Errant",
      "du Vent Inlassable",
      "de Duelliste",
        "Gravée",
        "Brise-Écu",
        "de Capitaine",
        "du Murmure d'Acier"
    ],
    "q3": [
      "rare",
      "exceptionnelle",
      "du temps",
      ", Lame de Rune",
      ", Briseur de Serment",
      ", Dent de l'Ombre",
      ", Croc-du-Givre",
      ", Épine Noire",
      "de l'Âme Immortelle",
      "du Dragon Céleste",
      "du Phoenix Rugissant",
      "de la Nuit Ardente",
      "de la Lune de Sang",
      "du Bastion des Tempêtes",
      "du Faucon de Jade",
      "des Mille Tonnerres",
      "du Soleil Couchant",
      "du Ruisseau Silencieux",
      ", Chant-de-Lune",
        "du Cœur du Volcan",
        "du Hurlement du Loup",
        ", Murmure Mortel",
        "Vestige d'Orus",
        "du Dernier Soupir",
        "de la Promesse Brisée",
        ", Chant-de-Givre",
        ", Lueur-d'Âme",
        ", Souffle-d'Orage",
        "Lamentation de l'Hiver",
        "Dernier Sourire",
        "Éclat d'un Soleil Ancien",
        "du Destin",
      "des Rêves",
            ", L'Ébranle-Monde",
      "de l'Âme Immortelle",
      "du Dragon Céleste",
      "de la Rose de Minuit",
      "du Vent Écarlate",
        "Courroux du Titan"
    ],
    "q4": [
      
      "incomparable",
      "épique",
      "parfaite",
      "du temps",
      ", Lame de Rune",
      ", Briseur de Serment",
      ", Dent de l'Ombre",
      ", Croc-du-Givre",
      ", Épine Noire",
      "de l'Âme Immortelle",
      "du Dragon Céleste",
      "du Phoenix Rugissant",
      "de la Nuit Ardente",
      "de la Lune de Sang",
      "du Bastion des Tempêtes",
      "du Faucon de Jade",
      "des Mille Tonnerres",
      "du Soleil Couchant",
      "du Dernier Soupir",
        "de la Promesse Brisée",
        ", Chant-de-Givre",
        ", Lueur-d'Âme",
        ", Souffle-d'Orage",
        "du Destin",
      "des Rêves",
        "Lamentation de l'Hiver",
              ", L'Ébranle-Monde",
      "de l'Âme Immortelle",
      "du Dragon Céleste",
      "de la Rose de Minuit",
      "du Vent Écarlate",
      "du Dernier Souffle"
    ],
    "legendary": [
      "Divine - Kar'Kares",
      "Ultime - Naoleh",
      "Mythique - Aetherium",
      "Unique - Lame d'Inti",
      "Suprême - Astaroth",
      "Inégalée",
      " - Aethelgard, la Lame du Repentir",
      " - Nihil, Écho des Anciens",
      " - Kaelan, Tueuse de Dragons",
      " - Solaria, Fureur Céleste",
      " - Zephyr le Vent Divin",
      " - Atoq Ch’iqun, Crocs du Renard",
      " - Yawar Qori, Or Sanglant",
      " - Puka Wayra, Vent Rouge",
      " - Ch’iri Sonqo, Cœur de Glace",
      "- Puma Chaki, Pattes de Puma",
      " - Nina Taki, Chant de Feu",
      " - Killa Chakana, la Lune sacrée",
      " - Ch’aska Raymi, l’Éclat de l’Aube",
      " - Wira Nina, le Feu Sacré",
      " - Suntur Illapa, le Cercle du Tonnerre",
      " - Amaru Ñawi, l’oeil du Serpent-Dragon",
      ", Brise-Rêve",
      " - Umbra, L'Immortel Errant"

    ]
        },
            pricing: {
                tolerance: 0.15,
                multipliers: { q0: 0.4, q1: 1, q2: 3, q3: 8, q4: 25, legendary: 100 }
            },
            legendaryPropertiesChance: [
                { count: 5, weight: 80 }, { count: 6, weight: 15 }, { count: 7, weight: 4 },
                { count: 8, weight: 0.6 }, { count: 9, weight: 0.3 }, { count: 10, weight: 0.1 }
            ],
            

            properties: { 
                "Aucune": { description: "Pas de propriété spéciale.", cumulable: "non" }, 
                "Adaptable": { description: "L'équipement peut s'adapter aux besoins du porteur, changeant de forme ou de fonction. Effet: Le porteur peut ajuster l'équipement pour l'adapter à différentes situations, comme transformer une arme de mêlée en arme à distance, ou ajuster une armure.", cumulable: "non" },
                "Allonge": { description: "L'arme possède une portée supérieure, permettant de frapper des ennemis à une distance plus éloignée. Effet: Ignore 1 point de défense d’Esquive de la cible.", cumulable: "non" },
                "Ancien": { description: "Cet équipement provient d'une époque révolue, utilisant des technologies presque oubliées, et fonctionne grâce à des principes incompris par les habitants actuels. Effet: Le porteur peut activer des effets spéciaux ou des capacités uniques de l'équipement, mais chaque utilisation comporte un risque de dysfonctionnement de casse ou de surcharge, nécessitant un test de Savoir + Technique ou Maîtrise + Intellect pour contrôler l'activation.", cumulable: "non" },
                "Brise-garde": { description: "Cette arme est conçue pour briser la parade de l’adversaire. Effet: Si une attaque avec cette arme réussit (même si la marge ne dépasse pas la défense de la cible), la cible ne peut utiliser sa défense de Parade jusqu’au début de son prochain tour.", cumulable: "non" },
                "Brutal": { description: "Cette arme est conçue pour infliger des blessures graves ou fatales. Effet: En cas de Prouesse (1 sur 1D10), l'arme inflige le double de dégâts (marge doublée).", cumulable: "non" },
                "Chasse +1": { description: "L'équipement est infusé de Vrill, serti par une ou plusieurs pierres de Vrill, augmentant ses capacités de manière importante. Effet: Le porteur peut ajouter X pierres de Vrill et utiliser une charge pour appliquer l’un des effets de la pierre.", cumulable: "oui" },
                "Corrosif": { description: "L'arme est enduite d'une substance acide ou corrosive qui ronge les protections et la chair. Effet: Si une attaque avec cette arme réussit (même si la marge ne dépasse pas la défense de la cible), le bonus de Constitution d'un équipement adverse diminue définitivement de 1. Certaines protections naturelles (carapace épaisse…) peuvent être affectées par cette Propriété.", cumulable: "non" },
                "Dégâts +1": { description : "Cette arme est plus efficace que la moyenne, faite de meilleurs matériaux ou par un maître forgeron. Effet : Le porteur bénéficie d’un bonus de +X sur son niveau de maîtrise lors d’un test de combat.", cumulable: "oui" },
                "Dissimulé": { description: "L'objet est conçu pour être caché facilement, que ce soit sur le porteur ou dans l'environnement. Effet: Le porteur reçoit un bonus lorsqu'il tente de dissimuler cet objet, le rendant indétectable à moins d'une recherche approfondie.", cumulable: "non" },
                "Impact": { description: "L'arme est lourde et conçue pour briser les os ou déformer les armures métalliques. Effet: Si le porteur inflige des dégâts à un adversaire, celui-ci lance un test de chance. Si 8 ou plus, il est affecté par l’effet étourdi jusqu’au début de son prochain tour (perte d’action et de réaction).", cumulable: "non" },
                "Empathique": { description: "Cet équipement est sensible aux émotions du porteur et peut changer de comportement en fonction de son état d'esprit. Effet: Le porteur gagne un Avantage ou un Désavantage selon son état émotionnel au moment de l'utilisation. Par exemple, la colère améliore le méridien de la Puissance, tandis que la peur diminue le méridien du Mouvement.", cumulable: "non" },
                "Encombrant": { description: "L'équipement est difficile à manier ou à transporter, ralentissant le porteur et rendant certaines actions plus difficiles. Effet: Le porteur subit un Désavantage à ses tests de Mouvement et ne peux pas Esquiver.", cumulable: "non" },
                "Entravant": { description : "L'arme possède des chaînes, des crochets ou une flexibilité qui permettent de gêner les mouvements de l'adversaire. Effet : Si une attaque avec cette arme réussit (même si la marge ne dépasse pas la défense de la cible), la cible ne peut utiliser sa défense d’Esquive jusqu’au début de son prochain tour.", cumulable: "non" },
                "Explosif +1": { description: "L'arme est conçue pour détoner avec force, causant des dégâts de zone. Effet: Lors d'une utilisation, l'arme donne un bonus de +X au test et cible une zone étendue de X mètres autour de l'impact, affectant plusieurs cibles.", cumulable: "oui" },
                "Ignore la Parade": { description : "Grâce à sa flexibilité ou sa conception unique, cette arme peut contourner les défenses directes. Effet: Ignore 1 point de défense de Parade d’une cible (Puissance + Vigueur).", cumulable: "non" },
                "Indestructible": { description: "Cet équipement est exceptionnellement résistant, forgé dans un matériau ou par une technique qui le rend pratiquement impossible à détruire. Effet: L'équipement est immunisé aux effets qui pourraient le détruire ou l'endommager. Il ne subit pas de dégâts matériels normaux.", cumulable: "non" },
                "Perforant": { description: "L'arme est conçue pour percer les armures lourdes ou les carapaces épaisses. Effet: Ignore la défense de la cible s’il Encaisse (Vitalité + Constitution).", cumulable: "non" },
                "Portée +50": { description: "L'arme ou l'équipement est conçu pour être efficace à une distance plus importante. Effet: Permet d’attaquer des cibles à X mètres sans subir de Désavantage Un équipement avec la Portée X améliore uniquement la valeur de portée d’une arme qui possède déjà de cette Propriété.", cumulable: "oui" },
                "Précis": { description: "L'arme est conçue pour des frappes ou des tirs précis, idéals pour viser des points faibles. Effet: Le héros peut cibler son attaque avec une marge de 3 au lieu de 4.", cumulable: "non" },
                "Rapide": { description: "Cette arme ou cet équipement permet des mouvements amples ou un déploiement rapide. Effet: Le porteur peut réagir plus rapidement au cours d'un combat, ce qui lui permet de devancer ses adversaires en termes d'initiative. Donne un Avantage aux tests d’initiative.", cumulable: "non" },
                "Rechargement +1": { description: "L'arme n’est pas optimisée et nécessite un temps de rechargement tous les X tirs ou les X utilisations. Effet: Une fois vide, l'arme ne peut pas être utilisée immédiatement et nécessite une action pour être rechargée.", cumulable: "oui" },
                "Réflexe +1": { description : "L'équipement, généralement un vêtement léger ou ample, est conçu pour offrir une grande liberté de mouvement sans alourdir le porteur. S’il s’agit d’une arme, c’est sa difficulté de maniement qui a obligé son porteur à améliorer ses déplacements en combat. Effet : Le porteur gagne Réflexe +X.", cumulable : "oui" },"Constitution +1": { description: "L'équipement, généralement un vêtement renforcé ou un bouclier, est particulièrement efficace pour atténuer les coups et augmenter la Constitution du porteur. S’il s’agit d’une arme, c’est son poids et sa taille qui ont obligé son porteur à améliorer sa constitution afin de pouvoir la manier. Effet: Ajoute un bonus de Constitution X, augmentant sa capacité à encaisser les dommages. ", cumulable: "oui" },"Sifflant": { description: "Cette arme est conçue pour produire un son distinctif lorsqu'elle fend l'air, perturbant la concentration de l'adversaire. Effet: Lors d'un test de combat réussi, l'adversaire subit un Désavantage à son prochain test de réaction (défense active).", cumulable: "non" },"Silencieux": { description: "L'arme est conçue pour ne pas faire de bruit, idéal pour les missions d'infiltration. Effet: Les attaques effectuées avec cet équipement n'attirent pas l'attention et n'alertent pas les ennemis à proximité.", cumulable: "non" },"Tranchant": { description: "L'arme est extrêmement affûtée, idéale pour découper la chair. Effet: Si le porteur inflige des dégâts à une cible sensible au tranchant, il lui inflige saignement (-2 PVE par tour).", cumulable: "non" },"Poison": { description: "L'arme est enduite de poison qui affecte les personnes sensibles au poison. Effet: Si le porteur inflige des dégâts à une cible sensible au poison, il lui inflige l’effet d’état Poison (-1PVE par tour).", cumulable: "non" },"Vigueur+1": { description: "L'équipement ou l'arme, généralement un vêtement renforcé ou un bouclier, est particulièrement efficace pour atténuer les coups et augmenter la robustesse du porteur. Effet: Ajoute un bonus de Encaisser X aux tests de réaction du porteur, augmentant sa capacité à encaisser les dommages.", cumulable: "oui" },"Vorpal": { description: "Une arme dotée d'une lame ou d'un bord coupant extrêmement affûté, capable de trancher à travers presque tout. Effet: Lors d'une Prouesse, l'arme ignore la défense et peut décapiter ou couper net un membre de l'adversaire, provoquant des dégâts dévastateurs.", cumulable: "non" },
            },

            narrativeIntros: [
                "Le forgeron prend l'arme, ses yeux experts scrutant le métal...",
                "L'artisane essuie ses mains sur son tablier...",
                "En passant l'arme sous la lumière de la forge..."
            ]
        };
    }

    getData() {
        // Trie les types d'armes par ordre alphabétique
        return {
            weaponTypes: Object.keys(this.weaponData.weaponBases).sort()
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Remplissage du Select Type d'Arme
        const select = html.find('#weapon-type');
        Object.keys(this.weaponData.weaponBases).sort().forEach(t => {
            select.append(`<option value="${t}">${t}</option>`);
        });

        // Bouton Générer
        html.find('#generate-btn').click(ev => this._generate(html));

        // Bouton Créer Item
        html.find('#create-item-btn').click(ev => this._createItemInFoundry(html));

        // Modale Manuelle
        html.find('#property-selector-cancel').click(() => html.find('#property-selector-modal').addClass('hidden'));
        html.find('#property-selector-confirm').click(() => this._finalizeMasterForge(html));
        
        // Gestion des compteurs de la modale (+ / -)
        html.on('click', '.btn-plus, .btn-minus', (ev) => {
            const btn = $(ev.currentTarget);
            const isPlus = btn.hasClass('btn-plus');
            const control = btn.parent();
            const scoreEl = control.find('.score');
            let score = parseInt(scoreEl.text());
            
            // On vérifie le max global (simplifié ici, idéalement on track le total)
            score += isPlus ? 1 : -1;
            if (score < 0) score = 0;
            scoreEl.text(score);
            
            this._updateModalTotal(html);
        });
        
        html.on('change', 'input[type="checkbox"]', () => this._updateModalTotal(html));
    }

    // --- LOGIQUE METIER ---

    _generate(html) {
        const isMaster = html.find('#master-forge-toggle').is(':checked');
        if (isMaster) {
            this._openPropertyForgeModal(html);
        } else {
            this._generateRandomWeapon(html);
        }
    }

    _generateRandomWeapon(html) {
        const type = html.find('#weapon-type').val();
        const quality = html.find('#weapon-quality').val();
        const wd = this.weaponData;

        // Nom
        const nameFragment = wd.nameFragments[quality][Math.floor(Math.random() * wd.nameFragments[quality].length)];
        const weaponName = nameFragment.startsWith(',') ? `${type}${nameFragment}` : `${type} ${nameFragment}`;

        // Prix
        const basePrice = wd.weaponBases[type]?.basePrice || 300;
        const multiplier = wd.pricing.multipliers[quality];
        const finalPrice = Math.ceil(basePrice * multiplier);

        // Propriétés
        let numProperties = (quality === 'legendary') ? 5 : parseInt(quality.replace('q', ''), 10);
        const weaponProfile = wd.weaponBases[type];
        
        // Récupération de toutes les props possibles pour cette arme
        let availableProperties = [].concat(...Object.values(weaponProfile.propertiesByRarity)).filter(Boolean);
        const chosenProperties = [];

        // Tirage au sort simple (simplifié par rapport à ton code complexe pour aller droit au but)
        for (let i = 0; i < numProperties; i++) {
            if (availableProperties.length === 0) break;
            const randomProp = availableProperties[Math.floor(Math.random() * availableProperties.length)];
            chosenProperties.push(randomProp);
            
            // Si non cumulable, on retire
            if (wd.properties[randomProp]?.cumulable === 'non') {
                availableProperties = availableProperties.filter(p => p !== randomProp);
            }
        }

        // Consolidation
        const finalProperties = this._consolidateProperties(chosenProperties);

        this._updateSheet(html, { weaponName, type, quality, finalPrice, finalProperties });
    }

    _consolidateProperties(rawList) {
        const consolid = {};
        const wd = this.weaponData;

        rawList.forEach(propName => {
            // Nettoyage du nom (ex: "Dégâts +1" -> "Dégâts")
            const match = propName.match(/^(.*?)(\s\+\d+)?$/);
            const baseName = match[1];
            const value = match[2] ? parseInt(match[2].replace(' +', ''), 10) : 1;
            const details = wd.properties[propName] || { description: "..." };

            if (details.cumulable === 'oui') {
                if (!consolid[baseName]) consolid[baseName] = { total: 0, desc: details.description };
                consolid[baseName].total += value;
            } else {
                consolid[propName] = { total: 0, desc: details.description };
            }
        });

        return Object.entries(consolid).map(([name, data]) => {
            let finalName = name;
            if (data.total > 0) finalName = `${name} +${data.total}`;
            return { name: finalName, description: data.desc };
        });
    }

    _openPropertyForgeModal(html) {
        const type = html.find('#weapon-type').val();
        const quality = html.find('#weapon-quality').val();
        const weaponProfile = this.weaponData.weaponBases[type];
        
        // Calcul max points
        this.maxPoints = (quality === 'legendary') ? 10 : parseInt(quality.replace('q', ''), 10);
        
        const list = html.find('#property-selector-list');
        list.empty();
        html.find('#property-selector-info').text(`Points : ${this.maxPoints}`);

        const allProps = [...new Set([].concat(...Object.values(weaponProfile.propertiesByRarity)))];

        allProps.forEach(p => {
            const details = this.weaponData.properties[p];
            let item = `<div class="property-choice">`;
            
            if (details && details.cumulable === 'oui') {
                const match = p.match(/^(.*?)(\s\+(\d+))?$/);
                const baseName = match[1];
                item += `<label>${baseName}</label>
                         <div class="points-control" data-prop="${p}" data-base-name="${baseName}">
                            <button class="btn-minus">-</button><span class="score">0</span><button class="btn-plus">+</button>
                         </div>`;
            } else {
                item += `<label>${p}</label><input type="checkbox" data-prop="${p}">`;
            }
            item += `</div>`;
            list.append(item);
        });

        html.find('#property-selector-modal').removeClass('hidden');
    }

    _updateModalTotal(html) {
        let total = 0;
        html.find('#property-selector-list input:checked').each(() => total++);
        html.find('.points-control .score').each((i, el) => total += parseInt($(el).text()));
        html.find('#property-selector-info').text(`Points assignés : ${total} / ${this.maxPoints}`);
    }

    _finalizeMasterForge(html) {
        const list = html.find('#property-selector-list');
        const rawList = [];

        list.find('input:checked').each((i, el) => rawList.push($(el).data('prop')));
        
        list.find('.points-control').each((i, el) => {
            const score = parseInt($(el).find('.score').text());
            if (score > 0) {
                // On ajoute X fois la propriété à la liste brute pour que la consolidation marche
                const propName = $(el).data('prop');
                for(let k=0; k<score; k++) rawList.push(propName);
            }
        });

        const finalProperties = this._consolidateProperties(rawList);
        
        // Recalcul du prix approximatif
        const type = html.find('#weapon-type').val();
        const quality = html.find('#weapon-quality').val();
        const basePrice = this.weaponData.weaponBases[type]?.basePrice || 300;
        const finalPrice = Math.ceil(basePrice * this.weaponData.pricing.multipliers[quality]);

        this._updateSheet(html, {
            weaponName: `Chef-d'œuvre de ${type}`,
            type, quality, finalPrice, finalProperties
        });
        
        html.find('#property-selector-modal').addClass('hidden');
    }

    _updateSheet(html, data) {
        this.currentWeaponData = data;
        
        html.find('#narrator-text').text(this.weaponData.narrativeIntros[0]); // Randomize si tu veux
        html.find('#weapon-name').val(data.weaponName);
        html.find('#weapon-type-display').text(data.type);
        html.find('#weapon-quality-display').text(`Qualité ${data.quality.replace('q', '')}`);
        html.find('#weapon-price').text(data.finalPrice);

        const list = html.find('#properties-list');
        list.empty();

        if (data.finalProperties.length > 0) {
            data.finalProperties.forEach(p => {
                // Remplacement du X dans la description par la valeur réelle
                const valMatch = p.name.match(/\+(\d+)/);
                const val = valMatch ? valMatch[1] : "";
                const desc = p.description.replace(/X/g, val);
                
                list.append(`<div class="property-item"><h4>${p.name}</h4><p>${desc}</p></div>`);
            });
        } else {
            list.append(`<p>Aucune propriété spéciale.</p>`);
        }

        html.find('#sheet-section').removeClass('hidden');
    }

    // --- CRÉATION DE L'OBJET DANS FOUNDRY ---
    async _createItemInFoundry(html) {
        const data = this.currentWeaponData;
        if (!data.weaponName) return;

        // 1. Détection automatique de l'icône
        let img = "icons/weapons/swords/sword-steel.webp";
        const lowerType = data.type.toLowerCase();
        if (lowerType.includes("arc")) img = "icons/weapons/bows/shortbow-leather.webp";
        else if (lowerType.includes("atlatl")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("bardiche")) img = "icons/weapons/polearms/spear-simple-hooked.webp";
        else if (lowerType.includes("arbal")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("bolas")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("boomeran")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("bouclier")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("bâton")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("cloutée")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("cimeterre")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("couteau")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("couteau de lancer")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("anciens")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("double-lame")) img = "icons/weapons/crossbows/handcrossbow-black.webp";
        else if (lowerType.includes("faux")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("fléau")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("fouet")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("fronde")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("gourdin")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("grand cracheur")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("grappin")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("hallebarde")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("javeline")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("jitte")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("épée")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("wahaika")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("urumi")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("tonfa")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("tomahawk")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("shuriken")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("sarbacane")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("sansetsukon")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("sabre")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("rapiere")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("nunchaku")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("morgenstern")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("masse")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("khopesh")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("kama")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("hache")) img = "icons/weapons/axes/axe-battle.webp";
        else if (lowerType.includes("lance")) img = "icons/weapons/polearms/spear-simple-hooked.webp";
        else if (lowerType.includes("marteau")) img = "icons/weapons/hammers/hammer-simple-iron.webp";
        else if (lowerType.includes("dague")) img = "icons/weapons/daggers/dagger-curved-black.webp";

        // 2. Détection du bonus de dégâts
        let bonusDegats = 0;
        data.finalProperties.forEach(p => {
            if (p.name.includes("Dégâts")) {
                const match = p.name.match(/\+(\d+)/);
                if (match) bonusDegats = parseInt(match[1]);
            }
        });

        // 3. Construction Description & Propriétés (String)
        const propsString = data.finalProperties.map(p => p.name).join(", ");
        let descHTML = `<p><strong>Type :</strong> ${data.type} | <strong>Qualité :</strong> ${data.quality}</p>`;
        descHTML += `<ul>`;
        data.finalProperties.forEach(p => {
            const valMatch = p.name.match(/\+(\d+)/);
            const val = valMatch ? valMatch[1] : "";
            const desc = p.description.replace(/X/g, val);
            descHTML += `<li><strong>${p.name} :</strong> ${desc}</li>`;
        });
        descHTML += `</ul>`;

        // 4. Création
        await Item.create({
            name: html.find('#weapon-name').val(), // Nom éditable
            type: "arme",
            img: img,
            system: {
                description: descHTML,
                proprietes: propsString, // "Tranchant, Dégâts +1"
                bonusDegats: bonusDegats, // +1
                prix: data.finalPrice,
                qualite: (data.quality === 'legendary') ? 5 : parseInt(data.quality.replace('q','')),
                equipe: false
            }
        }, {renderSheet: true});

        ui.notifications.info(`L'arme "${data.weaponName}" a été forgée !`);
    }
}