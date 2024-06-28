"use strict";
/**
 * The public API of typedoc-plugin-markdown exposes some classes and types that can be used to customize the output of the plugin.
 * If you are interested more generally in the TypeDoc API please visit [https://typedoc.org](https://typedoc.org/api/).
 *
 * @document ../supporting-docs/public/local-plugins.md
 * @document ../supporting-docs/public/customizing-output.md
 * @document ../supporting-docs/public/utilizing-navigation.md
 *
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownThemeContext = exports.MarkdownTheme = exports.MarkdownRendererEvent = exports.MarkdownPageEvent = void 0;
var events_1 = require("./events");
Object.defineProperty(exports, "MarkdownPageEvent", { enumerable: true, get: function () { return events_1.MarkdownPageEvent; } });
Object.defineProperty(exports, "MarkdownRendererEvent", { enumerable: true, get: function () { return events_1.MarkdownRendererEvent; } });
var theme_1 = require("./theme");
Object.defineProperty(exports, "MarkdownTheme", { enumerable: true, get: function () { return theme_1.MarkdownTheme; } });
Object.defineProperty(exports, "MarkdownThemeContext", { enumerable: true, get: function () { return theme_1.MarkdownThemeContext; } });
