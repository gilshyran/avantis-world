export class AvantisHeroCreator extends Application {

    constructor(options) {
        super(options);
        
        // --- ÉTAT INITIAL ---
        this.heroData = {
            nom: "", age: 0, regionOrigine: "", apparence: "", morphologie: "", descriptionPhysique: "",
            traitsPositifs: [], traitsNegatifs: [],
            objectifs: { moyenTerme: "", longTerme: "" },
            atouts: [], careers: {}, parcoursDeVie: "",
            pvi_max: 0, pve_max: 0, points_maitrise: 2,
            meridiens: { domination: 1, savoir: 1, expression: 1, puissance: 1, mouvement: 1, vitalite: 1 },
            aptitudes: {},
            defenses: { esquive: 0, encaisse: 0, parade: 0, volonte: 0, sagesse: 0, intuition: 0 },
            armes: [{ nom: "", proprietes: "" }],
            inventaire: [], // Liste des objets finaux (Strings ou Objets)
            budgetFinal: 400, // Budget de départ (400 Sols)
            artsDuVrill: []
        };

        this.pointsLibres = 0;
        this.aptitudePointsLibres = 2; // On donne 2 points d'aptitude de base
        this.currentPeriodIndex = 0;
        this.availableCareerPeriods = [];

        this.shopCart = [];
        this.currentBudget = 400;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "avantis-hero-creator",
            title: "Création de Héros - Avantis",
            template: "systems/avantis/templates/apps/hero-creator.html",
            width: 1250,
            height: 950,
            resizable: true,
            classes: ["avantis-hero-creator"]
        });
    }

    // =========================================================================
    // 1. LES DONNÉES (DATA) - TOUT EST LÀ MAINTENANT
    // =========================================================================
    
    get regionsData() {
        return {
            main: [
            { id: "aletria", nom: "Le royaume d’Aletria", img: "https://avantis.world/wp-content/uploads/2023/12/WEB_royaume_aletria.jpg", desc: "Le royaume d’Aletria, au centre des terres de Khora, s’étend au cœur d’une chaîne montagneuse escarpée, entre vallées luxuriantes, cascades et forêts denses. Ses terrasses en gradins abritent jardins suspendus, ponts et sentiers reliant les hauteurs aux vallées. Dominant la région, la cité d’Orus, perchée au sommet des montagnes et visible à des kilomètres, incarne le joyau architectural et spirituel de ce territoire." },
            { id: "altiplano", nom: "L’altiplano", img: "https://avantis.world/wp-content/uploads/2023/12/WEB_Altiplano.jpg", desc: "La région de Byblos s’étend de l’Altiplano jusqu’au Grand Lac, délimitée par deux grands fleuves et traversée par la rivière Othain, qui coupe en deux les hauts plateaux. Ces vastes étendues mêlent montagnes, vallées profondes, lacs et prairies, où cohabitent vigognes, lamas et alpagas. Au nord, la cité de Byblos, bâtie sur une presqu’île du fleuve Solara, domine la région comme centre spirituel, commercial et intellectuel majeur de Khora." },
            { id: "astoria", nom: "Le domaine d’Astoria", img: "https://avantis.world/wp-content/uploads/2023/12/WEB_knossos01.jpg", desc: "Le domaine d’Astoria occupe l’ouest de Khora, entre routes vers Sombreterre et Marveltra, profitant d’un climat tropical doux et de pluies abondantes qui façonnent cascades et vallées luxuriantes. La région, riche en carrières de pierre blanche, affiche une architecture monumentale et imposante. Son cœur est la cité maritime de Knossos, entourée d’une puissante muraille et traversée de canaux et jardins somptueux, joyau commercial et stratégique de la région." },
            { id: "rougerive", nom: "La province de Rougerive", img: "https://avantis.world/wp-content/uploads/2023/12/WEB_provinces_rougerive.jpg", desc: "La Province de Rougerive s’étend au centre de Khora, entre forêts luxuriantes, plaines traversées de fleuves navigables et ciels embrasés par des couchers de soleil rougeâtres. Son économie repose sur l’exploitation du bois, transporté par voie fluviale jusqu’aux villages riverains et vers le sud tropical bordé par le Fleuve Sacré. Dominant la région, la cité d’Estandre incarne une métropole industrielle bouillonnante, marquée par ses machines, ses cheminées et son essor technologique." },
            { id: "solearune", nom: "La région de Solearune", img: "https://avantis.world/wp-content/uploads/2023/12/WEB_solearune.jpg", desc: "La région de Solearune s’étend du sud des déserts et d’Aama jusqu’à Marveltra, et se divise en quatre zones : Edora, cœur peuplé où s’élève la cité d’Avantis ; Jaera, riche en vestiges anciens ; Yana, célèbre pour ses grands primates ; et Rekuta, vaste et peu habitée. Avantis, fondée par le roi Rydan-Han et marquée par sa mort mystérieuse, demeure l’une des cités les plus influentes et puissantes de Khora. Bénéficiant d’un climat agricole idéal, la région alterne nuits douces, journées chaudes et pluies modérées, propices à une prospérité continue." },
            { id: "jamek", nom: "L’arche de cendre", img: "https://avantis.world/wp-content/uploads/2023/12/WEB_region_de_jamek.jpg", desc: "À l’extrême Est de Khora, l’Arche de Cendre s’étend entre le Fleuve Horizon et la cordillère ciselée, un territoire austère marqué par ses sols cendreux et ses vents brûlants. Les contrastes y sont extrêmes : forêts et cultures modestes au sud, altitudes arides et températures allant de 40 °C le jour à 0 °C la nuit au nord. Au centre, la cité de Jamek agit comme un pôle vital, rassemblant clans et nomades dans une terre rude mais vibrante de traditions, de fêtes et d’échanges." }
        ],
        other: [
            { id: "deserts", nom: "Les déserts du Nord", img: "https://avantis.world/wp-content/uploads/2023/12/WEB_grands_deserts01.jpg", desc: "À l’extrême nord de Solearune, les Grands Déserts du Nord s’étendent sur les vestiges d’une ancienne jungle équatoriale, aujourd’hui transformée en terres arides aux teintes rouges, orangées et jaunes. Depuis les plaines ensoleillées de Solis jusqu’aux canyons ocre du désert de Marek, le paysage devient progressivement plus inhospitalier. À son apogée, le désert de Khmun déploie ses dunes infinies et ses tempêtes de sable, incarnant la rudesse extrême de cette région post-cataclysmique." },
            { id: "grand_lac", nom: "La région du Grand lac", img: "https://avantis.world/wp-content/uploads/2023/12/WEB_grand_lac.jpg", desc: "Au sud de Khora, la région du Grand Lac forme une frontière naturelle entre les terres keldars et celles du peuple de Timna. Peu habitée, elle abrite un village flottant unique posé sur ses eaux calmes. Son climat océanique chaud, marqué par des hivers secs et des étés pluvieux, maintient des températures régulières entre 8 et 15 °C toute l’année." },
            { id: "keldar", nom: "Les steppes Keldar", img: "https://avantis.world/wp-content/uploads/2023/12/SITE_Territoire-Keldar.jpg", desc: "Au sud de la Forêt des Murmures jusqu’aux confins du Grand Lac, les territoires Keldar s’étendent en vastes plaines ocre peu arrosées, où paissent d’innombrables chevaux. Le climat y est stable, entre 15 et 25 °C, accentuant l’aridité du paysage. Habitées par des tribus nomades et fières, ces terres forgent un peuple agricole et guerrier profondément attaché à son territoire." },
            { id: "marveltra", nom: "La forêt mystique de Marveltra", img: "http://avantis.world/wp-content/uploads/2023/12/WEB_marveltra01.jpg", desc: "La région de Marveltra, en amont du fleuve du Grand Serpent, est un territoire sauvage et haut en couleur, dominé par une forêt dense abritant une faune et une flore extrêmement toxiques. Seule la plaine du sud, occupée par les tribus Asheninka, reste exempte de cette végétation dangereuse. Isolés mais en harmonie avec la nature, les Asheninka vivent à une journée de marche des habitants du domaine d’Astoria." },
            { id: "palmir", nom: "Le plateau de Palmir", img: "https://avantis.world/wp-content/uploads/2023/12/WEB_plateau_palmir.jpg", desc: "Le Plateau de Palmir, situé entre Aletria et Jamek, s’étend en un territoire sauvage de formations rocheuses imposantes et de biodiversité remarquable. Habité par des communautés nomades et quelques ermitages, il reste essentiellement intact, offrant des paysages spectaculaires et des lieux mystérieux. Ses conditions climatiques changeantes et ses tempêtes imprévisibles renforcent le caractère difficile et mystique de cette région." },
            { id: "timna", nom: "Les canyons de Timna", img: "http://avantis.world/wp-content/uploads/2023/12/WEB_timna01.jpg", desc: "Les terres de Timna s’étendent au sud des régions connues de Khora, au cœur de vastes canyons et ravins aux parois abruptes. Ce territoire sauvage combine plateaux enneigés, étés ensoleillés et conditions climatiques rigoureuses. Les villages s’accrochent aux falaises et s’intègrent à ce paysage escarpé, reflétant une harmonie entre l’habitat humain et la géographie accidentée." },
            { id: "yavikaya", nom: "La forêt sauvage de la Yavikaya", img: "https://avantis.world/wp-content/uploads/2023/12/WEB_contree_yavikaya.jpg", desc: "La cité de Yavikaya, située au creux d’un vaste cratère, est entourée d’une région sauvage et luxuriante, riche en cascades et en flore exquise. Cette zone, proche d’Orus et d’Estandre mais difficile d’accès, abrite une faune hostile et unique, issue de mutations post-cataclysmiques. Aujourd’hui, Yavikaya sert de refuge aux Aïh-nim, un peuple pacifiste avec sa propre culture et religion." }
        ]
        };
    }

    get weaponPropertiesData() {
    return {
        "Adaptable": "L'équipement peut s'adapter aux besoins du porteur, changeant de forme ou de fonction. Effet: Le porteur peut ajuster l'équipement pour l'adapter à différentes situations, comme transformer une arme de mêlée en arme à distance, ou ajuster une armure." ,
        "Allonge": "L'arme possède une portée supérieure, permettant de frapper des ennemis à une distance plus éloignée. Effet: Ignore 1 point de défense d’Esquive de la cible." ,
        "Ancien": "Cet équipement provient d'une époque révolue, utilisant des technologies presque oubliées, et fonctionne grâce à des principes incompris par les habitants actuels. Effet: Le porteur peut activer des effets spéciaux ou des capacités uniques de l'équipement, mais chaque utilisation comporte un risque de dysfonctionnement de casse ou de surcharge, nécessitant un test de Savoir + Technique ou Maîtrise + Intellect pour contrôler l'activation." ,
        "Brise-garde": "Cette arme est conçue pour briser la parade de l’adversaire. Effet: Si une attaque avec cette arme réussit (même si la marge ne dépasse pas la défense de la cible), la cible ne peut utiliser sa défense de Parade jusqu’au début de son prochain tour." ,
    "Brutal": "Cette arme est conçue pour infliger des blessures graves ou fatales. Effet: En cas de Prouesse (1 sur 1D10), l'arme inflige le double de dégâts (marge doublée)." ,
    "Chasse +1": "L'équipement est infusé de Vrill, serti par une ou plusieurs pierres de Vrill, augmentant ses capacités de manière importante. Effet: Le porteur peut ajouter X pierres de Vrill et utiliser une charge pour appliquer l’un des effets de la pierre." ,
    "Corrosif": "L'arme est enduite d'une substance acide ou corrosive qui ronge les protections et la chair. Effet: Si une attaque avec cette arme réussit (même si la marge ne dépasse pas la défense de la cible), le bonus de Constitution d'un équipement adverse diminue définitivement de 1. Certaines protections naturelles (carapace épaisse…) peuvent être affectées par cette Propriété." ,
    "Dégâts +1": "Cette arme est plus efficace que la moyenne, faite de meilleurs matériaux ou par un maître forgeron. Effet : Le porteur bénéficie d’un bonus de +X sur son niveau de maîtrise lors d’un test de combat." ,
    "Dissimulé": "L'objet est conçu pour être caché facilement, que ce soit sur le porteur ou dans l'environnement. Effet: Le porteur reçoit un bonus lorsqu'il tente de dissimuler cet objet, le rendant indétectable à moins d'une recherche approfondie." ,
    "Impact": "L'arme est lourde et conçue pour briser les os ou déformer les armures métalliques. Effet: Si le porteur inflige des dégâts à un adversaire, celui-ci lance un test de chance. Si 8 ou plus, il est affecté par l’effet étourdi jusqu’au début de son prochain tour (perte d’action et de réaction)." ,
    "Empathique": "Cet équipement est sensible aux émotions du porteur et peut changer de comportement en fonction de son état d'esprit. Effet: Le porteur gagne un Avantage ou un Désavantage selon son état émotionnel au moment de l'utilisation. Par exemple, la colère améliore le méridien de la Puissance, tandis que la peur diminue le méridien du Mouvement." ,
    "Encombrant": "L'équipement est difficile à manier ou à transporter, ralentissant le porteur et rendant certaines actions plus difficiles. Effet: Le porteur subit un Désavantage à ses tests de Mouvement et ne peux pas Esquiver." ,
    "Entravant": "L'arme possède des chaînes, des crochets ou une flexibilité qui permettent de gêner les mouvements de l'adversaire. Effet : Si une attaque avec cette arme réussit (même si la marge ne dépasse pas la défense de la cible), la cible ne peut utiliser sa défense d’Esquive jusqu’au début de son prochain tour." ,
    "Explosif +1": "L'arme est conçue pour détoner avec force, causant des dégâts de zone. Effet: Lors d'une utilisation, l'arme donne un bonus de +X au test et cible une zone étendue de X mètres autour de l'impact, affectant plusieurs cibles." ,
    "Ignore la Parade": "Grâce à sa flexibilité ou sa conception unique, cette arme peut contourner les défenses directes. Effet: Ignore 1 point de défense de Parade d’une cible (Puissance + Vigueur)." ,
    "Indestructible": "Cet équipement est exceptionnellement résistant, forgé dans un matériau ou par une technique qui le rend pratiquement impossible à détruire. Effet: L'équipement est immunisé aux effets qui pourraient le détruire ou l'endommager. Il ne subit pas de dégâts matériels normaux." ,
    "Perforant": "L'arme est conçue pour percer les armures lourdes ou les carapaces épaisses. Effet: Ignore la défense de la cible s’il Encaisse (Vitalité + Constitution)." ,
    "Portée +50": "L'arme ou l'équipement est conçu pour être efficace à une distance plus importante. Effet: Permet d’attaquer des cibles à X mètres sans subir de Désavantage Un équipement avec la Portée X améliore uniquement la valeur de portée d’une arme qui possède déjà de cette Propriété." ,     
    "Précis": "L'arme est conçue pour des frappes ou des tirs précis, idéals pour viser des points faibles. Effet: Le héros peut cibler son attaque avec une marge de 3 au lieu de 4." ,
    "Rapide": "Cette arme ou cet équipement permet des mouvements amples ou un déploiement rapide. Effet: Le porteur peut réagir plus rapidement au cours d'un combat, ce qui lui permet de devancer ses adversaires en termes d'initiative. Donne un Avantage aux tests d’initiative." ,
    "Rechargement +1": "L'arme n’est pas optimisée et nécessite un temps de rechargement tous les X tirs ou les X utilisations. Effet: Une fois vide, l'arme ne peut pas être utilisée immédiatement et nécessite une action pour être rechargée." ,
    "Réflexe +1": "L'équipement, généralement un vêtement léger ou ample, est conçu pour offrir une grande liberté de mouvement sans alourdir le porteur. S’il s’agit d’une arme, c’est sa difficulté de maniement qui a obligé son porteur à améliorer ses déplacements en combat. Effet : Le porteur gagne Réflexe +X.","Constitution +1": "L'équipement, généralement un vêtement renforcé ou un bouclier, est particulièrement efficace pour atténuer les coups et augmenter la Constitution du porteur. S’il s’agit d’une arme, c’est son poids et sa taille qui ont obligé son porteur à améliorer sa constitution afin de pouvoir la manier. Effet: Ajoute un bonus de Constitution X, augmentant sa capacité à encaisser les dommages. " ,"Sifflant": "Cette arme est conçue pour produire un son distinctif lorsqu'elle fend l'air, perturbant la concentration de l'adversaire. Effet: Lors d'un test de combat réussi, l'adversaire subit un Désavantage à son prochain test de réaction (défense active)." ,"Silencieux": "L'arme est conçue pour ne pas faire de bruit, idéal pour les missions d'infiltration. Effet: Les attaques effectuées avec cet équipement n'attirent pas l'attention et n'alertent pas les ennemis à proximité." ,"Tranchant": "L'arme est extrêmement affûtée, idéale pour découper la chair. Effet: Si le porteur inflige des dégâts à une cible sensible au tranchant, il lui inflige saignement (-2 PVE par tour)." ,"Poison": "L'arme est enduite de poison qui affecte les personnes sensibles au poison. Effet: Si le porteur inflige des dégâts à une cible sensible au poison, il lui inflige l’effet d’état Poison (-1PVE par tour)." ,"Vigueur+1": "L'équipement ou l'arme, généralement un vêtement renforcé ou un bouclier, est particulièrement efficace pour atténuer les coups et augmenter la robustesse du porteur. Effet: Ajoute un bonus de Encaisser X aux tests de réaction du porteur, augmentant sa capacité à encaisser les dommages." ,"Vorpal": "Une arme dotée d'une lame ou d'un bord coupant extrêmement affûté, capable de trancher à travers presque tout. Effet: Lors d'une Prouesse, l'arme ignore la défense et peut décapiter ou couper net un membre de l'adversaire, provoquant des dégâts dévastateurs."
           
    };
}

    // --- CARRIÈRES (DONNÉES COMPLÈTES) ---
    get careerDescriptions() { // ENFANCE
        return {
            "Arpenteur / Cartographe": "Curieux du monde dès l’enfance, [Nom du Héros] explore les environs, dessine des cartes et rêve d’aventure. Les récits familiaux nourrissent cette passion précoce pour la géographie et la découverte.",
            "Artificier / Pyrotechnicien": "Fasciné par le feu et les détonations, [Nom du Héros] expérimente très tôt la poudre noire. La curiosité et l’audace révèlent un talent naturel pour les explosifs.",
            "Artiste / Saltimbanque": "Doté d’un talent inné, [Nom du Héros] s’exprime par la danse, le chant ou la musique. Les performances enfantines captivent déjà l’entourage.",
            "Asheninka / Peuple des rivières": "Élevé en harmonie avec la nature, [Nom du Héros] apprend les thérapies traditionnelles et développe une forte résistance. Les anciens transmettent savoir et sagesses anciennes.",
            "Assassin / Espion": "Attiré par les ombres, [Nom du Héros] s’intéresse dès l’enfance à la dissimulation et aux secrets. La vie citadine attise ce penchant pour l’occulte.",
            "Barbare / Tribu isolée": "Dans un environnement rude, [Nom du Héros] apprend chasse, survie et agriculture. Conflits et épreuves forgent endurance et résilience.",
            "Bâtisseur / Artisan": "Passionné par les travaux manuels, [Nom du Héros] construit maquettes et objets simples. La polyvalence touche poterie, couture et la joaillerie.",
            "Chaman / Arcaniste": "Plongé dans traditions et les rituels, [Nom du Héros] découvre tôt les Arcanes Sindrill ou le Moku. L’amour des plantes et du Vrill s’enracine profondément.",
            "Chasseur / Pisteur": "En compagnie de son père ou d'un chasseur le prenant sous son aile, [Nom du Héros] découvre pistage, collets et survie en forêt, forgeant un lien intime avec la nature.",
            "Chasseur de primes / Spectre": "Doté d’un sens aigu de l’observation, [Nom du Héros] s’intéresse à la traque dès l’enfance. Cette curiosité préfigure un futur de pisteur chevronné.",
            "Chercheur de trésors / Aventurier": "Éveillé par récits et légendes, [Nom du Héros] nourrit un goût précoce pour l’aventure. Les petites explorations d’enfance attisent un désir insatiable de découvertes.",
            "Cultiste / Disciple de l’obscur": "Observateur du pouvoir et de l’influence, [Nom du Héros] révèle tôt une aptitude à manipuler et semer le doute. L’intelligence alimente un penchant pour l’obscur.",
            "Diseuse de bonne aventure / Comédien": "Créatif et joueur, [Nom du Héros] charme son entourage par de petites illusions. Les représentations spontanées annoncent un futur maître des perceptions.",
            "Dresseur / Palefrenier": "Lié aux animaux dès l’enfance, [Nom du Héros] apprend à les comprendre et les apprivoiser. La patience et la passion ouvrent la voie du dressage.",
            "Élémentaliste / Arcaniste": "Connecté au Vrill interne, [Nom du Héros] manifeste tôt une affinité avec les forces élémentaires. L’éveil au sixième et septième sens marque une vocation mystique.",
            "Enseignant / Mentor": "Avide de savoir, [Nom du Héros] passe ses journées plongé dans livres et récits. L’encouragement des aînés nourrit une soif d’apprendre inépuisable.",
            "Esclavagiste / Marchand d’âmes": "Endoctriné très jeune, [Nom du Héros] découvre la cruauté du commerce humain. L’observation et la manipulation deviennent outils de survie.",
            "Fouineur / Contrebandier": "Grandissant dans les quartiers pauvres, [Nom du Héros] apprend débrouillardise et petits larcins. La vigilance et l’ingéniosité forgent un esprit rusé.",
            "Gardien de la lumière / Arcaniste": "Dès l’enfance, [Nom du Héros] manifeste une forte connexion au Vrill. Formé aux arts Sindrill et Rydan, le destin de protecteur se dessine déjà.",
            "Héraut / Diplomate": "Séduit par la parole et les récits, [Nom du Héros] écrit, débat et captive son entourage. L’aisance naturelle annonce un talent d’orateur et de médiateur.",
            "Herboriste / Apothicaire": "Guidé par famille ou mentors, [Nom du Héros] découvre plantes médicinales et remèdes. L’amour des herbes forge une vocation précoce de guérisseur.",
            "Ingénieur / Méchaniste": "Fasciné par mécanismes et engrenages, [Nom du Héros] démonte et expérimente dès l’enfance. L’inventivité précoce annonce un avenir de méchaniste.",
            "Inquisiteur Präst / Arcaniste": "Imprégné de foi et formé au respect strict de la loi, [Nom du Héros] suit une éducation stricte. Dévouement et rigueur préparent la voie de l’inquisition.",
            "Kankale / Brigand": "Dans un milieu brutal, [Nom du Héros] apprend à s’imposer par la force. Menaces et combats forgent un tempérament de futur guerrier.",
            "Marchand / Négociant": "Curieux des échanges, [Nom du Héros] observe valeurs et marchandises. La jeunesse est marquée par une compréhension intuitive du commerce.",
            "Marchand Sharuhen / Caravanier": "Très tôt plongé dans les routes commerciales, [Nom du Héros] apprend transport et troc. Son sens du commerce se dessine rapidement.",
            "Marin / Pirate": "Émerveillé par la mer, ou enfant de marin, [Nom du Héros] explore rivages et écoute récits marins. La passion des océans guide une destinée de navigateur.",
            "Noble / Bourgeois": "Issu d’un milieu privilégié, [Nom du Héros] reçoit une éducation raffinée. Les études et l’aura naturelle attirent respect et reconnaissance.",
            "Ouvrier / Tavernier": "Plongé tôt dans les travaux physiques pour soutenir sa famille ou simplement survivre, [Nom du Héros] développe force et endurance. La résilience devient sa plus grande qualité.",
            "Paysan / Nourrisseurs": "Élevé dans les champs, [Nom du Héros] découvre cycles agricoles et élevage. Les tâches quotidiennes forgent un savoir vital.",
            "Pilote d’aéronef": "Rêvant des cieux, [Nom du Héros] contemple les aéronefs et rêve d’étoiles. Cette fascination précoce trace la voie de pilote d'aéronefs",
            "Präst / Érudit": "Formé ou recueilli par les Präst, [Nom du Héros] s’initie tôt à la langue sacrée et aux écrits religieux. L’amour du savoir annonce une carrière savante.",
            "Rôdeur / Éclaireur": "Explorant forêts et prairies, [Nom du Héros] nourrit très tôt une passion pour la nature. Les terres sauvages deviennent terrain d’apprentissage.",
            "Séducteur / Courtisan": "Charismatique dès l’enfance, [Nom du Héros] attire l’attention. La curiosité nourrit un talent de persuasion.",
            "Soldat / Milice": "Discipliné et robuste, [Nom du Héros] s’intéresse tôt à l’autorité et à l’ordre. La vocation militaire s’impose comme évidence.",
            "Sorcier / Arcaniste": "Sensible au Vrill, [Nom du Héros] expérimente des manipulations involontaires lui procurant une intense sensation de pouvoir et de domination. Tout semble possible.",
            "Survivaliste": "Plongé dans la vie sauvage, [Nom du Héros] apprend pêche, cueillette et abris. L’autonomie devient un savoir vital dès l’enfance.",
            "Voleurs / Voyou": "Grandissant dans les ruelles sombres, [Nom du Héros] développe furtivité et ruse. La survie forge une expertise précoce en discrétion et pousse à faire des choses pas toujours très honnête."
        };
    }

    get careerDescriptionsAdo() { // ADOLESCENCE
        return {
            "Arpenteur / Cartographe": "À l’adolescence, [Nom du Héros] accompagne voyageurs et marchands, apprenant la cartographie et le relevé topographique. Les expéditions forgent endurance et ingéniosité, tout en révélant un talent prometteur pour tracer des cartes précises.",
            "Artificier / Pyrotechnicien": "Jeune, [Nom du Héros] se passionne pour la poudre noire et les explosifs. Ingéniosité et audace permettent de créer des engins complexes malgré des ressources limitées, défiant les dogmes établis.",
            "Artiste / Saltimbanque": "Dès l’adolescence, [Nom du Héros] développe ses talents artistiques et acrobatiques en rejoignant une troupe itinérante. Les spectacles dans villages et cités ouvrent un vaste réseau de contacts.",
            "Asheninka / Peuple des rivières": "Élevé en harmonie avec la nature, [Nom du Héros] renforce résistance et savoir thérapeutique. Le lien avec la faune et l’éveil du Vrill révèlent une profonde affinité mystique.",
            "Assassin / Espion": "Dans l’ombre des cités, [Nom du Héros] apprend l’art de l’assassinat, de la dissimulation et de la collecte d’informations. Cette voie conduit à découvrir la réputation des mystérieuses Sombrelames.",
            "Barbare / Tribu isolée": "Au sein de sa tribu, [Nom du Héros] s’illustre dans la chasse et les conflits. Endurance et force se renforcent, tandis que l’art du Bliss accroît puissance et concentration.",
            "Bâtisseur / Artisan": "Formé par la caste des Bâtisseurs, [Nom du Héros] acquiert des compétences variées allant de l’armurerie à la vannerie. Sa polyvalence en fait un pilier de sa communauté.",
            "Chaman / Arcaniste": "Dans un temple ou auprès d’un mentor, [Nom du Héros] apprend l’art Sindrill, la médecine et l’herboristerie. La culture de plantes médicinales nourrit une vocation de guérisseur.",
            "Chasseur / Pisteur": "À force de traques et de survie en pleine nature, [Nom du Héros] devient pisteur compétent et autonome. L’expérience personnelle forge instinct et savoir-faire.",
            "Chasseur de primes / Spectre": "Adolescent, [Nom du Héros] perfectionne ses talents de pistage et d’investigation. Inspiré par la guilde des Spectres, la quête de justice guide ses premiers pas.",
            "Chercheur de trésors / Aventurier": "Très tôt, [Nom du Héros] franchit les frontières de son foyer pour découvrir de nouveaux horizons. Les dangers et découvertes nourrissent un goût insatiable pour l’aventure.",
            "Cultiste / Disciple de l’obscur": "[Nom du Héros] étudie les mécanismes du pouvoir et du contrôle, semant le doute et la discorde autour de soi. L’intelligence devient arme principale pour influencer l’ombre.",
            "Diseuse de bonne aventure / Comédien": "Passionné d’illusion et de spectacle, [Nom du Héros] captive les foules avec créativité et adresse. Ces talents s’étendent parfois à la divination ou à la prestidigitation.",
            "Dresseur / Palefrenier": "Élevé parmi les animaux, [Nom du Héros] perfectionne ses techniques de dressage et s’intéresse aux soins vétérinaires. Sa maîtrise en fait une ressource inestimable.",
            "Élémentaliste / Arcaniste": "Sous la tutelle d’un maître ou d’une école, [Nom du Héros] affine la maîtrise du Vrill et des forces élémentaires. Les années de formation le placent sur la voie d’arcaniste accompli.",
            "Enseignant / Mentor": "Dès l’adolescence, [Nom du Héros] partage son savoir et aide ses pairs. Son sens de la pédagogie attire l’attention et alimente une vocation d’éducateur.",
            "Esclavagiste / Marchand d’âmes": "[Nom du Héros] apprend les méthodes sournoises de capture et les rouages du marché noir. La répétition des actes érode peu à peu tout sens moral.",
            "Fouineur / Contrebandier": "Dans les recoins oubliés des cités, [Nom du Héros] développe ingéniosité et réseau. La débrouillardise devient un outil vital pour survivre et prospérer.",
            "Gardien de la lumière / Arcaniste": "Formé à l'académie ou du temple Foehn, [Nom du Héros] perfectionne les arts Sindrill et Rydan. Discipline et foi guident un futur de protecteur et de défenseur.",
            "Héraut / Diplomate": "Sous la tutelle d’un mentor expérimenté, [Nom du Héros] apprend diplomatie, langues et coutumes. L’art de négocier et d’apaiser les conflits devient une véritable vocation.",
            "Herboriste / Apothicaire": "Curieux des propriétés des plantes, [Nom du Héros] perfectionne l’art des potions et remèdes. Bientôt reconnu, il contribue activement à la santé de sa communauté.",
            "Ingénieur / Méchaniste": "Inventif et méthodique, [Nom du Héros] se passionne pour les engrenages et mécanismes. Projets et expériences forgent une réputation d’apprenti ingénieur prometteur.",
            "Inquisiteur Präst / Arcaniste": "À l’école Celestis ou dans une DIvision de guerrier Präst, [Nom du Héros] se consacre aux Arts Vrillique et à la foi en Sol Hag. Dévouement et ferveur distinguent son parcours d’inquisiteur en devenir.",
            "Kankale / Brigand": "Formé au combat quotidien, [Nom du Héros] apprend à survivre en vendant sa lame. Violence et adaptation marquent une vie façonnée par la guerre.",
            "Marchand / Négociant": "Dès l’adolescence, [Nom du Héros] développe un sens aigu de la valeur des biens et du commerce. Contacts et savoir-faire annoncent une carrière marchande prospère.",
            "Marchand Sharuhen / Caravanier": "En suivant les routes commerciales, [Nom du Héros] maîtrise transport, prix et marchandises. Sa fiabilité en fait un acteur reconnu des caravanes.",
            "Marin / Pirate": "Fasciné par la mer, [Nom du Héros] apprend navigation et survie en mer. Premières traversées forgent l’expérience d’un futur navigateur intrépide.",
            "Noble / Bourgeois": "Entre études approfondies et entraînement à l’escrime, [Nom du Héros] s’épanouit dans une formation complète. Savoir et talent martiaux préparent un avenir de responsabilités.",
            "Ouvrier / Tavernier": "En s’initiant à divers travaux manuels exigeants, [Nom du Héros] renforce endurance et force. Cette réputation de labeur ouvre la voie à une vie de persévérance.",
            "Paysan / Nourrisseurs": "Dans les champs et auprès du bétail, [Nom du Héros] apprend les bases de l’agriculture. L’expérience forge un rôle essentiel dans la production alimentaire.",
            "Pilote d’aéronef": "Passionné par les cieux, [Nom du Héros] étudie les principes du vol et la mécanique des aéronefs d'Estandre.",
            "Präst / Érudit": "Sous l’enseignement des Präst, [Nom du Héros] approfondit foi, langue sacrée et disciplines académiques. L’art du scribe devient un prolongement naturel de cet apprentissage.",
            "Rôdeur / Éclaireur": "[Nom du Héros] apprend pistage, chasse et survie en pleine nature. Ses services trouvent rapidement une utilité auprès de communautés ou de gouvernements.",
            "Séducteur / Courtisan": "Curieux des subtilités sociales, [Nom du Héros] affine son art de la séduction et de la communication. Les premières expériences forgent un talent persuasif.",
            "Soldat / Milice": "Dans un cadre rigoureux, [Nom du Héros] développe force physique et discipline martiale. Cette préparation le destine à une carrière de soldat.",
            "Sorcier / Arcaniste": "Apprenti auprès d’un maître ou d’une école, [Nom du Héros] cherche à comprendre et canaliser son potentiel arcanique. La voie du Shura s’impose rapidement.",
            "Survivaliste": "Aventurier solitaire, souvent par obligation, [Nom du Héros] enchaîne les expéditions dans des environnements hostiles. Sa réputation de stratège calme et résistant attire bientôt l’admiration locale.",
            "Voleurs / Voyou": "À l adolescence, [Nom du Héros] perfectionne ses talents de voleur. Ses années formatrices étaient caractérisées par l apprentissage du crochetage, du vol à la tire et d autres compétences nécessaires pour survivre dans le monde du crime."
        };
    }

    get careerDescriptionsJeuneAdulte() { // JEUNE ADULTE
        return {
            "Arpenteur / Cartographe": "[Nom du Héros] devient cartographe reconnu, travaillant pour guildes et armées. Ses cartes fiables ouvrent routes aux aventuriers et marchands, consolidant sa réputation.",
            "Artificier / Pyrotechnicien": "Maître des explosifs, [Nom du Héros] rejoint les régions tolérantes où la poudre prospère. Il trouve sa place parmi les artificiers et pyrotechniciens audacieux.",
            "Artiste / Saltimbanque": "Intégré aux saltimbanques, [Nom du Héros] séduit par spectacles et performances. Sa notoriété grandit, surtout dans les quartiers populaires.",
            "Asheninka / Peuple des rivières": "Respecté par sa communauté, [Nom du Héros] soigne avec savoirs traditionnels et Vrill. Son rôle spirituel en fait un médiateur avec la nature.",
            "Assassin / Espion": "Spécialiste de la dissimulation, [Nom du Héros] rejoint un ordre d’assassins ou d’espions. Ses missions secrètes renforcent son influence dans la cité.",
            "Barbare / Tribu isolée": "Endurci par conflits et nature sauvage, [Nom du Héros] maîtrise survie et Bliss. Redoutable, il se montre moins à l’aise dans les cités.",
            "Bâtisseur / Artisan": "Maître bâtisseur, [Nom du Héros] excelle dans son métier (forge, orfèvrerie…). Pilier de sa communauté, il contribue à son essor matériel.",
            "Chaman / Arcaniste": "Chaman ou guérisseur reconnu, [Nom du Héros] use des arts Sindrill et Moku. Mentor ou gardien, il transmet traditions et savoirs mystiques.",
            "Chasseur / Pisteur": "Expert pisteur, [Nom du Héros] vit surtout en forêt, survivant dans l’extrême. Recherché pour missions de reconnaissance ou sauvetage.",
            "Chasseur de primes / Spectre": "Engagé dans une guilde, [Nom du Héros] excelle à traquer fugitifs et criminels. Sa réputation de justicier discret attire l’attention.",
            "Chercheur de trésors / Aventurier": "Aventurier accompli, [Nom du Héros] parcourt contrées lointaines en quête de trésors. Ses exploits nourrissent sa renommée grandissante.",
            "Cultiste / Disciple de l’obscur": "Manipulateur discret, [Nom du Héros] use de poisons et intrigues pour influencer. Sa puissance vient de l’ombre plutôt que du combat.",
            "Diseuse de bonne aventure / Comédien": "Artiste accompli, [Nom du Héros] charme par illusions et tours. Ses réseaux populaires lui servent autant d’alliés que d’informateurs.",
            "Dresseur / Palefrenier": "Expert reconnu, [Nom du Héros] soigne et entraîne animaux de travail, guerre ou compagnie. Ses talents sont recherchés dans les cités.",
            "Élémentaliste / Arcaniste": "Maître du Vrill interne, [Nom du Héros] manipule forces élémentaires avec précision. Figure respectée parmi les élémentalistes.",
            "Enseignant / Mentor": "Enseignant ou chercheur, [Nom du Héros] transmet son savoir à la nouvelle génération. Sa réputation attire disciples et élèves fidèles.",
            "Esclavagiste / Marchand d’âmes": "[Nom du Héros] dirige ses propres opérations, usant de manipulation et réseaux. Redouté, il étend son influence dans les cercles criminels.",
            "Fouineur / Contrebandier": "Troc et larcins font de [Nom du Héros] une figure respectée des quartiers pauvres. Habile, il prospère malgré des affaires douteuses.",
            "Gardien de la lumière / Arcaniste": "Dévoué à sa foi, [Nom du Héros] protège sa communauté grâce au Vrill. Défenseur redoutable, il devient un symbole de la lumière.",
            "Héraut / Diplomate": "Ambassadeur itinérant, [Nom du Héros] négocie traités et apaise tensions. Son talent pour les langues et cultures élargit ses alliances.",
            "Herboriste / Apothicaire": "Reconnu pour ses remèdes rares, [Nom du Héros] soigne maladies complexes. Sa réputation attire aventuriers et guérisseurs voisins.",
            "Ingénieur / Méchaniste": "Passionné par les machines, [Nom du Héros] innove et répare avec brio. Ses projets avant-gardistes intriguent autant qu’ils inquiètent.",
            "Inquisiteur Präst / Arcaniste": "Dévoué au Sol Hag, [Nom du Héros] rejette modernité et technologie. Sa rigueur et sa foi inébranlables inspirent crainte et respect.",
            "Kankale / Brigand": "[Nom du Héros] vend ses talents guerriers de cité en cité. Sa vie de violence et de débauche le maintient loin de toute paix.",
            "Marchand / Négociant": "Négociant habile, [Nom du Héros] s’impose comme commerçant fiable. Sa maîtrise de la persuasion forge une solide réputation.",
            "Marchand Sharuhen / Caravanier": "Expert en routes commerciales, [Nom du Héros] transporte biens précieux en toute sécurité. Affilié aux Sharuhen, il gagne une grande confiance.",
            "Marin / Pirate": "Aventurier des mers, [Nom du Héros] vogue avec pirates, contrebandiers ou guildes. La vie sur l’eau devient sa véritable patrie.",
            "Noble / Bourgeois": "Héritier cultivé, [Nom du Héros] brille en société par savoir et escrime. Son éducation lui confère prestige et respect.",
            "Ouvrier / Tavernier": "Endurant et dévoué, [Nom du Héros] accomplit sans relâche tâches pénibles. Apprécié de tous, il trouve refuge dans convivialité des tavernes.",
            "Paysan / Nourrisseurs": "Maître de sa ferme, [Nom du Héros] nourrit bêtes et champs. Ses talents culinaires renforcent son rôle vital dans sa communauté.",
            "Pilote d’aéronef": "Formé à Estandre, [Nom du Héros] excelle en navigation et combat aérien. Ses premières missions marquent un destin téméraire.",
            "Präst / Érudit": "[Nom du Héros] devient érudit accompli et scribe précis. Dévoué au Sol Hag, il allie religion et savoir.",
            "Rôdeur / Éclaireur": "Guide aguerri, [Nom du Héros] excelle au pistage et à la survie. Sollicité pour escorter expéditions et sauver voyageurs perdus.",
            "Séducteur / Courtisan": "Courtisan accompli, [Nom du Héros] use de charme et manipulation subtile. Son art des désirs lui assure protection et influence.",
            "Soldat / Milice": "Professionnel aguerri, [Nom du Héros] sert l’ordre et lutte contre corruption. Sa maîtrise des armes le rend redoutable.",
            "Sorcier / Arcaniste": "Arcaniste accompli, [Nom du Héros] s’immerge dans l’art Shura. Guidé par maîtres ou ordres secrets, il explore solitude et domination.",
            "Survivaliste": "Expert recherché, [Nom du Héros] guide expéditions et enseigne survie. Ses compétences sauvent vies et inspirent respect.",
            "Voleurs / Voyou": "Membre actif d’une guilde, [Nom du Héros] maîtrise cambriolage et détroussage. Sa carrière criminelle prend une dimension plus organisée."
        };
    }

    get careerDescriptionsAdulte() { // ADULTE
        return {
            "Arpenteur / Cartographe": "Explorateur chevronné et cartographe reconnu, ses cartes servent aux armées, marchands et aventuriers. Forme désormais de jeunes arpenteurs.",
            "Artificier / Pyrotechnicien": "Maître des explosions et de la poudre noire, respecté en Rougerive et Éphéria malgré les interdits du Sol Hag.",
            "Artiste / Saltimbanque": "Danseur, musicien ou athlète accompli, figure majeure du divertissement et des grands événements.",
            "Asheninka / Peuple des rivières": "Guérisseur respecté, maître des thérapies naturelles, lié à la faune et porteur des dons du Vrill.",
            "Assassin / Espion": "Membre d’un ordre secret, espion et tueur redouté, influent dans les intrigues politiques.",
            "Barbare / Tribu isolée": "Chef de tribu endurant, sauvage mais maître du Bliss, combattant redoutable des terres sauvages.",
            "Bâtisseur / Artisan": "Membre de la caste des Bâtisseurs, expert en forge, armurerie, couture, cartographie… pilier de sa communauté.",
            "Chaman / Arcaniste": "Spécialiste des remèdes et des plantes, herboriste respecté, pilier essentiel de la guérison.",
            "Chasseur / Pisteur": "Survit en milieu hostile, maître de la reconnaissance et du pistage, vit en solitaire mais reconnu partout.",
            "Chasseur de primes / Spectre": "Membre d’une guilde, traqueur efficace et discret, parfois guidé par un idéal de justice.",
            "Chercheur de trésors / Aventurier": "Aventurier audacieux, franchit les dangers pour découvrir richesses et secrets. Nom associé à l’audace.",
            "Cultiste / Disciple de l’obscur": "Manipulateur de l’ombre et des esprits, évite le combat direct mais sème chaos et discorde.",
            "Diseuse de bonne aventure / Comédien": "Maître du spectacle ou de l’illusion, lié aux foules comme aux intrigues de coulisses.",
            "Dresseur / Palefrenier": "Expert des animaux, réputé pour ses soins et son dressage, figure clé des écuries et élevages.",
            "Élémentaliste / Arcaniste": "Maître du Vrill élémentaire (Moku, etc.), canalise les forces mystiques et transmet son savoir.",
            "Enseignant / Mentor": "Figure influente de l’enseignement, transmet ses Aspects positifs et forme les leaders de demain.",
            "Esclavagiste / Marchand d’âmes": "Marchand d’âmes puissant, réseau étendu et réputation cruelle, lutte pour maintenir son pouvoir.",
            "Fouineur / Contrebandier": "Expert en survie urbaine et trafics, réseau d’affaires puissant dans les bas-fonds.",
            "Gardien de la lumière / Arcaniste": "Guerrier Präst ou arcaniste Sindrill/Rydan, protecteur dévoué de la communauté et de la foi.",
            "Héraut / Diplomate": "Négociateur respecté, représentant lors des crises, bâtisseur de paix entre les peuples.",
            "Herboriste / Apothicaire": "Réputé pour ses remèdes, dirige une herboristerie prospère et publie des ouvrages de référence.",
            "Ingénieur / Méchaniste": "Concepteur innovant, expert en technologies d’Estandre, parfois en conflit avec les autorités.",
            "Inquisiteur Präst / Arcaniste": "Défenseur fanatique de la foi, maître du Shura et du « retrait », combattant redoutable du Sol Hag.",
            "Kankale / Brigand": "Brigand et mercenaire brutal, vivant de violence et d’aventures dans les tavernes et bas-fonds.",
            "Marchand / Négociant": "Expert en négoce, itinérant ou citadin prospère, figure influente du commerce.",
            "Marchand Sharuhen / Caravanier": "Transporteur fiable, membre d’une guilde respectée, garant de la sécurité des routes commerciales.",
            "Marin / Pirate": "Navigateur intrépide, membre des Aventureux, hors-la-loi respectés des mers et fleuves.",
            "Noble / Bourgeois": "Figure respectée, érudit et escrimeur, parfois expert en équidés, pilier de la haute société.",
            "Ouvrier / Tavernier": "Travailleur acharné et bon vivant, apprécié pour son endurance et sa convivialité.",
            "Paysan / Nourrisseurs": "Pilier de la société, cultivateur, berger ou cuisinier, garant de la subsistance des communautés.",
            "Pilote d’aéronef": "Navigateur de zeppelins et ballons, métier rare et prestigieux, lié à la cité d’Estandre.",
            "Präst / Érudit": "Gardien du savoir sacré, enseigne la langue et rédige les archives, pilier culturel de sa cité.",
            "Rôdeur / Éclaireur": "Membre d’élite des explorateurs, expert en reconnaissance et informations stratégiques.",
            "Séducteur / Courtisan": "Manipulateur des élites par le charme, évolue librement dans une société aux mœurs variées.",
            "Soldat / Milice": "Bras armé de la loi ou des Präst, garant de la sécurité et de la justice par la force.",
            "Sorcier / Arcaniste": "Maître du Shura solitaire, spécialisé dans la domination et les arcanes secrets.",
            "Survivaliste": "Référence en survie, forme des unités et rédige des guides, respecté pour son humilité et son savoir-faire.",
            "Voleurs / Voyou": "Escalade la hiérarchie criminelle, attire des missions risquées et vit de coups audacieux."
        };
    }

    get careerBonuses() {
        return {
            "Arpenteur / Cartographe": "Savoir +1, Mouvement +1", "Artificier / Pyrotechnicien": "Mouvement +1, Vitalité +1", "Artiste / Saltimbanque": "Mouvement +1, Expression +1", "Asheninka / Peuple des rivières": "Savoir +1, Vitalité +1", "Assassin / Espion": "Domination +1, Mouvement +1", "Barbare / Tribu isolée": "Puissance +1, Mouvement +1", "Bâtisseur / Artisan": "Savoir +1, Mouvement +1", "Chaman / Arcaniste": "Savoir +1, Expression +1", "Chasseur / Pisteur": "Savoir +1, Vitalité +1", "Chasseur de primes / Spectre": "Puissance +1, Mouvement +1", "Chercheur de trésors / Aventurier": "Domination +1, Savoir +1", "Cultiste / Disciple de l’obscur": "Domination +1, Savoir +1", "Diseuse de bonne aventure / Comédien": "Expression +2", "Dresseur / Palefrenier": "Savoir +1, Expression +1", "Élémentaliste / Arcaniste": "Expression +2", "Enseignant / Mentor": "Savoir +2", "Esclavagiste / Marchand d’âmes": "Domination +2", "Fouineur / Contrebandier": "Expression +1, Mouvement +1", "Gardien de la lumière / Arcaniste": "Savoir +1, Puissance +1", "Héraut / Diplomate": "Expression +2", "Herboriste / Apothicaire": "Savoir +2", "Ingénieur / Méchaniste": "Domination +1, Savoir +1", "Inquisiteur Präst / Arcaniste": "Domination +1, Puissance +1", "Kankale / Brigand": "Puissance +1, Mouvement +1", "Marchand / Négociant": "Expression +2", "Marchand Sharuhen / Caravanier": "Savoir +1, Expression +1", "Marin / Pirate": "Mouvement +2", "Noble / Bourgeois": "Savoir +1, Puissance +1", "Ouvrier / Tavernier": "Puissance +1, Vitalité +1", "Paysan / Nourrisseurs": "Puissance +1, Vitalité +1", "Pilote d’aéronef": "Domination +1, Mouvement +1", "Präst / Érudit": "Savoir +2", "Rôdeur / Éclaireur": "Puissance +1, Mouvement +1", "Séducteur / Courtisan": "Expression +1, Domination +1", "Soldat / Milice": "Puissance +1, Mouvement +1", "Sorcier / Arcaniste": "Domination +1, Savoir +1", "Survivaliste": "Mouvement +1, Vitalité +1", "Voleurs / Voyou": "Expression +1, Mouvement +1" };
    
    }

    get nameData() {
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
        };
    }

    // --- NOUVEAU : DONNÉES BOUTIQUE ET KITS ---

    // --- DONNÉES BOUTIQUE ALÉATOIRE ---
    get shopData() {
        // 1. LISTE COMPLÈTE (MASTER LIST)
        const allWeapons = [ 
            { name: "Dent de l'ombre", price: 310, desc: "(Type : Arme, épée courte - Q2 - Propriétés : Tranchant, Dégâts +1)", type: "arme" }, 
            { name: "Serpent de soie", price: 240, desc: "(Type : Arme, épée à deux mains - Q1 - Propriété : Vorpal)", type: "arme" }, 
            { name: "Lance du lotus", price: 700, desc: "(Type : Arme, lance - Q3 - Propriétés : Allonge, Perforant, Dégâts +1)", type: "arme" }, 
            { name: "Gardienne des âmes", price: 595, desc: "(Type : Arme, tonfa - Q3 - Propriétés : Rapide, Vigueur +2)", type: "arme" }, 
            { name: "Force du Vent", price: 285, desc: "(Type : Arme, couteau de lancer - Q2 - Propriétés : Dissimulé, Portée +50)", type: "arme" }, 
            { name: "Brume nocturne", price: 690, desc: "(Type : Arme, double-lame - Q2 - Propriété : Vigueur +2)", type: "arme" }, 
            { name: "Boomerang de mâitre artisan", price: 180, desc: "(Type : Arme, boomerang - Q2 - Propriétés : Portée +50, Écrasant)", type: "arme" }, 
            { name: "Sabre Vorpalien", price: 455, desc: "(Type : Arme, sabre - Q2 - Propriétés : Vorpal, Rapide)", type: "arme" }, 
            { name: "Hache affutée", price: 110, desc: "(Type : Arme, hache - Q1 - Propriétés : Dégâts +1)", type: "arme" }, 
            { name: "Porte-misère", price: 425, desc: "(Type : Arme, rapière - Q1 - Propriétés : Vigueur +1, Rapide)", type: "arme" },
            { name: "Arc court d'artisan", price: 180, desc: "(Type : Arme, arc court - Q1 - Propriété : Dégâts +1)", type: "arme" },
            { name: "Marteau de guerre renforcé", price: 170, desc: "(Type : Arme, marteau - Q1 - Propriété : Dégâts +1)", type: "arme" },
            { name: "Épée courte usée", price: 42, desc: "(Type : Arme, epee courte - Q0 - Propriété : Aucune)", type: "arme" },
            { name: "Dague sournoise", price: 50, desc: "(Type : Arme, dague - Q1 - Propriété : Dissimulé)", type: "arme" },
            { name: "Bouclier en bois", price: 80, desc: "(Type : Arme, bouclier - Q1 - Propriété : Vigueur +1)", type: "arme" },
            { name: "Arc court d'éclaireur", price: 180, desc: "(Type : Arme, arc court - Q1 - Propriété : Rapide)", type: "arme" }
        ];

        const allProtections = [ 
            { name: "Tunique des Rivières Tressées", price: 150, desc: "(Type : Protection Torse - Q1 - Propriété : Set (1) : Confortable, Set (2) : Résistance aux Intempéries)", type: "protection" }, 
            { name: "Bottes des Rivières Tressées", price: 145, desc: "(Type : Protection Jambe - Q1 - Propriété : Set (1) : Confortable, Set (2) : Résistance aux Intempéries)", type: "protection" }, 
            { name: "Poncho de Cendre Claire", price: 180, desc: "(Type : Protection Torse - Q1 - Propriété : Chasse 1)", type: "protection" }, 
            { name: "Tenue de maître Bâtisseur", price: 160, desc: "(Type : Protection Intégrale - Q1 - Propriété : Expertise +1)", type: "protection" },
            { name: "Veste en cuir", price: 60, desc: "(Type : Protection Torse - Q0 - Propriété : Aucune)", type: "protection" },
            { name: "Casque de l’Aigle de Nuit", price: 190, desc: "(Type : Protection Torse - Q1 - Propriété : Set (1) : Finesse +1, Set (3) : Portée +60, Set (4) : Réflexe +1)", type: "protection" },
            { name: "Gantelets de Brise-Peste", price: 190, desc: "(Type : Protection Torse - Q1 - Propriété : Set (2) : Force +1, Set (4) : Intimidation +1 Set (6) : Puissance +2)", type: "protection" },
            { name: "Gantelets du Serpent de Cuivre", price: 190, desc: "(Type : Protection Torse - Q1 - Propriété : Set (1) : Adaptation +1, Set (2) : Vigueur +1)", type: "protection" },
            { name: "Casque de l’Aigle de Nuit", price: 190, desc: "(Type : Protection Torse - Q1 - Propriété : Set (1) : Finesse +1, Set (3) : Portée +60, Set (4) : Réflexe +1)", type: "protection" },
            { name: "Masque du Puma des Cimes", price: 180, desc: "(Type : Protection Jambe - Q1 - Propriété : Set (2) : Intimidation +1, Set (4) : Force +1)", type: "protection" }
        ];

        const allMisc = [ 
            { name: "Abaque", price: 20, desc: "(Type : Objet - Q1)", type: "objet" }, 
            { name: "Couverture en laine d'alpaga", price: 15, desc: "(Type : Objet - Q1)", type: "objet" }, 
            { name: "Coffre (petit)", price: 6, desc: "(Type : Contenant - Q1)", type: "objet" }, 
            { name: "Bandages", price: 5, desc: "(Type : Objet - Q1 - Propriété : Soins)", type: "objet" }, 
            { name: "Tente", price: 115, desc: "(Type : Objet - Q1)", type: "objet" }, 
            { name: "Boussole", price: 30, desc: "(Type : Objet - Q1)", type: "objet" }, 
            { name: "Cadenas", price: 80, desc: "(Type : Objet - Q1)", type: "objet" }, 
            { name: "Corde (15m)", price: 10, desc: "(Type : Objet - Q1)", type: "objet" }, 
            { name: "Déguisement", price: 40, desc: "(Type : Objet - Q1)", type: "objet" }, 
            { name: "Flûte de pan", price: 50, desc: "(Type : Potion - Q1)", type: "potion" }, 
            { name: "Dés", price: 1, desc: "(Type : Potion - Q1)", type: "objet" },
            { name: "Nécessaire d'écriture", price: 120, desc: "(Type : Potion - Q1)", type: "objet" },
            { name: "Outre à pisco/eau (2 litres)", price: 7, desc: "(Type : Potion - Q1)", type: "objet" },
            { name: "Paillasse", price: 2, desc: "(Type : Potion - Q1)", type: "objet" },
            { name: "Jeu de base pukllay", price: 40, desc: "(Type : Potion - Q1)", type: "objet" },
            { name: "Jeu de carte", price: 8, desc: "(Type : Potion - Q1)", type: "objet" },
            { name: "Longue-vue", price: 3200, desc: "(Type : Potion - Q1)", type: "objet" },
            { name: "Hydromel (la bouteille 1 litre)", price: 3, desc: "(Type : Potion - Q1)", type: "objet" },
            { name: "Torche", price: 1, desc: "(Type : Objet - Q1 - Propriété : Lumière 1h)", type: "objet" },
            { name: "Rations (1j)", price: 2, desc: "(Type : Objet - Q1)", type: "objet" }
        ];

        // 2. FONCTION DE SÉLECTION ALÉATOIRE
        // Permet de choisir 'count' éléments au hasard dans 'array'
        const getRandomItems = (array, count) => {
            const shuffled = [...array].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };

        // 3. SI LA BOUTIQUE A DÉJÀ ÉTÉ GÉNÉRÉE, ON LA GARDE
        // (Pour éviter que la boutique change à chaque clic sur un bouton)
        if (!this._cachedShopData) {
            this._cachedShopData = {
                // Tu peux changer les chiffres ici pour définir la taille de la boutique
                weapons: getRandomItems(allWeapons, 6),      // Affiche 6 armes au hasard
                protections: getRandomItems(allProtections, 4), // Affiche 4 protections au hasard
                misc: getRandomItems(allMisc, 8)            // Affiche 8 objets divers au hasard
            };
        }

        return this._cachedShopData;
    }

    get kitsData() {
        return {
            "Kit de l’aventurier": [
                "Boussole (Type : Objet - Q1 - Propriété : Navigation)", 
                "Corde en chanvre (Type : Objet - Q1 - Propriété : 15m)", 
                "Bottes d’aventurier (Type : Protection Jambes - Q1 - Propriété : Confortable)", 
                "Lampe à huile (Type : Objet - Q1)", 
                "Rations (Type : Objet - Q1 - Propriété : 5 jours)", 
                "Sac de couchage (Type : Objet - Q1)", 
                "Sac à dos (Type : Contenant - Q1)", 
                "Silex et amorce (Type : Objet - Q1)", 
                "Torche (Type : Objet - Q1 - Propriété : x5)", 
                "Paillasse (Type : Objet - Q1)"
            ],
            "Kit du chasseur": [
                "Arc court (Type : Arme - Q1 - Propriété : Rapide)", 
                "Fourrure épaisse (Type : Protection Torse - Q1 - Propriété : Froid)", 
                "Paillasse (Type : Objet - Q1)", 
                "Piège à mâchoires (Type : Objet - Q1)", 
                "Piège à collet (Type : Objet - Q1)", 
                "Sac à dos (Type : Contenant - Q1)"
            ],
            "Kit du roc": [
                "Bouclier (Type : Protection Bouclier - Q1 - Propriété : Constitution +1)", 
                "Pierre à aiguiser (Type : Objet - Q1)", 
                "Tenue du Mur écrasant (Type : Protection Intégrale - Q1 - Propriété : Constitution +1)", 
                "Torche (Type : Objet - Q1)"
            ],
            "Kit de marchand": [
                "Abaque de commerçant (Type : Objet - Q1)", 
                "Tunique d'Hermés l'Unique (Type : Protection Torse - Q2 - Propriété : Persuasion +1)", 
                "Cadenas (Type : Objet - Q1)", 
                "Coffre petit (Type : Contenant - Q1)"
            ],
            "Kit de l’érudit": [
                "Cire à cacheter (Type : Objet - Q1)", 
                "Encre (Type : Objet - Q1 - Propriété : 100ml)", 
                "Livret vierge (Type : Objet - Q1)", 
                "Plume d’écriture (Type : Objet - Q1)", 
                "Manteau rare du Sage (Type : Protection Torse - Q2 - Propriété : Sagesse +1)", 
                "Sacoche (Type : Contenant - Q1)"
            ],
            "Kit du filou": [
                "Cartes truquées (Type : Objet - Q1 - Propriété : Jeu entier)", 
                "Déguisement (Type : Objet - Q1)", 
                "Feuille de coca (Type : Objet - Q1 - Propriété : 10 feuilles)", 
                "Outils de crochetage (Type : Objet - Q1)", 
                "Dague (Type : Arme - Q1 - Propriétés : Rapide, Dissimulée)", 
                "Chevalière (Type : Accessoire - Q1 - Propriété : Chasse 1)"
            ],
            "Kit de l’herboriste": [
                "Bandage (Type : Objet - Q1)", 
                "Cerpe (Type : Objet - Q1)", 
                "Fiole en verre (Type : Objet - Q1 - Propriété : x5)", 
                "Huile (Type : Objet - Q1 - Propriété : 100ml)", 
                "Sacoche d'herboriste (Type : Contenant - Q1)", 
                "Alambic (Type : Objet - Q1)"
            ],
            "Kit du navigateur": [
                "Alcool fort (Type : Objet - Q1 - Propriété : Bouteille)", 
                "Hameçon (Type : Objet - Q1)", 
                "Cimeterre (Type : Arme - Q1 - Propriété : Tranchant)", 
                "Rations (Type : Objet - Q1 - Propriété : 5 jours)", 
                "Sextant cassé (Type : Objet - Q0)"
            ]
        };
    }

    get atoutsData() {
        return [ { name: "À vaincre sans péril...", description: "Lorsque vous effectuez un test de combat, vous pouvez transformer le résultat de votre dé en une Prouesse. Si votre héros terrasse sa cible avec cette action, conservez cet Atout. Sinon, supprimez-le à la fin de votre tour.", image: "https://avantis.world/gen/perso/IMG/atouts/002.jpg" }, { name: "Allié inattendu", description: "Un allié (PNJ ou créature) de votre choix surgit pour vous aider. Il effectue une action puis disparaît. S'il apparaît durant un combat, il reste un tour. Sinon, il reste jusqu'à la fin de la scène. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/003.jpg" }, { name: "Amnésie", description: "Lancez un dé de chance. Sur un résultat pair, choisissez et retirez l'un des traits négatifs de votre héros. Sur un résultat impair, retirez l'un de ses traits positifs. Justifiez narrativement cette perte de mémoire. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/004.jpg" }, { name: "Apprentissage express", description: "Votre héros a une fulgurance et comprend instantanément de nouvelles techniques. Gagnez 5 Points de Maîtrise que vous pouvez dépenser immédiatement. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/005.jpg" }, { name: "Attaquer les points faibles", description: "Votre héros identifie une faille critique. Lors de votre prochain test de combat, vous bénéficiez d'un Avantage et les dégâts infligés sont doublés. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/006.jpg" }, { name: "Bénédiction / Malédiction", description: "Choisissez l'un des effets suivants : • Votre héros récupère 2 PVE🔥. • Une cible perd 2 PVE🔥. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/007.jpg" }, { name: "Cas contact", description: "Choisissez l'un des effets suivants : • Piochez une carte Atout. Supprimez immédiatement cet Atout. • (Une fois par aventure) Votre héros se retire de la scène en cours. Il ne peut plus agir ni être ciblé jusqu'à la prochaine scène. Supprimez cet Atout à la fin de la scène.", image: "https://avantis.world/gen/perso/IMG/atouts/008.jpg" }, { name: "Chance du débutant", description: "Choisissez l'un des effets suivants : • Piochez une carte Atout. • (Une fois par aventure) Une cible de votre choix réussit une Prouesse automatique ou échappe de justesse à un danger mortel. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/009.jpg" }, { name: "Chanceux", description: "Lors d'un test pour déterminer un butin ou une récompense, lancez deux dés supplémentaires et conservez le résultat de votre choix. Ensuite, lancez deux dés de chance : si les deux sont pairs, conservez cet Atout. Sinon, Supprimez-le.", image: "https://avantis.world/gen/perso/IMG/atouts/010.jpg" }, { name: "Combat sauvage", description: "Jusqu'à la fin de la scène, un héros ciblé ne subit pas de Désavantage lorsqu'il effectue deux actions de combat dans le même tour. Après la scène, il doit se reposer au moins une heure sous peine de perdre 1 PVI🌀 par heure. Supprimez cet Atout à la fin de la scène.", image: "https://avantis.world/gen/perso/IMG/atouts/011.jpg" }, { name: "Compte sur moi", description: "Annulez une attaque physique ciblant un allié proche. Votre héros devient la nouvelle cible de cette attaque. Il peut s'en défendre normalement. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/012.jpg" }, { name: "Connaissance partagée", description: "Hors combat, votre groupe canalise l'esprit d'un ancien érudit. Jusqu'à la fin de la scène, tous les alliés (vous y compris) bénéficient d'un Avantage sur leurs tests liés au méridien du Savoir. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/013.jpg" }, { name: "Coup de Maître", description: "Annulez le test de combat ou de réaction d'un adversaire. Effectuez immédiatement une action supplémentaire sans subir de Désavantage, même en dehors de votre tour. Supprimez immédiatement cet Atout", image: "https://avantis.world/gen/perso/IMG/atouts/014.jpg" }, { name: "Cri interminable", description: "Votre héros explose de rage. Jusqu'au début de votre prochain tour, tous les ennemis proches subissent un Désavantage à leurs tests de défense. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/015.jpg" }, { name: "Décalage temporel", description: "(Une fois par scène) Au début de votre tour, vous pouvez choisir de revivre entièrement tout ce qui s’est passé depuis votre précédent tour. Vous pouvez modifier toutes vos actions précédentes. Les actions des autres personnages restent inchangées. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/016.jpg" }, { name: "Déjà-vu", description: "Au moment de jouer cet Atout, faites un test de Domination. Votre héros a une vision fugace de l'avenir immédiat. En cas de réussite, la vision s'étend sur la minute suivante, vous donnant des informations cruciales. Cet Atout est supprimé au début de votre prochain tour.", image: "https://avantis.world/gen/perso/IMG/atouts/017.jpg" }, { name: "Déterminé", description: "Jusqu'à la fin de la journée, votre héros est animé d'une volonté de fer. Il remporte les égalités lors des tests d'opposition et peut relancer une unique Maladresse (résultat de 10 au dé). Supprimez cet Atout à la fin de la journée.", image: "https://avantis.world/gen/perso/IMG/atouts/018.jpg" }, { name: "Discrétion", description: "Tant que votre héros ne prend pas l'initiative d'attaquer ou d'attirer l'attention, il ne peut pas être ciblés. Il n’a pas besoin de faire de test s’il souhaite être discret. Cet effet prend fin dès que votre héros agit de manière hostile. Supprimez cet Atout à la fin de la scène.", image: "https://avantis.world/gen/perso/IMG/atouts/019.jpg" }, { name: "Force de l’esprit", description: "Si votre héros possède 14 PVI🌀 ou plus, choisissez l'un des effets suivants : • Inversez les PVI🌀 et PVE🔥 d’un personnage ciblé jusqu'à la fin de la scène. • Redirigez une attaque mentale d'une cible vers une autre cible proche. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/020.jpg" }, { name: "Instinct de survie", description: "Votre héros échappe automatiquement à une situation qui aurait dû lui coûter la vie, sans avoir à faire de test. Décrivez sa fuite miraculeuse. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/021.jpg" }, { name: "Intervention des ombres vorpaliennes", description: "Hors combat, votre héros se fond dans les ombres, devenant partiellement invisible. Vous faites automatiquement une Prouesse à votre prochain test de combat durant ce tour. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/022.jpg" }, { name: "Maître du temps", description: "Choisissez l'un des effets suivants : • Piochez une carte Atout. • Si votre héros possède au moins 15 PVI🌀, il peut ralentir le temps et agir librement pendant un tour supplémentaire. Supprimez cet Atout à la fin de votre prochain tour.", image: "https://avantis.world/gen/perso/IMG/atouts/023.jpg" }, { name: "Mémoire sans faille", description: "Vous pouvez vous rappeler parfaitement d'un détail crucial vu ou entendu par le passé, même si vous, le joueur, l'avez oublié. Demandez une information précise au MJ. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/024.jpg" }, { name: "Montée d’adrénaline", description: "Votre héros peut effectuer une action supplémentaire durant ce tour (qui n'est pas une action de combat) sans subir de Désavantage. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/025.jpg" }, { name: "Motiver les troupes", description: "Par un discours inspirant, vous retirez les effets de stress mental de vos alliés. Jusqu'au début de votre prochain tour, tous vos alliés (sauf votre héros) bénéficient d'un Avantage à leur prochain test. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/026.jpg" }, { name: "Omnipotence", description: "Jusqu’au début de votre prochain tour, chaque fois qu’un Atout avec la mention « supprimez immédiatement » est joué, vous pouvez choisir de le mettre de côté. Les Atouts mis de côté sont remis en main propre à leur propriétaire au début de votre prochain tour. Supprimez “Omnipotence” au début de votre prochain tour.", image: "https://avantis.world/gen/perso/IMG/atouts/027.jpg" }, { name: "Pabulum", description: "Jouez cet Atout au moment où un héros (allié ou vous-même) brûle des Points de Maîtrise. Ce héros récupère instantanément le même nombre de points dépensés. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/028.jpg" }, { name: "Pouvoir ancestral", description: "Votre héros fait appel à l'héritage de ses ancêtres. Pendant un tour, il peut utiliser une aptitude spéciale qu'il ne possède pas normalement (à définir avec le MJ en lien avec son histoire). Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/029.jpg" }, { name: "Quitte ou double", description: "Jusqu’au début de votre prochain tour, toutes les pertes de PVI🌀 et PVE🔥 infligées (aux héros comme aux ennemis) sont doublées. Supprimez cet Atout au début de votre prochain tour.", image: "https://avantis.world/gen/perso/IMG/atouts/030.jpg" }, { name: "Regain d’effort", description: "Le héros ciblé puise dans ses réserves. Il récupère jusqu'à 3 PVI🌀 ou 3 PVE🔥. Vous pouvez répartir ces points entre les deux jauges. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/031.jpg" }, { name: "Renversement total", description: "Inversez le résultat d'un jet de dé qui vient d'être effectué. Une Prouesse devient une Maladresse, une Maladresse devient une Prouesse, un 2 devient un 8, un 3 devient un 7, etc. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/032.jpg" }, { name: "Résilience", description: "Si votre héros subit des dégâts ou un effet négatif durant ce tour, il gagne 1 Point de Maîtrise et vous piochez une carte Atout. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/033.jpg" }, { name: "Ruse du renard", description: "Au début d'un combat, avant le premier tour, votre groupe bénéficie de l'initiative et peut effectuer une attaque contre vos adversaires sans qu'ils ne puissent se défendre. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/034.jpg" }, { name: "Sarcasme", description: "Hors combat, par une réplique cinglante, forcez une cible à faire un test de Persuasion avec Désavantage. En cas d'échec, elle est déstabilisée et perd 5 PVI🌀. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/035.jpg" }, { name: "Shura", description: "(Permanent) Votre héros ne peut posséder d'autre Atout que celui-ci. Tous les Atouts sont face visible. À tout moment, vous pouvez brûler 5 PVI🌀 pour copier et jouer immédiatement l'Atout d'un autre joueur (si l’Atout le permet). La copie n’est pas considérée comme un Atout. Vous pouvez décider de supprimer cet Atout uniquement lors d'un interlude.", image: "https://avantis.world/gen/perso/IMG/atouts/036.jpg" }, { name: "Sindrill", description: "(Permanent) Vous pouvez choisir de supprimer un de vos autres Atouts. Si vous le faites, un allié (ou votre héros) récupère jusqu'à 5 points de Vrill, à répartir entre ses PVI🌀 et PVE🔥. Vous pouvez décider de supprimer cet Atout uniquement lors d'un interlude.", image: "https://avantis.world/gen/perso/IMG/atouts/037.jpg" }, { name: "Stratège", description: "Supprimez tous les autres Atouts que vous possédez. Choisissez ensuite le même nombre d’Atouts parmi ceux disponibles dans la réserve. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/038.jpg" }, { name: "Vétéran", description: "Si votre héros a 3 PVE🔥 ou moins, il peut récupérer la moitié de ses PVE🔥 maximum (arrondi à l'inférieur). Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/039.jpg" }, { name: "Vision prémonitoire", description: "Narrez un événement futur plausible. Lancez un dé de chance : sur un résultat pair, la vision est une Prophétie et se réalisera obligatoirement. Sur un résultat impair, elle ne pourra jamais se produire. Supprimez immédiatement cet Atout.", image: "https://avantis.world/gen/perso/IMG/atouts/040.jpg" } ];
	
    }


    // --- DONNÉES ARCANES ---
    get carrieresArcanistes() { 
        return ["Chaman / Arcaniste", "Élémentaliste / Arcaniste", "Gardien de la lumière / Arcaniste", "Inquisiteur Präst / Arcaniste", "Sorcier / Arcaniste", "Barbare / Tribu isolée"]; 
    }
    
    get artUnlocks() { 
        return { 
            Shura: ["Inquisiteur Präst / Arcaniste", "Sorcier / Arcaniste"], 
            Sindrill: ["Chaman / Arcaniste", "Gardien de la lumière / Arcaniste"], 
            Moku: ["Chaman / Arcaniste", "Élémentaliste / Arcaniste"], 
            Rydan: ["Gardien de la lumière / Arcaniste", "Inquisiteur Präst / Arcaniste"], 
            Bliss: ["Barbare / Tribu isolée", "Élémentaliste / Arcaniste"] 
        }; 
    }
    
    get aptitudesArcanes() { 
        return ["Concentration", "Contrôle", "Distorsion", "Vision", "Limbes", "Éther", "Absorption"]; 
    }

    get traitsPositifs() {
        return ["Ambidextre", "Artiste", "Beau parleur", "Bonne étoile", "Charismatique", "Courageux", "Discret", "Empathique", "Enragé", "Érudit", "Force de la nature", "Né pour régner", "Nerfs d’acier", "Œil de lynx", "Perspicace", "Petit dormeur", "Résistant", "Séduisant", "Sens de la rue", "Sens du bricolage", "Tête bien faite", "Trompe-la-mort"];
    }

    get traitsNegatifs() {
        return ["Âgé", "Arrogant", "Aveugle", "Bavard", "Blessé", "Bon vivant", "Dépendant", "Ennemi juré", "Étourdi", "Fanfaron", "Fort caractère", "Fragile", "Froussard", "Maladroit", "Malchanceux", "Obsédé par le pouvoir", "Pacifiste", "Paranoïaque", "Phobique", "Rancunier", "Rien à perdre", "Sanguinaire", "Sans cœur", "Superstitieux", "Vénal", "Vrill instable"];
    }

    get tooltipData() {
        return {
            traits: { "Ambidextre": "Peut utiliser ses deux mains sans malus. Si le héros fait deux actions d’attaque avec deux mains différentes, il ne subit pas de pénalité d’actions multiples.","Artiste": "Avantage sur les actions artistiques ou de représentation.","Beau parleur": "Avantage pour convaincre, mentir ou détourner l’attention. Dispose d’un Avantage une fois par jour.","Bonne étoile": "Dispose d’un Avantage une fois par jour.","Charismatique": "Avantage pour inspirer ou faire impression grâce à l’Aura.","Courageux": "Avantage dans les situations de grand danger.","Discret": "Avantage pour se faufiler ou passer inaperçu.","Empathique": "Avantage pour ressentir les émotions et les intentions.","Enragé": "Avantage en combat lorsqu’il agit sous l’effet de la colère.","Érudit": "Avantage pour les tests de savoir. Ce trait de caractère peut aussi être utilisé par le joueur pour demander au MJ de lui rappeler des informations qu'il a oubliées en tant que joueur, mais que le héros devrait connaître.","Force de la nature": "Peut porter le double. Avantage sur les tests de Force.","Né pour régner": "Avantage en politique, noblesse, ou interactions de pouvoir.","Nerfs d’acier": "Avantage aux effets négatifs des tests de stress.","Œil de lynx": "Avantage pour observer de loin ou détecter un détail important.","Perspicace": "Avantage pour les tests de déduction ou enquête.","Petit dormeur": "N’a besoin que de 3h de sommeil pour être reposé.","Résistant": "Avantage contre les poisons ou maladies.","Séduisant": "Avantage pour charmer ou séduire une cible.","Sens de la rue": "Avantage pour se repérer ou survivre en milieu urbain.","Sens du bricolage": "Avantage pour réparer ou construire un objet.","Tête bien faite": "Avantage pour les tests de réflexion ou d’analyse.","Trompe-la-mort": "Si le héros meurt, il peut lancer un dé de chance. S'il fait 6 ou plus, il meurt, sinon il reprend conscience à la fin de la scène. Le MJ peut imposer d'éventuelles séquelles. Le joueur ne peut utiliser ce trait qu’une fois par session.","Âgé": "Désavantage pour les tests d’Athlétisme ou Force.","Arrogant": "Attaque en priorité le chef adverse. Difficile à raisonner.","Aveugle": "Désavantage pour les actions nécessitant la vue. Peut compenser par d’autres sens.","Bavard": "Tendance à tout révéler. Peut compromettre des plans.","Blessé": "Malus pour les actions physiques prolongées.","Bon vivant": "Doit bien manger. Sinon, Désavantage sur toute activité physique.","Dépendant": "Si privé de sa drogue, personne ou rituel : Désavantage à toutes actions.","Ennemi juré": "Un PNJ ou groupe cherche activement à nuire au héros.","Étourdi": "Oublis fréquents. Désavantage pour Concentration ou actions complexes.","Fanfaron": "S’approprie tous les exploits. Attire souvent l’attention négative.","Fort caractère": "Têtu et difficile à convaincre. Désavantage en coopération.","Fragile": "Sensible aux maladies, poison ou épuisement.","Froussard": "Panique facilement. Désavantage face au danger ou créatures terrifiantes.","Maladroit": "Désavantage aux tests de Finesse (test de combat inclus).","Malchanceux": "Désavantage à tous les tests de chance. Souvent la cause de situations cocasses.","Obsédé par le pouvoir": "Refuse d’obéir. Désavantage s’il doit suivre un plan non initié par lui.","Pacifiste": "Désavantage pour attaquer directement.","Paranoïaque": "Ne fait confiance à personne. Handicap lors des négociations ou alliances. Désavantage au test lié à l’intuition ou la perspicacité.","Phobique": "Peur irrationnelle (à définir). Désavantage en présence de la phobie.","Rancunier": "N’oublie jamais une offense. Peut compromettre une mission par vengeance.","Rien à perdre": "Agit imprudemment. Désavantage si la prudence est requise.","Sanguinaire": "Difficulté à se contenir. Désavantage s’il retient ses pulsions violentes.","Sans cœur": "Incapable de compassion. Réagit mal dans les scènes sociales.  Il aura tendance à ne jamais faire de prisonnier.","Superstitieux": "Se laisse guider par des présages. Désavantage sur les choix rationnels.","Vénal": "Ne résiste pas au doux bruit de l’argent. Peut facilement se faire acheter au mépris de la morale.","Vrill instable": "Désavantage à tous ses tests d’arcanes. Ne possède pas d’Avantage au test de Régénération."
        },
            aptitudes: {
            "Ruse": "Capacité à tromper, manipuler ou piéger par l’intelligence et la subtilité, sans recourir à la force brute.",
            "Commandement": "Capacité à diriger de façon autoritaire et froide, commander et organiser un groupe.",
            "Logique": "Résoudre des énigmes, anticiper les mouvements ennemis.",
            "Volonté": "Renforce la détermination du héros à poursuivre ses objectifs malgré les obstacles.",
            "Érudition": "Connaissances académiques, culturelles et historiques.",
            "Perception": "Capacité à remarquer les détails et à déceler ce qui est caché.",
            "Sagesse": "Calme intérieur, concentration et maîtrise de soi.",
            "Expertise": "Englobe les compétences pratiques et artisanales du héros. ",
            "Créativité": "Imagination, inspiration et capacité à trouver des solutions originales.",
            "Intuition": "Réactions intuitives. Sert à détecter les pièges, réagir en cas d’urgence ou suivre son intuition.",
            "Empathie": "Sensibilité, écoute, compréhension émotionnelle. Permet de mieux cerner les intentions ou les faiblesses.",
            "Persuasion": "Sert à gagner la confiance, négocier ou désamorcer un conflit. Peut être utilisé pour influencer la volonté d’une cible et la charmer.",
            "Vigueur": "Capacité à courir, sauter et accomplir des prouesses physiques.",
            "Magnétisme": "Influence subtile d’une personne sur un individu ou un groupe par son charisme et sa prestance.",
            "Force": "Puissance musculaire brute pour soulever, pousser ou frapper.",
            "Intimidation": "Capacité à effrayer ou à impressionner par la force ou la présence.",
            "Agilité": "Souplesse, équilibre et grâce dans le mouvement.",
            "Finesse": "Habileté manuelle. Pour manier des outils, crocheter, désamorcer ou manipuler avec finesse un arc.",
            "Coordination": "Mouvement contrôlé et harmonieux et la faculté a se faufiler sans être remarqué.",
            "Réflexe": "Vitesse de réaction face à un événement soudain.",
            "Constitution": "Capacité du héros à encaisser les coups, bloquer les attaques et résister physiquement à l’impact.",
            "Régénération": "Vitesse à laquelle le corps guérit et se remet de la fatigue.",
            "Résistance": "Endurance physique, capacité à supporter la douleur et les efforts prolongés.",
            "Adaptation": "Capacité à s’adapter à l’environnement. S’orienter, trouver de l’eau, construire un abri. Utile en nature ou zones hostiles.",
            "Concentration": "Capacité à maintenir un sort ou un effet du Vrill malgré les distractions.",
            "Contrôle": "Finesse dans la manipulation du Vrill pour des effets précis.",
            "Distorsion": "Capacité à altérer la réalité ou les perceptions avec le Vrill.",
            "Vision": "Permet de percevoir les flux de Vrill et les auras invisibles.",
            "Limbes": "Affinité avec le Vrill pur et non élémentaire.",
            "Éther": "Affinité avec le Vrill de nature mentale ou spirituelle.",
            "Absorption": "Capacité à absorber ou à dissiper le Vrill adverse."
        }
        };
    }

    // =========================================================================
    // 2. INITIALISATION & LISTENERS
    // =========================================================================

    activateListeners(html) {
        super.activateListeners(html);

        // --- NAVIGATION (On démarre directement à l'âge) ---
        
        // --- ÉTAPE 1 : GENÈSE (ÂGE) ---
        html.find('#submit-age').click(() => {
            const age = parseInt(html.find('#hero-age').val());
            if (!age || age < 8) return ui.notifications.warn("Veuillez entrer un âge valide (minimum 8 ans).");
            
            this.heroData.age = age;
            
            // Calcul des périodes disponibles selon l'âge
            this.availableCareerPeriods = ['enfance'];
            if (age >= 12) this.availableCareerPeriods.push('adolescence');
            if (age >= 17) this.availableCareerPeriods.push('jeuneAdulte');
            if (age >= 21) this.availableCareerPeriods.push('adulte');
            
            this._transitionToStep(html, 'step-origin');
            this._initOriginStep(html);
        });

        // --- ÉTAPE 2 : ORIGINE ---
        html.find('#prev-to-genesis').click(() => this._transitionToStep(html, 'step-genesis'));
        html.find('#next-to-appearance').click(() => {
            this._transitionToStep(html, 'step-appearance');
            this._initAppearanceStep(html);
        });

        // --- ÉTAPE 3 : APPARENCE ---
        html.find('#hero-appearance').change(() => this._generateNameSuggestion(html));
        html.find('#regenerate-name').click(() => this._generateNameSuggestion(html));
        
        html.find('#prev-to-origin').click(() => this._transitionToStep(html, 'step-origin'));
        html.find('#next-to-careers').click(() => {
            const name = html.find('#hero-name').val();
            if(!name) return ui.notifications.warn("Choisissez un nom !");
            this.heroData.nom = name;
            this.heroData.apparence = html.find('#hero-appearance').val();
            this._transitionToStep(html, 'step-careers');
            this._initCareersStep(html);
        });

        // --- ÉTAPE 4 : CARRIÈRES ---
        html.find('.prev-period-btn').click(ev => {
            const target = ev.currentTarget.dataset.target;
            if(target === 'step-appearance') this._transitionToStep(html, 'step-appearance');
            else {
                html.find('.career-period').addClass('hidden'); 
                html.find(`#${target}`).removeClass('hidden'); 
            }
        });
        
        html.find('.next-period-btn').click(ev => {
            const source = ev.currentTarget.dataset.source;
            const select = html.find(`#career-choice-${source}`);
            if(!select.val()) return ui.notifications.warn("Choisissez une carrière !");
            
            this.heroData.careers[source] = select.val();
            
            const idx = this.availableCareerPeriods.indexOf(source);
            if(idx < this.availableCareerPeriods.length - 1) {
                // Passage à la période suivante (ex: Enfance -> Ado)
                html.find(`#period-${source}`).addClass('hidden');
                html.find(`#period-${this.availableCareerPeriods[idx+1]}`).removeClass('hidden');
                this._populateCareerSelect(html, this.availableCareerPeriods[idx+1]);
            } else {
                // Fin des carrières -> Traits
                this._transitionToStep(html, 'step-traits');
                this._initTraitsStep(html);
            }
        });

        html.find('select[id^="career-choice-"]').change(ev => {
            const period = ev.currentTarget.id.replace('career-choice-', '');
            this._showCareerDescription(html, period, ev.currentTarget.value);
        });

        // --- ÉTAPE 5 : TRAITS ---
        html.find('#prev-to-careers').click(() => {
            this._transitionToStep(html, 'step-careers');
            html.find('.career-period').addClass('hidden');
            // On revient à la dernière période disponible pour cet âge
            html.find(`#period-${this.availableCareerPeriods[this.availableCareerPeriods.length-1]}`).removeClass('hidden');
        });
        
        html.find('#next-to-meridiens').click(() => {
            // Sauvegarde des données de cette étape
            this.heroData.morphologie = html.find('#hero-morphologie').val();
            this.heroData.descriptionPhysique = html.find('#hero-description').val();
            
            this.heroData.traitsPositifs = [];
            html.find('.trait-input-positif').each((i, el) => { if(el.value) this.heroData.traitsPositifs.push(el.value); });
            
            this.heroData.traitsNegatifs = [];
            html.find('.trait-input-negatif').each((i, el) => { if(el.value) this.heroData.traitsNegatifs.push(el.value); });

            this._transitionToStep(html, 'step-meridiens');
            this._initMeridiensStep(html);
        });

        // --- ÉTAPE 6 : MÉRIDIENS ---
        // Note: Les écouteurs + et - sont gérés dynamiquement dans _initMeridiensStep car le DOM est recréé
        
        html.find('#prev-to-traits').click(() => this._transitionToStep(html, 'step-traits'));
        html.find('#next-to-objectives').click(() => {
            if(this.pointsLibres > 0) return ui.notifications.warn(`Il reste ${this.pointsLibres} points de Méridiens !`);
            if(this.aptitudePointsLibres > 0) return ui.notifications.warn(`Il reste ${this.aptitudePointsLibres} points d'Aptitudes !`);
            this._transitionToStep(html, 'step-objectives');
        });

        // --- ÉTAPE 7 : OBJECTIFS ---
        html.find('#prev-to-meridiens').click(() => this._transitionToStep(html, 'step-meridiens'));
        html.find('#next-to-weapon').click(() => {
            this.heroData.objectifs.moyenTerme = html.find('#objective-medium').val();
            this.heroData.objectifs.longTerme = html.find('#objective-long').val();
            this._transitionToStep(html, 'step-weapon');
            this._initWeaponStep(html);
        });

        // --- ÉTAPE 8 : ARME ---
        // --- ARME (Générateur de nom amélioré) ---
        html.find('#generate-weapon-name').click(() => {
            // Liste 1 : Le sujet (Noms féminins ou neutres pour s'accorder facilement)
            const nouns = [
                "Lame", "Griffe", "Dent", "Ombre", "Lueur", "Voix", 
                "Main", "Larme", "Fléau", "Lance", "Colère", "Prière","Faucon","Serpent","L'aigle","Pluie d'étoile",
                "Gardienne", "Vengeresse", "Dévoreuse", "Murmure", "Caresse","La Briseuse de rêves","Porte-misère","Force",
                "Sentinelle", "Fureur", "Promesse", "Justice", "Misère","Brume","L'Aube éternelle","Phoénix rugissant"
            ];

            // Liste 2 : Les compléments (De quoi ?)
            const suffixes = [
                "du Destin", "de la Nuit", "des Cendres", "de Givre", "nocturne","du Vent",
                "du Soleil", "de Sang", "d'Os", "d'Acier", "du Vent","élégante","de rune","du Lotus",
                "de la Foudre", "du Vide", "du Chaos", "des Rêves", "du bastion des tempêtes",
                "de l'Aube", "du Crépuscule", "des Tempêtes", "de l'Hiver","du Soleil",
                "des Anciens", "de l'Oubli","de la colère", "de la Haine", "du Dragon"
            ];

            // Liste 3 : Les adjectifs (Comment ?)
            const adjectives = [
                "Noire", "Blanche", "Rouge", "Sanglante", "Hurlante",
                "Silencieuse", "Triste", "Cruelle", "Rapide", "Fatale","Ultime",
                "Éternelle", "Maudite", "Sacrée", "Brisée", "Oubliée",
                "Vorpaline", "Ancestrale", "Céleste", "Impie", "Vengeresse",
                "Ardente", "Glaciale", "Spectrale", "Divine"
            ];

            // Sélection aléatoire du nom
            const noun = nouns[Math.floor(Math.random() * nouns.length)];
            
            let fullName = "";

            // Pile ou Face : Soit on utilise un Adjectif, soit un Complément
            // Ex: "Lame Noire" OU "Lame du Destin"
            if (Math.random() > 0.5) {
                const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
                fullName = `${noun} ${suffix}`;
            } else {
                const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
                fullName = `${noun} ${adj}`;
            }

            // Parfois, on ajoute "La" devant pour faire plus épique (1 chance sur 3)
            if (Math.random() > 0.6) {
                fullName = `La ${fullName}`;
            }

            html.find('#custom-weapon-name').val(fullName);
        });

        // NOUVEAU : Affichage dynamique de la description des propriétés
        html.find('.property-select').change(ev => {
            const p1 = html.find('#property-select-1').val();
            const p2 = html.find('#property-select-2').val();
            const descContainer = html.find('#weapon-props-description');
            
            let text = "";
            // On vérifie si weaponPropertiesData existe (assure-toi d'avoir ajouté le getter correspondant)
            if(this.weaponPropertiesData) {
                if(p1 && this.weaponPropertiesData[p1]) text += `<strong>${p1}:</strong> ${this.weaponPropertiesData[p1]}<br>`;
                if(p2 && this.weaponPropertiesData[p2]) text += `<strong>${p2}:</strong> ${this.weaponPropertiesData[p2]}`;
            }
            
            if(text) {
                descContainer.removeClass('hidden').html(text);
            } else {
                descContainer.addClass('hidden');
            }
        });

        html.find('#prev-to-objectives').click(() => this._transitionToStep(html, 'step-objectives'));
        // --- NAVIGATION VERS SHOP (Reset Vue) ---
        html.find('#next-to-shop').click(() => {
            // CORRECTION : On récupère d'abord les éléments DOM
            const weaponSelect = html.find('#weapon-select');
            const customWeaponNameInput = html.find('#custom-weapon-name');
            const propertySelect1 = html.find('#property-select-1');
            const propertySelect2 = html.find('#property-select-2');

            // Validation de l'arme (On vérifie la valeur du select jQuery via .val())
            if (!weaponSelect.val()) {
                ui.notifications.warn("Veuillez choisir un type d'arme avant de continuer.");
                return;
            }
            
            // Sauvegarde de l'arme
            const weapon = {
                nom: customWeaponNameInput.val() || weaponSelect.val(),
                proprietes: [propertySelect1.val(), propertySelect2.val()].filter(p => p && p !== "Aucune").join(', ')
            };
            this.heroData.armes[0] = weapon;
            
            this._transitionToStep(html, 'step-shop');
            
            // RESET COMPLET DES VUES DU SHOP
            html.find('#shop-initial-choice').removeClass('hidden');
            html.find('#shop-kits-view').addClass('hidden');
            html.find('#shop-manual-view').addClass('hidden');
            
            this._initShopStep(html);
        });




        // =========================================================
        // --- ÉTAPE 9 : SHOP & INVENTAIRE (BUDGET MODIFIABLE) ---
        // =========================================================
        
        // 1. Afficher les KITS
        html.find('#shop-choice-kits-btn').click(() => {
            html.find('#shop-initial-choice').addClass('hidden');
            html.find('#shop-kits-view').removeClass('hidden');
            this._populateKits(html);
        });

        // Sélection d'un KIT
        html.find('#kit-select').change(ev => {
            const kitName = ev.currentTarget.value;
            const kitContent = this.kitsData[kitName] || [];
            
            if (kitName) {
                // Si on prend un kit, on force le budget à 50 (règle standard)
                this.heroData.budgetFinal = 50; 
                this.heroData.inventaire = kitContent.map(name => ({ name: name, isKitItem: true }));
            } else {
                this.heroData.budgetFinal = 400;
                this.heroData.inventaire = [];
            }
            
            let htmlDesc = `<p><strong>Coût :</strong> 350 Sols (Reste : 50 Sols)</p><ul>`;
            kitContent.forEach(item => {
                // On affiche juste le nom propre (avant la parenthèse)
                htmlDesc += `<li>${item.split('(')[0]}</li>`;
            });
            htmlDesc += `</ul>`;
            
            html.find('#kit-description-panel').removeClass('hidden').html(htmlDesc);
        });

        // 2. Afficher la BOUTIQUE MANUELLE
        html.find('#shop-choice-manual-btn').click(() => {
            html.find('#shop-initial-choice').addClass('hidden');
            html.find('#shop-manual-view').removeClass('hidden');
            
            // On initialise le panier, mais on garde le budget actuel (400 par défaut)
            this.shopCart = [];
            this._renderManualShop(html);
        });

        // --- ECOUTEUR SPÉCIAL : Modification manuelle du Budget ---
        // Permet au joueur de changer "400" en "1000" s'il veut
        html.find('#shop-budget-input').change(ev => {
            const newVal = parseInt(ev.currentTarget.value);
            if (!isNaN(newVal) && newVal >= 0) {
                this.currentBudget = newVal;
                // Petit feedback (facultatif)
                // ui.notifications.info(`Nouveau budget défini : ${this.currentBudget} Sols`);
            }
        });

        // --- ACHAT D'OBJET (Bouton +) ---
        // ACHAT (Avec gestion Shift+Click pour en acheter 5)
        html.find('#shop-inventory').off('click').on('click', '.buy-item-btn', (ev) => {
            const idx = ev.currentTarget.dataset.index;
            const type = ev.currentTarget.dataset.type;
            const item = this.shopData[type][idx];

            // Si Shift est enfoncé, on en achète 5, sinon 1
            const quantity = ev.shiftKey ? 5 : 1;
            const totalCost = item.price * quantity;

            if (this.currentBudget >= totalCost) {
                this.currentBudget -= totalCost;
                
                // On ajoute l'objet X fois dans le panier
                const itemString = `${item.name} ${item.desc}`; 
                for(let i=0; i<quantity; i++) {
                    this.shopCart.push(itemString);
                }
                
                html.find('#shop-budget-input').val(this.currentBudget);
                
                const msg = quantity > 1 ? `Acheté : ${quantity}x ${item.name}` : `Acheté : ${item.name}`;
                ui.notifications.info(`${msg} (-${totalCost} S)`);
            } else {
                ui.notifications.warn("Pas assez de Sols !");
            }
        });

        // Navigation : Retour Arrière depuis le Shop
        html.find('#prev-to-weapon').click(() => this._transitionToStep(html, 'step-weapon'));
        
        // Navigation : Valider le Shop et passer aux Atouts
        html.find('#next-to-atout').click(() => {
            // Si on est en mode "Manuel" (la vue est visible), on sauvegarde le panier
            if (!html.find('#shop-manual-view').hasClass('hidden')) {
                this.heroData.inventaire = this.shopCart;
                this.heroData.budgetFinal = this.currentBudget;
            }
            // Si on est en mode "Kit", c'est déjà géré par le 'change' du select

            this._transitionToStep(html, 'step-atout');
            this._initAtoutStep(html);
        });




        // --- ÉTAPE 10 : ATOUT ---
        html.find('#draw-atout-btn').click(() => this._drawAtout(html));
        html.find('#prev-from-atout-to-shop').click(() => this._transitionToStep(html, 'step-shop'));
        html.find('#next-to-summary').click(() => {
            this._transitionToStep(html, 'step-summary');
            this._generateSummary(html);
        });

        // --- ÉTAPE 11 : RESUMÉ & FIN ---
        html.find('#prev-from-summary-to-atout').click(() => this._transitionToStep(html, 'step-atout'));
        html.find('#create-actor-btn').click(async (ev) => {
            ev.preventDefault();
            await this._createActorInFoundry(html);
        });
    }

    // =========================================================================
    // 3. LOGIQUE MÉTIER & AFFICHAGE
    // =========================================================================

   _transitionToStep(html, stepId) {
        html.find('.creator-step').removeClass('active');
        html.find(`#${stepId}`).addClass('active');
        this._updateBackground(stepId); // AJOUTÉ : Gestion du fond d'écran
    }

    _updateBackground(stepId) {
        let bgImage = 'none';
        
        // Liste des images
        if (stepId === 'step-welcome') bgImage = "url('https://avantis.world/gen/perso/IMG/acceuil.jpg')";
        else if (stepId === 'step-genesis') bgImage = "url('https://avantis.world/gen/perso/IMG/naissance.png')";
        else if (stepId === 'step-weapon') bgImage = "url('https://avantis.world/gen/perso/IMG/forge.jpg')";
        else if (stepId === 'step-shop') bgImage = "url('https://avantis.world/gen/perso/IMG/boutique.jpg')";
        else if (stepId === 'step-atout') bgImage = "url('https://avantis.world/gen/perso/IMG/atout.jpg')";
        else if (this.heroData.regionOrigine) {
            const allRegions = [...this.regionsData.main, ...this.regionsData.other];
            const region = allRegions.find(r => r.id === this.heroData.regionOrigine || r.nom === this.heroData.regionOrigine);
            if (region) bgImage = `url('${region.img}')`;
        }
        
        // --- CORRECTION ICI ---
        // On utilise 'this.element' (la fenêtre jQuery actuelle) pour trouver #overlay à l'intérieur
        const overlay = this.element.find('#overlay');
        if(overlay && overlay.length > 0) {
             overlay.css('background-image', bgImage);
        }
    }

    _typeWriter(html, text, elementId) {
        const el = html.find(`#${elementId}`);
        el.text(text); 
        el.hide().fadeIn(500);
    }

    // --- ORIGINE ---
    _initOriginStep(html) {
        this._typeWriter(html, "D'où venez-vous ? Vos racines déterminent une partie de votre force.", 'narrator-text-origin');
        const mainContainer = html.find('#main-regions');
        const otherContainer = html.find('#other-regions');
        mainContainer.empty();
        otherContainer.empty();
        
        const createCard = (region, container) => {
            const card = $(`<div class="region-card" style="background-image:url('${region.img}'); background-size:cover;"><h3>${region.nom}</h3></div>`);
            card.click(() => {
                html.find('.region-card').removeClass('selected');
                card.addClass('selected');
                this.heroData.regionOrigine = region.nom;
                html.find('#region-description-panel').removeClass('hidden').text(region.desc);
                html.find('#next-to-appearance').removeClass('hidden');
                // Mise à jour du fond immédiate pour l'ambiance
                this._updateBackground('step-origin'); 
            });
            container.append(card);
        };

        this.regionsData.main.forEach(r => createCard(r, mainContainer));
        this.regionsData.other.forEach(r => createCard(r, otherContainer));
    }

    // --- APPARENCE ---
    _initAppearanceStep(html) {
        this._typeWriter(html, "À quoi ressemblez-vous ?", 'narrator-text-appearance');
        this._typeWriter(html, "Et quel est votre nom ?", 'narrator-text-name');
        html.find('#hero-name, #regenerate-name').removeClass('hidden');
        this._generateNameSuggestion(html);
    }

    _generateNameSuggestion(html) {
        const region = this.heroData.regionOrigine;
        const gender = html.find('#hero-appearance').val() === 'Féminine' ? 'femme' : 'homme';
        const names = this.nameData[region]?.[gender] || ["Inconnu"];
        const randName = names[Math.floor(Math.random() * names.length)];
        html.find('#hero-name').val(randName);
    }

    // --- CARRIÈRES ---
    _initCareersStep(html) {
        this._typeWriter(html, "La vie vous a forgé...", 'narrator-text-career-enfance');
        html.find('.career-period').addClass('hidden');
        html.find('#period-enfance').removeClass('hidden');
        this._populateCareerSelect(html, 'enfance');
    }

    _populateCareerSelect(html, period) {
        const select = html.find(`#career-choice-${period}`);
        select.empty().append('<option value="">-- Choisir --</option>');
        Object.keys(this.careerDescriptions).forEach(job => {
            select.append(`<option value="${job}">${job}</option>`);
        });
    }

    _showCareerDescription(html, period, job) {
        const desc = this.careerDescriptions[job] || "";
        const formattedDesc = desc.replace('[Nom du Héros]', this.heroData.nom);
        const bonus = this.careerBonuses[job] || "Aucun bonus";
        html.find(`#career-description-panel-${period}`).removeClass('hidden').html(`<p><em>${formattedDesc}</em></p><p><strong>Bonus :</strong> ${bonus}</p>`);
    }

    // --- TRAITS (CORRIGÉ POUR AFFICHAGE CLICABLE) ---
    _initTraitsStep(html) {
        this._typeWriter(html, "Votre vécu a forgé votre caractère...", 'narrator-text-traits');
        
        const posContainer = html.find('#positive-suggestions');
        const negContainer = html.find('#negative-suggestions');
        
        posContainer.empty();
        negContainer.empty();

        const createSuggestion = (trait, container, typeClass) => {
            const desc = this.tooltipData.traits[trait] || "Pas de description";
            const span = $(`<span class="trait-suggestion" data-tooltip="${desc}">${trait}</span>`);
            
            span.click(() => {
                if (span.hasClass('used')) return;
                const inputs = html.find(`.trait-input-${typeClass}`);
                let filled = false;
                inputs.each((i, el) => {
                    if (!el.value && !filled) {
                        el.value = trait;
                        filled = true;
                        span.addClass('used');
                    }
                });
            });
            container.append(span);
        };

        this.traitsPositifs.forEach(t => createSuggestion(t, posContainer, 'positif'));
        this.traitsNegatifs.forEach(t => createSuggestion(t, negContainer, 'negatif'));
    }

    // --- MÉRIDIENS (COMPLET AVEC ARCANES) ---
    // --- MÉRIDIENS (PARTIE AFFICHAGE) ---
    _initMeridiensStep(html) {
        // ... (Le début de la fonction reste identique : calcul des points, etc.) ...
        this._typeWriter(html, "Votre potentiel s'éveille... Répartissez vos points.", 'narrator-text-aptitudes');
        
        ['domination', 'savoir', 'expression', 'puissance', 'mouvement', 'vitalite'].forEach(m => this.heroData.meridiens[m] = 1);
        this.pointsLibres = 0; 

        Object.values(this.heroData.careers).forEach(careerName => {
            if (!careerName) return;
            this.pointsLibres += 2; 
            const bonusString = this.careerBonuses[careerName]; 
            if (bonusString) {
                bonusString.split(', ').forEach(b => {
                    const parts = b.trim().split(' +');
                    if (parts.length === 2) {
                        let key = parts[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        if(key === 'volonte') key = 'domination'; 
                        if (this.heroData.meridiens.hasOwnProperty(key)) {
                            this.heroData.meridiens[key] += parseInt(parts[1], 10);
                        }
                    }
                });
            }
        });

        html.find('#points-reserve').text(this.pointsLibres);
        html.find('#aptitude-points-remaining').text(this.aptitudePointsLibres);
        ['domination', 'savoir', 'expression', 'puissance', 'mouvement', 'vitalite'].forEach(m => {
            html.find(`.meridien-item[data-meridien="${m}"] .score`).text(this.heroData.meridiens[m]);
        });
        this._updateGauges(html);

        // --- GÉNÉRATION DYNAMIQUE DES APTITUDES (CORRIGÉE) ---
        const row1 = html.find('#aptitude-row-1').empty();
        const row2 = html.find('#aptitude-row-2').empty();
        const colArcane = html.find('#arcane-aptitudes-column').empty();

        // LISTE CORRECTE SELON VOTRE DEMANDE
        const aptitudesMap = {
            domination: ["Ruse", "Commandement", "Logique", "Volonté"],
            savoir: ["Érudition", "Perception", "Sagesse", "Expertise"],
            expression: ["Créativité", "Intuition", "Empathie", "Persuasion"],
            puissance: ["Vigueur", "Magnétisme", "Force", "Intimidation"],
            mouvement: ["Agilité", "Finesse", "Coordination", "Réflexes"], // Corrigé ici (Finesse, Réflexes)
            vitalite: ["Constitution", "Régénération", "Résistance", "Adaptation"]
        };

        const createAptGroup = (mKey, aptList, cssClass = '') => {
            let h = `<div class="aptitude-group ${cssClass}"><h5>${mKey.toUpperCase()}</h5>`;
            aptList.forEach(apt => {
                const desc = this.tooltipData.aptitudes[apt] || "";
                h += `<div class="aptitude-item" data-tooltip="${desc}">
                        <label>${apt}</label>
                        <div class="points-control">
                            <button class="btn-minus" data-aptitude="${apt}">-</button>
                            <span class="score" data-aptitude-score="${apt}">0</span>
                            <button class="btn-plus" data-aptitude="${apt}">+</button>
                        </div>
                      </div>`;
            });
            h += `</div>`;
            return h;
        };

        ['domination', 'savoir', 'expression'].forEach(k => row1.append(createAptGroup(k, aptitudesMap[k], 'internal')));
        ['puissance', 'mouvement', 'vitalite'].forEach(k => row2.append(createAptGroup(k, aptitudesMap[k], 'external')));

        // Détection Arcanes
        const chosenCareers = Object.values(this.heroData.careers).filter(Boolean);
        const isArcanist = chosenCareers.some(c => this.carrieresArcanistes.includes(c));
        if (isArcanist) {
            colArcane.append(createAptGroup('Arcanes', this.aptitudesArcanes, 'arcane'));
        }

        // Listeners
        html.find('.btn-plus').off('click').on('click', ev => {
            const apt = ev.currentTarget.dataset.aptitude;
            if(apt) this._updateAptitude(html, apt, 1);
            else this._updateMeridien(html, ev.currentTarget, 1);
        });
        html.find('.btn-minus').off('click').on('click', ev => {
            const apt = ev.currentTarget.dataset.aptitude;
            if(apt) this._updateAptitude(html, apt, -1);
            else this._updateMeridien(html, ev.currentTarget, -1);
        });
    }

    _updateMeridien(html, btn, delta) {
        const item = $(btn).closest('.meridien-item');
        const key = item.data('meridien');
        const currentVal = this.heroData.meridiens[key];
        
        // CORRECTION : Limite passée de 5 à 9
        if (delta > 0 && this.pointsLibres > 0 && currentVal < 9) {
            this.heroData.meridiens[key]++;
            this.pointsLibres--;
        } else if (delta < 0 && currentVal > 1) {
            this.heroData.meridiens[key]--;
            this.pointsLibres++;
        }
        
        item.find('.score').text(this.heroData.meridiens[key]);
        html.find('#points-reserve').text(this.pointsLibres);
        this._updateGauges(html);
    }

    _updateAptitude(html, aptName, delta) {
        if (!this.heroData.aptitudes[aptName]) this.heroData.aptitudes[aptName] = 0;
        const current = this.heroData.aptitudes[aptName];

        if (delta > 0 && this.aptitudePointsLibres > 0 && current < 2) {
            this.heroData.aptitudes[aptName]++;
            this.aptitudePointsLibres--;
        } else if (delta < 0 && current > 0) {
            this.heroData.aptitudes[aptName]--;
            this.aptitudePointsLibres++;
        }
        html.find(`span[data-aptitude-score="${aptName}"]`).text(this.heroData.aptitudes[aptName]);
        html.find('#aptitude-points-remaining').text(this.aptitudePointsLibres);
    }

    _updateGauges(html) {
        const m = this.heroData.meridiens;
        const pvi = m.domination + m.savoir + m.expression;
        const pve = m.puissance + m.mouvement + m.vitalite;
        html.find('#pvi-value').text(pvi);
        html.find('#pve-value').text(pve);
        this.heroData.pvi_max = pvi;
        this.heroData.pve_max = pve;
        
        // Mise à jour des Arts du Vrill (Shura, Sindrill...)
        this._updateVrillArts(html);
    }

    _updateVrillArts(html) {
        const chosenCareers = Object.values(this.heroData.careers).filter(Boolean);
        const isArcanist = chosenCareers.some(c => this.carrieresArcanistes.includes(c));
        const panel = html.find('#vrill-arts-panel');
        const list = html.find('#vrill-arts-list');
        list.empty();

        if (!isArcanist) {
            panel.addClass('hidden');
            return;
        }

        const m = this.heroData.meridiens;
        // Calcul des niveaux d'Art selon les règles
        const artsLevels = {
            Shura: m.domination,
            Sindrill: m.savoir,
            Moku: m.expression,
            Rydan: Math.floor((m.puissance + m.savoir) / 2),
            Bliss: Math.floor((m.expression + m.mouvement) / 2)
        };

        let count = 0;
        Object.entries(artsLevels).forEach(([art, level]) => {
            // Vérifie si le héros a le métier requis pour cet Art
            const unlocks = this.artUnlocks[art] || [];
            if (unlocks.some(u => chosenCareers.includes(u))) {
                list.append(`<div class="vrill-art-item"><strong>${art}:</strong> ${level}</div>`);
                count++;
            }
        });

        if (count > 0) {
            panel.removeClass('hidden');
            html.find('#vrill-arts-narrator').text("Vos affinités avec le Vrill :");
        } else {
            panel.addClass('hidden');
        }
    }

    // --- ARME ---
    _initWeaponStep(html) {
        this._typeWriter(html, "Choisissez votre arme de prédilection.", 'narrator-text-weapon');
        const select = html.find('#weapon-select');
        select.empty();
        ["Arbalète","Arc court","Arc long","Arme improvisée","Atlatl","Bardiche","Bâton","Bolas","Boomerang","Bouclier","Canon","Chaîne à deux kamas","Chaîne cloutée","Cimeterre","Couteau","Couteau de lancer","Cracheur des Anciens","Dague","Double-lame","Épée à deux mains","Épée bâtarde","Épée courte","Épée large","Épée longue","Faux","Fléau d'arme","Fouet","Fronde","Gourdin","Grand cracheur","Grappin","Hache","Hache à deux mains","Hache de lancer","Hache double","Hachette","Hallebarde","Hallebarde rétractable","Javeline","Jitte","Kama","Khopesh","Lance","Marteau","Marteau à long manche","Masse","Morgenstern","Nunchaku","Rapière","Sabre","Sansetsukon","Sarbacane","Shuriken","Tomahawk","Tonfa","Urumi","Wahaika"
].forEach(w => select.append(`<option value="${w}">${w}</option>`));
        
        const props = html.find('#property-select-1, #property-select-2');
        props.empty().append('<option value="">--</option>');
        ["Adaptable","Ancien","Brise-garde","Brutal","Chasse +1","Corrosif","Empathique","Encombrant","Réflexe +1","Entravant","Explosif +1","Poison","Constitution +1","Sifflant","Vigueur+1","Vorpal","Ignore la Parade","Indestructible","Perforant","Portée +50","Rechargement +1", "Rapide", "Tranchant", "Impact", "Précis", "Rapide", "Dégâts +1", "Allonge", "Dissimulé"].forEach(p => props.append(`<option value="${p}">${p}</option>`));


    }

    // --- SHOP ---
    _initShopStep(html) {
        this._typeWriter(html, "Préparez votre paquetage.", 'narrator-text-shop');
        // On remet les budgets à zéro pour l'affichage
        html.find('#shop-budget-input').val(this.currentBudget);
    }

    _populateKits(html) {
        const select = html.find('#kit-select').empty().append('<option value="">-- Choisir --</option>');
        Object.keys(this.kitsData).forEach(k => select.append(`<option value="${k}">${k}</option>`));
    }

    _renderManualShop(html) {
        const weaponList = html.find('#shop-weapons-list');
        const armorList = html.find('#shop-protections-list');
        const miscList = html.find('#shop-misc-list');
        
        // On vide les listes avant de remplir
        weaponList.empty(); 
        armorList.empty(); 
        miscList.empty();

        // FONCTION MODIFIÉE : STYLE PAPIER CLAIR
        const createShopItem = (item, index, type) => {
            return `
            <div class="shop-item" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; padding:8px; border:1px solid #8c7b6c; background:#f4f0e8; border-radius:4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.4);">
                
                <div style="flex:1; margin-right:10px; text-align: left;">
                    <div style="font-weight:bold; font-size:1.1em; color:#2c1b14;">${item.name}</div>
                    <div style="font-size:0.85em; color:#4a4a4a; font-style:italic;">${item.desc || ""}</div>
                </div>

                <div style="display:flex; align-items:center; gap:10px; min-width:80px; justify-content:flex-end;">
                    <span style="font-weight:bold; color:#7b1e1e; font-size:1em;">${item.price} S</span>
                    <button class="buy-item-btn" data-type="${type}" data-index="${index}" 
                            style="width:28px; height:28px; border-radius:50%; border:1px solid #2ecc71; background:#27ae60; color:white; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow: 1px 1px 3px rgba(0,0,0,0.3); transition: transform 0.1s;">
                        +
                    </button>
                </div>
            </div>`;
        };

        // Chargement des données
        const data = this.shopData;
        
        if (data && data.weapons) data.weapons.forEach((it, i) => weaponList.append(createShopItem(it, i, 'weapons')));
        if (data && data.protections) data.protections.forEach((it, i) => armorList.append(createShopItem(it, i, 'protections')));
        if (data && data.misc) data.misc.forEach((it, i) => miscList.append(createShopItem(it, i, 'misc')));
        
        // Mise à jour visuelle du budget sans l'écraser si l'utilisateur est en train de taper
        if(document.activeElement.id !== 'shop-budget-input') {
             html.find('#shop-budget-input').val(this.currentBudget);
        }
    }

    _updateShopCartUI(html) {
        html.find('#shop-budget-input').val(this.currentBudget);
        
        // Optionnel : Si tu veux afficher le panier à droite (dans une div 'inventory-cart' par exemple)
        // tu pourrais le faire ici en itérant sur this.shopCart
    }

    // --- ATOUT ---
    _initAtoutStep(html) {
        this._typeWriter(html, "Le destin est une carte à jouer...", 'narrator-text-atout');
    }

    _drawAtout(html) {
        const atout = this.atoutsData[Math.floor(Math.random() * this.atoutsData.length)];
        this.heroData.atouts = [atout.name];
        
        html.find('#atout-draw-view').addClass('hidden');
        html.find('#atout-reveal-view').removeClass('hidden');
        html.find('#atout-navigation').removeClass('hidden');
        
        html.find('#atout-name').text(atout.name);
        html.find('#atout-desc-text').text(atout.description);
        html.find('#atout-image').attr('src', atout.image);
    }

    // --- RÉSUMÉ ---
    _generateSummary(html) {
        html.find('#summary-hero-name').text(this.heroData.nom);
        html.find('#summary-pvi').val(this.heroData.pvi_max);
        html.find('#summary-pve').val(this.heroData.pve_max);
        const carList = html.find('#summary-careers-list').empty();
        Object.entries(this.heroData.careers).forEach(([period, job]) => {
            carList.append(`<div class="career-item"><span class="career-period">${period}:</span> <span>${job}</span></div>`);
        });
        const traitsPos = html.find('#summary-traits-pos').empty().append('<h5>Positifs</h5>');
        this.heroData.traitsPositifs.forEach(t => traitsPos.append(`<div>${t}</div>`));
        const traitsNeg = html.find('#summary-traits-neg').empty().append('<h5>Négatifs</h5>');
        this.heroData.traitsNegatifs.forEach(t => traitsNeg.append(`<div>${t}</div>`));
    }

    // =========================================================================
    // 4. CRÉATION ACTEUR FOUNDRY (AVEC PARSER INTELLIGENT)
    // =========================================================================
    
    async _createActorInFoundry(html) {
        const d = this.heroData;
        if (!d.nom) return ui.notifications.error("Le héros n'a pas de nom !");

        // =================================================================
        // 1. PRÉPARATION DES APTITUDES (CLASSÉES PAR MÉRIDIEN)
        // =================================================================
        const apts = {
            // --- PUISSANCE ---
            vigueur: { value: d.meridiens.puissance + (d.aptitudes['Vigueur'] || 0), label: "Vigueur", meridien: "puissance" },
            magnetisme: { value: d.meridiens.puissance + (d.aptitudes['Magnétisme'] || 0), label: "Magnétisme", meridien: "puissance" },
            force: { value: d.meridiens.puissance + (d.aptitudes['Force'] || 0), label: "Force", meridien: "puissance" },
            intimidation: { value: d.meridiens.puissance + (d.aptitudes['Intimidation'] || 0), label: "Intimidation", meridien: "puissance" },

            // --- MOUVEMENT ---
            agilite: { value: d.meridiens.mouvement + (d.aptitudes['Agilité'] || 0), label: "Agilité", meridien: "mouvement" },
            finesse: { value: d.meridiens.mouvement + (d.aptitudes['Finesse'] || 0), label: "Finesse", meridien: "mouvement" },
            coordination: { value: d.meridiens.mouvement + (d.aptitudes['Coordination'] || 0), label: "Coordination", meridien: "mouvement" },
            reflexe: { value: d.meridiens.mouvement + (d.aptitudes['Réflexes'] || 0), label: "Réflexes", meridien: "mouvement" },

            // --- VITALITÉ ---
            constitution: { value: d.meridiens.vitalite + (d.aptitudes['Constitution'] || 0), label: "Constitution", meridien: "vitalite" },
            regeneration: { value: d.meridiens.vitalite + (d.aptitudes['Régénération'] || 0), label: "Régénération", meridien: "vitalite" },
            resistance: { value: d.meridiens.vitalite + (d.aptitudes['Résistance'] || 0), label: "Résistance", meridien: "vitalite" },
            adaptation: { value: d.meridiens.vitalite + (d.aptitudes['Adaptation'] || 0), label: "Adaptation", meridien: "vitalite" },

            // --- DOMINATION ---
            ruse: { value: d.meridiens.domination + (d.aptitudes['Ruse'] || 0), label: "Ruse", meridien: "domination" },
            commandement: { value: d.meridiens.domination + (d.aptitudes['Commandement'] || 0), label: "Commandement", meridien: "domination" },
            logique: { value: d.meridiens.domination + (d.aptitudes['Logique'] || 0), label: "Logique", meridien: "domination" },
            volonte: { value: d.meridiens.domination + (d.aptitudes['Volonté'] || 0), label: "Volonté", meridien: "domination" },

            // --- SAVOIR ---
            erudition: { value: d.meridiens.savoir + (d.aptitudes['Érudition'] || 0), label: "Érudition", meridien: "savoir" },
            perception: { value: d.meridiens.savoir + (d.aptitudes['Perception'] || 0), label: "Perception", meridien: "savoir" },
            sagesse: { value: d.meridiens.savoir + (d.aptitudes['Sagesse'] || 0), label: "Sagesse", meridien: "savoir" },
            expertise: { value: d.meridiens.savoir + (d.aptitudes['Expertise'] || 0), label: "Expertise", meridien: "savoir" },

            // --- EXPRESSION ---
            creativite: { value: d.meridiens.expression + (d.aptitudes['Créativité'] || 0), label: "Créativité", meridien: "expression" },
            intuition: { value: d.meridiens.expression + (d.aptitudes['Intuition'] || 0), label: "Intuition", meridien: "expression" },
            empathie: { value: d.meridiens.expression + (d.aptitudes['Empathie'] || 0), label: "Empathie", meridien: "expression" },
            persuasion: { value: d.meridiens.expression + (d.aptitudes['Persuasion'] || 0), label: "Persuasion", meridien: "expression" }
        };

        // Ajout des arcanes dans la liste principale (si présents)
        this.aptitudesArcanes.forEach(arc => {
            if (d.aptitudes[arc] !== undefined && d.aptitudes[arc] > 0) {
                const key = arc.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                apts[key] = { value: d.aptitudes[arc], label: arc, isArcane: true };
            }
        });

        // =================================================================
        // 2. PRÉPARATION DES ARTS DU VRILL (POUR LA FICHE)
        // =================================================================
        const artsStructure = [];
        const chosenCareers = Object.values(d.careers).filter(Boolean);
        const artsLevels = {
            "SHURA": d.meridiens.domination,
            "SINDRILL": d.meridiens.savoir,
            "MOKU": d.meridiens.expression,
            "RYDAN": Math.floor((d.meridiens.puissance + d.meridiens.savoir) / 2),
            "BLISS": Math.floor((d.meridiens.expression + d.meridiens.mouvement) / 2)
        };
        const artKeys = { "SHURA": "Shura", "SINDRILL": "Sindrill", "MOKU": "Moku", "RYDAN": "Rydan", "BLISS": "Bliss" };

        for (const [artNameUpper, baseLevel] of Object.entries(artsLevels)) {
            const artKey = artKeys[artNameUpper];
            const requiredCareers = this.artUnlocks[artKey] || [];
            
            // Si le joueur a le métier requis
            if (requiredCareers.some(c => chosenCareers.includes(c))) {
                const scoresObj = {};
                this.aptitudesArcanes.forEach(arcaneName => {
                    const bonusInvesti = d.aptitudes[arcaneName] || 0;
                    scoresObj[arcaneName] = baseLevel + bonusInvesti;
                });
                artsStructure.push({ name: artNameUpper, value: baseLevel, scores: scoresObj });
            }
        }

        // =================================================================
        // 3. CONSTRUCTION DE L'HISTOIRE ET DES CARRIÈRES
        // =================================================================
        const periods = [
            { key: 'enfance', label: 'Enfance (8-11 ans)', dict: this.careerDescriptions },
            { key: 'adolescence', label: 'Adolescence (12-16 ans)', dict: this.careerDescriptionsAdo },
            { key: 'jeuneAdulte', label: 'Jeune Adulte (17-20 ans)', dict: this.careerDescriptionsJeuneAdulte },
            { key: 'adulte', label: 'Adulte (21+ ans)', dict: this.careerDescriptionsAdulte }
        ];

        let bioParts = [];
        let careersList = []; 

        for (let p of periods) {
            const jobName = d.careers[p.key]; 
            if (jobName && p.dict[jobName]) {
                let text = p.dict[jobName];
                text = text.replace(/\[Nom du Héros\]/g, d.nom || "Le héros");
                
                bioParts.push(text); // Pour le texte complet
                
                careersList.push({ // Pour la liste structurée
                    name: jobName,
                    period: p.label,
                    desc: text
                });
            }
        }
        const fullHistory = bioParts.join('\n\n');

        // =================================================================
        // 4. CRÉATION DE L'ACTEUR (DOCUMENT FOUNDRY)
        // =================================================================
        const actor = await Actor.create({
            name: d.nom,
            type: "hero",
            img: "icons/svg/mystery-man.svg",
            system: {
                meridiens: {
                    domination: { value: d.meridiens.domination },
                    savoir: { value: d.meridiens.savoir },
                    expression: { value: d.meridiens.expression },
                    puissance: { value: d.meridiens.puissance },
                    mouvement: { value: d.meridiens.mouvement },
                    vitalite: { value: d.meridiens.vitalite }
                },
                aptitudes: apts,
                arcanes: { arts: artsStructure },
                pvi: { value: d.pvi_max, max: d.pvi_max },
                pve: { value: d.pve_max, max: d.pve_max },
                pointsMaitrise: { value: 2, max: 10 },
                devise: { sol: d.budgetFinal || 0 },
                personnalite: {
                    biographie: {
                        age: d.age,
                        origine: d.regionOrigine,
                        physique: d.descriptionPhysique,
                        morphologie: d.morphologie,
                        histoire: fullHistory,
                        buts: { moyen: d.objectifs.moyenTerme, long: d.objectifs.longTerme }
                    },
                    carrieres: careersList, // Ajout de la liste structurée
                    traits: {
                        positifs: d.traitsPositifs.map(t => ({ name: t })),
                        negatifs: d.traitsNegatifs.map(t => ({ name: t }))
                    }
                },
                atouts: d.atouts.map(a => {
                    const atoutInfo = this.atoutsData.find(ad => ad.name === a);
                    return { name: a, desc: atoutInfo ? atoutInfo.description : "Généré à la création" };
                })
            }
        });

        // =================================================================
        // 5. CRÉATION DES OBJETS (INVENTAIRE & ARME)
        // =================================================================
        const itemsToCreate = [];

        // A. ARME DE PRÉDILECTION
        if (d.armes[0] && d.armes[0].nom) {
            let img = "icons/weapons/swords/sword-iron.webp";
            
            // Analyse des propriétés pour le bonus
            let rawProps = (d.armes[0].proprietes || "").split(',').map(s => s.trim()).filter(s => s);
            let totalDamageBonus = 0;
            let cleanProps = [];

            rawProps.forEach(p => {
                if (p.toLowerCase().includes("dégâts +1")) {
                    totalDamageBonus += 1;
                } else {
                    cleanProps.push(p);
                }
            });

            if (totalDamageBonus > 0) {
                cleanProps.push(`Dégâts +${totalDamageBonus}`);
            }
            const finalPropsString = cleanProps.join(', ');

            itemsToCreate.push({
                name: d.armes[0].nom,
                type: "arme",
                img: img,
                system: { 
                    proprietes: finalPropsString, 
                    equipe: true, 
                    qualite: 1,
                    bonusDegats: totalDamageBonus 
                }
            });
        }

        // B. FONCTION "DÉCODEUR" POUR L'INVENTAIRE
        // Lit : "Nom (Type : X - QY - Propriété : Z)"
        const parseItemString = (fullString) => {
            // Si c'est déjà un objet (Boutique Manuelle)
            if (typeof fullString === 'object') {
                // On reformate en string pour utiliser la même logique, ou on traite directement
                // Ici je traite directement pour être sûr
                let type = fullString.type || 'objet';
                let img = "icons/svg/item-bag.svg";
                if(type === 'arme') img = "icons/weapons/swords/sword-guard-engraved.webp";
                if(type === 'protection') img = "icons/equipment/chest/shirt-collared-brown.webp";
                if(type === 'potion') img = "icons/consumables/potions/bottle-bulb-corked-purple.webp";

                return {
                    name: fullString.name,
                    type: type,
                    img: img,
                    system: { 
                        proprietes: fullString.desc || fullString.props || "", 
                        description: "Acheté en boutique",
                        qualite: 1
                    }
                };
            }

            // Si c'est une chaîne (Kit)
            let rawString = String(fullString);
            let name = rawString.split('(')[0].trim();
            let content = rawString.match(/\((.*?)\)/)?.[1] || ""; // Contenu entre parenthèses

            let type = "objet";
            let qualite = 1;
            let props = "";
            let description = "Issu du Kit de départ";
            let img = "icons/svg/item-bag.svg";

            if (content) {
                const parts = content.split('-').map(s => s.trim());
                
                parts.forEach(part => {
                    const lower = part.toLowerCase();
                    
                    // Détection Type
                    if (lower.startsWith("type")) {
                        if (lower.includes("arme")) { type = "arme"; img = "icons/weapons/swords/sword-iron.webp"; }
                        else if (lower.includes("protection")) { type = "protection"; img = "icons/equipment/chest/leather-jerkin.webp"; }
                        else if (lower.includes("potion") || lower.includes("consommable")) { type = "potion"; img = "icons/consumables/potions/potion-red.webp"; }
                        else if (lower.includes("contenant")) { type = "objet"; img = "icons/svg/item-bag.svg"; } // mapping vers objet car 'contenant' n'existe pas en Item type
                        else if (lower.includes("accessoire")) { type = "accessoire"; img = "icons/equipment/neck/amulet.webp"; }
                        
                        // Icônes spécifiques
                        if (lower.includes("bouclier")) img = "icons/equipment/shield/heater.webp";
                        if (lower.includes("jambes") || lower.includes("bottes")) img = "icons/equipment/feet/boots-leather.webp";
                    }
                    
                    // Détection Qualité (Q1, Q2...)
                    else if (part.startsWith("Q") && !isNaN(part[1])) {
                        qualite = parseInt(part.substring(1));
                    }
                    
                    // Détection Propriétés
                    else if (lower.startsWith("propriét")) {
                        props = part.replace(/^propriét(é|és)\s*:\s*/i, "").trim();
                    }
                });
            } else {
                // Fallback si pas de parenthèses (ex: "Torche")
                if (name.toLowerCase().includes("potion")) { type = "potion"; img = "icons/consumables/potions/potion-red.webp"; }
            }

            // Gestion du Slot pour les protections
            let slot = "torse"; // défaut
            if (type === "protection") {
                const checkStr = (content + name).toLowerCase();
                if (checkStr.includes("jambes") || checkStr.includes("bottes")) slot = "jambes";
                else if (checkStr.includes("tête") || checkStr.includes("casque")) slot = "tete";
                else if (checkStr.includes("bras") || checkStr.includes("gants")) slot = "bras";
                else if (checkStr.includes("intégrale")) slot = "integral";
                else if (checkStr.includes("bouclier")) slot = "bouclier"; // Si tu as un slot bouclier, sinon main
            }

            return {
                name: name,
                type: type,
                img: img,
                system: {
                    qualite: qualite,
                    proprietes: props,
                    description: description,
                    slot: slot,
                    equipe: false
                }
            };
        };


        // C. TRAITEMENT INTELLIGENT DE L'INVENTAIRE (STACKING)
        if (d.inventaire && d.inventaire.length > 0) {
            
            d.inventaire.forEach(item => {
                // 1. On récupère la chaine brute
                let input = item.isKitItem ? item.name : item;
                
                // 2. On parse les données
                const itemData = parseItemString(input);

                // 3. Logique de Stacking
                // On ne stacke que les objets et potions (pas les armes/armures car on peut vouloir les distinguer)
                const stackableTypes = ['objet', 'potion', 'consommable', 'munition']; 
                
                if (stackableTypes.includes(itemData.type)) {
                    // Cherche si un objet identique existe déjà dans la liste à créer
                    const existingItem = itemsToCreate.find(i => 
                        i.name === itemData.name && 
                        i.type === itemData.type
                    );

                    if (existingItem) {
                        // Si oui, on augmente la quantité
                        existingItem.system.quantite = (existingItem.system.quantite || 1) + 1;
                    } else {
                        // Sinon, on le crée avec quantité 1
                        itemData.system.quantite = 1;
                        itemsToCreate.push(itemData);
                    }
                } else {
                    // Les armes et armures ne se stackent pas (entrées séparées)
                    itemData.system.quantite = 1;
                    itemsToCreate.push(itemData);
                }
            });
        }

        if (itemsToCreate.length > 0) {
            await actor.createEmbeddedDocuments("Item", itemsToCreate);
        }

        ui.notifications.info(`Le Héros ${d.nom} est prêt pour l'aventure !`);
        this.close();
        actor.sheet.render(true);
    }
}