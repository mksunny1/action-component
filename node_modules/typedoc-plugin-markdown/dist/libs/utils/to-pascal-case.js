"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPascalCase = toPascalCase;
function toPascalCase(text) {
    return text
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}
