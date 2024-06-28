"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOperatorType = typeOperatorType;
function typeOperatorType(model) {
    return `${model.operator} ${this.partials.someType(model.target)}`;
}
