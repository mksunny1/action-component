"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumMembersTable = enumMembersTable;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
const typedoc_1 = require("typedoc");
function enumMembersTable(model) {
    const tableColumnsOptions = this.options.getValue('tableColumnSettings');
    const leftAlignHeadings = tableColumnsOptions.leftAlignHeaders;
    const comments = model.map((param) => !!param.comment?.hasVisibleComponent());
    const hasComments = comments.some((value) => Boolean(value));
    const hasSources = !tableColumnsOptions.hideSources &&
        !this.options.getValue('disableSources');
    const headers = [
        this.internationalization.kindSingularString(typedoc_1.ReflectionKind.EnumMember),
        this.i18n.theme_value(),
    ];
    if (hasComments) {
        headers.push(this.i18n.theme_description());
    }
    if (hasSources) {
        headers.push(this.i18n.theme_defined_in());
    }
    const rows = [];
    model.forEach((property) => {
        const propertyType = this.helpers.getDeclarationType(property);
        const row = [];
        const nameColumn = [];
        if (this.options.getValue('useHTMLAnchors') && property.anchor) {
            nameColumn.push(`<a id="${property.anchor}" name="${property.anchor}"></a>`);
        }
        nameColumn.push((0, markdown_1.backTicks)(property.name));
        row.push(nameColumn.join(' '));
        if (propertyType) {
            row.push((0, utils_1.removeLineBreaks)(this.partials.someType(propertyType)));
        }
        if (hasComments) {
            const comments = getComments(property);
            if (comments) {
                row.push(this.partials.comment(comments, { isTableColumn: true }));
            }
            else {
                row.push('-');
            }
        }
        if (hasSources) {
            row.push(this.partials.sources(property, { headingLevel: -1 }));
        }
        rows.push(row);
    });
    return this.options.getValue('enumMembersFormat') == 'table'
        ? (0, markdown_1.table)(headers, rows, leftAlignHeadings)
        : (0, markdown_1.htmlTable)(headers, rows, leftAlignHeadings);
}
function getComments(property) {
    if (property.type instanceof typedoc_1.ReflectionType) {
        if (property.type?.declaration?.signatures) {
            return property.type?.declaration.signatures[0].comment;
        }
    }
    if (property.signatures) {
        return property.signatures[0].comment;
    }
    return property.comment;
}
