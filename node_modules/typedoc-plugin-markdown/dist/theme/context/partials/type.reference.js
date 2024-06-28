"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceType = referenceType;
const markdown_1 = require("../../../libs/markdown");
function referenceType(model) {
    if (model.reflection || (model.name && model.typeArguments)) {
        const reflection = [];
        if (model.reflection?.url) {
            reflection.push((0, markdown_1.link)((0, markdown_1.backTicks)(model.reflection.name), this.getRelativeUrl(model.reflection.url)));
        }
        else {
            reflection.push(model.externalUrl
                ? (0, markdown_1.link)((0, markdown_1.backTicks)(model.name), model.externalUrl)
                : (0, markdown_1.backTicks)(model.name));
        }
        if (model.typeArguments && model.typeArguments.length) {
            reflection.push(this.partials.typeArguments(model.typeArguments));
        }
        return reflection.join('');
    }
    return model.externalUrl
        ? (0, markdown_1.link)((0, markdown_1.backTicks)(model.name), model.externalUrl)
        : (0, markdown_1.backTicks)(model.name);
}
