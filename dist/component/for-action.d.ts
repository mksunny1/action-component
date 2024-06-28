import { ClassAction } from "class-action";
import { ComponentAction, IComponentActionContext, IComponentActions } from "./component-action.js";
import { ActionObject, IObjectCallActionContext } from "action-object";
export interface IForContext {
    path?: string;
    element: Element;
    lastElement: Element;
    template: Element[];
    parentContext: IComponentActionContext;
    actionArray: ActionObject;
}
export declare class PushAction extends ClassAction<IObjectCallActionContext> {
    context: IForContext;
    constructor(context: IForContext);
    act(context?: IObjectCallActionContext): void;
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
export declare class PopAction extends ClassAction<IObjectCallActionContext> {
    context: IForContext;
    constructor(context: IForContext);
    act(context?: IObjectCallActionContext): void;
}
export declare class SpliceAction extends ClassAction<IObjectCallActionContext> {
    context: IForContext;
    constructor(context: IForContext);
    act(context?: IObjectCallActionContext): void;
}
/**
 * Here we set up element insert, child and append actions to match
 * array modification operations.
 *
 */
export declare class ComponentForAction extends ComponentAction {
    static attr: string;
    createActions(context: IComponentActionContext): IComponentActions;
}
//# sourceMappingURL=for-action.d.ts.map