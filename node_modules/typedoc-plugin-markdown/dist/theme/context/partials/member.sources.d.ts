import { MarkdownThemeContext } from '../../../theme';
import { DeclarationReflection, SignatureReflection } from 'typedoc';
export declare function sources(this: MarkdownThemeContext, model: DeclarationReflection | SignatureReflection, options: {
    headingLevel: number;
}): string;
