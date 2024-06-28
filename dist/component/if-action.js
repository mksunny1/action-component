import { ElementIfAction } from "../action-component";
import { ComplexComponentAction, processValue } from "./component-action";
export class ComponentIfAction extends ComplexComponentAction {
    static { this.attr = 'i-f'; }
    static addTo(actionComponent, index) {
        class LocalAction extends this {
            static { this.ActionComponentType = actionComponent; }
        }
        if (index)
            actionComponent.reactions.splice(index, 0, new LocalAction());
        else
            actionComponent.reactions.push(new LocalAction());
    }
    createActions(context) {
        const { ComplexActionComponent, attr, calcSep, setPrefix, callPrefix, valueSep, calcs } = this.constructor;
        const result = {};
        if (context.element instanceof HTMLTemplateElement && context.element.hasAttribute(attr)) {
            const memberAction = new ElementIfAction(context.root, new ComplexActionComponent(), context.element);
            if (memberAction)
                processValue(context.element.getAttribute(attr), [context.root], result, [memberAction], { calcSep, valueSep, setPrefix, callPrefix, calcs });
        }
        return result;
    }
}
