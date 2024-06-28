import { MarkdownThemeContext } from '../../../public-api';
import { ReflectionKind } from 'typedoc';
export declare function useTableFormat(this: MarkdownThemeContext, key: 'properties' | 'parameters' | 'enums' | 'typeDeclarations' | 'propertyMembers', reflectionKind?: ReflectionKind): boolean;
