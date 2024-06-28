import { ClassAction } from "class-action";
export type IKey = string | number | symbol;
export type IMap<T extends object> = {
    [key in keyof T]?: any;
};
export interface IObjectActionContext {
    object?: any;
}
export interface IObjectPropActionContext extends IObjectActionContext {
    key: IKey;
    value: any;
}
/**
 * Split the input string at the first occurrence of the sep string.
 *
 * @example
 * import { splitOnce } from 'action-object'
 * splitOnce('a.b.c.d', '.');    // ['a', 'b.c.d']
 *
 * @param str the string to split
 * @param sep the separator string
 * @returns an array comprising 1 or 2 elements depending on whether `sep`
 * is present in `str`
 */
export declare function splitOnce(str: string, sep: string): string[];
/**
 * A class-action that sets or deletes an object property. The
 * property is set if the value (in the context) is not undefined; otherwise
 * it is deleted.
 *
 * @example
 * import { ObjectPropAction } from 'action-object'
 * const propAction = new ObjectPropAction();
 * const object = { a: 1, b: 99 };
 * propAction.act({ object, key: 'a', value: 78 });
 * console.log(object);  // { a: 78, b: 99 }
 *
 */
export declare class ObjectPropAction extends ClassAction<IObjectPropActionContext> {
    doAction(context?: IObjectPropActionContext): void;
    set(object: any, key: IKey, value: any): void;
    delete(object: any, key: IKey): void;
}
export interface IObjectCallActionContext extends IObjectActionContext {
    method: IKey;
    args?: any[];
    value?: any;
}
/**
 * A class-action that invokes an object method. If the context contains
 * an `args` array, the method is called with it, otherwise, the method is
 * called without arguments.
 *
 * @example
 * import { ObjectCallAction } from 'action-object'
 * const callAction = new ObjectCallAction();
 * const object = [1, 2, 3];
 * callAction.act({ object, method: 'pop' });
 * console.log(object);  // [1, 2]
 *
 */
export declare class ObjectCallAction extends ClassAction<IObjectCallActionContext> {
    doAction(context?: IObjectCallActionContext): any;
}
/**
 * An object wrapper that uses class-actions for setting and deleting
 * properties and calling methods.
 *
 */
