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
exports.NavigationBuilder = void 0;
const utils_1 = require("../../libs/utils");
const maps_1 = require("../../options/maps");
const path = __importStar(require("path"));
const typedoc_1 = require("typedoc");
class NavigationBuilder {
    constructor(theme, project) {
        this.theme = theme;
        this.project = project;
        this.navigation = [];
        this.options = theme.application.options;
        this.navigationOptions = this.options.getValue('navigationModel');
        this.packagesMeta = theme.application.renderer.packagesMeta;
        this.navigation = [];
        this.isPackages =
            this.options.getValue('entryPointStrategy') ===
                typedoc_1.EntryPointStrategy.Packages;
    }
    getNavigation() {
        if (this.isPackages) {
            if (Object.keys(this.packagesMeta)?.length === 1) {
                this.buildNavigationFromProject(this.project);
            }
            else {
                this.project.children?.forEach((projectChild) => {
                    this.buildNavigationFromPackage(projectChild);
                });
            }
        }
        else {
            this.buildNavigationFromProject(this.project);
        }
        return this.navigation;
    }
    buildNavigationFromPackage(projectChild) {
        const fileExtension = this.options.getValue('fileExtension');
        const entryFileName = `${path.parse(this.options.getValue('entryFileName')).name}${fileExtension}`;
        const preservePackageReadme = Boolean(projectChild.readme) && !this.options.getValue('mergeReadme');
        const packageOptions = this.packagesMeta[projectChild.name]?.options;
        const outputFileStrategy = packageOptions?.isSet('outputFileStrategy')
            ? packageOptions.getValue('outputFileStrategy')
            : this.options.getValue('outputFileStrategy');
        const entryModule = packageOptions?.isSet('entryModule')
            ? packageOptions.getValue('entryModule')
            : this.options.getValue('entryModule');
        const projectChildUrl = preservePackageReadme
            ? `${path.dirname(projectChild.url)}/${entryFileName}`
            : projectChild.url;
        const isModulesGroup = projectChild?.groups &&
            projectChild?.groups[0].children.every((child) => child.kind === typedoc_1.ReflectionKind.Module);
        const children = [];
        if (preservePackageReadme &&
            !isModulesGroup &&
            outputFileStrategy === maps_1.OutputFileStrategy.Modules) {
            children.push({
                title: this.theme.application.internationalization.proxy.theme_globals(),
                path: projectChild.url,
                kind: projectChild.kind,
            });
        }
        const childGroups = this.getReflectionGroups(projectChild, outputFileStrategy);
        if (childGroups) {
            children.push(...childGroups.filter((child) => child.title !== entryModule));
        }
        this.navigation.push({
            title: projectChild.name,
            kind: projectChild.kind,
            children,
            ...(projectChildUrl && { path: projectChildUrl }),
        });
    }
    buildNavigationFromProject(project) {
        const entryModule = this.options.getValue('entryModule');
        if (!this.navigationOptions.excludeCategories &&
            project.categories?.length) {
            this.navigation.push(...project.categories.map((category) => {
                return {
                    title: category.title,
                    children: this.getCategoryGroupChildren(category),
                };
            }));
        }
        else {
            if (project.groups?.length) {
                const isOnlyModules = project.children?.every((child) => child.kind === typedoc_1.ReflectionKind.Module);
                if (isOnlyModules) {
                    project.groups?.forEach((projectGroup) => {
                        if (projectGroup.owningReflection.kind === typedoc_1.ReflectionKind.Module) {
                            const children = this.getGroupChildren(projectGroup);
                            if (children?.length) {
                                this.navigation.push(...children.filter((child) => child.title !== entryModule));
                            }
                        }
                        else {
                            this.navigation.push({
                                title: projectGroup.title,
                                children: projectGroup.children.map((child) => {
                                    return {
                                        title: child.name,
                                        kind: child.kind,
                                        path: child.url,
                                    };
                                }),
                            });
                        }
                    });
                }
                else {
                    project.groups?.forEach((projectGroup) => {
                        const children = this.getGroupChildren(projectGroup);
                        const indexModule = projectGroup.children.find((child) => child.name === entryModule);
                        if (children?.length) {
                            this.navigation.push({
                                title: projectGroup.title,
                                children: children.filter((child) => child.title !== entryModule),
                            });
                        }
                        if (indexModule) {
                            const children = indexModule instanceof typedoc_1.DeclarationReflection
                                ? this.getReflectionGroups(indexModule)
                                : [];
                            if (children) {
                                this.navigation.push(...children);
                            }
                        }
                    });
                }
            }
        }
    }
    getCategoryGroupChildren(group) {
        return group.children
            ?.filter((child) => child.hasOwnDocument)
            .map((child) => {
            const children = child instanceof typedoc_1.DeclarationReflection
                ? this.getReflectionGroups(child)
                : [];
            return {
                title: child.name,
                kind: child.kind,
                url: child.url,
                ...(children && { children }),
            };
        });
    }
    getGroupChildren(group, outputFileStrategy) {
        if (!this.navigationOptions.excludeCategories &&
            group?.categories?.length) {
            return group.categories?.map((category) => {
                return {
                    title: category.title,
                    children: this.getCategoryGroupChildren(category),
                };
            });
        }
        return group.children
            ?.filter((child) => child.hasOwnDocument)
            .reduce((acc, child) => {
            const mapping = this.theme.getTemplateMapping(child.kind, outputFileStrategy);
            if (Boolean(mapping)) {
                const children = child instanceof typedoc_1.DeclarationReflection &&
                    !this.navigationOptions.excludeCategories &&
                    child.categories?.length
                    ? child.categories
                        ?.map((category) => {
                        const catChildren = this.getCategoryGroupChildren(category);
                        return catChildren.length
                            ? {
                                title: category.title,
                                children: catChildren,
                            }
                            : null;
                    })
                        .filter((cat) => Boolean(cat))
                    : this.getReflectionGroups(child, outputFileStrategy);
                return this.processChildren(acc, child, children);
            }
        }, []);
    }
    getReflectionGroups(reflection, outputFileStrategy) {
        if (reflection instanceof typedoc_1.DeclarationReflection &&
            reflection.groups?.some((group) => group.allChildrenHaveOwnDocument())) {
            if (this.navigationOptions.excludeGroups) {
                return reflection.childrenIncludingDocuments
                    ?.filter((child) => child.hasOwnDocument)
                    .reduce((acc, child) => {
                    const children = this.getReflectionGroups(child, outputFileStrategy);
                    return this.processChildren(acc, child, children);
                }, []);
            }
            const groupsWithoutDocs = reflection.groups?.filter((group) => group.title !== typedoc_1.ReflectionKind.pluralString(typedoc_1.ReflectionKind.Document));
            const isModulesGroup = groupsWithoutDocs?.length &&
                groupsWithoutDocs[0].children.every((child) => child.kind === typedoc_1.ReflectionKind.Module);
            if (isModulesGroup) {
                return (this.getGroupChildren(groupsWithoutDocs[0], outputFileStrategy) ||
                    null);
            }
            return reflection.groups
                ?.map((group) => {
                const groupChildren = this.getGroupChildren(group, outputFileStrategy);
                if (groupChildren?.length) {
                    if (group.owningReflection.kind === typedoc_1.ReflectionKind.Document) {
                        return groupChildren[0];
                    }
                    return {
                        title: group.title,
                        children: groupChildren,
                    };
                }
                return null;
            })
                .filter((group) => Boolean(group));
        }
        return null;
    }
    processChildren(acc, child, children) {
        if (!(0, utils_1.isQuoted)(child.name) && !this.navigationOptions.excludeFolders) {
            const titleParts = child.name.split('/');
            if (!child.name.startsWith('@') && titleParts.length > 1) {
                let currentLevel = acc;
                let currentItem;
                for (let i = 0; i < titleParts.length - 1; i++) {
                    currentItem = currentLevel?.find((item) => item.title === titleParts[i]);
                    if (!currentItem) {
                        currentItem = {
                            title: titleParts[i],
                            children: [],
                        };
                        currentLevel.push(currentItem);
                    }
                    if (currentItem) {
                        currentLevel = currentItem.children || [];
                    }
                }
                currentLevel.push({
                    title: titleParts[titleParts.length - 1],
                    kind: child.kind,
                    path: child.url,
                    ...(children && { children }),
                });
                return acc;
            }
        }
        acc.push({
            title: child.name,
            kind: child.kind,
            path: child.url,
            ...(children && { children }),
        });
        return acc;
    }
}
exports.NavigationBuilder = NavigationBuilder;
