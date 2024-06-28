import { ComplexComponentAction, IComponentActionContext, IComponentActions } from "./component-action.js";
/**
 * Adds a local scope. The outer scope remains available.
 *
 * NB: Decide on a prefix for the local scope (static variable likely)
 *
 */
export declare class ComponentLocalAction extends ComplexComponentAction {
    static attr: string;
    currentElement?: Element;
    reactionKeys: WeakMap<Element, string>;
    createActions(context: IComponentActionContext): IComponentActions;
}
//# sourceMappingURL=local-action.d.ts.map