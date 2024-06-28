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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = header;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
const path = __importStar(require("path"));
const typedoc_1 = require("typedoc");
function header() {
    const textContentMappings = this.options.getValue('textContentMappings');
    const getHeader = () => {
        const isPackages = this.options.getValue('entryPointStrategy') ===
            typedoc_1.EntryPointStrategy.Packages;
        if (isPackages) {
            const packageItem = findPackage(this.page.model);
            if (packageItem) {
                return getPackageHeader();
            }
        }
        return getProjectHeader();
    };
    const getProjectHeader = () => {
        const fileExtension = this.options.getValue('fileExtension');
        const entryFileName = `${path.parse(this.options.getValue('entryFileName')).name}${fileExtension}`;
        const md = [];
        const title = this.helpers.getProjectName(textContentMappings['header.title'], this.page);
        const indexLabel = textContentMappings['header.docs'];
        if (this.page.url === entryFileName) {
            md.push((0, markdown_1.bold)(title));
        }
        else {
            md.push((0, markdown_1.link)((0, markdown_1.bold)(title), this.getRelativeUrl(entryFileName)));
        }
        const preserveReadme = Boolean(this.page.project.readme) &&
            !this.options.getValue('mergeReadme');
        const useEntryModule = (this.page.project?.groups &&
            Boolean(this.page.project?.groups[0]?.children.find((child) => child.name === this.options.getValue('entryModule')))) ||
            false;
        if (preserveReadme) {
            const readMeUrl = useEntryModule
                ? `readme_${fileExtension}`
                : entryFileName;
            const indexUrl = useEntryModule ? entryFileName : this.page.project.url;
            if (Boolean(indexLabel.length)) {
                if (this.page.url === readMeUrl) {
                    md.push((0, markdown_1.link)((0, markdown_1.bold)(indexLabel), this.getRelativeUrl(indexUrl || '')));
                }
                else {
                    md.push((0, markdown_1.bold)(indexLabel));
                }
            }
        }
        else {
            if (Boolean(indexLabel.length)) {
                md.push((0, markdown_1.bold)(indexLabel));
            }
        }
        return `${md.join(' • ')}\n\n***\n`;
    };
    const getPackageHeader = () => {
        const packageItem = findPackage(this.page.model);
        if (!packageItem) {
            return '';
        }
        const md = [];
        const indexLabel = textContentMappings['header.docs'];
        const ignoreScopes = this.options.getValue('excludeScopesInPaths');
        const fileExtension = this.options.getValue('fileExtension');
        const entryFileName = `${path.parse(this.options.getValue('entryFileName')).name}${fileExtension}`;
        const packageItemName = packageItem.packageVersion
            ? `${packageItem.name} v${packageItem.packageVersion}`
            : packageItem.name;
        const packagesMeta = this.getPackageMetaData(packageItem.name);
        const entryModule = packagesMeta.options?.getValue('entryModule');
        const packageEntryFile = ignoreScopes
            ? (0, utils_1.removeFirstScopedDirectory)(`${packageItem.name}${path.sep}${entryFileName}`)
            : `${packageItem.name}${path.sep}${entryFileName}`;
        if (this.page.url === packageEntryFile || Boolean(entryModule)) {
            md.push((0, markdown_1.bold)(packageItemName));
        }
        else {
            md.push((0, markdown_1.link)((0, markdown_1.bold)(packageItemName), this.getRelativeUrl(packageEntryFile)));
        }
        const preservePackageReadme = Boolean(packageItem.readme) && !this.options.getValue('mergeReadme');
        if (preservePackageReadme) {
            if (Boolean(indexLabel.length)) {
                if (this.page.url === packageEntryFile) {
                    md.push((0, markdown_1.link)((0, markdown_1.bold)(indexLabel), this.getRelativeUrl(packageItem.url || '')));
                }
                else {
                    md.push((0, markdown_1.bold)(indexLabel));
                }
            }
        }
        else {
            if (Boolean(indexLabel.length)) {
                md.push((0, markdown_1.bold)(indexLabel));
            }
        }
        return `${md.join(' • ')}\n\n***\n`;
    };
    function findPackage(model) {
        if (model.kind === typedoc_1.ReflectionKind.Module &&
            model.parent?.kind === typedoc_1.ReflectionKind.Project) {
            return model;
        }
        if (model.parent) {
            return findPackage(model.parent);
        }
        return null;
    }
    return getHeader();
}
