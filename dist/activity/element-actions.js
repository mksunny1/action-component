import { ClassAction } from "class-action";
export class ElementAction extends ClassAction {
    constructor(element, ...reactions) {
        super(...reactions);
        this.element = element;
    }
}
export class ElementMemberAction extends ElementAction {
}
/**
 * An action that sets or removes an attribute of its element.
 */
export class ElementAttrAction extends ElementMemberAction {
    constructor(attrName, element, ...reactions) {
        super(element, ...reactions);
        this.attrName = attrName;
    }
    doAction(context) {
        if (context?.value === undefined) {
            this.element.removeAttribute(this.attrName);
        }
        else {
            this.element.setAttribute(this.attrName, context.value);
        }
    }
}
/**
 * An action that sets or removes a property of its element
 */
export class ElementPropAction extends ElementMemberAction {
    constructor(propName, element, ...reactions) {
        super(element, ...reactions);
        this.propName = propName;
    }
    doAction(context) {
        if (context?.value === undefined) {
            delete this.element[this.propName];
        }
        else {
            this.element[this.propName] = context.value;
        }
    }
}
export class ElementIfAction extends ElementMemberAction {
    constructor(root, actionComponent, element, ...reactions) {
        super(element, ...reactions);
        this.root = root;
        this.actionComponent = actionComponent;
    }
    doAction(context) {
        if (this.actionComponent.key)
            this.root.removeActions(this.actionComponent.key);
        if (context?.value === undefined) {
            if (this.renderedElements) {
                for (let element of this.renderedElements) {
                    element.remove();
                }
                delete this.renderedElements;
            }
        }
        else {
            this.renderedElements = [];
            const parent = this.element.parentElement;
            for (let element of this.element.children) {
                element = element.cloneNode(true);
                parent.insertBefore(element, this.element);
                this.actionComponent.act({ element, root: this.root });
                this.renderedElements.push(element);
            }
        }
    }
}
/**
 * An action that inserts an element(s) before its element
 */
export class ElementInsertBeforeAction extends ElementMemberAction {
    doAction(context) {
        if (context?.value instanceof Element) {
            this.element.parentElement.insertBefore(context.value, this.element);
        }
        else if (context?.value instanceof Array) {
            const parent = this.element.parentElement;
            for (let element of context.value) {
                parent.insertBefore(element, this.element);
            }
        }
    }
}
/**
 * An action that appends element(s) to its element.
 */
export class ElementAppendAction extends ElementMemberAction {
    doAction(context) {
        if (context?.value instanceof Array) {
            this.element.append(...context.value);
        }
        else if (context?.value instanceof Element) {
            this.element.appendChild(context.value);
        }
    }
}
/**
 * An action that removes the element(s) before its element
 */
export class ElementRemoveBeforeAction extends ElementMemberAction {
    doAction(context) {
        let count = typeof context?.value === "number" ? context.value : 1;
        while (count-- > 0)
            this.element.previousElementSibling?.remove();
    }
}
/**
 * An action that removes the last child(ren) of its element
 */
export class ElementRemoveAction extends ElementMemberAction {
    doAction(context) {
        let count = typeof context?.value === "number" ? context.value : 1;
        while (count-- > 0)
            this.element.lastElementChild?.remove();
    }
}
