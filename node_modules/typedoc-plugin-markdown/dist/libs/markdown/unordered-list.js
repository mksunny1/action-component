"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unorderedList = unorderedList;
function unorderedList(items) {
    return items.map((item) => `- ${item}`).join('\n');
}
