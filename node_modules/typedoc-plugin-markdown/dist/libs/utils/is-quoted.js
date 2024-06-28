"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isQuoted = isQuoted;
function isQuoted(str) {
    return str.startsWith('"') && str.endsWith('"');
}
