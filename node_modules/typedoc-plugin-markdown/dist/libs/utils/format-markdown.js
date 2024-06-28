"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMarkdown = formatMarkdown;
function formatMarkdown(str) {
    return str?.replace(/[\r\n]{3,}/g, '\n\n').replace(/^\s+|\s+$/g, '') + '\n';
}
