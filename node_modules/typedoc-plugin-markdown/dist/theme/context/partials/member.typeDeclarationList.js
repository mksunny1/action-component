"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDeclarationList = typeDeclarationList;
function typeDeclarationList(model, options) {
    const md = [];
    const declarations = this.helpers.getFlattenedDeclarations(model);
    declarations?.forEach((declaration, i) => {
        md.push(this.partials.memberContainer(declaration, {
            headingLevel: options.headingLevel + 1,
            nested: true,
        }));
    });
    return md.join('\n\n');
}
