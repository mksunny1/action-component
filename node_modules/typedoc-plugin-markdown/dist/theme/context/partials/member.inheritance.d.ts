import { MarkdownThemeContext } from '../../../theme';
import { DeclarationReflection, SignatureReflection } from 'typedoc';
export declare function inheritance(this: MarkdownThemeContext, model: DeclarationReflection | SignatureReflection, options: {
    headingLevel: number;
}): string;
