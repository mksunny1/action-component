import { MarkdownThemeContext } from '../../../theme';
import { DeclarationReflection } from 'typedoc';
export declare function signatures(this: MarkdownThemeContext, model: DeclarationReflection, options: {
    headingLevel: number;
    nested?: boolean;
}): string;
