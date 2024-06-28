"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageTitle = pageTitle;
const typedoc_1 = require("typedoc");
function pageTitle() {
    const textContentMappings = this.options.getValue('textContentMappings');
    const page = this.page;
    if (page.model?.url === page.project.url) {
        return this.helpers.getProjectName(textContentMappings['title.indexPage'], page);
    }
    const name = this.partials.memberTitle(page.model);
    const kind = this.internationalization.kindSingularString(page.model.kind);
    const textContent = [
        typedoc_1.ReflectionKind.Module,
        typedoc_1.ReflectionKind.Namespace,
    ].includes(page.model.kind)
        ? name
        : textContentMappings['title.memberPage'];
    return textContent.replace('{name}', name).replace('{kind}', kind);
}
