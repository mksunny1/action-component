import { ElementIfAction, ElementMemberAction } from "../action-component";
import { ActionComponent } from "./action-component";
import { ComplexComponentAction, IComponentActionContext, IComponentActions, processValue } from "./component-action";

export class ComponentIfAction extends ComplexComponentAction { 
    static attr = 'i-f';
    static addTo(actionComponent: typeof ActionComponent, index?: number) {
        class LocalAction extends this {
            static ActionComponentType = actionComponent;
        }
        if (index) actionComponent.reactions.splice(index, 0, new LocalAction());
        else actionComponent.reactions.push(new LocalAction());
    }
    createActions(context: IComponentActionContext): IComponentActions {
        const { ComplexActionComponent, attr, calcSep, setPrefix, callPrefix, valueSep, calcs } = <typeof ComponentIfAction>this.constructor
        const result = {};

        if (context.element instanceof HTMLTemplateElement && context.element.hasAttribute(attr)) {
            const memberAction = new ElementIfAction(context.root, new ComplexActionComponent(), context.element) 
            if (memberAction) processValue(context.element.getAttribute(attr), [context.root], result, [memberAction], { calcSep, valueSep, setPrefix, callPrefix, calcs });
        }
        
        return result;
    }
}