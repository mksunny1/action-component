"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableFormat = useTableFormat;
const typedoc_1 = require("typedoc");
function useTableFormat(key, reflectionKind) {
    if (key === 'parameters') {
        return isTable(this.options.getValue('parametersFormat'));
    }
    if (key === 'properties') {
        if (isTable(this.options.getValue('propertiesFormat'))) {
            return true;
        }
        if (reflectionKind === typedoc_1.ReflectionKind.Class) {
            return isTable(this.options.getValue('classPropertiesFormat'));
        }
        if (reflectionKind === typedoc_1.ReflectionKind.Interface) {
            return isTable(this.options.getValue('interfacePropertiesFormat'));
        }
        return false;
    }
    if (key === 'enums') {
        return isTable(this.options.getValue('enumMembersFormat'));
    }
    if (key === 'propertyMembers') {
        return isTable(this.options.getValue('propertyMembersFormat'));
    }
    if (key === 'typeDeclarations') {
        return isTable(this.options.getValue('typeDeclarationFormat'));
    }
    return false;
}
function isTable(key) {
    return key.toLowerCase().includes('table');
}
