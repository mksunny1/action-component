import { ClassAction } from "class-action";
import { ActionComponent } from "./action-component.js";
import { ComponentAction } from "./component-action.js";
import { ActionObject } from "action-object";
export class PushAction extends ClassAction {
    constructor(context) {
        super();
        this.context = context;
        context.actionArray.addActions('push', [this], 'call');
    }
    act(context) {
        if (!context?.args)
            return;
        for (let item of context.args) {
            const itemComponent = new ActionComponent();
            const actionItem = new ActionObject(item);
            const cloned = [];
            for (let element of this.context.template) {
                cloned.push(element.cloneNode(true));
            }
            for (let element of cloned) {
                this.context.element.insertBefore(element, this.context.lastElement);
                itemComponent.act({
                    element, root: actionItem,
                    parent: this.context.parentContext
                });
            }
            if (!this.context.actionArray.children)
                this.context.actionArray.children = [];
            this.context.actionArray.children.push(actionItem);
        }
    }
}
/**
 * Removes last element item(s). Note that this (and splice)
 * will not work well if you do an 'if' directly on the item
 * elements. You need to find other solutions for such scenarios,
 * such as putting the conditional element(s) inside the main
 * item elements or extending this class to account for it...
 *
 *
 */
export class PopAction extends ClassAction {
    constructor(context) {
        super();
        this.context = context;
        context.actionArray.addActions('pop', [this], 'call');
    }
    act(context) {
        if (!this.context.actionArray.children.length)
            return;
        for (let i = this.context.template.length; i >= 0; i--) {
            this.context.lastElement.previousElementSibling?.remove();
        }
        this.context.actionArray.children.pop();
    }
}
export class SpliceAction extends ClassAction {
    constructor(context) {
        super();
        this.context = context;
        context.actionArray.addActions('splice', [this], 'call');
    }
    act(context) {
        if (!context?.args)
            return;
        const itemCount = this.context.template.length;
        const index = context.args[0];
        const start = index * itemCount;
        const deleteCount = ((context.args.length > 1) ? context.args[1] : 1) * itemCount;
        let items = [];
        if (context.args.length > 2)
            items = context.args.slice(2);
        let element = this.context.element.children[start];
        let nextElement;
        for (let i = 0; i < deleteCount; i++) {
            nextElement = element?.nextElementSibling;
            element?.remove();
            element = nextElement;
        }
        for (let [i, item] of items.entries()) {
            const itemComponent = new ActionComponent();
            const actionItem = new ActionObject(item);
            const cloned = [];
            for (let element of this.context.template) {
                cloned.push(element.cloneNode(true));
            }
            for (let element of cloned) {
                this.context.element.insertBefore(element, nextElement);
                itemComponent.act({
                    element, root: actionItem, parent: this.context.parentContext
                });
            }
            if (!this.context.actionArray.children)
                this.context.actionArray.children = [];
            this.context.actionArray.children.splice(index + i, 0, actionItem);
        }
    }
}
/**
 * Here we set up element insert, child and append actions to match
 * array modification operations.
 *
 */
export class ComponentForAction extends ComponentAction {
    static { this.attr = 'fo-r'; }
    createActions(context) {
        const { attr, calcSep, setPrefix, callPrefix, valueSep, calcs } = this.constructor;
        const result = {};
        if (context.element instanceof HTMLTemplateElement && context.element.hasAttribute(attr)) {
            context.closedElement = true;
            let path = context.element.getAttribute(attr);
            if (!path)
                return result;
            if (path.startsWith(setPrefix)) {
                path = path.slice(setPrefix.length);
            }
            else if (path.startsWith(callPrefix)) {
                path = path.slice(callPrefix.length);
            }
            let actionContext = context;
            while (actionContext && !(actionContext.root.has(path)))
                actionContext = actionContext.parent;
            const actionArray = actionContext.root.getChild(path, true);
            if (!actionArray) {
                console.error(`Could not find the array at ${path}`);
                return result;
            }
            const forContext = {
                element: context.element.parentElement,
                lastElement: context.element,
                template: [...context.element.children],
                actionArray: actionArray,
                parentContext: context
            };
            new PushAction(forContext);
            new PopAction(forContext);
            new SpliceAction(forContext);
        }
        return result;
    }
}
