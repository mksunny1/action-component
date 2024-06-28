import { ActionObject } from "../../../action-object/dist/action-object.js";
import { ClassAction } from "../../../class-action/dist/class-action.js";
import { ActionComponent } from "../action-component.js";
export declare class ElementAction<T> extends ClassAction<T> {
    element: Element;
    constructor(element: Element, ...reactions: ClassAction<any>[]);
}
export interface IElementMemberActionContext {
    value?: any;
}
export declare class ElementMemberAction<T = IElementMemberActionContext> extends ElementAction<T> {
}
/**
 * An action that sets or removes an attribute of its element.
 */
export declare class ElementAttrAction extends ElementMemberAction {
    attrName: string;
    constructor(attrName: string, element: Element, ...reactions: ClassAction<any>[]);
    doAction(context?: IElementMemberActionContext): void;
}
/**
 * An action that sets or removes a property of its element
 */
export declare class ElementPropAction extends ElementMemberAction {
    propName: string;
    constructor(propName: string, element: Element, ...reactions: ClassAction<any>[]);
    doAction(context?: IElementMemberActionContext): void;
}
export declare class ElementIfAction extends ElementMemberAction {
    root: ActionObject;
    actionComponent: ActionComponent;
    reactionKey?: string;
    renderedElements?: Element[];
    constructor(root: ActionObject, actionComponent: ActionComponent, element: Element, ...reactions: ClassAction<any>[]);
    doAction(context?: IElementMemberActionContext): void;
}
/**
 * An action that inserts an element(s) before its element
 */
export declare class ElementInsertBeforeAction extends ElementMemberAction {
    doAction(context?: IElementMemberActionContext): void;
}
/**
 * An action that appends element(s) to its element.
 */
export declare class ElementAppendAction extends ElementMemberAction {
    doAction(context?: IElementMemberActionContext): void;
}
/**
 * An action that removes the element(s) before its element
 */
export declare class ElementRemoveBeforeAction extends ElementMemberAction {
    doAction(context?: IElementMemberActionContext): void;
}
/**
 * An action that removes the last child(ren) of its element
 */
export declare class ElementRemoveAction extends ElementMemberAction {
    doAction(context?: IElementMemberActionContext): void;
}
//# sourceMappingURL=element-actions.d.ts.map