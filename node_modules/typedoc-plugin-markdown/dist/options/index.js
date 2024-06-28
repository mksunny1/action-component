"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maps = exports.declarations = exports.constants = void 0;
/**
 * Contains all the option declarations and types used in the plugin.
 *
 * Options exposed to TypeDoc are added as a named export to the declarations options.
 *
 * @example
 *
 * ```ts
 * \/**
 *  * Some more detailed comments about the option.
 *  *
 *  * @category Display
 *  *\/
 * export const myNewOption: Partial<DeclarationOption> = {
 *   help: 'A short description of the option.',
 *   type: ParameterType.Boolean,
 *   defaultValue: false,
 *  };
 *  ```
 *
 *  This will be exposed to TypeDoc as a new option when bootstrapping the plugin, with the name of the option the name of the exported variable.
 *
 *  In addition, when the `prebuild` task is run:

 * - The option type will be added to `TypeDocOptionsMap`.
 * - The documentation will be updated using the JSDoc comments and categorized as per the `@category` tag.
 *
 * @module
 */
exports.constants = __importStar(require("./constants"));
exports.declarations = __importStar(require("./declarations"));
exports.maps = __importStar(require("./maps"));
