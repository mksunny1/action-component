"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferredType = inferredType;
const utils_1 = require("../../../libs/utils");
function inferredType(model) {
    return `infer ${(0, utils_1.escapeChars)(model.name)}`;
}
