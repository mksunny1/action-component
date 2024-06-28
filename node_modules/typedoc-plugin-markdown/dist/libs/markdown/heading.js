"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heading = heading;
/**
 * Returns a heading in markdown format
 * @param level The level of the heading
 * @param text The text of the heading
 */
function heading(level, text) {
    level = level > 6 ? 6 : level;
    return `${[...Array(level)].map(() => '#').join('')} ${text}`;
}
