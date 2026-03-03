import { AvantisActorSheet } from "./module/sheets/actor-sheet.mjs";
import { AvantisItemSheet } from "./module/sheets/item-sheet.mjs";
import { AVANTIS } from "./module/config.mjs";

// Imports des Applications
import { AvantisApothecary } from "./module/apps/apothecary-app.mjs";
import { AvantisWeaponForge } from "./module/apps/weapon-generator-app.mjs";
import { AvantisArmorSmith } from "./module/apps/armor-generator-app.mjs";
import { AvantisNPCGenerator } from "./module/apps/npc-generator-app.mjs";
import { AvantisTavernGenerator } from "./module/apps/tavern-generator-app.mjs";
import { AvantisDestiny } from "./module/apps/destiny-app.mjs";
import { AvantisHeroCreator } from "./module/apps/hero-creator-app.mjs";
import { AvantisDivination } from "./module/apps/divination-app.mjs";
import { PukllayArbiter } from "./module/apps/pukllay.mjs";

Hooks.once("init", async function() {
  console.log("AVANTIS | Initialisation...");


    // ENREGISTREMENT DES PARAMÈTRES DU SYSTÈME
  game.settings.register("avantis", "pukllayCombo", {
    name: "Pukllay : Mode Combo",
    hint: "Si coché, les captures déclenchent des réactions en chaîne.",
    scope: "world",      // Le réglage est le même pour tout le monde
    config: true,        // Visible dans le menu de configuration
    type: Boolean,
    default: false       // Par défaut : NON
  });



  // 1. Configuration de base
  CONFIG.AVANTIS = AVANTIS;

  // 2. Slots d'armure
  CONFIG.AVANTIS.armorSlots = {
      "tete": "Tête",
      "torse": "Torse",
      "bras": "Bras",
      "jambes": "Jambes",
      "integral": "Intégrale"
  };

  // 3. Niveaux de qualité
  CONFIG.AVANTIS.qualityLevels = {
      0: "0 - Médiocre",
      1: "1 - Courant",
      2: "2 - Supérieur",
      3: "3 - Exceptionnel",
      4: "4 - Parfait"
  };

  // 4. Rangs d'École
  CONFIG.AVANTIS.schoolRanks = {
      1: "Rang 1 - Kallpa",
      2: "Rang 2 - Yachay",
      3: "Rang 3 - Sumaq",
      4: "Rang 4 - Qhapaq"
  };

  game.avantis = {
    Divination: AvantisDivination
};

  // 5. Enregistrement des Classes d'Applications (Apps)
  CONFIG.AVANTIS.Apothecary = AvantisApothecary;
  CONFIG.AVANTIS.WeaponForge = AvantisWeaponForge;
  CONFIG.AVANTIS.ArmorSmith = AvantisArmorSmith;
  CONFIG.AVANTIS.NPCGenerator = AvantisNPCGenerator;
  CONFIG.AVANTIS.TavernGenerator = AvantisTavernGenerator;
  CONFIG.AVANTIS.Destiny = AvantisDestiny;
  CONFIG.AVANTIS.HeroCreator = AvantisHeroCreator;

  // 6. Enregistrement des Fiches (Sheets)
  Actors.unregisterSheet("core", ActorSheet);
  Items.unregisterSheet("core", ItemSheet);

  Actors.registerSheet("avantis", AvantisActorSheet, { 
    types: ["hero", "pnj"],
    makeDefault: true,
    label: "Fiche Avantis"
  });

  Items.registerSheet("avantis", AvantisItemSheet, { 
    makeDefault: true,
    label: "Fiche Objet"
  });

  preloadHandlebarsTemplates();
});

async function preloadHandlebarsTemplates() {
  return loadTemplates([
    "systems/avantis/templates/parts/tab-meridiens.html",
    "systems/avantis/templates/parts/tab-inventaire.html",
    "systems/avantis/templates/parts/tab-personnalite.html",
    "systems/avantis/templates/parts/tab-arcanes.html",
    "systems/avantis/templates/parts/tab-atouts.html",
    "systems/avantis/templates/apps/divination.html",
    "systems/avantis/templates/parts/tab-config.html"
  ]);
}

// =========================================================
// HOOKS DES BOUTONS D'OUTILS
// =========================================================

// 1. ONGLET OBJETS (Items) : Apothicaire + Forge Armes + Forge Armures
Hooks.on("renderItemDirectory", (app, html, data) => {
    const $html = $(html);
    const btnContainer = $(`<div style="display:flex; gap:5px; margin: 5px 10px;"></div>`);

    const btnPotion = $(`<button type="button" style="flex:1;" title="Apothicaire"><i class="fas fa-flask"></i></button>`);
    btnPotion.click((ev) => { ev.preventDefault(); new AvantisApothecary().render(true); });

    const btnWeapon = $(`<button type="button" style="flex:1;" title="Forge d'Armes"><i class="fas fa-hammer"></i></button>`);
    btnWeapon.click((ev) => { ev.preventDefault(); new AvantisWeaponForge().render(true); });

    const btnArmor = $(`<button type="button" style="flex:1;" title="Façonneur d'Armures"><i class="fas fa-shield-alt"></i></button>`);
    btnArmor.click((ev) => { ev.preventDefault(); new AvantisArmorSmith().render(true); });

    btnContainer.append(btnPotion).append(btnWeapon).append(btnArmor);
    $html.find(".header-actions").after(btnContainer);
});

