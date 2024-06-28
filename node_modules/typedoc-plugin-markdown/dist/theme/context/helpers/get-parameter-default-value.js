"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameterDefaultValue = getParameterDefaultValue;
function getParameterDefaultValue(model) {
    return model.defaultValue ? model.defaultValue : 'undefined';
}
