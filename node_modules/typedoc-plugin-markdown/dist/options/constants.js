"use strict";
/**
 * Contains constant default values used in options.
 *
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEXT_CONTENT_MAPPINGS = exports.ALLOWED_OWN_FILE_MEMBERS = void 0;
const typedoc_1 = require("typedoc");
/**
 * Default values for `membersWithOwnFile` option.
 */
exports.ALLOWED_OWN_FILE_MEMBERS = [
    typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.Enum],
    typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.Variable],
    typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.Function],
    typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.Class],
    typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.Interface],
    typedoc_1.ReflectionKind[typedoc_1.ReflectionKind.TypeAlias],
];
/**
 * Default values for `textContentMappings` option.
 */
exports.TEXT_CONTENT_MAPPINGS = {
    'header.title': '{projectName} {version}',
    'header.docs': 'Docs',
    'breadcrumbs.home': '{projectName} {version}',
    'title.indexPage': '{projectName} {version}',
    'title.memberPage': '{kind}: {name}',
    'footer.text': '',
};
