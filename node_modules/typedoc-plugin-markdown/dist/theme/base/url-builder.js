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
exports.UrlBuilder = void 0;
const utils_1 = require("../../libs/utils");
const maps_1 = require("../../options/maps");
const path = __importStar(require("path"));
const typedoc_1 = require("typedoc");
/**
 * Map the models of the given project to the desired output files.
 * Based on TypeDoc DefaultTheme.getUrls()
 *
 * @param project  The project whose urls should be generated.
 */
class UrlBuilder {
    constructor(theme, project) {
        this.theme = theme;
        this.project = project;
        this.urls = [];
        this.anchors = {};
        this.options = theme.application.options;
        this.packagesMeta = theme.application.renderer.packagesMeta;
        this.fileExtension = this.options.getValue('fileExtension');
        this.ignoreScopes = this.options.getValue('excludeScopesInPaths');
        this.entryFileName = (0, utils_1.getFileNameWithExtension)(this.options.getValue('entryFileName'), this.fileExtension);
        this.isPackages =
            this.options.getValue('entryPointStrategy') ===
                typedoc_1.EntryPointStrategy.Packages;
        this.flattenOutputFiles = this.options.getValue('flattenOutputFiles');
    }
    getUrls() {
        this.buildEntryUrls();
        if (this.isPackages) {
            if (Object.keys(this.packagesMeta)?.length === 1) {
                this.buildUrlsFromProject(this.project);
            }
            else {
                this.project.children?.forEach((projectChild) => {
                    this.buildUrlsFromPackage(projectChild);
                });
            }
        }
        else {
            this.buildUrlsFromProject(this.project);
        }
        return this.urls;
    }
    buildEntryUrls() {
        const preserveReadme = Boolean(this.project.readme) && !this.options.getValue('mergeReadme');
        const isModulesOnly = this.project.children?.every((child) => child.kind === typedoc_1.ReflectionKind.Module);
        const useEntryModule = this.project?.groups &&
            Boolean(this.project?.groups[0]?.children.find((child) => child.name === this.options.getValue('entryModule'))) &&
            isModulesOnly;
        const indexFilename = this.getIndexFileName(this.project, this.isPackages);
        this.project.url = preserveReadme
            ? indexFilename
            : useEntryModule
                ? indexFilename
                : this.entryFileName;
        if (preserveReadme) {
            this.urls.push({
                url: useEntryModule
                    ? (0, utils_1.getFileNameWithExtension)('readme_', this.fileExtension)
                    : this.entryFileName,
                model: this.project,
                template: this.theme.readmeTemplate,
            });
            if (!useEntryModule) {
                this.urls.push({
                    url: indexFilename,
                    model: this.project,
                    template: this.theme.projectTemplate,
                });
            }
        }
        else {
            if (!useEntryModule) {
                this.urls.push({
                    url: this.entryFileName,
                    model: this.project,
                    template: this.theme.projectTemplate,
                });
            }
        }
    }
    buildUrlsFromProject(project, parentUrl, outputFileStrategy, entryModule, entryFileName) {
        if (project.documents) {
            project.documents.forEach((document) => {
                this.buildUrlsForDocument(document);
            });
        }
        project.groups?.forEach((projectGroup) => {
            projectGroup.children?.forEach((projectGroupChild) => {
                if (projectGroupChild instanceof typedoc_1.DocumentReflection) {
                    this.buildUrlsForDocument(projectGroupChild);
                }
                if (projectGroupChild instanceof typedoc_1.DeclarationReflection) {
                    this.buildUrlsFromGroup(projectGroupChild, {
                        ...(parentUrl && { parentUrl }),
                        ...(outputFileStrategy && { outputFileStrategy }),
                        ...(entryModule && { entryModule }),
                        ...(entryFileName && { entryFileName }),
                    });
                }
            });
        });
    }
    buildUrlsFromPackage(projectChild) {
        const preservePackageReadme = Boolean(projectChild.readme) && !this.options.getValue('mergeReadme');
        const packagesIndex = this.getIndexFileName(projectChild);
        const packageOptions = this.packagesMeta[projectChild.name]?.options;
        const outputFileStrategy = packageOptions.isSet('outputFileStrategy')
            ? packageOptions.getValue('outputFileStrategy')
            : this.options.getValue('outputFileStrategy');
        const entryModule = packageOptions.isSet('entryModule')
            ? packageOptions.getValue('entryModule')
            : this.options.getValue('entryModule');
        const packageEntryFileName = packageOptions.isSet('entryFileName')
            ? packageOptions.getValue('entryFileName')
            : this.options.getValue('entryFileName');
        let fullEntryFileName = (0, utils_1.getFileNameWithExtension)(path.join(projectChild.name, packageEntryFileName), this.fileExtension);
        let fullIndexFileName = (0, utils_1.getFileNameWithExtension)(path.join(projectChild.name, packagesIndex), this.fileExtension);
        if (this.ignoreScopes) {
            fullEntryFileName = (0, utils_1.removeFirstScopedDirectory)(fullEntryFileName);
            fullIndexFileName = (0, utils_1.removeFirstScopedDirectory)(fullIndexFileName);
        }
        const indexFileName = preservePackageReadme
            ? fullIndexFileName
            : fullEntryFileName;
        const isModulesOnly = projectChild.children?.every((child) => child.kind === typedoc_1.ReflectionKind.Module);
        const useEntryModule = projectChild?.groups &&
            Boolean(projectChild?.groups[0]?.children.find((child) => child.name === entryModule)) &&
            isModulesOnly;
        if (preservePackageReadme) {
            this.urls.push({
                url: useEntryModule
                    ? `${path.dirname(indexFileName)}/${(0, utils_1.getFileNameWithExtension)('readme_', this.fileExtension)}`
                    : path.join(path.dirname(indexFileName), (0, utils_1.getFileNameWithExtension)(packageEntryFileName, this.fileExtension)),
                model: projectChild,
                template: this.theme.readmeTemplate,
            });
            if (!useEntryModule) {
                this.urls.push({
                    url: indexFileName,
                    model: projectChild,
                    template: this.theme.projectTemplate,
                });
            }
        }
        else {
            if (!useEntryModule) {
                this.urls.push({
                    url: indexFileName,
                    model: projectChild,
                    template: this.theme.projectTemplate,
                });
            }
        }
        projectChild.url = indexFileName;
        projectChild.documents?.forEach((document) => {
            this.buildUrlsForDocument(document);
        });
        const parentUrl = indexFileName.split(path.sep)?.length > 1
            ? indexFileName
            : `${projectChild.name}/${indexFileName}`;
        this.buildUrlsFromProject(projectChild, parentUrl, outputFileStrategy, entryModule, fullEntryFileName);
    }
    buildUrlsForDocument(reflection) {
        const mapping = this.theme.getTemplateMapping(reflection.kind);
        if (mapping) {
            const baseUrl = path.dirname(reflection.parent?.url || '');
            const directory = this.flattenOutputFiles
                ? typedoc_1.ReflectionKind.singularString(reflection.kind)
                : mapping.directory;
            const filename = [
                (0, utils_1.getFileNameWithExtension)(reflection.name.replace(/ /g, '-'), this.fileExtension),
            ];
            if (reflection?.parent?.kind &&
                ![typedoc_1.ReflectionKind.Module, typedoc_1.ReflectionKind.Project].includes(reflection?.parent?.kind)) {
                filename.unshift((0, utils_1.toPascalCase)(typedoc_1.ReflectionKind.singularString(reflection.parent?.kind)));
            }
            const urlBase = path.join(baseUrl, directory, filename.join('.'));
            const url = this.flattenOutputFiles
                ? urlBase.replace(/\//g, '.')
                : urlBase;
            this.urls.push({
                url,
                model: reflection,
                template: mapping.template,
            });
            reflection.url = url;
            reflection.hasOwnDocument = true;
        }
    }
    buildUrlsFromGroup(reflection, urlOptions) {
        const mapping = this.theme.getTemplateMapping(reflection.kind, urlOptions.outputFileStrategy);
        if (mapping) {
            let url;
            let urlPath = '';
            if (this.flattenOutputFiles) {
                url = this.getFlattenedUrl(reflection);
            }
            else {
                const directory = urlOptions.directory || mapping.directory;
                urlPath = this.getUrlPath(reflection, {
                    ...urlOptions,
                    directory,
                });
                url = this.getUrl(reflection, urlPath, urlOptions);
                if (this.ignoreScopes) {
                    url = (0, utils_1.removeFirstScopedDirectory)(url);
                }
                const duplicateUrls = this.urls.filter((urlMapping) => urlMapping.url.toLowerCase() === url.toLowerCase() &&
                    urlMapping.url !== url);
                if (duplicateUrls.length > 0) {
                    const urlParts = url.split('.');
                    urlParts[urlParts.length - 2] += `-${duplicateUrls.length}`;
                    url = urlParts.join('.');
                }
            }
            this.urls.push({
                url: url,
                model: reflection,
                template: mapping.template,
            });
            reflection.url = url;
            reflection.hasOwnDocument = true;
            reflection.groups?.forEach((group) => {
                group.children.forEach((groupChild) => {
                    const mapping = this.theme.getTemplateMapping(groupChild.kind, urlOptions.outputFileStrategy);
                    this.buildUrlsFromGroup(groupChild, {
                        parentUrl: urlPath,
                        directory: mapping?.directory || null,
                        outputFileStrategy: urlOptions.outputFileStrategy,
                    });
                });
            });
        }
        else if (reflection.parent) {
            this.traverseChildren(reflection, reflection.parent);
        }
    }
    getUrl(reflection, urlPath, urlOptions) {
        const entryModule = urlOptions.entryModule || this.options.getValue('entryModule');
        const entryName = urlOptions.entryFileName || this.entryFileName;
        if (reflection.name === entryModule) {
            return entryName;
        }
        if (this.options.getValue('outputFileStrategy') ===
            maps_1.OutputFileStrategy.Modules &&
            reflection.name === 'index' &&
            path.parse(entryName).name === 'index') {
            return urlPath.replace((0, utils_1.getFileNameWithExtension)('index', this.fileExtension), (0, utils_1.getFileNameWithExtension)('module_index', this.fileExtension));
        }
        return urlPath;
    }
    getFlattenedUrl(reflection) {
        const fullName = reflection.getFullName();
        const fullNameParts = fullName.replace(/\//g, '.').split('.');
        if (reflection.kind !== typedoc_1.ReflectionKind.Module) {
            fullNameParts.splice(fullNameParts.length - 1, 0, (0, utils_1.toPascalCase)(typedoc_1.ReflectionKind.singularString(reflection.kind)));
        }
        const url = `${fullNameParts.join('.')}${this.fileExtension}`
            .replace(/"/g, '')
            .replace(/ /g, '-')
            .replace(/^\./g, '');
        reflection.url = url;
        return url;
    }
    getAlias(name) {
        if ((0, utils_1.isQuoted)(name)) {
            name = name.replace(/\//g, '_');
        }
        return name
            .replace(/"/g, '')
            .replace(/^_+|_+$/g, '')
            .replace(/[<>]/g, '-');
    }
    getUrlPath(reflection, urlOption) {
        const alias = this.getAlias(reflection.name);
        const parentDir = urlOption.parentUrl
            ? path.dirname(urlOption.parentUrl)
            : null;
        const dir = () => {
            if (reflection.kind === typedoc_1.ReflectionKind.Namespace) {
                return `${urlOption.directory}/${alias}`;
            }
            if (reflection.kind === typedoc_1.ReflectionKind.Module) {
                return alias;
            }
            return urlOption.directory
                ? urlOption.directory
                : `${(0, utils_1.slugify)(typedoc_1.ReflectionKind.singularString(reflection.kind))}.${alias}`;
        };
        const filename = () => {
            if ([typedoc_1.ReflectionKind.Module, typedoc_1.ReflectionKind.Namespace].includes(reflection.kind) &&
                this.options.getValue('outputFileStrategy') ===
                    maps_1.OutputFileStrategy.Modules &&
                !this.moduleHasSubfolders(reflection)) {
                return null;
            }
            if ([typedoc_1.ReflectionKind.Module, typedoc_1.ReflectionKind.Namespace].includes(reflection.kind)) {
                return path.parse(this.entryFileName).name;
            }
            return alias;
        };
        return (0, utils_1.getFileNameWithExtension)([parentDir, dir(), filename()].filter((part) => Boolean(part)).join('/'), this.fileExtension);
    }
    traverseChildren(reflection, container) {
        if (container.url) {
            this.applyAnchorUrl(reflection, container.url);
        }
        if (reflection.parent) {
            reflection.traverse((child) => {
                if (child instanceof typedoc_1.DocumentReflection) {
                    this.buildUrlsForDocument(child);
                }
                if (child instanceof typedoc_1.DeclarationReflection) {
                    this.traverseChildren(child, container);
                }
            });
        }
    }
    applyAnchorUrl(reflection, containerUrl) {
        if (reflection.kind !== typedoc_1.ReflectionKind.TypeLiteral) {
            const anchorPrefix = this.options.getValue('anchorPrefix');
            const anchorId = this.getAnchorId(reflection);
            if (anchorId) {
                if (!this.anchors[containerUrl]) {
                    this.anchors[containerUrl] = [];
                }
                this.anchors[containerUrl].push(anchorId);
                const count = this.anchors[containerUrl]?.filter((id) => id === anchorId)?.length;
                const anchorParts = [anchorId];
                if (count > 1) {
                    anchorParts.push(`-${count - 1}`);
                }
                if (anchorPrefix) {
                    anchorParts.unshift(`${anchorPrefix}`);
                }
                reflection.url = containerUrl + '#' + anchorParts.join('');
                reflection.anchor = anchorParts.join('');
                reflection.hasOwnDocument = false;
            }
        }
    }
    getAnchorId(reflection) {
        const preserveAnchorCasing = this.options.getValue('preserveAnchorCasing');
        const anchorName = this.getAnchorName(reflection);
        if (anchorName) {
            return preserveAnchorCasing ? anchorName : anchorName.toLowerCase();
        }
        return null;
    }
    getAnchorName(reflection) {
        const htmlTableAnchors = this.options.getValue('useHTMLAnchors');
        if (!htmlTableAnchors) {
            if ((reflection.kind === typedoc_1.ReflectionKind.Property &&
                this.options.getValue('propertiesFormat').toLowerCase() ===
                    'table') ||
                (reflection.kind === typedoc_1.ReflectionKind.Property &&
                    reflection.parent?.kind === typedoc_1.ReflectionKind.Class &&
                    this.options.getValue('classPropertiesFormat').toLowerCase() ===
                        'table') ||
                (reflection.kind === typedoc_1.ReflectionKind.Property &&
                    reflection.parent?.kind === typedoc_1.ReflectionKind.Interface &&
                    this.options.getValue('interfacePropertiesFormat').toLowerCase() ===
                        'table') ||
                (reflection.kind === typedoc_1.ReflectionKind.EnumMember &&
                    this.options.getValue('enumMembersFormat').toLowerCase() === 'table')) {
                return null;
            }
        }
        if (reflection.kind === typedoc_1.ReflectionKind.Constructor) {
            return 'Constructors';
        }
        const anchorParts = [reflection.name];
        if (reflection.typeParameters?.length) {
            anchorParts.push(reflection.typeParameters
                .map((typeParameter) => typeParameter.name)
                .join(''));
        }
        return anchorParts.join('');
    }
    moduleHasSubfolders(reflection) {
        return reflection.childrenIncludingDocuments?.some((child) => [typedoc_1.ReflectionKind.Namespace, typedoc_1.ReflectionKind.Document].includes(child.kind));
    }
    getIndexFileName(reflection, isPackages = false) {
        if (isPackages) {
            return (0, utils_1.getFileNameWithExtension)('packages', this.fileExtension);
        }
        const isModules = reflection.children?.every((child) => child.kind === typedoc_1.ReflectionKind.Module);
        return isModules
            ? (0, utils_1.getFileNameWithExtension)('modules', this.fileExtension)
            : (0, utils_1.getFileNameWithExtension)('globals', this.fileExtension);
    }
}
exports.UrlBuilder = UrlBuilder;
