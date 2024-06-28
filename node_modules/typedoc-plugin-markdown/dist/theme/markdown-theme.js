"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownTheme = void 0;
const utils_1 = require("../libs/utils");
const maps_1 = require("../options/maps");
const theme_1 = require("../theme");
const base_1 = require("../theme/base");
const typedoc_1 = require("typedoc");
/**
 * The main theme class for the plugin.
 *
 * The class controls how TypeDoc models are mapped to files and templates and extends TypeDoc's base Theme class.
 *
 * You would typically only be interested in overriding the the theme's render context instance.
 *
 * The API follows the implementation of [TypeDoc's custom theming](https://github.com/TypeStrong/typedoc/blob/master/internal-docs/custom-themes.md) with some minor adjustments.
 *
 * @group Theme Classes
 */
class MarkdownTheme extends typedoc_1.Theme {
    constructor(renderer) {
        super(renderer);
        /**
         * @internal
         */
        this.documentTemplate = (page) => {
            return this.getRenderContext(page).templates.document(page);
        };
        /**
         * @internal
         */
        this.readmeTemplate = (page) => {
            return this.getRenderContext(page).templates.readme(page);
        };
        /**
         * @internal
         */
        this.projectTemplate = (page) => {
            return this.getRenderContext(page).templates.project(page);
        };
        /**
         * @internal
         */
        this.reflectionTemplate = (page) => {
            return this.getRenderContext(page).templates.reflection(page);
        };
    }
    /**
     * Renders a template and page model to a string.
     *
     * @internal
     */
    render(page, template) {
        try {
            return (0, utils_1.formatMarkdown)(template(page));
        }
        catch (e) {
            this.application.logger.error(`Error rendering page ${page.url}. ${e}`);
            throw new Error(e);
        }
    }
    /**
     * Creates a new instance of the current theme context.
     *
     * This method can be overridden to provide an alternative theme context.
     */
    getRenderContext(page) {
        return new theme_1.MarkdownThemeContext(this, page, this.application.options);
    }
    /**
     * Maps the models of the given project to the desired output files.
     */
    getUrls(project) {
        return new base_1.UrlBuilder(this, project).getUrls();
    }
    /**
     * Map the models of the given project to a navigation structure.
     */
    getNavigation(project) {
        return new base_1.NavigationBuilder(this, project).getNavigation();
    }
    /**
     * @internal
     */
    getTemplateMapping(kind, outputFileStrategy) {
        outputFileStrategy =
            outputFileStrategy ||
                this.application.options.getValue('outputFileStrategy');
        const directoryName = (reflectionKind) => {
            const pluralString = typedoc_1.ReflectionKind.pluralString(reflectionKind);
            return pluralString.replace(/[\s_-]+/g, '-').toLowerCase();
        };
        const membersWithOwnFile = this.application.options.getValue('membersWithOwnFile');
        const memberMapping = (template, kind) => {
            return {
                template,
                directory: directoryName(kind),
                kind: kind,
            };
        };
        const mappings = {
            [typedoc_1.ReflectionKind.Module]: {
                template: this.reflectionTemplate,
                directory: null,
                kind: typedoc_1.ReflectionKind.Module,
            },
            [typedoc_1.ReflectionKind.Namespace]: {
                template: this.reflectionTemplate,
                directory: directoryName(typedoc_1.ReflectionKind.Namespace),
                kind: typedoc_1.ReflectionKind.Namespace,
            },
            [typedoc_1.ReflectionKind.Document]: {
                template: this.documentTemplate,
                directory: directoryName(typedoc_1.ReflectionKind.Document),
                kind: typedoc_1.ReflectionKind.Document,
            },
        };
        if (outputFileStrategy === maps_1.OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.Class])) {
            mappings[typedoc_1.ReflectionKind.Class] = memberMapping(this.reflectionTemplate, typedoc_1.ReflectionKind.Class);
        }
        if (outputFileStrategy === maps_1.OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.Interface])) {
            mappings[typedoc_1.ReflectionKind.Interface] = memberMapping(this.reflectionTemplate, typedoc_1.ReflectionKind.Interface);
        }
        if (outputFileStrategy === maps_1.OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.Enum])) {
            mappings[typedoc_1.ReflectionKind.Enum] = memberMapping(this.reflectionTemplate, typedoc_1.ReflectionKind.Enum);
        }
        if (outputFileStrategy === maps_1.OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.Function])) {
            mappings[typedoc_1.ReflectionKind.Function] = memberMapping(this.reflectionTemplate, typedoc_1.ReflectionKind.Function);
        }
        if (outputFileStrategy === maps_1.OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.TypeAlias])) {
            mappings[typedoc_1.ReflectionKind.TypeAlias] = memberMapping(this.reflectionTemplate, typedoc_1.ReflectionKind.TypeAlias);
        }
        if (outputFileStrategy === maps_1.OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.Variable])) {
            mappings[typedoc_1.ReflectionKind.Variable] = memberMapping(this.reflectionTemplate, typedoc_1.ReflectionKind.Variable);
        }
        return mappings[kind];
    }
}
exports.MarkdownTheme = MarkdownTheme;
