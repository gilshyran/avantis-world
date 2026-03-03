export class AvantisItemSheet extends ItemSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["avantis", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  get template() {
    return `systems/avantis/templates/item/item-sheet.html`;
  }

  getData() {
    const context = super.getData();
    context.system = context.item.system;
    context.flags = context.item.flags;
    // On passe la config au template
    context.config = CONFIG.AVANTIS; 
    return context;
  }
}
