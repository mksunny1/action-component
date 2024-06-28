import { MarkdownPageEvent } from '../../../events';
import { MarkdownThemeContext } from '../../../theme';
import { DocumentReflection } from 'typedoc';
/**
 * Template that maps to a project document.
 */
export declare function document(this: MarkdownThemeContext, page: MarkdownPageEvent<DocumentReflection>): string;
