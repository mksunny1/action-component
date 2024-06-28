import { ElementMemberAction } from "../activity/element-actions.js";
import { ComponentAction, IComponentActionContext, IComponentActions } from "./component-action.js";
export interface IStrObject {
    [key: string | number | symbol]: string;
}
export declare class ComponentMemberAction extends ComponentAction {
    static suffix: string;
    createActions(context: IComponentActionContext): IComponentActions;
    createMemberAction(element: Element, name: string): ElementMemberAction | undefined;
}
export declare class ComponentAttrAction extends ComponentMemberAction {
    static suffix: string;
    createMemberAction(element: Element, name: string): ElementMemberAction;
}
export declare class ComponentPropAction extends ComponentMemberAction {
    static nameMap: IStrObject;
    static suffix: string;
    createMemberAction(element: Element, name: string): ElementMemberAction;
}
export declare class ComponentTextContentAction extends ComponentAction {
    static attr: string;
    createActions(context: IComponentActionContext): IComponentActions;
}
//# sourceMappingURL=element-member.d.ts.map