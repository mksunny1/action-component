import { ActionObject, IMap } from "action-object";
import { ClassAction } from "class-action";
import { CalcAction } from "../activity/calc-action.js";
import { ActionComponent } from "./action-component.js";
export interface IComponentActionContext {
    /**
     * The current element being processed in the component-action.
     */
    element: Element;
    /**
     * Optional parent context.
     */
    parent?: IComponentActionContext;
    /**
     * Optional key for adding actions to the roots
     */
    reactionKey?: string;
    /**
     * The component action
     */
    root: ActionObject;
    /**
     * Whether to not process the element further.
     */
    closedElement?: boolean;
}
export type IComponentActions = IMap<{
    set?: ClassAction<any>[];
    call?: ClassAction<any>[];
}>;
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
export declare class ComponentAction extends ClassAction<IComponentActionContext> {
    static calcSep: string;
    static setPrefix: string;
    static callPrefix: string;
    static valueSep: string;
    static calcs: IMap<typeof CalcAction>;
    /**
     * Creates actions from attributes of the `context.element` and
     * adds them to the first root in `context.root` which contains
     * the path referenced in the element attribute(s).
     *
     * @param context
     */
    act(context: IComponentActionContext): any;
    createActions(context: IComponentActionContext): IComponentActions;
}
export declare class ComplexComponentAction extends ComponentAction {
    static ComplexActionComponent: typeof ActionComponent;
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
    static addTo(actionComponent: typeof ActionComponent, index?: number): void;
}
export interface IProcessValueOptions {
    calcSep?: string;
    setPrefix?: string;
    callPrefix?: string;
    valueSep?: string;
    calcs?: IMap<typeof CalcAction>;
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
export declare function processValue(value: string, roots: ActionObject[], result: IComponentActions, reactions?: ClassAction<any>[], options?: IProcessValueOptions): IMap<CalcAction>;
//# sourceMappingURL=component-action.d.ts.map