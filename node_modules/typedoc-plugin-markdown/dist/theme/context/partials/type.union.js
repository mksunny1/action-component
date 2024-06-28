"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionType = unionType;
function unionType(model) {
    const useCodeBlocks = this.options.getValue('useCodeBlocks');
    const shouldFormat = useCodeBlocks && model.types.length > 4;
    const md = model.types
        .map((unionType) => this.partials.someType(unionType))
        .join(shouldFormat ? `\n  \\| ` : ` \\| `);
    return shouldFormat ? `\n  \\| ` + md : md;
}
