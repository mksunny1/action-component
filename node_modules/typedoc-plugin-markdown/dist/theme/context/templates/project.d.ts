import { MarkdownPageEvent } from '../../../events';
import { MarkdownThemeContext } from '../../../theme';
import { ProjectReflection } from 'typedoc';
/**
 * Template that maps to the root project reflection. This will be the index page / documentation root page.
 */
export declare function project(this: MarkdownThemeContext, page: MarkdownPageEvent<ProjectReflection>): string;
