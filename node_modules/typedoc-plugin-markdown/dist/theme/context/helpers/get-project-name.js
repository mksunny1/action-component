"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectName = getProjectName;
function getProjectName(stringWithPlaceholders, page) {
    return stringWithPlaceholders
        .replace('{projectName}', page.project.name)
        .replace('{version}', page.project.packageVersion ? `v${page.project.packageVersion}` : '')
        .replace(/\s+/g, ' ')
        .trim();
}
