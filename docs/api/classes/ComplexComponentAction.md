[**action-component**](../README.md) • **Docs**

***

[action-component](../globals.md) / ComplexComponentAction

# Class: ComplexComponentAction

An action which interpretes attributes on elements to create 
reactivity actions. All actions derive from ClassAction

## Example

```ts
import { ComponentAction } from 'action-component'
import { ActionObject } from 'action-object'

const actions = {};
class MyComponentAction extends ComponentAction {
 createActions(context) {
     return {
         'planets.mercury': {
              call: [
                  { act(context) { actions['mercury.call'] = context.value } }
              ]
          },
     }
 }
}

const root = { planets: { mercury: () => 11 } }
const actionRoot = new ActionObject(root)
const componentAction = new MyComponentAction();
const context = { root: actionRoot }
componentAction.act(context);
actionRoot.getChild('planets').call('mercury')
console.log(actions['mercury.call']);   // 11
```

## Extends

- [`ComponentAction`](ComponentAction.md)

## Extended by

- [`ComponentIfAction`](ComponentIfAction.md)
- [`ComponentLocalAction`](ComponentLocalAction.md)

## Constructors

### new ComplexComponentAction()

> **new ComplexComponentAction**(...`reactions`): [`ComplexComponentAction`](ComplexComponentAction.md)

Creates a new ClassAction object containing the optionally provided reactions.

#### Parameters

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

