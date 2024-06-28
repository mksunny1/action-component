"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockQuoteBlock = blockQuoteBlock;
function blockQuoteBlock(content) {
    const lines = (content.replace(/[\r\n]{3,}/g, '\n\n').replace(/^\s+|\s+$/g, '') + '\n').split('\n');
    return lines
        .map((line) => (line.length ? `> ${line.trim()}` : '>'))
        .join('\n');
}
