"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inheritance = inheritance;
const markdown_1 = require("../../../libs/markdown");
function inheritance(model, options) {
    const md = [];
    if (model.implementationOf) {
        if (options.headingLevel !== -1) {
            md.push((0, markdown_1.heading)(options.headingLevel, this.i18n.theme_implementation_of()));
        }
        md.push(this.partials.typeAndParent(model.implementationOf));
    }
    if (model.inheritedFrom) {
        if (options.headingLevel !== -1) {
            md.push((0, markdown_1.heading)(options.headingLevel, this.i18n.theme_inherited_from()));
        }
        md.push(this.partials.typeAndParent(model.inheritedFrom));
    }
    if (model.overwrites) {
        const overridesLabel = this.i18n.theme_overrides();
        if (options.headingLevel !== -1) {
            md.push((0, markdown_1.heading)(options.headingLevel, overridesLabel));
        }
        md.push(this.partials.typeAndParent(model.overwrites));
    }
    return md.join('\n\n');
}
