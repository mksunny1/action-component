"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeChars = escapeChars;
function escapeChars(str) {
    return str
        .replace(/>/g, '\\>')
        .replace(/</g, '\\<')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}')
        .replace(/_/g, '\\_')
        .replace(/`/g, '\\`')
        .replace(/\|/g, '\\|')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\*/g, '\\*');
}
