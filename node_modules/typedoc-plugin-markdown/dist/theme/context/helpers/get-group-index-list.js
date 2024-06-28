"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupIndexList = getGroupIndexList;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
function getGroupIndexList(children) {
    const filteredChildren = children
        .filter((child) => Boolean(child.url))
        .map((child) => {
        return child.url
            ? `- ${(0, markdown_1.link)((0, utils_1.escapeChars)(child.name), this.getRelativeUrl(child.url))}`
            : '';
    }) || [];
    return filteredChildren.join('\n');
}
