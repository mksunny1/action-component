/**
 * Here we export a component action which can be used with @module:actribute or
 * @module:appliance to create class actions for many DOM operations like
 * attribute change, property change, re-rendering and array-binding.
 */
import { ClassAction } from "class-action";
import { IComponentActionContext } from "./component-action.js";
/**
 * An object used for setting up reactivity in DOM trees.
 * It is first initialized with top-level root ActionObjects. Then to
 * set up reactivity on an element's tree we simply invoke
 * {@link ActionComponent#process} passing the element as argument.
 *
 * @example
 * import { ActionComponent } from "action-component";
 * const root = { a: 1, b: 2 };
 * const actionComponent = new ActionComponent();
 * actionComponent.act({element: document.querySelector('#myComponent'), root})
 *
 */
export declare class ActionComponent extends ClassAction<IComponentActionContext> {
    /**
     * All the sub-components used with this component for processing
     * elements.
     */
    static reactions: ClassAction<any>[];
    /**
     * Set to the empty string to disable keys.
     */
    static key: string;
    static count: number;
    key?: string;
    reactionKeys: Set<string>;
    /**
     * Initializes a new instance with the given roots and reactions.
     * If a root is not an instance of {@link ActionObject} a new ActionObject
     * is internally created for it.
     *
     * @example
     * import { ActionComponent } from "action-component";
     * const root = { a: 1, b: 2 };
     * const actionComponent = new ActionComponent();
     * actionComponent.act({element: document.querySelector('#myComponent'), root})
     *
     * @param roots
     * @param reactions
     */
    constructor(...reactions: ClassAction<any>[]);
    /**
     * Processes the given element to setup reactivity on it. This is
     * a very abstract position and much is left to the reactions to
     * determine how the element is processed. This function mostly just
     * provides the overall framework for the processing which is to
     * recursively process the element and its descendants (until `process`
     * has been called on all elements in the tree or a reaction uses the
     * shared context to inform the action object that a given element is
     * 'closed').
     *
     * @example
     * import { ActionComponent } from "action-component";
     * import { ActionObject } from "action-object";
     * const root = new ActionObject({ a: 1, b: 2 });
     * const actionComponent = new ActionComponent();
     * actionComponent.act({element: document.body, root})
     *
     * @param context
     * @returns
     */
    act(context?: IComponentActionContext): this;
    doReactions(context?: IComponentActionContext): boolean;
}
//# sourceMappingURL=action-component.d.ts.map