"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertiesTable = propertiesTable;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
const typedoc_1 = require("typedoc");
const get_property_default_value_1 = require("../helpers/get-property-default-value");
/**
 * Renders a collection of properties in a table.
 *
 * There is no association list partial for properties as these are handled as a standard list of members.
 */
function propertiesTable(model, options) {
    const tableColumnsOptions = this.options.getValue('tableColumnSettings');
    const leftAlignHeadings = tableColumnsOptions.leftAlignHeaders;
    const declarations = this.helpers.getFlattenedDeclarations(model);
    const modifiers = declarations.map((prop) => this.helpers.getModifier(prop)?.toString());
    const comments = declarations.map((prop) => prop.comment
        ? this.partials.comment(prop.comment, { isTableColumn: true })
        : '');
    const hasModifiers = !tableColumnsOptions.hideModifiers &&
        modifiers.some((value) => Boolean(value));
    const hasOverrides = !tableColumnsOptions.hideOverrides &&
        model.some((prop) => Boolean(prop.overwrites));
    const hasInheritance = !tableColumnsOptions.hideInherited &&
        model.some((prop) => Boolean(prop.inheritedFrom));
    const hasDefaults = !tableColumnsOptions.hideDefaults &&
        model.some((prop) => Boolean((0, get_property_default_value_1.getPropertyDefaultValue)(prop)));
    const hasComments = comments.some((value) => Boolean(value));
    const hasSources = !tableColumnsOptions.hideSources &&
        !this.options.getValue('disableSources');
    const headers = [];
    headers.push(options?.isEventProps
        ? this.i18n.theme_event()
        : this.internationalization.kindSingularString(typedoc_1.ReflectionKind.Property));
    if (hasModifiers) {
        headers.push(this.i18n.theme_modifier());
    }
    headers.push(this.i18n.theme_type());
    if (hasDefaults) {
        headers.push(this.i18n.theme_default_value());
    }
    if (hasComments) {
        headers.push(this.i18n.theme_description());
    }
    if (hasOverrides) {
        headers.push(this.i18n.theme_overrides());
    }
    if (hasInheritance) {
        headers.push(this.i18n.theme_inherited_from());
    }
    if (hasSources) {
        headers.push(this.i18n.theme_defined_in());
    }
    const rows = [];
    declarations.forEach((property, index) => {
        const propertyType = this.helpers.getDeclarationType(property);
        const row = [];
        const nameColumn = [];
        if (this.options.getValue('useHTMLAnchors') && property.anchor) {
            nameColumn.push(`<a id="${property.anchor}" name="${property.anchor}"></a>`);
        }
        const propertyName = `${property.name}${property.flags.isOptional ? '?' : ''}`;
        if (property.isDeprecated && property.isDeprecated()) {
            nameColumn.push((0, markdown_1.strikeThrough)((0, markdown_1.backTicks)(propertyName)));
        }
        else {
            nameColumn.push((0, markdown_1.backTicks)(propertyName));
        }
        row.push(nameColumn.join(' '));
        if (hasModifiers) {
            row.push((0, markdown_1.backTicks)(modifiers[index] || 'public'));
        }
        if (propertyType) {
            const type = propertyType.declaration?.signatures?.length
                ? this.partials.functionType(propertyType?.declaration?.signatures, { forceParameterType: true })
                : this.partials.someType(propertyType);
            row.push((0, utils_1.removeLineBreaks)(type));
        }
        if (hasDefaults) {
            row.push((0, get_property_default_value_1.getPropertyDefaultValue)(property) || (0, markdown_1.backTicks)('undefined'));
        }
        if (hasComments) {
            const commentText = comments[index];
            if (commentText?.length) {
                row.push(commentText);
            }
            else {
                row.push('-');
            }
        }
        if (hasOverrides) {
            row.push(property.overwrites
                ? this.partials.inheritance(property, { headingLevel: -1 })
                : '-');
        }
        if (hasInheritance) {
            row.push(property.inheritedFrom
                ? this.partials.inheritance(property, { headingLevel: -1 })
                : '-');
        }
        if (hasSources) {
            row.push(this.partials.sources(property, { headingLevel: -1 }));
        }
        rows.push(row);
    });
    const displayHtmlTable = this.options.getValue('propertiesFormat') === 'htmlTable';
    return displayHtmlTable
        ? (0, markdown_1.htmlTable)(headers, rows, leftAlignHeadings)
        : (0, markdown_1.table)(headers, rows, leftAlignHeadings);
}