export declare class ActionObject {
    /**
     * The string for separating property keys in nested paths.
     */
    static pathSep: string;
    /**
     * The wrapped object
     */
    object: any;
    /**
     * Action objects that wrap reactive object type properties of the
     * object wrapped by this class action.
     */
    children?: IMap<ActionObject> | ActionObject[];
    /**
     * Initializes a new action object on the given object.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = { a: 1, b: 2, c: 3 }
     * const actionObject = new ActionObject(object);
     *
     * @param object
     */
    constructor(object: any);
    /**
     * This is called simply to trigger all actions within this action
     * object with existing values in the wrapped object.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = { a: 1, b: 2, c: 3 }
     * const actionObject = new ActionObject(object);
     * let count = 0;
     * const actions = [ { act() { count++; } } ];
     * actionObject.addActions('a', actions, 'set');
     * actionObject.addActions('b', actions, 'set');
     * actionObject.act();    // count === 2
     */
    act(): void;
    /**
     * Object containing the class actions for the reactive properties
     * of the object wrapped by this action object.
     */
    setActions?: IMap<ClassAction<IObjectPropActionContext>>;
    /**
     * Cal this method to explicitly set a property and trigger actions.
     * No special handling of the empty string key here unlike in `set`.
     *
     * @example
     *
     *
     * @param key
     * @param value
     */
    doSet(key: IKey, value: any): void;
    /**
     * Assigns the value to the property with the key and trigger
     * actions (and nested actions) bound to the key. The special
     * empty string key refers to the object wrapped by this class
     * action. When we set it to a new value, all the actions contained
     * within this action object will be triggered.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = { a: 1, b: 2, c: 3 }
     * const actionObject = new ActionObject(object);
     * let count = 0;
     * const actions = [ { act(context) { count += context.value; } } ];
     * actionObject.addActions('a', actions, 'set');
     * actionObject.set('a', 25);  // object.a === 25 && count === 25
     *
     * @param {*} key
     * @param {*} value
     */
    set(key: IKey, value: any): void;
    /**
     * Reactively sets multiple properties at the same time.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = { a: 1, b: 2, c: 3 }
     * const actionObject = new ActionObject(object);
     * let count = 0;
     * const actions = [ { act(context) { count += context.value; } } ];
     * actionObject.addActions('a', actions, 'set');
     * actionObject.setAll({ a: 25, b: 50 });
     * // object.a === 25 && object.b === 50 && count === 25
     *
     * @param all
     */
    setAll(all: IMap<any>): void;
    /**
     * Object containing the class actions for the reactive methods
     * of the object wrapped by this action object.
     */
    callActions?: IMap<ClassAction<IObjectCallActionContext>>;
    /**
     *
     * Reactively invokes the method with any given args. The method is
     * first called and its return value is added to the class action
     * context passed to the linked class actions.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = [1, 2, 3]
     * const actionObject = new ActionObject(object);
     * let count = 0;
     * const actions = [ { act(context) { count = context.args?.length; } } ];
     * actionObject.addActions('push', actions, 'call');
     * actionObject.call('push', 4, 5, 6, 7);
     * // object === [1, 2, 3, 4, 5, 6, 7] && count === 4;
     *
     * @param method
     * @param args
     */
    call(method: IKey, ...args: any[]): void;
    /**
     * Returns a wrapper that can be used like the original object to
     * perform set and call operations reactively.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = { a: 1, b: 2, c: 3 }
     * const actionObject = new ActionObject(object);
     * let count = 0;
     * const actions = [ { act(context) { count += context.value; } } ];
     * actionObject.addActions('a', actions, 'set');
     * const proxy = actionObject.createProxy();
     * proxy.a = 25;      // object.a === 25 && count === 25
     *
     * @returns
     */
    createProxy(): ActionObject;
    /**
     * Returns `true` if the property at the path eists in the wrapped
     * object; otherwise returns `false`.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = { a: 1, b: 2, c: { d: 3 } }
     * const actionObject = new ActionObject(object);
     * actionObject.has('c');    // true
     * actionObject.has('c.d');  // true
     * actionObject.has('d');    // false
     *
     * @param path
     * @returns
     */
    has(path: string): boolean;
    /**
     * Returns the value at the path within the wrapped object.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = { a: 1, b: 2, c: { d: 3 } }
     * const actionObject = new ActionObject(object);
     * actionObject.getValue('c.d');    // 3
     *
     * @param path
     * @returns
     */
    getValue(path: string): any;
    /**
     * Calls the method at the path within the wrapped object
     * (without reactivity). The call is performed only to obtain its
     * return value.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = { a: 1, b: 2, c: { d: [3, 4] } }
     * const actionObject = new ActionObject(object);
     * actionObject.callValue('c.d.pop');    // 4
     *
     * @param path
     * @param args
     * @returns
     */
    callValue(path: string, ...args: any[]): any;
    /**
     * Initializes `this.children` if it is not yet initialized.
     * If the wrapped object is an array, `this.children` is initialized
     * to an array; else it is initialized to an object.
     *
     */
    ensureChildren(): void;
    /**
     * If the key does not yet exist in `this.children`, this method
     * initializes an action object for the property with the key and
     * adds it to `this.children`.
     *
     *
     * @param key
     */
    ensureChild(key: string): void;
    /**
     * Returns the child action object at the given path.
     * If the child does not yet exist, it will be created and returned if
     * `forceChild` is truthy.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = { a: 1, b: 2, c: { d: [3, 4] } }
     * const actionObject = new ActionObject(object);
     * actionObject.getChild('c.d');          // undefined
     * actionObject.getChild('c.d', true);    // ActionObject { object: [3, 4] }
     *
     * @param path
     * @param forceChild
     * @returns
     */
    getChild(path: string, forceChild?: boolean): any;
    /**
     * Merges the content of the other action objects into this one.
     *
     * @example
     *
     *
     * @param actionObjects
     */
    merge(...actionObjects: ActionObject[]): void;
    /**
     * Adds the given actions at the path. The actions are either added to
     * the `setActions` or `callActions` object property of this action object
     * or a child action object, respectively depending on the specified type
     * and path.
     *
     * @example
     * import { ActionObject } from 'action-object'
     * const object = { a: 1, b: 2, c: 3 }
     * const actionObject = new ActionObject(object);
     * let count = 0;
     * const actions = [ { act(context) { count += context.value; } } ];
     * actionObject.addActions('a', actions, 'set');
     * const proxy = actionObject.createProxy();
     * proxy.a = 25;      // object.a === 25 && count === 25
     *
     * @param path
     * @param actions
     * @param type
     * @param [reactionKey]
     * @returns
     */
    addActions(path: string, actions: ClassAction<any>[], type: 'set' | 'call', reactionKey?: IKey): any;
    /**
     * Removes all actions (and nested actions) added with the specified
     * reaction keys. Reaction keys refer to keys used with keyedReactions
     * in {@link @module:class-action} and not to keys associated with
     * the object wrapped by this ActionObject.
     *
     * This is a cleanup operation for removing 'scoped actions'
     * within a large ActionObject, perhaps before adding another set of
     * scoped actions with the same keys.
     *
     * One practical use-case for scoped actions is condition rendering as
     * as implemented in {@link @module:class-component}.
     *
     * @example
     *
     *
     * @param reactionKeys
     */
    removeActions(...reactionKeys: IKey[]): void;
    /**
     * Removes all object properties, actions and children associated
     * with the object property keys.
     *
     * This is a non-reactive cleanup operation. It can be called on its
     * own if the associated actions have already become irrelevant (perhaps
     * after calling `set` with `undefined` or disconnecting bound elements
     * 'from outside')...
     *
     * @example
     *
     *
     * @param keys
     */
    delete(...keys: IKey[]): void;
}
export declare const target: unique symbol;
/**
 * Returns the value from the first root that wraps an object which contains
 * a value at the specified path.
 *
 * @example
 * import { ActionObject, getValue } from 'action-object'
 * const object = { a: 1, b: 2, c: 3, d: { e: { f: 88 } } }
 * const actionObject = new ActionObject(object);
 * getValue('d.e.f', new ActionObject({}), actionObject);   // 88
 *
 * @param path
 * @param roots
 * @returns
 */
