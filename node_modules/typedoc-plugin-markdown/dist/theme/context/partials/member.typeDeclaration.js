"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDeclaration = typeDeclaration;
const typedoc_1 = require("typedoc");
function typeDeclaration(model, options) {
    const md = [];
    const shouldDisplayTable = () => {
        if (model.parent?.kind === typedoc_1.ReflectionKind.Property &&
            this.helpers.useTableFormat('propertyMembers')) {
            return true;
        }
        if (model.parent?.kind !== typedoc_1.ReflectionKind.Property &&
            this.helpers.useTableFormat('typeDeclarations')) {
            return true;
        }
        return false;
    };
    if (shouldDisplayTable()) {
        md.push(this.partials.typeDeclarationTable(model.children || [], {
            kind: model.parent?.kind,
        }));
    }
    else {
        md.push(this.partials.typeDeclarationList(model.children || [], options));
    }
    return md.join('\n\n');
}
