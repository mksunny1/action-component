"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = body;
const typedoc_1 = require("typedoc");
function body(model, options) {
    const md = [];
    if (model.categories?.length) {
        md.push(this.partials.categories(model.categories, {
            headingLevel: options.headingLevel,
        }));
    }
    else {
        const containerKinds = [
            typedoc_1.ReflectionKind.Project,
            typedoc_1.ReflectionKind.Module,
            typedoc_1.ReflectionKind.Namespace,
        ];
        if ((this.options.getValue('excludeGroups') ||
            this.options.getValue('hideGroupHeadings')) &&
            containerKinds.includes(model.kind)) {
            if (model.categories?.length) {
                md.push(this.partials.categories(model.categories, {
                    headingLevel: options.headingLevel,
                }));
            }
            else {
                if (model.children) {
                    md.push(this.partials.members(model.children, {
                        headingLevel: options.headingLevel,
                    }));
                }
            }
        }
        else {
            const groups = model.groups?.filter((group) => !(group.owningReflection instanceof typedoc_1.DocumentReflection));
            if (groups?.length) {
                md.push(this.partials.groups(groups, {
                    headingLevel: options.headingLevel,
                    kind: model.kind,
                }));
            }
        }
    }
    return md.join('\n\n');
}
