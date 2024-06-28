"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayType = arrayType;
function arrayType(model) {
    const theType = this.partials.someType(model.elementType);
    return model.elementType.type === 'union' ? `(${theType})[]` : `${theType}[]`;
}