[`ComplexComponentAction`](ComplexComponentAction.md)

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`constructor`](ComponentAction.md#constructors)

#### Example

```ts
import { ClassAction } from 'class-action'
const classAction = new ClassAction()
```

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:69

## Properties

### keyedReactions?

> `optional` **keyedReactions**: `object`

#### Index Signature

 \[`key`: `IKey`\]: `ClassAction`\<`any`\>[]

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`keyedReactions`](ComponentAction.md#keyedreactions)

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:57

***

### reactions?

> `optional` **reactions**: `ClassAction`\<`any`\>[]

Instance reactions. These are reactions added to every class-action
instance. They may be necessary when they require internal state that
differ between instances.

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
```

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`reactions`](ComponentAction.md#reactions)

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:56

***

### ComplexActionComponent

> `static` **ComplexActionComponent**: *typeof* [`ActionComponent`](ActionComponent.md) = `ActionComponent`

#### Defined in

[src/component/component-action.ts:106](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/component-action.ts#L106)

***

### calcSep

> `static` **calcSep**: `string` = `':'`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`calcSep`](ComponentAction.md#calcsep)

#### Defined in

[src/component/component-action.ts:67](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/component-action.ts#L67)

***

### calcs

> `static` **calcs**: `IMap`\<*typeof* [`CalcAction`](CalcAction.md)\> = `{}`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`calcs`](ComponentAction.md#calcs)

#### Defined in

[src/component/component-action.ts:71](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/component-action.ts#L71)

***

### callPrefix

> `static` **callPrefix**: `string` = `'$'`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`callPrefix`](ComponentAction.md#callprefix)

#### Defined in

[src/component/component-action.ts:69](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/component-action.ts#L69)

***

### reactions

> `static` **reactions**: `ClassAction`\<`any`\>[]

Static reactions. These will be associated with all class-action
instances created with the same class without being present on
every instance. In most cases, such actions should be stateless,
though you may deliberately want to share state in some scenarios.

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
class MyClassAction extends ClassAction {
   static reactions = [reaction1, reaction2]
}
const myClassAction1 = new MyClassAction();
const myClassAction2 = new MyClassAction();
```

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`reactions`](ComponentAction.md#reactions-1)

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:44

***

### setPrefix

> `static` **setPrefix**: `string` = `'#'`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`setPrefix`](ComponentAction.md#setprefix)

#### Defined in

[src/component/component-action.ts:68](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/component-action.ts#L68)

***

### valueSep

> `static` **valueSep**: `string` = `'+'`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`valueSep`](ComponentAction.md#valuesep)

#### Defined in

[src/component/component-action.ts:70](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/component-action.ts#L70)

## Methods

### act()

> **act**(`context`): `any`

Creates actions from attributes of the `context.element` and 
adds them to the first root in `context.root` which contains 
the path referenced in the element attribute(s).

#### Parameters

• **context**: [`IComponentActionContext`](../interfaces/IComponentActionContext.md)

#### Returns

`any`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`act`](ComponentAction.md#act)

#### Defined in

[src/component/component-action.ts:80](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/component-action.ts#L80)

***

### addKeyedReactions()

> **addKeyedReactions**(`reactionKey`, ...`reactions`): `void`

Adds the given reactions to the list of reactions with the key.

#### Parameters

• **reactionKey**: `IKey`

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

`void`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`addKeyedReactions`](ComponentAction.md#addkeyedreactions)

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:194

***

### addReactions()

> **addReactions**(...`reactions`): `void`

Adds the given reactions to this ClassAction. This allows for
more implementation flexibility in derived classes.

#### Parameters

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

`void`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`addReactions`](ComponentAction.md#addreactions)

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
class MyClassAction extends ClassAction {
   doAction(context) {
     console.log('Added reaction');
   }
}
myClassAction.addReactions(new MyClassAction())
myClassAction.act()
```

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:187

***

### createActions()

> **createActions**(`context`): `IMap`\<`object`\>

#### Parameters

• **context**: [`IComponentActionContext`](../interfaces/IComponentActionContext.md)

#### Returns

`IMap`\<`object`\>

##### call?

> `optional` **call**: `ClassAction`\<`any`\>[]

##### set?

> `optional` **set**: `ClassAction`\<`any`\>[]

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`createActions`](ComponentAction.md#createactions)

#### Defined in

[src/component/component-action.ts:100](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/component-action.ts#L100)

***

### doAction()

> **doAction**(`context`?): `any`

Performs the local action

#### Parameters

• **context?**: [`IComponentActionContext`](../interfaces/IComponentActionContext.md)

#### Returns

`any`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`doAction`](ComponentAction.md#doaction)

#### Example

```ts
import { ClassAction } from 'class-action'
class MyClassAction extends ClassAction {
   doAction(context) {
     console.log(context.msg);
   }
}
const myClassAction = new MyClassAction(new MyClassAction(), new MyClassAction());
myClassAction.doAction({ msg: 'nice work' });
// prints 'nice work' once...
```

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:151

***

### doReactions()

> **doReactions**(`context`?): `any`

Triggers all reactions of this ClassAction

#### Parameters

• **context?**: [`IComponentActionContext`](../interfaces/IComponentActionContext.md)

#### Returns

`any`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`doReactions`](ComponentAction.md#doreactions)

#### Example

```ts
import { ClassAction } from 'class-action'
class MyClassAction extends ClassAction {
   doAction(context) {
     console.log(context.msg);
   }
}
const myClassAction = new MyClassAction(new MyClassAction(), new MyClassAction());
myClassAction.doReactions({ msg: 'nice work' });
// prints 'nice work' twice...
```

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:168

***

### getAllReactions()

> **getAllReactions**(`context`?): `Generator`\<`ClassAction`\<`any`\>, `void`, `unknown`\>

Gets all class and instance reactions. This is used internally
to obtain all reactions to trigger after the local action has
been executed.

#### Parameters

• **context?**: [`IComponentActionContext`](../interfaces/IComponentActionContext.md)

#### Returns

`Generator`\<`ClassAction`\<`any`\>, `void`, `unknown`\>

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`getAllReactions`](ComponentAction.md#getallreactions)

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
class MyClassAction extends ClassAction {
   static reactions = [reaction1, reaction2]
}
const myClassAction = new MyClassAction(reaction1, reaction2);
myClassAction.getAllReactions();
```

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:118

***

### getReactions()

> **getReactions**(`context`?): `Generator`\<`ClassAction`\<`any`\>, `void`, `unknown`\>

Returns all instance reactions of this ClassAction.
By default it simply returns [ClassAction#reactions](ActionComponent.md#reactions).

#### Parameters

• **context?**: [`IComponentActionContext`](../interfaces/IComponentActionContext.md)

#### Returns

`Generator`\<`ClassAction`\<`any`\>, `void`, `unknown`\>

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`getReactions`](ComponentAction.md#getreactions)

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
myClassAction.getReactions();
```

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:100

***

### removeKeyedReactions()

> **removeKeyedReactions**(...`reactionKeys`): `void`

Removes the reactions with the specified keys.

#### Parameters

• ...**reactionKeys**: `IKey`[]

#### Returns

`void`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`removeKeyedReactions`](ComponentAction.md#removekeyedreactions)

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:213

***

### removeReactions()

> **removeReactions**(...`reactions`): `void`

Removes the specified reactions.

#### Parameters

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

`void`

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`removeReactions`](ComponentAction.md#removereactions)

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
myClassAction.removeReactions(reaction2);
```

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:206

***

### addTo()

> `static` **addTo**(`actionComponent`, `index`?): `void`

This method is necessary because of the bit of complexity involved 
in adding 're-entrant ComplexComponentAction' in ActionComponents.

Instead of adding instances of ComplexComponentAction statically to the 
list of reactions in an ActionComponent class, call this function instead 
with the class.

#### Parameters

• **actionComponent**: *typeof* [`ActionComponent`](ActionComponent.md)

• **index?**: `number`

#### Returns

`void`

#### Example

```ts
import { ActionComponent, ComponentAttrAction, ComponentPropAction, 
ComplexComponentAction  } from 'action-component'
class MyActionComponent extends ActionComponent {
     static reactions = [
         // don't add an instance of ComplexComponentAction here, 
         new ComponentAttrAction(), new ComponentPropAction()
     ]
}
ComplexComponentAction.addTo(MyActionComponent, 0);   // do it like this instead.
```

#### Defined in

[src/component/component-action.ts:131](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/component-action.ts#L131)

***

### getReactions()

> `static` **getReactions**\<`T`\>(`context`?): `ClassAction`\<`any`\>[]

This is the method called by instances to obtain the static reactions.
It enables a more dynamic way of overriding static reactions in a
derived class.
By default it simply returns [ClassAction.reactions](ComponentAction.md#reactions-1).

#### Type Parameters

• **T**

#### Parameters

• **context?**: `T`

#### Returns

`ClassAction`\<`any`\>[]

#### Inherited from

[`ComponentAction`](ComponentAction.md).[`getReactions`](ComponentAction.md#getreactions-1)

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
class MyClassAction extends ClassAction {
   static reactions = [reaction1, reaction2]
}
MyClassAction.getReactions();
```

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:86