// 2. ONGLET ACTEURS (Actors) : Générateur PNJ + Créateur Héros
Hooks.on("renderActorDirectory", (app, html, data) => {
    const $html = $(html);
    
    // Conteneur vertical pour empiler les boutons proprement
    const btnContainer = $(`<div style="display:flex; flex-direction:column; gap:5px; margin: 5px 10px;"></div>`);

    // Bouton PNJ
    const btnPNJ = $(`<button type="button"><i class="fas fa-users"></i> Générateur PNJ</button>`);
    btnPNJ.click((ev) => {
        ev.preventDefault();
        new AvantisNPCGenerator().render(true);
    });

    // Bouton HÉROS (CORRIGÉ)
    const btnHero = $(`<button type="button" style="background: #c8a379; color: black; font-weight:bold;"><i class="fas fa-crown"></i> Créer un Héros</button>`);
    btnHero.click((ev) => {
        ev.preventDefault();
        new AvantisHeroCreator().render(true);
    });

    // On ajoute les deux boutons au conteneur, puis le conteneur à la page
    btnContainer.append(btnPNJ).append(btnHero);
    $html.find(".header-actions").after(btnContainer);
});

// 3. ONGLET JOURNAUX : Générateur Taverne
Hooks.on("renderJournalDirectory", (app, html, data) => {
    const $html = $(html);
    const button = $(`<button type="button" style="width: 95%; margin: 5px auto;"><i class="fas fa-beer"></i> Générateur Taverne</button>`);
    
    button.click((ev) => {
        ev.preventDefault();
        new AvantisTavernGenerator().render(true);
    });

    $html.find(".header-actions").after(button);
});

// 4. ONGLET SCÈNES : Destinée
Hooks.on("renderSceneDirectory", (app, html, data) => {
    const $html = $(html);
    const button = $(`<button type="button" style="width: 95%; margin: 5px auto;"><i class="fas fa-dice-d20"></i> Navigateur de Destinée</button>`);

    button.click((ev) => {
        ev.preventDefault();
        new AvantisDestiny().render(true);
    });

    $html.find(".header-actions").after(button);
});

// =========================================================
// HOOK : DRAG & DROP PUKLLAY (ITEM -> TOKEN) - CORRECTION MATT
// =========================================================
Hooks.on("dropCanvasData", (canvas, data) => { 
    
    // 1. On vérifie que c'est bien un Item qui est lâché
    if (data.type !== "Item") return;

    // 2. RÉCUPÉRATION SYNCHRONE (Ultra-rapide)
    let item;
    if (data.uuid) {
        item = fromUuidSync(data.uuid);
    } else if (data.data) {
        item = new Item(data.data);
    }

    // Si ce n'est pas un jeton Pukllay, on s'arrête là sans rien bloquer !
    // (C'est ce qui permet à MATT de fonctionner normalement pour tes autres objets)
    if (!item || item.type !== "pukllay") return; 

    // 3. C'EST UN PUKLLAY ! 
    // On lance la création du pion en tâche de fond (Asynchrone)
    (async () => {
        // Centrage
        const snapped = canvas.grid.getTopLeftPoint({x: data.x, y: data.y});

        // Préparation du pion
        const tokenData = {
            name: item.name,
            texture: { src: item.img }, 
            x: snapped.x,
            y: snapped.y,
            width: 1,      
            height: 1,
            rotation: 0,
            hidden: false,
            displayBars: 0, 
            displayName: 0, 
            flags: {
                avantis: {
                    pukllay: {
                        force: item.system.force,
                        qualite: item.system.qualite,
                        directions: item.system.directions,
                        famille: item.system.famille,
                        pouvoirs: item.system.pouvoirs,
                        couleur: "neutre" 
                    }
                }
            }
        };

        // Création sur la scène
        await canvas.scene.createEmbeddedDocuments("Token", [tokenData]);
    })(); // Fin de la tâche de fond

    // 4. BLOCAGE INSTANTANÉ DES AUTRES MODULES (Comme MATT)
    // On dit à Foundry de s'arrêter là, ce qui annule la création de la tuile MATT
    return false; 
});

// =========================================================
// HOOK : PUKLLAY - DÉBUT DU JEU (QUAND LE TOKEN APPARAIT)
// =========================================================
Hooks.on("createToken", async (tokenDocument, options, userId) => {
    // Seul l'utilisateur qui a créé le token lance le script
    if (userId !== game.user.id) return;

    // Vérification de sécurité
    if (!tokenDocument.flags?.avantis?.pukllay) return;

    console.log("PUKLLAY | Jeton détecté : ", tokenDocument.name);

    // IMPORTANT : On envoie le Document (tokenDocument), pas l'objet graphique (.object)
    // Le Document possède les méthodes .update() et les flags.
    PukllayArbiter.onTokenCreated(tokenDocument);
});