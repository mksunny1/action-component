"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = link;
/**
 *  The link element
 * @param label The text to display for the link
 * @param url The url to link to
 */
function link(label, url) {
    return url ? `[${label}](${url})` : '';
}
