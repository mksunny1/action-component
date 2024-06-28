"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyword = getKeyword;
const typedoc_1 = require("typedoc");
function getKeyword(model) {
    const KEYWORD_MAP = {
        [typedoc_1.ReflectionKind.Class]: 'class',
        [typedoc_1.ReflectionKind.Enum]: 'enum',
        [typedoc_1.ReflectionKind.Function]: 'function',
        [typedoc_1.ReflectionKind.Interface]: 'interface',
        [typedoc_1.ReflectionKind.TypeAlias]: 'type',
    };
    return KEYWORD_MAP[model];
}
