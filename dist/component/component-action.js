import { callValue, getValue, splitOnce } from "action-object";
import { ClassAction } from "class-action";
import { CalcAction } from "../activity/calc-action.js";
import { ActionComponent } from "./action-component.js";
/**
 *
 * An action which interpretes attributes on elements to create
 * reactivity actions. All actions derive from {@link ClassAction}
 *
 * @example
 * import { ComponentAction } from 'action-component'
 * import { ActionObject } from 'action-object'
 *
 * const actions = {};
 * class MyComponentAction extends ComponentAction {
 *  createActions(context) {
 *      return {
 *          'planets.mercury': {
 *               call: [
 *                   { act(context) { actions['mercury.call'] = context.value } }
 *               ]
 *           },
 *      }
 *  }
 * }
 *
 * const root = { planets: { mercury: () => 11 } }
 * const actionRoot = new ActionObject(root)
 * const componentAction = new MyComponentAction();
 * const context = { root: actionRoot }
 * componentAction.act(context);
 * actionRoot.getChild('planets').call('mercury')
 * console.log(actions['mercury.call']);   // 11
 *
 */
export class ComponentAction extends ClassAction {
    static { this.calcSep = ':'; }
    static { this.setPrefix = '#'; }
    static { this.callPrefix = '$'; }
    static { this.valueSep = '+'; }
    static { this.calcs = {}; }
    /**
     * Creates actions from attributes of the `context.element` and
     * adds them to the first root in `context.root` which contains
     * the path referenced in the element attribute(s).
     *
     * @param context
     */
    act(context) {
        const refActions = this.createActions(context);
        let rootContext = context;
        let root, absPath, hasPath;
        for (let [path, classActions] of Object.entries(refActions)) {
            while (rootContext) {
                root = rootContext.root;
                if (root.has(path)) {
                    if (classActions.hasOwnProperty('set')) {
                        root.addActions(path, classActions.set || [], 'set', context.reactionKey);
                    }
                    if (classActions.hasOwnProperty('call')) {
                        root.addActions(path, classActions.call || [], 'call', context.reactionKey);
                    }
                    break;
                }
                rootContext = rootContext.parent;
            }
        }
    }
    createActions(context) {
        return {};
    }
}
export class ComplexComponentAction extends ComponentAction {
    static { this.ComplexActionComponent = ActionComponent; }
    /**
     * This method is necessary because of the bit of complexity involved
     * in adding 're-entrant ComplexComponentAction' in ActionComponents.
     *
     * Instead of adding instances of ComplexComponentAction statically to the
     * list of reactions in an ActionComponent class, call this function instead
     * with the class.
     *
     * @example
     * import { ActionComponent, ComponentAttrAction, ComponentPropAction,
     * ComplexComponentAction  } from 'action-component'
     * class MyActionComponent extends ActionComponent {
     *      static reactions = [
     *          // don't add an instance of ComplexComponentAction here,
     *          new ComponentAttrAction(), new ComponentPropAction()
     *      ]
     * }
     * ComplexComponentAction.addTo(MyActionComponent, 0);   // do it like this instead.
     *
     *
     * @param actionComponent
     * @param index
     */
    static addTo(actionComponent, index) {
        class ComplexAction extends this {
            static { this.ActionComponentType = actionComponent; }
        }
        if (index)
            actionComponent.reactions.splice(index, 0, new ComplexAction());
        else
            actionComponent.reactions.push(new ComplexAction());
    }
}
/**
 * A utility function used in {@link ComponentAction#createActions} implementations
 * to process an attribute value and create the appropriate actions. The
 * created actions are added to the given `result` object. Any reactions
 * passed are nested in the created actions. The optional options object
 * contain values for the static fields defined in ComponentAction to control
 * what meanings are attached to the tokens in the value.
 *
 * @example
 * import { processValue } from 'action-component'
 * import { ActionObject } from 'action-object'
 * const root = { planets: { jupiter: 5 } }
 * const result = {};
 * const actionRoot = new ActionObject(root)
 * processValue('%planets.jupiter', [actionRoot], result, [], {
 *     setPrefix: '%'
 * });
 * console.log(result)  // { 'planets.jupiter': { call: [] } }
 *
 * @param value
 * @param roots
 * @param result
 * @param reactions
 * @param options
 * @returns
 */
export function processValue(value, roots, result, reactions = [], options) {
    let { calcSep, setPrefix, callPrefix, valueSep, calcs } = options || {};
    if (!calcSep)
        calcSep = ':';
    if (!setPrefix)
        setPrefix = '#';
    if (!callPrefix)
        callPrefix = '$';
    if (!valueSep)
        valueSep = '+';
    if (!calcs)
        calcs = {};
    let calc;
    if (value.indexOf(calcSep) >= 0) {
        [calc, value] = splitOnce(value, calcSep);
        calc = calc.trim();
    }
    else {
        calc = null;
    }
    const calcActions = {};
    let vTrim;
    if (calc || value.indexOf(valueSep) >= 0) {
        const values = value.split(valueSep);
        const paths = [];
        for (let i = 0; i < values.length; i++) {
            vTrim = values[i].trim();
            if (vTrim.startsWith(setPrefix)) {
                values[i] = vTrim.slice(setPrefix.length);
                paths.push([i, values[i], setPrefix]);
                values[i] = getValue(values[i], ...roots);
            }
            else if (vTrim.startsWith(callPrefix)) {
                values[i] = vTrim.slice(callPrefix.length);
                paths.push([i, values[i], callPrefix]);
                values[i] = callValue(values[i], ...roots);
            }
        }
        let calcAction, actionType;
        for (let [index, path, prefix] of paths) {
            calcAction = (calc) ? new (calcs[calc])(values, index, ...reactions) : new CalcAction(values, index, ...reactions);
            actionType = (prefix === setPrefix) ? 'set' : 'call';
            if (!(result.hasOwnProperty(path)))
                result[path] = { [actionType]: [] };
            result[path][actionType].push(calcAction);
            calcActions[path] = calcAction;
        }
    }
    else {
        let path = value.trim(), actionType;
        if (path.startsWith(setPrefix)) {
            path = path.slice(setPrefix.length);
            actionType = 'set';
        }
        else if (path.startsWith(callPrefix)) {
            path = path.slice(callPrefix.length);
            actionType = 'call';
        }
        if (actionType) {
            if (!(result.hasOwnProperty(path)))
                result[path] = { [actionType]: [] };
            if (reactions.length)
                result[path][actionType].push(...reactions);
        }
    }
    return calcActions;
}
