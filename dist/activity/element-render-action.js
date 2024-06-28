import { ActionComponent } from "../component/action-component.js";
import { ElementMemberAction } from "./element-actions.js";
/**
 * An action that renders an element. This has been placed in its own module
 * because of the extra complexity involved.
 *
 */
export class ElementRenderAction extends ElementMemberAction {
    static { this.ActionComponentType = ActionComponent; }
    constructor(roots, element, ...reactions) {
        super(element, ...reactions);
        if (roots)
            this.roots = roots;
        ;
    }
    doAction(context) {
        const ActionComponentType = this.constructor.ActionComponentType;
        let value = context?.value;
        if (value === undefined)
            return;
        const element = this.element;
        const extraRoots = this.roots || [];
        const actionComponent = new ActionComponentType([value, ...extraRoots]);
        if (element instanceof HTMLTemplateElement) {
            const elements = [...element.content.children];
            for (let subElement of elements) {
                actionComponent.process(subElement).roots[0].act();
            }
            if (context)
                context.value = elements;
        }
        else {
            actionComponent.process(element).roots[0].act();
            if (context)
                context.value = element;
        }
        return actionComponent.key;
    }
}
