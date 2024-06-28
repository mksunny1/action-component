"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceMember = referenceMember;
const markdown_1 = require("../../../libs/markdown");
const typedoc_1 = require("typedoc");
function referenceMember(model) {
    let referenced = model.tryGetTargetReflectionDeep();
    const reExportsText = this.i18n.theme_re_exports();
    const renamesAndReExportsText = this.i18n.theme_renames_and_re_exports();
    if (!referenced) {
        return `${reExportsText} ${model.name}`;
    }
    if (referenced?.kind === typedoc_1.ReflectionKind.TypeLiteral && referenced.parent) {
        referenced = referenced?.parent;
    }
    if (!referenced?.url) {
        return `${reExportsText} ${referenced.name}`;
    }
    if (model.name === referenced.name) {
        return `${reExportsText} ${(0, markdown_1.link)(referenced.name, this.getRelativeUrl(referenced.url))}`;
    }
    return `${renamesAndReExportsText} ${(0, markdown_1.link)(referenced.name, this.getRelativeUrl(referenced.url))}`;
}
