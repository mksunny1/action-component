"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDeclarationTable = typeDeclarationTable;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
const typedoc_1 = require("typedoc");
function typeDeclarationTable(model, options) {
    const tableColumnsOptions = this.options.getValue('tableColumnSettings');
    const leftAlignHeadings = tableColumnsOptions.leftAlignHeaders;
    const hasSources = !tableColumnsOptions.hideSources &&
        !this.options.getValue('disableSources');
    const headers = [];
    const declarations = this.helpers.getFlattenedDeclarations(model, {
        includeSignatures: true,
    });
    const hasDefaultValues = declarations.some((declaration) => Boolean(declaration.defaultValue) && declaration.defaultValue !== '...');
    const hasComments = declarations.some((declaration) => Boolean(declaration.comment));
    headers.push(this.i18n.theme_name());
    headers.push(this.i18n.theme_type());
    if (hasDefaultValues) {
        headers.push(this.i18n.theme_default_value());
    }
    if (hasComments) {
        headers.push(this.i18n.theme_description());
    }
    if (hasSources) {
        headers.push(this.i18n.theme_defined_in());
    }
    const rows = [];
    declarations.forEach((declaration, index) => {
        const row = [];
        row.push((0, markdown_1.backTicks)(declaration.name));
        row.push(this.partials.someType(declaration.type));
        if (hasDefaultValues) {
            row.push((0, utils_1.escapeChars)(!declaration.defaultValue || declaration.defaultValue === '...'
                ? '-'
                : declaration.defaultValue));
        }
        if (hasComments) {
            const comments = declaration.comment;
            if (comments) {
                row.push(this.partials.comment(comments, { isTableColumn: true }));
            }
            else {
                row.push('-');
            }
        }
        if (hasSources) {
            row.push(this.partials.sources(declaration, { headingLevel: -1 }));
        }
        rows.push(row);
    });
    const shouldDisplayHtmlTable = () => {
        if (options?.kind &&
            [typedoc_1.ReflectionKind.Variable, typedoc_1.ReflectionKind.TypeAlias].includes(options?.kind) &&
            this.options.getValue('typeDeclarationFormat') == 'htmlTable') {
            return true;
        }
        if (options?.kind === typedoc_1.ReflectionKind.Property &&
            this.options.getValue('propertyMembersFormat') == 'htmlTable') {
            return true;
        }
        return false;
    };
    return shouldDisplayHtmlTable()
        ? (0, markdown_1.htmlTable)(headers, rows, leftAlignHeadings)
        : (0, markdown_1.table)(headers, rows, leftAlignHeadings);
}
