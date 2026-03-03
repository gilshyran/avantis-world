export class AvantisTavernGenerator extends Application {

    constructor(options) {
        super(options);
        this.currentTavernData = {};
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "avantis-tavern-generator",
            title: "Générateur de Taverne",
            template: "systems/avantis/templates/apps/tavern-generator.html",
            width: 950,
            height: 850,
            resizable: true,
            classes: ["avantis-tavern-generator-window"]
        });
    }

    // --- DONNÉES (Colle tes données ici) ---
    get tavernData() {
        // !!! COPIE ICI TOUT LE CONTENU DE "const tavernData = { ... };" DE TON FICHEIR JS !!!
        // Je mets un extrait pour la structure :
        return {
            names: ["A la hutte du bois qui chante.","Le guanaco et la chopine.","Au félin astucieux.","A la maison de la demoiselle rieuse.","Le capybara fraceur.","Au levé de l´aube.","Chez Pony, l´alpaga.","Le troll perdu.","La grenouille chanteuse.","Au gîte du bon vivant.","A la renarde qui louche.","Chez Chouchoune, la loutre rieuse.","La pelle et la tasse.","Au piment brûlant.","Au foyer de la demoiselle.","La mandoline et le barde.","A la demeure de la poétesse.","La spatule d´or.","Au bon vivant.","La belette solitaire.","Au repaire de la grenouille.","Au palais des saveurs.","La fille et le bol.","Le comptoir du maïs.","Chez la hyène brailleuse.","Au gourmand insatiable.","Le tigre et la montagne.","Le troll rouge.","L´abeille et la fleur.","A la maison de la salamandre gourmande.","Au faucon mordoré.","A la distillerie de la robe blanche.","Le boeuf en gelé.","A la guêpe jalouse.","A la guivre vorace.","La bonne table.","Au cochon malchanceux.","Au godet brûlant.","A l´iguane aventrier.","L´abeille et la fleur.","Au chat glouton.","La demeure du soleil.","Au lama content.","La salamandre d´azur.","A l´écrevisse ivre.","A la grenouille et l´enclume.","Le jambon braisé.","A la bonne ripaille.","A la maison du poney.","A la distillerie des deux frères.","A la distillerie de la vallée.","A la maison sans sommeil.","A la marmotte qui s´encanaille.","Le rat et la selle.","Sel et vos chevaux.","Au pot brûlant.","La table des gloutons.","Au tonneau d´ivresse.","La table du roi.","A la taverne des sharuhen.","Chez l´aigle et la belette.","La canopée sinople.","Aux lamas qui s´enjaillent.","Le cheval philosophe.","Le gras c´est la vie.","Le vieux feonn.","Le grand-cerf.","A la distillerie de maître Kapulin.","La fourche tordue.","Au foyer des bienheureux.","A la demeure de l´ingénue.","Au bol de la demoiselle.","A la table du bouc.","L´herbe de la voisine.","Au palais du poulet.","La fourchette et le couteau.","Au père spicace.","Au roc doré.","A la hutte, à la deux!","La Chouette Chope","A la cabane des plaisirs buccaux.","Marche ou crêpe","Le nez dans l´assiette.","A la jambe de bois.","La Baguette Magique","A la brasserie d´émeraude.","Le Coq´Art","A la demeure de la coquette ivre.","La Panthère Ose.","A la table de la loutre brailleuse.","Le verre à soi.","Toucan on veut!","La tournée du patron.","Le poisson frétillant.","Vizcacha s´encanaille.","Le rat cueillant.","A l´amante d´amour et de beauté.","La biche chaste.","Au sanglier sympathique.","La grosse biche du patron!","En verre et contre tous.","La marmite des nourrisseurs.","La taverne du joyeux Präst.","A la pieuvre aux mille-pattes.","L’eau tarie.","A la belle histoire.","Les diables au thym.","Amère la cruche!","L´arène des truites.","La vache au plafond.","A la corneille rieuse.","A la pointe de lance.","A la belle gourmande.","La cruche percée.","Juste Douit","Au fléau d´armes.","Savoir et mets.","Savoir et mets.","Au château brisé.","A la sirène qui mange.","Le kraken et la cuirasse.","A la pique à ma broche.","Au rocher oublié.","Au soleil rouge.","A la maison d´albâtre.","Au repaire des six rênes.","Emile et une huître.","La Quiche enchantée.","A la cabane du papillon.","A la lance d´ébène.","L´hermine de rien.","Au repaire de la demoiselle.","A la fille qui louche.","Au corbeau qui danse.","La fourchette et la serviette.","Au comptoir du nourrisseur.","A la tourte brisée.","A l´ours insatiable.","A la maison de la vieille tortue.","A la cloche dorée.","Le prince du bel air.","Le damoiseau en détresse.","Au chef cuisse tôt","L’été à la menthe","A l´ours rouge.","Tournée l´étalon.","Amère la cruche!","La demoiselle en détresse.","L´alpa gars","Chez [Nom Propriétaire]","Chez [Nom Propriétaire]","Chez [Nom Propriétaire]","Chez [Nom Propriétaire]","Chez [Nom Propriétaire]","Chez [Nom Propriétaire]","Chez [Nom Propriétaire]","Chez [Nom Propriétaire]","Chez [Nom Propriétaire]","Chez [Nom Propriétaire]","Chez [Nom Propriétaire]"],
        
            locations: {
    isolé: [
        "rurale située au bord de la rivière Foide.",
        "rurale située au bord de la forêt de Chêneval.",
        "perdue dans les profondeurs d'une forêt dense, où les chants exotiques des oiseaux et des singes bercent les clients.",
        "cachée au cœur de la forêt, accessible uniquement par un sentier à peine visible.",
        "de campagne, perchée au sommet d'une colline avec vue sur les plaines verdoyantes.",
        "rurale cachée dans le fond de la vallée, souvent plongée dans une brume matinale.",
        "posée sur les hauteurs des Andes Dorées, offrant une vue imprenable sur les vallées et les sommets enneigés.",
        "située au sommet d'une colline boisée, tel un phare pour les voyageurs perdus.",
        "située en bordure de la forêt d'Eldoria, entourée de paysages sauvages et de rumeurs de créatures étranges.",
        "nichée au creux d'une petite montagne escarpée, offrant une retraite paisible aux voyageurs fatigués.",
        "se trouvant au bord d'une source d'eau chaude naturelle, entourée de prairies verdoyantes.",
        "située à l'orée d'un sentier qui s'enfonce dans des ruines antiques.",
        "située dans une clairière isolée, réputée pour être un lieu où les étoiles sont particulièrement brillantes.",
        "à l'entrée d'une vaste forêt, offrant un refuge chaleureux avant une longue traversée.",
        "se trouvant au croisement de deux routes commerciales oubliées.",
        "à proximité d'une ancienne mine de fer abandonnée, fréquentée par des prospecteurs et des chasseurs de trésors.",
        "au cœur des montagnes escarpées, où le vent siffle des mélodies étranges entre les pics rocheux.",
        "perdue dans les étendues sauvages, marquant la dernière halte civilisée avant les terres inconnues.",
        "se dressant fièrement sur les rives venteuses du Lac Étoilé, un havre de paix pour les pêcheurs et les mystiques.",
        "cachée parmi les collines ondoyantes de la campagne, à l'abri des regards indiscrets.",
        "surplombant des falaises escarpées battues par les vents marins.",
        "nichée au creux d'une vallée verdoyante, traversée par une rivière aux eaux cristallines.",
        "posée sur les rives calmes d'un lac où le reflet des astres illumine les nuits paisibles.",
        "enfouie dans les bois profonds de la Forêt des Murmures, où les arbres semblent chuchoter des secrets.",
        "surplombant les collines vallonnées, offrant une vue panoramique sur des champs dorés parsemés de monolithes anciens.",
        "au cœur de la vallée luxuriante de Qochamarka, où les cascades offrent une musique apaisante.",
        "dressée sur les rives paisibles du fleuve Urpichay, au milieu des palmiers et des plantes tropicales.",
        "perdue dans les montagnes brumeuses de Yanatin, où seules quelques lumières vacillantes trahissent sa présence.",
        "nichée au creux d'une vallée isolée, seul lieu de repos pour des kilomètres à la ronde.",
        "cachée au fond de la jungle dense de Pantia, où le murmure des feuilles est le seul son à troubler le silence."
    ],
    village: [
        "située sur la seule route pavée du village.",
        "rurale située au bord de la rivière Foide, près du vieux pont de pierre.",
        "au centre d'une paisible bourgade, entourée de champs verdoyants et de vergers en fleurs.",
        "au cœur d'un petit village pittoresque, accueillant habitants locaux et voyageurs de passage.",
        "rustique se trouvant au bord d'une rivière paisible, lieu de rassemblement préféré des villageois.",
        "colorée, trônant au centre du marché animé qui a lieu deux fois par semaine.",
        "blottie au cœur du hameau paisible de Pierrebrume, célèbre pour ses traditions ancestrales.",
        "bordant la place centrale du village de Chantemer, près du puits communal.",
        "annonçant l'entrée du village de Clairlune, juste après le panneau en bois sculpté.",
        "dressée sur la place animée du village, face à la statue d'un héros local oublié.",
        "au cœur du village, où les maisons en terre cuite se dressent contre les montagnes.",
        "dominant la place centrale du village d'Ayllu, où les traditions anciennes sont célébrées chaque nuit.",
        "encastrée entre les ruelles étroites et pavées du village.",
        "annonçant l'entrée du village fortifié, dont les remparts protègent des dangers de la jungle.",
        "abritée au cœur du village pittoresque de Kallpa, en harmonie avec la nature luxuriante.",
        "dressée au bord du lac sacré, où les pêcheurs vendent leur prise du jour sur la place.",
        "encastrée entre les collines verdoyantes, où les toits de chaume se fondent dans le paysage.",
        "surplombant les champs fertiles, offrant une vue imprenable sur les cultures en terrasses.",
        "abritée au pied des ruines antiques de Wanakawri, servant de point de départ aux explorateurs.",
        "perchée sur les hauteurs de la vallée, où les champs de maïs ondulent sous le vent.",
        "à l'entrée du village, offrant une vue imprenable sur la vallée et les montagnes.",
        "située entre les vignobles fertiles, où les ceps chargés de raisins promettent une récolte abondante.",
        "au cœur de la vaste plaine d'Anta, où les troupeaux de lamas paissent paisiblement.",
        "le long des pentes fertiles de la vallée, où les cultures en terrasse s'étendent à perte de vue.",
        "dans un petit village au cœur de la jungle, où les chants des oiseaux exotiques résonnent.",
        "établie près des sources chaudes de la région, où les eaux thermales apaisent les corps fatigués.",
        "au coeur d'un village perché sur les flancs escarpés d'un canyon, où les condors planent majestueusement.",
        "nichée au bord des ruines mystérieuses de Kuelap, attirant chercheurs de trésors et curieux.",
        "rurale à l'entrée d'un petit village pittoresque, juste à côté de l'étable commune.",
        "au coeur d'un village à l'allure paisible mais où, étrangement, on ne rencontre aucun homme."
    ],
    cité: [
        "urbaine, située dans une sombre ruelle réputée pour ses coupe-jarrets.",
        "urbaine, située au croisement de deux rues animées, juste en face d'un poste de garde.",
        "située au cœur du quartier commerçant, entre une boulangerie et une boutique de tissus.",
        "urbaine, située sur la place centrale du quartier, à l'ombre de la tour de l'horloge.",
        "nichée au cœur de la vieille ville, entre des ruelles sinueuses et des bâtiments historiques.",
        "située dans le quartier des artisans, où l'on entend le martèlement des forgerons et le chant des sculpteurs.",
        "portuaire, située sur le quai principal du port, imprégnée de l'odeur du sel et du poisson.",
        "située en plein cœur du quartier des aventuriers, à proximité de la guilde des mercenaires.",
        "se trouvant au croisement des grandes rues, au cœur de la cité, un carrefour de voyageurs.",
        "située au cœur du quartier festif, où la musique et les rires ne s'arrêtent jamais.",
        "dans la rue la plus animée de la cité, elle attire une clientèle diverse, des marchands aux aventuriers.",
        "nichée parmi les tours imposantes et les murailles fortifiées de la cité.",
        "à proximité des quartiers populaires et des bas-fonds turbulents, là où les histoires naissent.",
        "enveloppée par l'ombre des bâtiments imposants du quartier administratif.",
        "étincelante sous les lumières du quartier des plaisirs, où la fête et l'excès sont monnaie courante.",
        "tapie dans l'ombre des remparts du quartier des assassins, où chaque rue cache un secret.",
        "trônant au croisement des artères commerçantes du quartier marchand, pulsant au rythme du commerce.",
        "surplombant la rue principale du quartier artisanal, où les étals regorgent d'objets faits à la main.",
        "encastrée dans les murs de la vieille ville, où chaque bâtiment raconte une histoire de siècles passés.",
        "dominant le quartier portuaire, où les marins fatigués viennent chercher refuge après de longues traversées.",
        "perchée sur les hauteurs du quartier des nobles, où les riches et puissants se retrouvent pour leurs intrigues.",
        "perchée sur les hauteurs du quartier marchand de Tawan, où les marchands de tout Khora échangent leurs marchandises.",
        "située au cœur du quartier des artistes, où peintres et sculpteurs exposent leurs œuvres dans une ambiance bohème.",
        "surplombant le port animé de Yaku Mama, où les pêcheurs déchargent leurs prises fraîches.",
        "dominant la place du marché du quartier des artisans, où les musiciens envoûtent les foules.",
        "encastrée entre les tours imposantes de la cité, où les échoppes colorées bordent les ruelles.",
        "dominant la place centrale de la cité cosmopolite, où les cultures se mélangent.",
        "dressée au centre du quartier marchand animé, où les rues débordent de vie et de couleurs.",
        "trônant sur les rives du fleuve, elle offre une vue imprenable sur les eaux scintillantes de la cité.",
        "encastrée entre les murailles du quartier religieux, où les präst vaquent à leurs prières, non loin d'autres temples."
    ]
},
            neighbors: {
    isolé: [
        "Un vieux moulin abandonné, dont les ailes grincent sinistrement les nuits de grand vent.",
        "Un ancien temple envahi par la végétation, où des murmures se font parfois entendre.",
        "Un moulin à eau en ruine, dont la roue est bloquée par des débris.",
        "Un ancien autel dédié à une divinité inconnue, couvert de mousse et de gravures étranges.",
        "Une mine abandonnée, dont l'entrée béante semble exhaler un air glacial.",
        "Un moulin à vent en activité, dont les pales tournent au rythme constant du vent des plaines.",
        "Une ferme prospère, d'où proviennent les meilleurs produits de l'auberge.",
        "Une clairière paisible, parfaite pour un campement... ou une embuscade.",
        "Une forêt dense et sombre, que même les locaux hésitent à traverser la nuit.",
        "Un étang cristallin, réputé pour ses poissons aux écailles argentées.",
        "Une cascade majestueuse qui se jette dans un gouffre sans fond.",
        "Une source d'eau pure aux propriétés curatives, selon les légendes locales.",
        "Un bosquet de fleurs rares qui ne s'ouvrent qu'à la pleine lune.",
        "Une grotte sacrée, où les habitants viennent faire des offrandes aux esprits de la montagne.",
        "Un arbre millénaire dont les branches semblent toucher les nuages.",
        "Une ruine des Anciens, vestige d'une cité disparue dont les secrets n'ont pas encore été dévoilés.",
        "Un tumulus ancien, que la rumeur dit hanté par un esprit gardien.",
        "Une clairière de champignons vénéneux aux couleurs vives et chatoyantes.",
        "Un bâtiment du peuple des Anciens en ruine, dont la technologie semble encore fredonner doucement.",
        "Une étrange rangée de menhirs de granit, alignés sur le lever du soleil au solstice.",
        "Une étrange porte de métal rouillée, scellée dans la paroi d'une colline.",
        "Un passage caché derrière une cascade, menant à une grotte secrète.",
        "Un ermitage abandonné, autrefois lieu de méditation pour les ascètes.",
        "Un marécage mystérieux, où des feux follets dansent au-dessus des eaux sombres."
    ],
    village: [
        "Un cimetière oublié où les noms sur les pierres tombales sont effacés par le temps.",
        "Une place avec un puits central. Chaque matin, les habitants viennent y chercher de l'eau et échanger les derniers potins.",
        "Un verger de manguiers sauvages, dont les fruits sont la fierté du village.",
        "Une forge en activité, dont le martèlement rythme la vie du village.",
        "Un marchand ambulant qui installe son étal juste à côté, espérant attirer les clients de l'auberge.",
        "Une petite ferme avec quelques buffles des plaines ou des alpagas qui broutent paisiblement.",
        "Une écurie où l'on peut louer des montures locales, comme des nandous ou des lamas.",
        "Une ancienne carrière de pierre, maintenant remplie d'eau et servant de lieu de baignade aux enfants.",
        "Quelques maisons de pêcheurs le long de la rivière, avec des filets qui sèchent au soleil.",
        "Un vieux pont que les villageois nomment 'le pont qui grince', très utile pour traverser la rivière tumultueuse.",
        "Un petit pont de bois traversant un ruisseau paisible, lieu de rendez-vous des amoureux.",
        "La maison de l'herboriste du village, entourée d'un jardin aux mille parfums.",
        "Un terrain d'entraînement rudimentaire pour la milice locale.",
        "La maison du chef du village, légèrement plus grande que les autres et ornée de sculptures.",
        "Un autel en plein air dédié à Sol Hag, où les villageois déposent des offrandes.",
        "Une petite teinturerie dont les tissus colorés sèchent au vent, peignant la ruelle de couleurs vives.",
        "Un four à pain communal, d'où s'échappe une odeur alléchante chaque matin.",
        "Une place de marché animée, où les habitants échangent des produits et des nouvelles.",
        "Une distillerie de Pisco en activité, où les locaux produisent la célèbre boisson.",
        "Une fabrique de poteries, où les artisans façonnent des ustensiles et des objets décoratifs.",
        "Une école de jeunes apprentis, où les enfants du village apprennent les métiers traditionnels."
    ],
    cité: [
        "Un observatoire astronomique, dont le dôme de cuivre brille sous la lune.",
        "Une armurerie bien achalandée, dont le propriétaire est souvent un client de la taverne.",
        "Un cimetière bien entretenu, réservé aux familles les plus riches de la cité.",
        "Un marché animé chaque matin, qui réveille le quartier avec ses cris et ses odeurs.",
        "L'échoppe d'un herboriste dont les parfums d'épices et d'encens embaument la rue.",
        "Une vieille bibliothèque dont les parchemins sont jalousement gardés par un bibliothécaire acariâtre.",
        "Une boutique d'accessoires et d'équipements pour aventuriers, toujours pleine de clients.",
        "Une boutique de pierres de Vrill, discrète et lourdement gardée.",
        "Une criée animée sur le port, où le poisson frais est vendu à la première heure.",
        "Le quartier des artistes, où musiciens de rue et peintres cherchent l'inspiration.",
        "Un temple majestueux dédié à une divinité locale, dont les cloches sonnent à heures fixes.",
        "Une halle aux marchands où s'échangent les marchandises les plus exotiques.",
        "Un bureau des doléances, où les citoyens viennent se plaindre des taxes et des gardes.",
        "Une autre taverne, clairement concurrente, de l'autre côté de la rue.",
        "Un quartier résidentiel dense et animé, où la vie ne s'arrête jamais vraiment.",
        "Un autel à la gloire du Soleil Dieu, toujours fleuri et entretenu par les Prästs.",
        "Le quartier des plaisirs, où les maisons closes et les salles de jeux promettent des nuits sans fin.",
        "Un musée sur l'histoire de la région, souvent désert mais rempli de trésors.",
        "Une académie des Gardiens de la Lumière, d'où l'on peut entendre le choc des épées d'entraînement.",
        "Le siège d'une guilde marchande puissante, dont les gardes surveillent attentivement les allées et venues.",
        "Une ruelle mal famée où l'on peut entendre des disputes et des paris clandestins.",
        "Une arène de combat clandestine, dissimulée dans les sous-sols d'un entrepôt.",
        "Une ambassade d'une région lointaine, reconnaissable à son architecture unique et à sa garde exotique.",
        "Un grand théâtre où se jouent les pièces les plus populaires de la cité."
    ]
},
            structures: {   
    faible: [
    { description: "Une enseigne peu attrayante, dont les boiseries ternies donnent une impression d'abandon.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_001.jpg"},
    { description: "Une bâtisse trapue aux murs crasseux, dont s'échappe une fumée noire et odorante.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_002.jpg"},
    { description: "Un simple abri de bois assemblé à la hâte, dont la porte grince sinistrement à chaque bourrasque.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_003.jpg"},
    { description: "Une batisse de mauvaise qualité et non entretenue.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_004.jpg"},
    { description: "Une enseigne peu attrayante, dont les boiseries ternies et les chandeliers rouillés donnent une impression d'abandon.",image: "https://avantis.world/gen/perso/IMG/tavern/IF_005.jpg"},
    { description: "Un bâtiment en ruine, où les visiteurs doivent faire attention où ils mettent les pieds pour éviter les planches pourries et les escaliers délabrés.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_006.jpg" },
    { description: "Une chaumière solitaire, dont les fondations s'affaissent et les fenêtres sont voilées de toiles d'araignée.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_007.jpg"},
    { description: "Une chaumière rustique avec un toit de chaume et des murs en pierre.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_008.jpg"},
    { description: "Une tour de guet abandonnée, envahie par la végétation et marquée par les intempéries.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_009.jpg"},
    { description: "Une maison aux allures décrépites, avec des rideaux déchirés aux fenêtres et des tapis usés recouvrant un sol inégal.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_010.jpg"},
    { description: "Un bâtiment orné de sculptures en bois représentant un broc et des couverts, à moitié cassé et usées par le temps.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_011.jpg"},
    { description: "Une batisse rustique en pierre, recouvert de mousse et de plantes grimpantes.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_012.jpg"},
    { description: "Une batisse avec un jardin à l'abandon et d'une terrasse en bois partiellement dégradée.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_013.jpg"},
    { description: "Une batisse robuste en pierre de taille, avec un toit de chaume.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_014.jpg"},
    { description: "Une cabane en bois délabrée, avec des planches disjointes et un toit partiellement effondré.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_015.jpg"},
    { description: "Un refuge en pierre brute, aux murs fissurés et à la charpente exposée.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_016.jpg"},
    { description: "Une maison en argile séchée au soleil, dont les murs montrent des signes d'effritement et de dégradation.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_017.jpg"},
    { description: "Une cabane de pêcheurs sur pilotis, dont les planches pourrissent lentement sous l'effet de l'humidité.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_018.jpg"},
    { description: "Une cabane de chasseur dans les bois, aux murs de rondins ébréchés et au toit de chaume en partie envolé.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_019.jpg"},
    { description: "Une maison sommaire en bois brut, avec des planches disjointes et un toit de chaume qui fuit par endroits.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_020.jpg"},
    { description: "Une bâtisse délabrée aux murs ébréchés et aux fenêtres ternies par la crasse.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_021.jpg"},
    { description: "Un bâtiment bas de gamme en terre battue, avec des poutres pourries et des portes qui grincent.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_022.jpg"},
    { description: "Une bâtisse de qualité inférieure, où les lattes du plancher sont disjointes et les chaises instables.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_023.jpg"},
    { description: "Une bicoque insalubre, dont les murs sont tachés d'humidité et les tables collantes de résidus.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_024.jpg"},
    { description: "Une chaumière en piteux état, avec un toit de paille affaissé et des portes qui peinent à se fermer.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_025.jpg"},
    { description: "Un bâtiment de qualité médiocre, avec des chaises bancales et des nappes tachées sur les tables.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_026.jpg"},
    { description: "Une batisse peu accueillante, où l'odeur de moisi se mêle aux relents de cuisine rance.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_027.jpg"},
    { description: "Une bicoque négligée, dont les murs en terre battue sont fissurés et laissent entrer les courants d'air.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_028.jpg"},
    { description: "Un bâtiment à moitié abandonné, où les tuiles du toit manquent par endroits et où les portes grincent sur leurs gonds rouillés.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_029.jpg"},
    { description: "Une maison en bois vermoulu, où les chaises vacillent et les tables sont ébréchées, témoignant d'un manque d'entretien flagrant.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_030.jpg"},
    { description: "Un établissement mal entretenu, où les lampes à huile éclairent faiblement des murs lézardés et des tapis poussiéreux.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_031.jpg"},
    { description: "Une chaumière à l'abandon, avec des volets battants et des portes qui claquent au moindre souffle de vent.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_032.jpg"},
    { description: "Une bicoque lugubre, où les murs suintent d'humidité et où l'odeur de moisi est omniprésente.", image: "https://avantis.world/gen/perso/IMG/tavern/IF_033.jpg"}
  ],
    moyenne: [
    { description: "Une maison de qualité moyenne, réputée pour sa simplicité et son rapport qualité-prix.", image: "https://avantis.world/gen/perso/IMG/tavern/IM_001.jpg"},
    {description: "Une auberge de relais en pierre, solide et sans fioritures, appréciée des voyageurs pour son lit propre et son repas chaud.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_002.jpg"},
    {description: "Une maison de qualité moyenne attirant beaucoup de monde pour sa simplicité et son rapport qualité prix.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_003.jpg"},
    {description: "Un bâtiment taillé dans la roche avec des piliers de soutènement.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_004.jpg"},
    {description: "Une maison en bois avec des sculptures de feuilles et de branches.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_005.jpg"},
    {description: "Un chalet en bois avec un toit de chaume et des murs ornés de peintures tribales.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_006.jpg"},
    {description: "Une bâtisse en pierre avec des colonnes imposantes et des statues d'animaux à l'entrée.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_007.jpg"},
    {description: "Une bâtisse en bois de chêne avec des cordages décoratifs et des filets de pêche suspendus.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_008.jpg"},
    {description: "Un bâtiment en pierre à l'architecture robuste.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_009.jpg"},
    {description: "Un bâtiment à colombages avec une façade ornée de sculptures de chopines et de pièces d'or.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_010.jpg"},
    {description: "Un chalet en bois élégamment sculpté, avec des statues illustrant très bien le nom de l'enseigne.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_011.jpg"},
    {description: "Une auberge rustique en pierre, avec des cheminées fumantes et des poutres apparentes.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_012.jpg"},
    {description: "Une maison de style champêtre, avec des jardins fleuris et des terrasses ombragées.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_013.jpg"},
    {description: "Une maison solide en pierre brute, avec des trophées de chasse accrochés aux murs.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_014.jpg"},
    {description: "Une enseigne élégante en pierre de lune, avec des sculptures illustrant très bien le nom de l'enseigne ornant les piliers.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_015.jpg"},
    {description: "Une bâtisse robuste en pierre de taille, avec un toit de chaume et des enseignes colorées.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_016.jpg"},
    {description: "Une enseigne accueillante en bois massif avec une devanture simple mais entretenue.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_017.jpg"},
    {description: "Une maison à colombages avec des façades colorées et des volets sculptés, témoignant d'un savoir-faire artisanal.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_018.jpg"},
    {description: "Une batisse en pierre de taille, dotée de fenêtres à petits carreaux et d'un toit de tuiles rouges.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_019.jpg"},
    {description: "Une maison à l'architecture traditionnelle, ornée de guirlandes de fleurs et de lanternes en osier.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_020.jpg"},
    {description: "Une maison de village en adobe, avec des murs épais et des terrasses ombragées par des auvents en paille.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_021.jpg"},
    {description: "Un bâtiment communautaire en bois, avec une grande cheminée centrale et des poutres richement sculptées.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_022.jpg"},
    {description: "Un bâtiment avec une façade blanchie à la chaux et des balcons fleuris.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_023.jpg"},
    {description: "Une chaumière au toit de paille, avec des murs blanchis à la chaux et des volets peints en bleu vif.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_024.jpg"},
    {description: "Une maison de village avec des murs en pisé et des fenêtres à arcades, témoignant d'une architecture traditionnelle.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_025.jpg"},
    {description: "Une bâtisse en bois avec une façade colorée et des enseignes bien entretenues, mais aux fenêtres parfois coincées.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_026.jpg"},
    {description: "Une maison à l'architecture traditionnelle, avec des murs en pierre de taille et des poutres apparentes, mais dont la décoration intérieure est modeste.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_027.jpg"},
    {description: "Une maison ordinaire, où les boiseries sont bien cirées et les tables régulièrement essuyées, mais où l'ambiance manque de chaleur.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_028.jpg"},
    {description: "Une enseigne correcte, où les plats servis sont simples mais bien préparés, et où le service est efficace sans être remarquable.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_029.jpg"},
    {description: "Un bâtiment de bonne facture, avec une terrasse bien aménagée et des parasols pour protéger du soleil, mais un mobilier un peu vieillot.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_030.jpg"},
    {description: "Une batisse bien tenue, où l'accueil est chaleureux et les tarifs raisonnables, mais où l'insonorisation laisse à désirer.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_031.jpg"},
    {description: "Une enseigne convenable, où les serveurs sont courtois et les clients respectés, mais où l'offre de boissons est limitée.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_032.jpg"}
  ],
    elevee: [
    {description: "Une maison de qualité moyenne, réputée pour sa simplicité et son rapport qualité-prix.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_001.jpg"},
    {description: "Une auberge de relais en pierre, solide et sans fioritures, appréciée des voyageurs pour son lit propre et son repas chaud.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_002.jpg"},
    {description: "Une maison de qualité moyenne attirant beaucoup de monde pour sa simplicité et son rapport qualité prix.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_003.jpg"},
    {description: "Un bâtiment taillé dans la roche avec des piliers de soutènement.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_004.jpg"},
    {description: "Une maison en bois avec des sculptures de feuilles et de branches.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_005.jpg"},
    {description: "Un chalet en bois avec un toit de chaume et des murs ornés de peintures tribales.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_006.jpg"},
    {description: "Une bâtisse en pierre avec des colonnes imposantes et des statues d'animaux à l'entrée.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_007.jpg"},
    {description: "Une bâtisse en bois de chêne avec des cordages décoratifs et des filets de pêche suspendus.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_008.jpg"},
    {description: "Un bâtiment en pierre à l'architecture robuste.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_009.jpg"},
    {description: "Un bâtiment à colombages avec une façade ornée de sculptures de chopines et de pièces d'or.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_010.jpg"},
    {description: "Un chalet en bois élégamment sculpté, avec des statues illustrant très bien le nom de l'enseigne.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_011.jpg"},
    {description: "Une auberge rustique en pierre, avec des cheminées fumantes et des poutres apparentes.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_012.jpg"},
    {description: "Une maison de style champêtre, avec des jardins fleuris et des terrasses ombragées.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_013.jpg"},
    {description: "Une maison solide en pierre brute, avec des trophées de chasse accrochés aux murs.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_014.jpg"},
    {description: "Une enseigne élégante en pierre de lune, avec des sculptures illustrant très bien le nom de l'enseigne ornant les piliers.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_015.jpg"},
    {description: "Une bâtisse robuste en pierre de taille, avec un toit de chaume et des enseignes colorées.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_016.jpg"},
    {description: "Une enseigne accueillante en bois massif avec une devanture simple mais entretenue.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_017.jpg"},
    {description: "Une maison à colombages avec des façades colorées et des volets sculptés, témoignant d'un savoir-faire artisanal.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_018.jpg"},
    {description: "Une batisse en pierre de taille, dotée de fenêtres à petits carreaux et d'un toit de tuiles rouges.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_019.jpg"},
    {description: "Une maison à l'architecture traditionnelle, ornée de guirlandes de fleurs et de lanternes en osier.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_020.jpg"},
    {description: "Une maison de village en adobe, avec des murs épais et des terrasses ombragées par des auvents en paille.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_021.jpg"},
    {description: "Un bâtiment communautaire en bois, avec une grande cheminée centrale et des poutres richement sculptées.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_022.jpg"},
    {description: "Un bâtiment avec une façade blanchie à la chaux et des balcons fleuris.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_023.jpg"},
    {description: "Une chaumière au toit de paille, avec des murs blanchis à la chaux et des volets peints en bleu vif.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_024.jpg"},
    {description: "Une maison de village avec des murs en pisé et des fenêtres à arcades, témoignant d'une architecture traditionnelle.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_025.jpg"},
    {description: "Une bâtisse en bois avec une façade colorée et des enseignes bien entretenues, mais aux fenêtres parfois coincées.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_026.jpg"},
    {description: "Une maison à l'architecture traditionnelle, avec des murs en pierre de taille et des poutres apparentes, mais dont la décoration intérieure est modeste.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_027.jpg"},
    {description: "Une maison ordinaire, où les boiseries sont bien cirées et les tables régulièrement essuyées, mais où l'ambiance manque de chaleur.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_028.jpg"},
    {description: "Une enseigne correcte, où les plats servis sont simples mais bien préparés, et où le service est efficace sans être remarquable.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_029.jpg"},
    {description: "Un bâtiment de bonne facture, avec une terrasse bien aménagée et des parasols pour protéger du soleil, mais un mobilier un peu vieillot.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_030.jpg"},
    {description: "Une batisse bien tenue, où l'accueil est chaleureux et les tarifs raisonnables, mais où l'insonorisation laisse à désirer.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_031.jpg"},
    {description: "Une enseigne convenable, où les serveurs sont courtois et les clients respectés, mais où l'offre de boissons est limitée.",image: "https://avantis.world/gen/perso/IMG/tavern/IM_032.jpg"}
  ]
},
            staff: { countByQuality: { faible: [0, 1], moyenne: [1, 3], elevee: [2, 5] }, roles: { masculin: ["Cuisinier", "Serveur", "Barman", "Palefrenier"], feminin: ["Cuisinière", "Serveuse", "Barmaid", "Femme de chambre"] } },
        ownerRelationships: { masculin: ["le compagnon", "un cousin", "le frère", "un neveu", "un ami", "un ami d'enfance"], feminin: ["la compagne", "la cousine", "la soeur", "la nièce", "une amie", "l'amie d'enfance"] },
        
            drinks: {
            faible: [
                { name: "Pinte de bière locale douteuse", priceRange: [1, 2] },
                { name: "Café", priceRange: [1, 2] },
                { name: "Vin de table âpre", priceRange: [1, 3] },
                { name: "Lait d'alpage (pas très frais)", priceRange: [1, 3] },
                { name: "Mate de coca : infusion de feuilles de coca (très diluée)", priceRange: [1, 3] },
                { name: "Pulque", priceRange: [2, 5] },
                { name: "Vin de table âpre", priceRange: [2, 3] },
                { name: "Bière de patate douce et maïs, légèrement sucrée.", priceRange: [1, 3] },
                { name: "Alcool fort de maïs. (Extrêment fort)", priceRange: [2, 6] },
                { name: "Alcool de piment : macération de piments dans un alcool fort", priceRange: [2, 5] },
                { name: "Alcool de champignon.", priceRange: [2, 6] },
                { name: "Eau du puits", priceRange: [0, 0] }],
                
            moyenne: [
                { name: "Cerveza de quinoa : bière légère brassée à partir de quinoa.", priceRange: [2, 5] },
                { name: "Pisco maison", priceRange: [7, 12] },
                { name: "Pisco de Rougerive.", priceRange: [7, 12] },
                { name: "Chicha de molle : alcool doux à base de baies de poivrier rose (effet hallucinogène léger).", priceRange: [2, 5] },
                { name: "Aguadiente de canne : eau-de-vie brute issue de la canne à sucre (Rhum).", priceRange: [7, 12] },
                { name: "Alcool de cacao : fermentation de pulpe de cacao, goût fruité-acidulé.", priceRange: [4, 10] },
                { name: "Mate de coca : infusion de feuilles de coca.", priceRange: [2, 5] },
                { name: "Alcool de piment : macération de piments dans un alcool fort.", priceRange: [9, 15] },
                { name: "Liqueur de café sauvage : infusion alcoolisée de grains de café.", priceRange: [5, 9] },
                { name: "Bière de patate douce rouge, sucrée et ambrée.", priceRange: [2, 5] },
                { name: "Vin de cactus : fermentation de pulpe de cactus fruité (genre figue de barbarie).", priceRange: [2, 5] },
                { name: "Hydromel aux herbes de montagne : miel fermenté parfumé avec cannelle, coriandre ou poivre.", priceRange: [7, 15] },
                { name: "Vin aux fruits macérés.", priceRange: [5, 10] },
                { name: "Pulque (alcool d´agave).", priceRange: [7, 12] },
                { name: "Alcool fort de maïs.", priceRange: [7, 12] },
                { name: "Alcool de champignon.", priceRange: [4, 12] },
                { name: "Lait d'alpaga frais", priceRange: [3, 7] }],
                
            elevee: [
                { name: "Emoliente : boisson chaude médicinale à base d’orge grillée, herbes, citron.", priceRange: [8, 13] },
                { name: "Vin blanc d'Astoria", priceRange: [15, 50] },
                { name: "Aguadiente de canne : eau-de-vie brute issue de la canne à sucre.", priceRange: [20, 40] },
                { name: "Pisco de Rougerive.", priceRange: [7, 12] },
                { name: "Chicha de molle : alcool doux à base de baies de poivrier rose (effet hallucinogène léger).", priceRange: [8, 20] },
                { name: "Aguadiente de canne : eau-de-vie brute issue de la canne à sucre (Rhum).", priceRange: [20, 40] },
                { name: "Alcool de cacao : fermentation de pulpe de cacao, goût fruité-acidulé.", priceRange: [20, 40] },
                { name: "Mate de coca : infusion de feuilles de coca.", priceRange: [10, 20] },
                { name: "Agua de cebada : eau d’orge grillée, légèrement sucrée.", priceRange: [9, 25] },
                { name: "Liqueur de café sauvage : infusion alcoolisée de grains de café.", priceRange: [10, 15] },
                { name: "Bière de patate douce rouge, sucrée et ambrée.", priceRange: [8, 15] },
                { name: "Vin de cactus : fermentation de pulpe de cactus fruité (genre figue de barbarie).", priceRange: [8, 20] },
                { name: "Hydromel aux herbes de montagne : miel fermenté parfumé avec cannelle, coriandre ou poivre.", priceRange: [20, 40] },
                { name: "Refresco de quinoa : boisson rafraîchissante de quinoa cuit, citron et miel.", priceRange: [8, 20] },
                { name: "Chicha morada : boisson non alcoolisée de maïs violet, cannelle, fruits.", priceRange: [8, 20] },
                { name: "Hydromel keldar épicé", priceRange: [80, 110] }]
            
        },
            menu: { repasSimple: ["Une tourte de brocolis et de fèves.","Une soupe de maïs et de pommes de terre, du pain de maïs et du fromage frais.","Une salade de quinoa, des empanadas au poulet et aux légumes.","Des tortillas de maïs, du guacamole, des haricots noirs et du riz.","Un sandwich au jambon et au fromage de lama.","Des pâtes à la sauce tomate et au basilic.","Une omelette aux champignons et au fromage, du pain grillé et du beurre.","Un bol de riz au lait et aux raisins secs, des fruits secs et des noix.","Une crêpe au lard et au fromage.","Des petits poissons grillées, du couscous aux légumes.","Des beignets de potiron et de miel.","Une bouillie de maïs agrementée d´un peu de viande.","Coeur de buffle mariné et grillé en brochette.","Une soupe de pois cassés, du pain et du fromage, des raisins secs.","Une salade de lentilles et de carottes, des galettes de maïs et de fromage.","Un gratin de pommes de terre, de crème et de fromage.","Une soupe de quinoa et de légumes, du pain de maïs et du fromage","Une salade de pommes de terre, de tomates et de coriandre","Des galettes de viande hachée et de fromage","Criquets et sauterelles grillés accompagné d´un peu de charcuterie.","Cuisse de grenouille, maïs grillé, salade.","Serpent grillé à la broche, pain de maïs.","Soupe de légumes et de noix.","Pommes de terre rôties au sel et aux herbes.","Soupe claire de courge.","Ragoût de fèves et d’herbes sauvages, avec un peu de piment.","Galette de quinoa et œuf battu.","Potée de chou, pommes de terre et petit morceaux de viande de capybara.","Viande séchée (type charqui) avec un peu de maïs.","Soupe épaisse de riz, haricots et coriandre.","Courges farcies de riz et de légumes.","Petit poisson séché ou grillé, mangé avec du pain de maïs.","Œufs durs, galettes de maïs et un peu de sauce au piment.","Ragoût de lentilles, carottes","Choclo con queso : gros épis de maïs bouilli avec du fromage.","Mazamorra de maïs : bouillie épaisse de maïs avec un peu de miel ou de fruits secs.","Charqui con mote : viande séchée (lama, alpaga, bœuf) avec du maïs bouilli.","Tamales : pâte de maïs farcie (viande, légumes ou simplement épices) cuite dans des feuilles de maïs.","Cuy rôti (cochon d’Inde), servi avec des pommes de terre.","Ají de verduras : ragoût simple de légumes parfumé avec du piment doux.","Soupe de légumes racines : pommes de terre, carottes, oca, yuca, parfois épaissie avec du lait ou du fromage.","Maïs grillé (cancha), croquant, servi comme collation.","Farofa : farine de manioc grillée avec un peu d’oignon ou de graisse.","Feijão com arroz : riz blanc avec haricots noirs ou rouges, parfois juste assaisonnés.","Pamonha : bouillie de maïs sucrée ou salée, cuite dans ses feuilles.","Frango ensopado : poulet mijoté avec tomates, oignons et herbes.","Beiju de tapioca : galette de manioc, nature ou avec fromage."], repasNormal: { principal: ["Une volaille rôti sauce aigre-douce aux épices garnie de ","Du ragoût de tripes à la rougerivienne agrémenté de ","Un rôti de porc aux trois sauces (sauve verde, sauce cameline et aillée) accompagné de ","Des brochettes de viande marinées et grillées accompagnées de ","Poisson grillé et sa sauce au citron complété de ","Empanadas au poulet et aux légumes accompagnées de ","Des oeufs aux plats et du jambon cru complétés de ","Un rôti de buffle aux herbes accompagnées de ","Du poisson mariné au citron vert et au piment enrichi de ","Poulet au curry et au lait de coco garni de ","Une tourte à la viande complétée de ","Viande rôti accompagnée de ","Poisson grillé complétés de ","Un pâté de viande, charcuterie, complété de ","Viande de crocodile garnie de ","Ragoût de guanaco agrémenté de ","Vizcacha (lapin) et sa sauce pimentée, accompagné de ","Capybara à la broche ou rôti, complété de ","Volaille farcie aux fruits secs, complétée de ","Galettes de viande hachée complétés de ","Un pâté de viande et de légumes, garni de ","Jambon fumé accompagné de ","Terrine de viande et épice, complétée de ","Ragoût de lama ou d’alpaga","Maïs rôti au feu, avec une sauce d’herbes pilées.","Soupe de poisson du lac (type truite) complétés de ","Tamales farcis de viande épicée et d’œufs durs, ","","Empanadas garnies de bœuf, oignons, olives et œuf dur, accompagnées de ","Cuy rôti (cochon d’Inde) farci aux herbes et noix, ","Ragoût de haricots blancs au fromage et coriandre, accompagné de ","Ragoût de haricots noirs, avec diverses viandes salées ou fumées, ","Poisson mijoté avec lait de coco, tomates, oignons et coriandre, ","Des brochettes de viande marinées et grillées accompagnées de ","Poisson grillé et sa sauce au citron complété de ","Empanadas au poulet et aux légumes accompagnées de ","Des oeufs aux plats et du jambon cru complétés de ","Un rôti de buffle aux herbes accompagnées de ","Du poisson mariné au citron vert et au piment enrichi de ","Poulet au curry et au lait de coco garni de ","Une tourte à la viande complétée de ","Viande rôti accompagnée de ","Poisson grillé complétés de ","Un pâté de viande, charcuterie, complété de ","Viande de crocodile garnie de ","Ragoût de guanaco agrémenté de ","Vizcacha (lapin) et sa sauce pimentée, accompagné de "], accompagnement: ["feuilles de mâche et de laitues en salade.","confiture de coings et taro ou quinoa.","légumes locaux et champignons.","haricots noirs et du riz, une crème de potiron et de cannelle.","salade, fèves grillées et fromage au lait d´alpaga.","pommes de terre relevé d´épice et graines d´amarante.","salade de taro, patate douce et quinoa.","couscous aux raisins secs et graines.","pommes de terres, topinambour, piment et courge.","galettes de maïs et de fromage.","lasagnes à la courge et amarante.","gratin de pommes de terre, de crème et de fromage.","salade de pommes de terre, de tomates et de coriandre","quinoa et galette de manioc.","maïs grillé et taro cuit à l´eau.","couscous aux légumes, des beignets de potiron et de miel.","tortillas de maïs et guacamole","légumes du potager","gratin de pommes de terre, de crème et de fromage.","haricots et fèves.","légumes grillées cuisinés dans le gras de viande.","chou, carotte et poivron.","pomme de terre et topinambour.","quelques morceaux de fromage frais.","aux pommes de terre et quinoa","au lait et aux herbes","pommes de terre rôties au sel et herbes","patates douces grillées","maïs grillé (cancha crocante)","épis de maïs bouillis au beurre et fromage","quinoa cuit à la vapeur, parfumé d’herbes","haricots mijotés avec oignons et coriandre","galettes de maïs farcies au fromage","légumes racines variés (oca, mashua) cuits à la cendre","salade de fèves vertes avec oignons","purée rustique de pommes de terre et fromage","galettes de maïs et de fromage.","lasagnes à la courge et amarante.","gratin de pommes de terre, de crème et de fromage.","salade de pommes de terre, de tomates et de coriandre","quinoa et galette de manioc.","maïs grillé et taro cuit à l´eau.","couscous aux légumes, des beignets de potiron et de miel.","tortillas de maïs et guacamole","feuilles de mâche et de laitues en salade.","confiture de coings et taro ou quinoa.","légumes locaux et champignons."] }, desserts: [" Un flan au caramel"," Une tarte aux fruits rouges"," Une salade de fruits, un gâteau au chocolat."," Des fruits frais."," Une crème brûlée"," Un riz au lait et à la cannelle"," Une mousse au café"," Un gâteau au chocolat et au miel"," Boisson chaude de maïs fruits sucre et épices."," Fromage blanc confiture de courge sucre clous de girofle et cannelle."," Biscuit sec avec une crème de lait sucré."," pudding de maïs blanc cannelle et sirop de canne à sucre."," Beignets et sirop à la cannelle."," Un flan au caramel"," Une tarte aux fruits rouges"," Une salade de fruits Un gâteau au chocolat."," Des fruits frais."," Une crème brûlée"," Beignets et sirop à la cannelle."," Une mousse au café"," Pudding de maïs blanc, cannelle et sirop de canne à sucre."," Un gâteau au chocolat et au miel"," Boisson chaude de maïs fruits sucre et épices.","Mazamorra morada : dessert à base de maïs violet, cuit avec des fruits secs (prunes, abricots) et des épices.","Arroz con leche : riz au lait sucré, parfumé à la cannelle et au zeste d’orange.","Buñuelos : petits beignets frits à base de farine ou de courge, nappés de miel.","Dulce de camote : patates douces confites dans du miel ou du sucre de canne.","Api morado : boisson-dessert épaisse à base de maïs violet, cannelle, clou de girofle.","Quesillo con miel : petit fromage frais servi avec du miel ou du sirop de canne.","Fruits secs et noix","Pamonha doce : bouillie de maïs sucrée cuite dans ses feuilles.","Bolo de mandioca : gâteau de manioc, parfois parfumé à la noix de coco.","Beiju de tapioca sucré : galette de manioc farcie de miel, fruits ou fromage doux.","Doce de banana : bananes cuites avec sucre ou miel jusqu’à obtenir une pâte épaisse.","Curau de milho : crème épaisse de maïs sucré au lait.","Cocada : friandise de noix de coco râpée et miel (ou sucre de canne).","Açaí écrasé avec miel et farine de manioc","Rapadura : blocs de sucre de canne, parfois parfumés à des épices ou aux arachides."," Un flan au caramel"," Une tarte aux fruits rouges"," Une salade de fruits, un gâteau au chocolat."," Des fruits frais."," Une crème brûlée"," Un riz au lait et à la cannelle"," Une mousse au café"," Un gâteau au chocolat et au miel"," Boisson chaude de maïs fruits sucre et épices."] },
        services: [["Guide", "Un guide expérimenté...", 20, 40, 60], ["Rations sèches", "Des rations sèches...", 50, 70, 80], ["Barde", "Un barde anime les soirées...", 10, 40, 70], ["Tableau de contrat", "Affiche des offres d'emploi...", 30, 60, 80], ["Érudit", "Un savant peut répondre aux questions...", 0, 15, 40], ["Jardin médicinal", "Un jardin d'herbes...", 5, 20, 50]
     ["Nuit en Dortoir", "Une paillasse dans une pièce commune, simple mais à l'abri des intempéries pour la somme de 8 Sols par personne.", 100, 20, 0], // Très courant en faible qualité, rare ailleurs
        ["Chambre Privée", "Une chambre simple mais propre avec un lit, une table et une chaise pour la somme de 20 à 60 Sols par personne selon le style de chambre.", 0, 100, 100] // Garanti en moyenne et haute qualité
    ],
            rumors: [
    // Rumeurs existantes
    "On dit qu'un vieux temple en ruine dans la forêt voisine abriterait un trésor des Anciens...",
    "Le marchand qui devait passer hier n'est jamais arrivé. Sa caravane aurait été attaquée sur la route du nord.",
    "Des bruits étranges proviennent de la vieille mine abandonnée la nuit. Certains disent avoir entendus des bruits de bêtes.",
    "Le fils du forgeron est tombé gravement malade. L'herboriste dit qu'il lui faut une plante qui ne se trouve qu'à plusieurs lieux d'ici, dans une zone dangereuse.",
    "Un noble de passage offrirait une belle récompense à qui voudra bien l'escorter jusqu'à la cité la plus proche.",
    "J'ai entendu dire qu'un groupe de brigands rançonne les voyageurs à quelques kilomètres d'ici.",

    // NOUVELLES RUMEURS - Mystères & Découvertes
    "Paraît que des éclaireurs ont trouvé un automate des Anciens, inactif mais intact, dans une grotte inondée. Ils cherchent quelqu'un d'assez fou pour les aider à le sortir de là.",
    "La rivière charrie des pépites d'un métal inconnu depuis la dernière crue. Ça vient sûrement d'un gisement en amont, dans les montagnes interdites.",
    "Un vieil ermite qui vit dans les bois prétend avoir une carte menant à une bibliothèque des Anciens, mais il ne la cèdera qu'à ceux qui prouveront leur valeur.",

    // NOUVELLES RUMEURS - Conflits & Intrigues
    "Le chef du village voisin a doublé les taxes sans raison. Certains disent qu'il est menacé par un groupe de Kankales/Brigands et qu'il leur paie un tribut.",
    "J'ai entendu dire que la fille de l'herboriste a disparu près des ruines. On l'a vue parler avec un étranger portant les couleurs d'une guilde d'assassins la veille...",
    "Un caravanier Sharuhen offre une fortune pour une carte fiable des routes commerciales à travers les canyons au sud, mais personne n'est jamais revenu de cette mission.",
    "Une patrouille d'Arcanistes de Byblos est arrivée en ville. Ils ne disent pas ce qu'ils cherchent, mais ils posent beaucoup de questions sur les gens qui maîtrisent le Vrill.",
    
    // NOUVELLES RUMEURS - Chasse & Survie
    "Les pêcheurs n'osent plus aller sur le lac depuis qu'une créature massive a été aperçue sous la surface. Elle a déjà brisé une barque.",
    "La source qui alimente le village commence à avoir un goût métallique et rend les gens malades. Quelqu'un doit remonter le courant pour voir ce qui la contamine.",
    "Un trappeur prétend avoir trouvé des empreintes gigantesques, plus grandes que celles d'un buffle des plaines, menant vers les pics voisins.",
    "Les récoltes de cette année sont dévorées par une nouvelle espèce d'insectes cuirassés. Le village promet une récompense pour quiconque trouvera un moyen de s'en débarrasser.",

    // NOUVELLES RUMEURS - Légendes & Étrangetés
    "Les nuits de pleine lune, certains disent entendre une mélodie triste provenir du vieux cimetière abandonné sur la colline.",
    "Un gamin du village jure avoir vu un 'vaisseau silencieux' flotter au-dessus de la canopée de la forêt la nuit dernière, sans lumière ni bruit.",
    "La vieille diseuse de bonne aventure a prédit qu'un étranger apporterait soit une grande fortune, soit une grande ruine au village avant la prochaine saison des pluies.",
    "On raconte que l'esprit d'un grand guerrier hante le col de la montagne et défie les voyageurs qui osent le franchir."
]

    };
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

    // --- INITIALISATION ---
    getData() {
        return { regions: Object.keys(this.nameData).sort() };
    }

    activateListeners(html) {
        super.activateListeners(html);
        
        // Remplissage Select Région
        const regionSelect = html.find('#region-type');
        Object.keys(this.nameData).forEach(r => regionSelect.append(`<option value="${r}">${r}</option>`));

        html.find('#generate-btn').click(ev => this._generate(html));
        html.find('#create-journal-btn').click(ev => this._createJournalInFoundry());
    }

    // --- UTILITAIRES ---
    getRandomElement(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    
    generateName(region, gender) {
        const genderKey = (gender === 'Féminine') ? 'femme' : 'homme';
        const list = this.nameData[region]?.[genderKey] || ["Inconnu"];
        return this.getRandomElement(list);
    }

    // --- GÉNÉRATION ---
    _generate(html) {
        const quality = html.find('#service-quality').val();
        const environment = html.find('#environment-type').val();
        const type = html.find('#establishment-type').val();
        const region = html.find('#region-type').val();
        const data = this.tavernData;

        // 1. Personnages
        const characters = [];
        const owner1Sex = Math.random() < 0.5 ? 'Masculine' : 'Féminine';
        const owner1Name = this.generateName(region, owner1Sex);
        characters.push(`<strong>${owner1Name}</strong> (Propriétaire)`);

        if (Math.random() <= 0.70) {
            const owner2Sex = Math.random() < 0.5 ? 'Masculine' : 'Féminine';
            const owner2Name = this.generateName(region, owner2Sex);
            const rel = this.getRandomElement(data.ownerRelationships[owner2Sex === 'Féminine' ? 'feminin' : 'masculin']);
            characters.push(`<strong>${owner2Name}</strong> (${rel})`);
        }

        const [minStaff, maxStaff] = data.staff.countByQuality[quality];
        const staffCount = this.getRandomInt(minStaff, maxStaff);
        for(let i=0; i<staffCount; i++) {
            const sex = Math.random() < 0.5 ? 'Masculine' : 'Féminine';
            const role = this.getRandomElement(data.staff.roles[sex === 'Féminine' ? 'feminin' : 'masculin']);
            const name = this.generateName(region, sex);
            characters.push(`<strong>${name}</strong> (${role.toLowerCase()})`);
        }

        // 2. Etablissement
        let tavernName = this.getRandomElement(data.names);
        if (tavernName.includes('[Nom Propriétaire]')) tavernName = tavernName.replace('[Nom Propriétaire]', owner1Name);
        
        const structure = this.getRandomElement(data.structures[quality]);
        const locDesc = this.getRandomElement(data.locations[environment]);
        const neighbor = this.getRandomElement(data.neighbors[environment]);

        // 3. Menus & Boissons
        const menuSimple = this.getRandomElement(data.menu.repasSimple);
        const menuNormal = this.getRandomElement(data.menu.repasNormal.principal) + this.getRandomElement(data.menu.repasNormal.accompagnement);
        const menuComplet = menuNormal + " et " + this.getRandomElement(data.menu.desserts).toLowerCase();

        const allDrinks = [...data.drinks[quality]].sort(() => 0.5 - Math.random()).slice(0, 5);
        const drinks = allDrinks.map(d => {
            const price = (this.getRandomInt(d.priceRange[0], d.priceRange[1]) / 10).toFixed(1);
            return `<strong>${d.name}:</strong> ${price} Sol(s)`;
        });

        // 4. Services
        const offeredServices = [];
        // Hébergement (logique spécifique auberge)
        if (type === 'Auberge') {
            if (quality === 'faible') offeredServices.push(data.services.find(s => s[0] === "Nuit en Dortoir"));
            else offeredServices.push(data.services.find(s => s[0] === "Chambre Privée"));
        }
        // Autres services
        const potentialServices = data.services.filter(s => s[0] !== "Nuit en Dortoir" && s[0] !== "Chambre Privée");
        const budget = this.getRandomInt(...data.staff.countByQuality[quality]); // on utilise le staff count comme proxy de "richesse" de services
        
        // Tirage pondéré simple
        potentialServices.forEach(s => {
            const chance = quality === 'faible' ? s[2] : (quality === 'moyenne' ? s[3] : s[4]);
            if (Math.random() * 100 < chance) offeredServices.push(s);
        });

        // 5. Rumeurs
        const rumors = [];
        const poolRumors = [...data.rumors];
        const numRumors = this.getRandomInt(1, 2);
        for(let i=0; i<numRumors; i++) {
            if(poolRumors.length === 0) break;
            const idx = Math.floor(Math.random() * poolRumors.length);
            rumors.push(poolRumors.splice(idx, 1)[0]);
        }

        // Sauvegarde et Affichage
        this.currentTavernData = { tavernName, structure, locDesc, neighbor, characters, menuSimple, menuNormal, menuComplet, drinks, offeredServices, rumors };
        this._updateSheet(html);
    }

    _updateSheet(html) {
        const d = this.currentTavernData;
        html.find('#tavern-name').text(d.tavernName);
        html.find('#tavern-image').attr('src', d.structure.image);
        html.find('#structure-desc').text(d.structure.description);
        html.find('#location-desc').text(d.locDesc);
        html.find('#neighbors-desc').text(d.neighbor);

        const fillList = (id, list) => {
            const el = html.find(`#${id}`);
            el.empty();
            list.forEach(item => el.append(`<li>${item}</li>`));
        };

        fillList('character-list', d.characters);
        fillList('drinks-list', d.drinks);
        fillList('rumors-list', d.rumors);

        const menuList = html.find('#menu-list');
        menuList.empty();
        menuList.append(`<li><strong>Repas Simple:</strong> ${d.menuSimple}</li>`);
        menuList.append(`<li><strong>Repas Normal:</strong> ${d.menuNormal}</li>`);
        menuList.append(`<li><strong>Repas Complet:</strong> ${d.menuComplet}</li>`);

        const servList = html.find('#services-list');
        servList.empty();
        if(d.offeredServices.length) {
            d.offeredServices.filter(Boolean).forEach(s => servList.append(`<li><strong>${s[0]}:</strong> ${s[1]}</li>`));
        } else {
            servList.append(`<li>Aucun service particulier.</li>`);
        }

        html.find('#sheet-section').removeClass('hidden');
    }

    // --- CRÉATION JOURNAL FOUNDRY ---
    async _createJournalInFoundry() {
        const d = this.currentTavernData;
        if (!d.tavernName) return;

        // Construction du contenu HTML
        let content = `
            <img src="${d.structure.image}" style="width:100%; border:1px solid #000; margin-bottom:10px;">
            <p><strong>${d.structure.description}</strong> ${d.locDesc}</p>
            <p><em>Voisin : ${d.neighbor}</em></p>
            <hr>
            <h3>Personnel</h3>
            <ul>${d.characters.map(c => `<li>${c}</li>`).join('')}</ul>
            <hr>
            <h3>Menus</h3>
            <ul>
                <li><strong>Simple :</strong> ${d.menuSimple}</li>
                <li><strong>Normal :</strong> ${d.menuNormal}</li>
                <li><strong>Complet :</strong> ${d.menuComplet}</li>
            </ul>
            <h3>Boissons</h3>
            <ul>${d.drinks.map(x => `<li>${x}</li>`).join('')}</ul>
            <hr>
            <h3>Services</h3>
            <ul>${d.offeredServices.filter(Boolean).map(s => `<li><strong>${s[0]} :</strong> ${s[1]}</li>`).join('')}</ul>
            <hr>
            <h3>Rumeurs</h3>
            <ul>${d.rumors.map(r => `<li>${r}</li>`).join('')}</ul>
        `;

        // Création du Journal
        const entry = await JournalEntry.create({
            name: d.tavernName,
            pages: [{
                name: "Description",
                type: "text",
                text: { content: content, format: 1 } // 1 = HTML
            }]
        });

        // Ouvrir le journal créé
        entry.sheet.render(true);
        ui.notifications.info(`Taverne "${d.tavernName}" créée dans les Journaux !`);
    }
}