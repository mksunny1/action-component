"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declarationType = declarationType;
const markdown_1 = require("../../../libs/markdown");
function declarationType(model) {
    const shouldFormat = this.options.getValue('useCodeBlocks');
    if (model.indexSignatures || model.children) {
        const indexSignatureMd = [];
        if (model.indexSignatures?.length) {
            model.indexSignatures.forEach((indexSignature) => {
                const key = indexSignature.parameters
                    ? indexSignature.parameters.map((param) => `\`[${param.name}: ${param.type}]\``)
                    : '';
                const obj = this.partials.someType(indexSignature.type);
                indexSignatureMd.push(`${key}: ${obj}; `);
            });
        }
        const children = model.children;
        const types = children &&
            children.map((obj) => {
                const name = [];
                if (Boolean(obj.getSignature || Boolean(obj.setSignature))) {
                    if (obj.getSignature) {
                        name.push('get');
                    }
                    if (obj.setSignature) {
                        name.push('set');
                    }
                }
                name.push((0, markdown_1.backTicks)(obj.name));
                const theType = this.helpers.getDeclarationType(obj);
                const typeString = obj.defaultValue && obj.defaultValue !== '...'
                    ? (0, markdown_1.backTicks)(obj.defaultValue)
                    : this.partials.someType(theType);
                if (shouldFormat) {
                    return `  ${name.join(' ')}: ${indentBlock(typeString, true)};\n`;
                }
                return `${name.join(' ')}: ${indentBlock(typeString, true)};`;
            });
        if (indexSignatureMd) {
            indexSignatureMd.forEach((indexSignature) => {
                types?.unshift(indexSignature);
            });
        }
        return types
            ? `\\{${shouldFormat ? '\n' : ''}${types.join('')} \\}`
            : '\\{\\}';
    }
    return '\\{\\}';
}
function indentBlock(content, format) {
    const lines = content.split(`${'\n'}`);
    return lines
        .filter((line) => Boolean(line.length))
        .map((line, i) => {
        if (i === 0) {
            return line;
        }
        if (i === lines.length - 1) {
            return line.trim().startsWith('}') ? line : `   ${line}`;
        }
        return `   ${line}`;
    })
        .join(`${`\n`}`);
}
