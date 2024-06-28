/**
 * Here we export a component action which can be used with @module:actribute or
 * @module:appliance to create class actions for many DOM operations like
 * attribute change, property change, re-rendering and array-binding.
 */
import { ActionObject } from "action-object";
import { ClassAction } from "class-action";
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
export class ActionComponent extends ClassAction {
    /**
     * All the sub-components used with this component for processing
     * elements.
     */
    static { this.reactions = []; }
    /**
     * Set to the empty string to disable keys.
     */
    static { this.key = 'render'; }
    static { this.count = 0; }
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
    constructor(...reactions) {
        super(...reactions);
        this.reactionKeys = new Set();
        const key = this.constructor.key;
        if (key !== '') {
            this.key = `${key}_${this.constructor.count++}`;
        }
    }
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
    act(context) {
        if (!context)
            return;
        if (!(context.root instanceof ActionObject))
            context.root = new ActionObject(context.root);
        if (this.key)
            context.reactionKey = this.key;
        super.act(context);
        return this;
    }
    doReactions(context) {
        for (let reaction of this.getAllReactions(context)) {
            reaction.act(context);
            if (context.closedElement)
                return delete context.closedElement;
        }
        let child = context.element.firstElementChild;
        while (child) {
            this.act(Object.assign({}, context, { element: child }));
            child = child.nextElementSibling;
        }
    }
}
