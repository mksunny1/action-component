import { ClassAction } from "class-action";
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
export function splitOnce(str, sep) {
    const index = str.indexOf(sep);
    if (index < 0)
        return [str];
    return [str.substring(0, index), str.substring(index + sep.length)];
}
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
export class ObjectPropAction extends ClassAction {
    doAction(context) {
        const object = context?.object;
        if (object) {
            if (context.value !== undefined)
                this.set(object, context.key, context.value);
            else
                this.delete(object, context.key);
        }
    }
    set(object, key, value) {
        object[key] = value;
    }
    delete(object, key) {
        delete object[key];
    }
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
export class ObjectCallAction extends ClassAction {
    doAction(context) {
        const object = context?.object;
        if (object && context.args)
            return context.value = object[context.method](...context.args);
        else if (object)
            return context.value = object[context.method]();
    }
}
/**
 * An object wrapper that uses class-actions for setting and deleting
 * properties and calling methods.
 *
 */
export class ActionObject {
    /**
     * The string for separating property keys in nested paths.
     */
    static { this.pathSep = '.'; }
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
    constructor(object) { this.object = object; }
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
    act() { this.set('', this.object); }
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
    doSet(key, value) {
        if (!this.hasOwnProperty('setActions'))
            this.setActions = {};
        if (!this.setActions.hasOwnProperty(key)) {
            this.setActions[key] = new ObjectPropAction();
        }
        let object = this.object;
        this.setActions?.[key]?.act({ object, key, value });
        this.children?.[key]?.set('', value);
    }
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
    set(key, value) {
        if (key !== '') {
            this.doSet(key, value);
        }
        else {
            this.object = value;
            if (this.hasOwnProperty('setActions') || this.hasOwnProperty('children')) {
                for (let subKey of Object.keys(this.setActions || {})) {
                    this.setActions?.[subKey]?.act({ object: this.object, key: subKey, value: value[subKey] });
                }
                for (let subKey of Object.keys(this.children || {})) {
                    this.children?.[subKey].set('', value[subKey]);
                }
            }
        }
    }
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
    setAll(all) {
        for (let [key, value] of Object.entries(all)) {
            this.set(key, value);
        }
    }
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
    call(method, ...args) {
        if (!this.hasOwnProperty('callActions'))
            this.callActions = {};
        if (!this.callActions.hasOwnProperty(method)) {
            this.callActions[method] = new ObjectCallAction();
        }
        this.callActions?.[method]?.act({ object: this.object, method, args });
    }
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
    createProxy() { return new Proxy(this, actionObjectTrap); }
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
    has(path) {
        const parts = splitOnce(path, this.constructor.pathSep);
        return this.object[parts[0]] !== undefined;
    }
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
    getValue(path) {
        if (path === '')
            return this.object;
        const parts = splitOnce(path, this.constructor.pathSep);
        const parts0 = parts[0];
        if (parts.length > 1) {
            this.ensureChild(parts0);
            return this.children?.[parts[0]].getValue(parts[1]);
        }
        else {
            return this.object?.[parts[0]];
        }
    }
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
    callValue(path, ...args) {
        if (path === '')
            return this.object();
        const parts = splitOnce(path, this.constructor.pathSep);
        const parts0 = parts[0];
        if (parts.length > 1) {
            this.ensureChild(parts0);
            return this.children?.[parts0].callValue(parts[1], ...args);
        }
        else {
            return this.object?.[parts0]();
        }
    }
    /**
     * Initializes `this.children` if it is not yet initialized.
     * If the wrapped object is an array, `this.children` is initialized
     * to an array; else it is initialized to an object.
     *
     */
    ensureChildren() {
        if (!(this.hasOwnProperty('children')))
            this.children = (this.object instanceof Array) ? [] : {};
    }
    /**
     * If the key does not yet exist in `this.children`, this method
     * initializes an action object for the property with the key and
     * adds it to `this.children`.
     *
     *
     * @param key
     */
    ensureChild(key) {
        this.ensureChildren();
        let prop = this.object[key];
        if (!this.children?.hasOwnProperty(key) && prop !== undefined) {
            if (prop instanceof Function)
                this.children[key] = new ActionObject(prop.bind(this.object));
            else
                this.children[key] = new ActionObject(prop);
        }
    }
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
    getChild(path, forceChild = false) {
        if (!this.children && !forceChild)
            return;
        const parts = splitOnce(path, this.constructor.pathSep);
        const parts0 = parts[0];
        this.ensureChild(parts0);
        if (parts.length > 1) {
            return this.children[parts0].getChild(parts[1], forceChild);
        }
        else {
            return this.children[parts0];
        }
    }
    /**
     * Merges the content of the other action objects into this one.
     *
     * @example
     *
     *
     * @param actionObjects
     */
    merge(...actionObjects) {
        for (let actionObject of actionObjects) {
            let actionTypeProp;
            for (let actionType of ['set', 'call']) {
                actionTypeProp = actionType + 'Actions';
                if (!actionObject.hasOwnProperty(actionTypeProp))
                    continue;
                if (this.hasOwnProperty(actionTypeProp))
                    this[actionTypeProp] = {};
                let key, action;
                let reactionKey, keyedReactions;
                for ([key, action] of Object.entries(actionObject[actionTypeProp])) {
                    this.addActions(key, action.reactions, actionType);
                    if (action.hasOwnProperty('keyedReactions')) {
                        for ([reactionKey, keyedReactions] of Object.entries(action.keyedReactions)) {
                            this.addActions(key, keyedReactions, actionType, reactionKey);
                        }
                    }
                }
            }
            // children
            if (actionObject.hasOwnProperty('children')) {
                this.ensureChildren();
                for (let [key, child] of Object.entries(actionObject.children)) {
                    this.getChild(key, true).merge(child);
                }
            }
        }
    }
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
    addActions(path, actions, type, reactionKey) {
        const parts = splitOnce(path, this.constructor.pathSep);
        const parts0 = parts[0];
        if (parts.length > 1) {
            this.ensureChild(parts0);
            return this.children?.[parts0].addActions(parts[1], actions, type, reactionKey);
        }
        else {
            const actionsOfType = `${type}Actions`;
            if (!this[actionsOfType])
                this[actionsOfType] = {};
            const map = this[actionsOfType];
            if (!(map.hasOwnProperty(parts0))) {
                if (type === 'set') {
                    map[parts0] = new ObjectPropAction();
                }
                else {
                    map[parts0] = new ObjectCallAction();
                }
            }
            if (reactionKey === undefined)
                map[parts0].addReactions(...actions);
            else
                map[parts0].addKeyedReactions(reactionKey, ...actions);
            return map[parts0];
        }
    }
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
    removeActions(...reactionKeys) {
        if (this.hasOwnProperty('setActions')) {
            let action;
            for (action of Object.values(this.setActions)) {
                action.removeKeyedReactions(...reactionKeys);
            }
        }
        if (this.hasOwnProperty('callActions')) {
            let action;
            for (action of Object.values(this.callActions)) {
                action.removeKeyedReactions(...reactionKeys);
            }
        }
        if (this.hasOwnProperty('children')) {
            let child;
            for (child of Object.values(this.children)) {
                child.removeActions(...reactionKeys);
            }
        }
    }
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
    delete(...keys) {
        for (let key of keys) {
            if (typeof this.object === 'object')
                delete this.object[key];
            if (this.hasOwnProperty('setActions'))
                delete this.setActions[key];
            if (this.hasOwnProperty('callActions'))
                delete this.callActions[key];
            if (this.hasOwnProperty('children'))
                delete this.children[key];
        }
    }
}
export const target = Symbol();
const actionObjectTrap = {
    get(actionTarget, p) {
        if (p === target)
            return actionTarget;
        // to get back the action object (and the original object if necessary)
        return (...args) => actionTarget.call(p, ...args);
    },
    set(actionTarget, p, value) {
        actionTarget.set(p, value);
        return true;
    },
    deleteProperty(actionTarget, p) {
        actionTarget.set(p, undefined);
        return true;
    },
    apply(actionTarget, thisArg, ...args) {
        return actionTarget.call('', ...args);
    },
};
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
export function getValue(path, ...roots) {
    for (let root of roots)
        if (root.has(path))
            return root.getValue(path);
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
export function callValue(what, ...roots) {
    let path, args;
    if (typeof what === 'object') {
        path = what.path;
        args = what.args || [];
    }
    else {
        path = what;
        args = [];
    }
    for (let root of roots)
        if (root.has(path))
            return root.callValue(path, ...args);
}
export class ValueAction extends ClassAction {
    constructor(path, roots, ...reactions) {
        super(...reactions);
        this.path = path;
        this.roots = roots;
    }
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
export class GetValueAction extends ValueAction {
    doAction(context) {
        context.value = getValue(this.path, ...this.roots);
        context.path = this.path;
    }
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
export class CallValueAction extends ValueAction {
    doAction(context) {
        context.value = callValue(this.path, ...this.roots);
        context.path = this.path;
    }
}
// todo: add tests for `merge`.
