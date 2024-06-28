"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametersTable = parametersTable;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
const typedoc_1 = require("typedoc");
function parametersTable(model) {
    const tableColumnsOptions = this.options.getValue('tableColumnSettings');
    const leftAlignHeadings = tableColumnsOptions.leftAlignHeaders;
    const parseParams = (current, acc) => {
        const shouldFlatten = current.type?.declaration?.kind === typedoc_1.ReflectionKind.TypeLiteral &&
            current.type?.declaration?.children;
        return shouldFlatten
            ? [...acc, current, ...flattenParams(current)]
            : [...acc, current];
    };
    const flattenParams = (current) => {
        return current.type?.declaration?.children?.reduce((acc, child) => {
            const childObj = {
                ...child,
                name: `${current.name}.${child.name}`,
            };
            return parseParams(childObj, acc);
        }, []);
    };
    const showDefaults = !tableColumnsOptions.hideDefaults && hasDefaultValues(model);
    const parsedParams = model.reduce((acc, current) => parseParams(current, acc), []);
    const hasComments = parsedParams.some((param) => Boolean(param.comment));
    const headers = [
        this.internationalization.kindSingularString(typedoc_1.ReflectionKind.Parameter),
        this.i18n.theme_type(),
    ];
    if (showDefaults) {
        headers.push(this.i18n.theme_default_value());
    }
    if (hasComments) {
        headers.push(this.i18n.theme_description());
    }
    const firstOptionalParamIndex = model.findIndex((parameter) => parameter.flags.isOptional);
    const rows = [];
    parsedParams.forEach((parameter, i) => {
        const row = [];
        const isOptional = parameter.flags.isOptional ||
            (firstOptionalParamIndex !== -1 && i > firstOptionalParamIndex);
        const rest = parameter.flags.isRest ? '...' : '';
        const optional = isOptional ? '?' : '';
        row.push(`${rest}${(0, markdown_1.backTicks)(parameter.name)}${optional}`);
        if (parameter.type) {
            const displayType = parameter.type instanceof typedoc_1.ReflectionType
                ? this.partials.reflectionType(parameter.type, {
                    forceCollapse: true,
                })
                : this.partials.someType(parameter.type);
            row.push((0, utils_1.removeLineBreaks)(displayType));
        }
        if (showDefaults) {
            row.push((0, markdown_1.backTicks)(this.helpers.getParameterDefaultValue(parameter)));
        }
        if (hasComments) {
            if (parameter.comment) {
                row.push(this.partials.comment(parameter.comment, { isTableColumn: true }));
            }
            else {
                row.push('-');
            }
        }
        rows.push(row);
    });
    return this.options.getValue('parametersFormat') == 'table'
        ? (0, markdown_1.table)(headers, rows, leftAlignHeadings)
        : (0, markdown_1.htmlTable)(headers, rows, leftAlignHeadings);
}
function hasDefaultValues(parameters) {
    const defaultValues = parameters.map((param) => param.defaultValue !== '{}' &&
        param.defaultValue !== '...' &&
        !!param.defaultValue);
    return !defaultValues.every((value) => !value);
}
