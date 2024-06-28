"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersectionType = intersectionType;
function intersectionType(model) {
    return model.types
        .map((intersectionType) => this.partials.someType(intersectionType))
        .join(' & ');
}
