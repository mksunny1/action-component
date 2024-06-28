"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = load;
/**
 * The plugin entrypoint and bootstrapping of the plugin.
 *
 * @module
 */
const theme_1 = require("./theme");
const translatable_1 = require("./internationalization/translatable");
const options_1 = require("./options");
const overrides_1 = require("./renderer/overrides");
const packages_1 = require("./renderer/packages");
const typedoc_1 = require("typedoc");
/**
 * The function that is called by TypeDoc to bootstrap the plugin.
 *
 * Here we expose additional TypeDoc options and make some adjustments.
 *
 * This method is not intended to be consumed in any other context that via the `plugin` option.
 *
 * @see https://typedoc.org/guides/development/#plugins.
 */
function load(app) {
    /**
     * ====================
     * 1. Bootstrap Options
     *
     * Iterate over declaration definitions and to the container.
     * ====================
     */
    Object.entries(options_1.declarations).forEach(([name, declaration]) => {
        app.options.addDeclaration({
            name,
            ...declaration,
        });
    });
    /**
     * =================================================
     * 2. Intercept and modify some TypeDoc core methods
     * =================================================
     *
     * Currently the TypeDoc Renderer class is quite coupled to the HTML theme so we override a couple of core methods.
     *
     * Ideally there would be proper decoupling in the TypeDoc core between the Application and Renderer which requires further investigation.
     *
     */
    /**
     * Replace the default HTML theme the with the MarkdownTheme
     */
    Object.defineProperty(app.renderer, 'themes', {
        value: new Map([
            ['default', theme_1.MarkdownTheme],
        ]),
    });
    /**
     * Replace TypeDoc's app.generateDocs method with our own generateDocs method.
     */
    Object.defineProperty(app, 'generateDocs', { value: overrides_1.generateDocs });
    /**
     * Replace TypeDoc's app.renderer.render method with our own render method.
     */
    Object.defineProperty(app.renderer, 'render', {
        value: overrides_1.render,
    });
    /**
     * This is used to hook into the TypeDoc rendering system.
     */
    Object.defineProperty(app.renderer, 'markdownHooks', {
        value: new typedoc_1.EventHooks(),
    });
    /**
     * =========================
     * 3. Configure localization
     *
     * Load the additional translations used by the theme for the selected language.
     * =========================
     */
    app.converter.on(typedoc_1.Converter.EVENT_BEGIN, () => {
        app.internationalization.addTranslations(app.options.getValue('lang'), { ...(0, translatable_1.getTranslatable)(app) }, true);
    });
    /**
     * ============================
     * 4. Apply any other behaviour
     * ============================
     *
     * Currently options set for packages are only stored on the converter and are destroyed before being passed to the {@link Renderer}.
     *
     * By intercepting the package options set in the converter and storing them on the renderer we can use them later in the theme.
     *
     * @todo Ideally this functionality would be available in TypeDoc core - to investigate.
     */
    app.converter.on(typedoc_1.Converter.EVENT_RESOLVE_END, (context) => {
        if (app.options.packageDir) {
            (0, packages_1.resolvePackages)(app, context, app.options.packageDir);
        }
    });
}
/**
 * Export anything that is available publicly
 */
__exportStar(require("./public-api"), exports);