export declare function getValue(path: string, ...roots: ActionObject[]): any;
export interface ICallValueWhat {
    path: string;
    args?: any[];
}
/**
 * Calls the first method found in any of the given rrot at the path
 * specified as or in `what`. This is not a reactive call but one to
 * obtain a value.
 *
 * @example
 * import { ActionObject, getValue } from 'action-object'
 * const object = { a: 1, b: 2, c: 3, d: { e: { f: [88] } } }
 * const actionObject = new ActionObject(object);
 * callValue('d.e.f.pop', new ActionObject({}), actionObject);   // 88
 *
 * @param what either the method path or an `ICallValueWhat` which is an object
 * with a `path` property and optional `args` property.
 *
 * @param roots the action objects to search in order.
 * @returns
 */
export declare function callValue(what: string | ICallValueWhat, ...roots: ActionObject[]): any;
export declare class ValueAction<T = string> extends ClassAction<any> {
    path: T;
    roots: ActionObject[];
    constructor(path: T, roots: ActionObject[], ...reactions: ClassAction<any>[]);
}
/**
 * An action that uses {@link getValue} to obtain a value at the path
 * from the given roots and sets it as the context value before invoking
 * nested actions.
 *
 * @example
 * import { ActionObject, GetValueAction } from 'action-object'
 * const object = { a: 1, b: 2, c: 3, d: { e: { f: 88 } } }
 * const valueAction = new GetValueAction('d.e.f', [new ActionObject(object)]);
 * const context = {}
 * valueAction.act(context);   // context.value === 88
 *
 */
export declare class GetValueAction extends ValueAction {
    doAction(context?: any): void;
}
/**
 * An action that uses {@link callValue} to obtain a value from calling
 * the method at the path in the given roots and sets it as the context
 * value before invoking nested actions.
 *
 * @example
 * import { ActionObject, CallValueAction } from 'action-object'
 * const object = { a: 1, b: 2, c: 3, d: { e: { f: [88] } } }
 * const valueAction = new CallValueAction('d.e.f.pop', [new ActionObject(object)]);
 * const context = {}
 * valueAction.act(context);   // context.value === 88
 *
 */
export declare class CallValueAction extends ValueAction<string | ICallValueWhat> {
    doAction(context?: any): void;
}
//# sourceMappingURL=action-object.d.ts.map