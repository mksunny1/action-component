"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intrinsicType = intrinsicType;
const markdown_1 = require("../../../libs/markdown");
function intrinsicType(model) {
    return (0, markdown_1.backTicks)(model.name);
}
