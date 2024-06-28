"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.literalType = literalType;
function literalType(model) {
    if (typeof model.value === 'bigint') {
        return `\`${model.value}n\``;
    }
    return `\`\`${JSON.stringify(model.value)}\`\``;
}
