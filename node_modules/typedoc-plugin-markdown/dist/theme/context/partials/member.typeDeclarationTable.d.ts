import { MarkdownThemeContext } from '../../../theme';
import { DeclarationReflection, ReflectionKind } from 'typedoc';
export declare function typeDeclarationTable(this: MarkdownThemeContext, model: DeclarationReflection[], options: {
    kind?: ReflectionKind;
}): string;
