"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatures = signatures;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
function signatures(model, options) {
    const md = [];
    const multipleSignatures = model.signatures && model.signatures?.length > 1;
    if (model.comment && multipleSignatures) {
        md.push(this.partials.comment(model.comment, {
            headingLevel: options.headingLevel + 1,
        }));
    }
    if (multipleSignatures && model.documents) {
        md.push(this.partials.documents(model, {
            headingLevel: options.headingLevel + 1,
        }));
    }
    model.signatures?.forEach((signature) => {
        if (multipleSignatures) {
            md.push((0, markdown_1.heading)(options.headingLevel + 1, `${(0, utils_1.escapeChars)(signature.name)}(${signature.parameters
                ?.map((param) => param.name)
                .join(', ')})`));
        }
        md.push(this.partials.signature(signature, {
            headingLevel: multipleSignatures
                ? options.headingLevel + 2
                : options.headingLevel + 1,
            nested: options.nested,
            multipleSignatures,
        }));
    });
    return md.join('\n\n');
}
