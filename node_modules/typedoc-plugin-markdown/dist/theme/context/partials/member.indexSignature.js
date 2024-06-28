"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexSignature = indexSignature;
const markdown_1 = require("../../../libs/markdown");
function indexSignature(model) {
    const md = [''];
    const params = model.parameters
        ? model.parameters.map((parameter) => {
            return parameter.type
                ? `${(0, markdown_1.backTicks)(parameter.name)}: ${this.partials.someType(parameter.type)}`
                : '';
        })
        : [];
    if (model.type) {
        md.push(`\\[${params.join('')}\\]: ${this.partials.someType(model.type)}`);
    }
    return md.join(' ');
}
