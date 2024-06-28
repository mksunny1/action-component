import { ComplexComponentAction, IComponentActionContext, IComponentActions } from "./component-action.js";
import { ActionObject } from "action-object";

/**
 * Adds a local scope. The outer scope remains available.
 * 
 * NB: Decide on a prefix for the local scope (static variable likely)
 * 
 */
export class ComponentLocalAction extends ComplexComponentAction {
    static attr = 'loc-al';
    currentElement?: Element;    
    reactionKeys: WeakMap<Element, string> = new WeakMap();
    // to avoid inifinite recursion during processing because the call is re-entrant.

    createActions(context: IComponentActionContext): IComponentActions {
        if (this.currentElement === context.element) return {};
        else this.currentElement = context.element;

        const { ComplexActionComponent, attr, setPrefix, callPrefix } = <typeof ComponentLocalAction>this.constructor
        const result: IComponentActions = {};

        if (context.element.hasAttribute(attr)) {
            context.closedElement = true;

            let path = context.element.getAttribute(attr);
            if (!path || !path.startsWith(setPrefix)) return result;
            path = path.slice(setPrefix.length);

            if (this.reactionKeys.has(context.element)) {
                console.log('Removing existing!!');
                // first remove previously added elements with the key.
                const reactionKey = this.reactionKeys.get(context.element);
                context.root.removeActions(reactionKey);
                let parentContext = context.parent;
                while (parentContext) {
                    parentContext.root.removeActions(reactionKey);
                    parentContext = parentContext.parent;
                }
            }
            
            const localActionComponent = new ComplexActionComponent();
            if (localActionComponent.hasOwnProperty('key')) this.reactionKeys.set(context.element, localActionComponent.key);

            let actionContext = context;
            while (actionContext && !(actionContext.root.has(path))) actionContext = actionContext.parent;
            const actionObject = new ActionObject(actionContext.root.getValue(path));
            localActionComponent.act({ element: context.element, root: actionObject, parent: actionContext });
            actionObject.act();
            actionContext.root.getChild(path, true).merge(actionObject);
        }
        delete this.currentElement; 
        return result;
    }
}