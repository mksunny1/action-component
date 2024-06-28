"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownType = unknownType;
const utils_1 = require("../../../libs/utils");
function unknownType(model) {
    return (0, utils_1.escapeChars)(model.name);
}
