"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslatable = getTranslatable;
/**
 * Translations methods.
 *
 * @module
 */
const internationalization_1 = require("../internationalization");
/**
 * Returns subset of translatable strings for the plugin.
 *
 * These will then be merged with the main set of TypeDoc string.
 *
 * @category Methods
 */
function getTranslatable(app) {
    const LOCALES = {
        en: internationalization_1.en,
        jp: internationalization_1.jp,
        ko: internationalization_1.ko,
        zh: internationalization_1.zh,
    };
    return {
        ...LOCALES['en'],
        ...(app.lang !== 'en' && Object.keys(LOCALES).includes(app.lang)
            ? { ...LOCALES[app.lang] }
            : {}),
        ...app.options.getValue('locales')[app.lang],
    };
}
