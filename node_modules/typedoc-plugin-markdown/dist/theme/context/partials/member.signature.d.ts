import { MarkdownThemeContext } from '../../../theme';
import { SignatureReflection } from 'typedoc';
export declare function signature(this: MarkdownThemeContext, model: SignatureReflection, options: {
    headingLevel: number;
    nested?: boolean;
    accessor?: string;
    multipleSignatures?: boolean;
}): string;
