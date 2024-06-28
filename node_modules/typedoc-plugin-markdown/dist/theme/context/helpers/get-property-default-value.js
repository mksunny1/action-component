"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertyDefaultValue = getPropertyDefaultValue;
const markdown_1 = require("../../../libs/markdown");
function getPropertyDefaultValue(model) {
    const defaultValueTag = model.comment?.blockTags?.find((tag) => tag.tag === '@defaultValue');
    if (defaultValueTag) {
        return defaultValueTag?.content.map((content) => content.text).join('');
    }
    return model.defaultValue && model.defaultValue !== '...'
        ? (0, markdown_1.backTicks)(model.defaultValue)
        : null;
}
