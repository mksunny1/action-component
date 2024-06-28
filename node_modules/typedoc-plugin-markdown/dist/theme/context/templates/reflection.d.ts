import { MarkdownPageEvent } from '../../../events';
import { MarkdownThemeContext } from '../../../theme';
import { DeclarationReflection } from 'typedoc';
/**
 * Template that maps to individual reflection models.
 */
export declare function reflection(this: MarkdownThemeContext, page: MarkdownPageEvent<DeclarationReflection>): string;
