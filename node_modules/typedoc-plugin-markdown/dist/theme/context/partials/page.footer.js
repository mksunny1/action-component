"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footer = footer;
function footer() {
    const textContentMappings = this.options.getValue('textContentMappings');
    const text = textContentMappings['footer.text'];
    return text ? `***\n\n${text}` : ``;
}
