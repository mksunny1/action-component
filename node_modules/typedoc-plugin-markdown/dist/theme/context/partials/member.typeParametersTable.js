"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeParametersTable = typeParametersTable;
const markdown_1 = require("../../../libs/markdown");
const typedoc_1 = require("typedoc");
function typeParametersTable(model) {
    const tableColumnsOptions = this.options.getValue('tableColumnSettings');
    const hasDefault = !tableColumnsOptions.hideDefaults &&
        model.some((typeParameter) => Boolean(typeParameter.default));
    const hasComments = model.some((typeParameter) => Boolean(typeParameter.comment));
    const headers = [
        this.internationalization.kindSingularString(typedoc_1.ReflectionKind.TypeParameter),
    ];
    if (hasDefault) {
        headers.push(this.i18n.theme_default_type());
    }
    if (hasComments) {
        headers.push(this.i18n.theme_description());
    }
    const rows = [];
    model?.forEach((typeParameter) => {
        const row = [];
        const nameCol = [];
        nameCol.push((0, markdown_1.backTicks)(typeParameter.name));
        if (typeParameter.type) {
            nameCol.push(`${(0, markdown_1.italic)('extends')} ${this.partials.someType(typeParameter.type)}`);
        }
        row.push(nameCol.join(' '));
        if (hasDefault) {
            if (typeParameter.default) {
                row.push(this.partials.someType(typeParameter.default));
            }
            else {
                row.push('-');
            }
        }
        if (hasComments) {
            if (typeParameter.comment) {
                row.push(this.partials.comment(typeParameter.comment, {
                    isTableColumn: true,
                }));
            }
            else {
                row.push('-');
            }
        }
        rows.push(row);
    });
    return this.options.getValue('parametersFormat') == 'table'
        ? (0, markdown_1.table)(headers, rows, tableColumnsOptions.leftAlignHeaders)
        : (0, markdown_1.htmlTable)(headers, rows, tableColumnsOptions.leftAlignHeaders);
}
