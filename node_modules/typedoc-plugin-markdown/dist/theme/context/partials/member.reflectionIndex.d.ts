import { MarkdownThemeContext } from '../../../theme';
import { DeclarationReflection, ProjectReflection } from 'typedoc';
export declare function reflectionIndex(this: MarkdownThemeContext, model: ProjectReflection | DeclarationReflection, options: {
    headingLevel: number;
}): string;
