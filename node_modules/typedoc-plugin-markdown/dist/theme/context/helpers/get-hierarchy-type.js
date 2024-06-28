"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHierarchyType = getHierarchyType;
const markdown_1 = require("../../../libs/markdown");
function getHierarchyType(model, options) {
    return options?.isTarget
        ? (0, markdown_1.backTicks)(model.toString())
        : this.partials.someType(model);
}
