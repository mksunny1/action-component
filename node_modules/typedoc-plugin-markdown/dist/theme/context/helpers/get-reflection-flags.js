"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReflectionFlags = getReflectionFlags;
const markdown_1 = require("../../../libs/markdown");
function getReflectionFlags(reflectionFlags) {
    const result = [];
    if (reflectionFlags.isAbstract) {
        result.push((0, markdown_1.backTicks)('abstract'));
    }
    if (reflectionFlags.isConst) {
        result.push((0, markdown_1.backTicks)('const'));
    }
    if (reflectionFlags.isPrivate) {
        result.push((0, markdown_1.backTicks)('private'));
    }
    if (reflectionFlags.isProtected) {
        result.push((0, markdown_1.backTicks)('protected'));
    }
    if (reflectionFlags.isReadonly) {
        result.push((0, markdown_1.backTicks)('readonly'));
    }
    if (reflectionFlags.isStatic) {
        result.push((0, markdown_1.backTicks)('static'));
    }
    if (reflectionFlags.isOptional) {
        result.push((0, markdown_1.backTicks)('optional'));
    }
    return result.join(' ');
}
