"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indentBlock = indentBlock;
function indentBlock(content) {
    const lines = content.split('\n');
    return lines
        .filter((line) => Boolean(line.length))
        .map((line) => `    ${line}`)
        .join('\n');
}
