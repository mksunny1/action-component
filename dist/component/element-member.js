import { ElementAttrAction, ElementPropAction } from "../activity/element-actions.js";
import { ComponentAction, processValue } from "./component-action.js";
export class ComponentMemberAction extends ComponentAction {
    createActions(context) {
        const { suffix, calcSep, setPrefix, callPrefix, valueSep, calcs } = this.constructor;
        const result = {};
        if (!suffix)
            return result;
        let memberAction;
        for (let attr of context.element.attributes) {
            if (attr.name.endsWith(suffix)) {
                memberAction = this.createMemberAction(context.element, attr.name.slice(0, -suffix.length));
                if (memberAction)
                    processValue(attr.value, [context.root], result, [memberAction], { calcSep, valueSep, setPrefix, callPrefix, calcs });
            }
        }
        return result;
    }
    createMemberAction(element, name) {
        return;
    }
}
export class ComponentAttrAction extends ComponentMemberAction {
    static { this.suffix = '-a'; }
    createMemberAction(element, name) {
        return new ElementAttrAction(name, element);
    }
}
export class ComponentPropAction extends ComponentMemberAction {
    static { this.nameMap = {
        textcontent: 'textContent',
        classname: 'className'
    }; }
    static { this.suffix = '-p'; }
    createMemberAction(element, name) {
        const nameMap = this.constructor.nameMap;
        if (nameMap.hasOwnProperty(name))
            name = nameMap[name];
        return new ElementPropAction(name, element);
    }
}
export class ComponentTextContentAction extends ComponentAction {
    static { this.attr = 't'; }
    createActions(context) {
        const { attr, calcSep, setPrefix, callPrefix, valueSep, calcs } = this.constructor;
        const result = {};
        let memberAction;
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
