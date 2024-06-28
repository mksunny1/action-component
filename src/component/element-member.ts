
import { ElementAttrAction, ElementMemberAction, ElementPropAction } from "../activity/element-actions.js";
import { ComponentAction, IComponentActionContext, IComponentActions, processValue } from "./component-action.js";

export interface IStrObject {
    [key: string | number | symbol]: string
}

export class ComponentMemberAction extends ComponentAction {
    static suffix: string;

    createActions(context: IComponentActionContext): IComponentActions {
        const { suffix, calcSep, setPrefix, callPrefix, valueSep, calcs } = <typeof ComponentMemberAction>this.constructor
        const result = {};
        if (!suffix) return result;
        let memberAction: ElementMemberAction | undefined;

        for (let attr of context.element.attributes) {
            if (attr.name.endsWith(suffix)) {
                memberAction = this.createMemberAction(context.element, attr.name.slice(0, -suffix.length)); 
                if (memberAction) processValue(attr.value, [context.root], result, [memberAction], { calcSep, valueSep, setPrefix, callPrefix, calcs });
            }
        }
        return result;
    }
    createMemberAction(element: Element, name: string): ElementMemberAction | undefined {
        return
    }
}

export class ComponentAttrAction extends ComponentMemberAction { 
    static suffix = '-a';
    createMemberAction(element: Element, name: string): ElementMemberAction {
        return new ElementAttrAction(name, element);
    }
}

export class ComponentPropAction extends ComponentMemberAction {
    static nameMap: IStrObject = {
        textcontent: 'textContent',
        classname: 'className'
    }
    static suffix = '-p';
    createMemberAction(element: Element, name: string): ElementMemberAction {
        const nameMap = (<typeof ComponentPropAction>this.constructor).nameMap;
        if (nameMap.hasOwnProperty(name)) name = nameMap[name];
        return new ElementPropAction(name, element);
    }
}

export class ComponentTextContentAction extends ComponentAction {
    static attr: string = 't';
    createActions(context: IComponentActionContext): IComponentActions {
        const { attr, calcSep, setPrefix, callPrefix, valueSep, calcs } = <typeof ComponentTextContentAction>this.constructor;
        const result = {};
        let memberAction: ElementMemberAction | undefined;

        if (context.element.hasAttribute(attr)) {
            let value = context.element.getAttribute(attr);
            if (!value) {
                value = context.element.textContent;
                context.element.setAttribute(attr, value);
                context.element.textContent = '';
            }
            memberAction = new ElementPropAction('textContent', context.element);
            processValue(value, [context.root], result, [memberAction], { calcSep, valueSep, setPrefix, callPrefix, calcs });
        }
        return result;
    }
}

