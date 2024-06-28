"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryType = queryType;
const markdown_1 = require("../../../libs/markdown");
function queryType(model) {
    return `${(0, markdown_1.italic)('typeof')} ${this.partials.someType(model.queryType)}`;
}
