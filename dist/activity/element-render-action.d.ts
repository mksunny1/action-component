import { ActionObject } from "../../../action-object/dist/action-object.js";
import { ClassAction } from "../../../class-action/dist/class-action.js";
import { ActionComponent } from "../component/action-component.js";
import { ElementMemberAction, IElementMemberActionContext } from "./element-actions.js";
/**
 * An action that renders an element. This has been placed in its own module
 * because of the extra complexity involved.
 *
 */
export declare class ElementRenderAction extends ElementMemberAction {
    static ActionComponentType: typeof ActionComponent;
    roots?: ActionObject[];
    constructor(roots: ActionObject[], element: Element, ...reactions: ClassAction<any>[]);
    reactionKey(context?: IElementMemberActionContext): string;
}
//# sourceMappingURL=element-render-action.d.ts.map