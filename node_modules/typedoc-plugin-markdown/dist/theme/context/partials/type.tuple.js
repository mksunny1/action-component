"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tupleType = tupleType;
function tupleType(model) {
    return `[${model.elements
        .map((element) => this.partials.someType(element))
        .join(', ')}]`;
}
