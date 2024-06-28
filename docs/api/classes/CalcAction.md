[**action-component**](../README.md) • **Docs**

***

[action-component](../globals.md) / CalcAction

# Class: CalcAction

Stores functiona args for calling functions at any time with 
them. We can also extend to make the `call` method do whatever 
we want.

We use this for implementing calculations...

## Extends

- `ClassAction`\<[`ICalcContext`](../interfaces/ICalcContext.md)\>

## Constructors

### new CalcAction()

> **new CalcAction**(`args`, `index`, ...`reactions`): [`CalcAction`](CalcAction.md)

#### Parameters

• **args**: `any`[]

• **index**: `number`

• ...**reactions**: `ClassAction`\<`any`\>[]

Instance reactions. These are reactions added to every class-action
instance. They may be necessary when they require internal state that
differ between instances.

**Example**

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
```

#### Returns

[`CalcAction`](CalcAction.md)

#### Overrides

`ClassAction<ICalcContext>.constructor`

#### Defined in

[src/activity/calc-action.ts:24](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/activity/calc-action.ts#L24)

## Properties

### args

> **args**: `any`[]

#### Defined in

[src/activity/calc-action.ts:22](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/activity/calc-action.ts#L22)

***

### index

> **index**: `number`

#### Defined in

[src/activity/calc-action.ts:23](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/activity/calc-action.ts#L23)

***

### keyedReactions?

> `optional` **keyedReactions**: `object`

#### Index Signature

 \[`key`: `IKey`\]: `ClassAction`\<`any`\>[]

#### Inherited from

`ClassAction.keyedReactions`

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

`ClassAction.reactions`

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:56

***

### calc

> `static` **calc**: [`ICallable`](../interfaces/ICallable.md)

#### Defined in

[src/activity/calc-action.ts:20](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/activity/calc-action.ts#L20)

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

`ClassAction.reactions`

#### Defined in

node\_modules/class-action/dist/class-action.d.ts:44

## Methods

### act()

> **act**(`context`?): `void`

Performs the local action and triggers all reactions.

#### Parameters

• **context?**: [`ICalcContext`](../interfaces/ICalcContext.md)

#### Returns

`void`

#### Overrides

`ClassAction.act`

#### Example

```ts
import { ClassAction } from 'class-action'
class MyClassAction extends ClassAction {
   doAction(context) {
     console.log(context.msg);
   }
}
const myClassAction = new MyClassAction(new MyClassAction(), new MyClassAction());
myClassAction.act({ msg: 'nice work' });
// prints 'nice work' thrice...
```

#### Defined in

[src/activity/calc-action.ts:34](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/activity/calc-action.ts#L34)

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

`ClassAction.addKeyedReactions`

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

`ClassAction.addReactions`

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

### doAction()

> **doAction**(`context`?): `any`

Performs the local action

#### Parameters

• **context?**: [`ICalcContext`](../interfaces/ICalcContext.md)

#### Returns

`any`

#### Inherited from

`ClassAction.doAction`

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

• **context?**: [`ICalcContext`](../interfaces/ICalcContext.md)

#### Returns

`any`

#### Inherited from

`ClassAction.doReactions`

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

• **context?**: [`ICalcContext`](../interfaces/ICalcContext.md)

#### Returns

`Generator`\<`ClassAction`\<`any`\>, `void`, `unknown`\>

#### Inherited from

`ClassAction.getAllReactions`

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

• **context?**: [`ICalcContext`](../interfaces/ICalcContext.md)

#### Returns

`Generator`\<`ClassAction`\<`any`\>, `void`, `unknown`\>

#### Inherited from

`ClassAction.getReactions`

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

### getUndefinedValue()

> **getUndefinedValue**(): `string`

#### Returns

`string`

#### Defined in

[src/activity/calc-action.ts:30](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/activity/calc-action.ts#L30)

***

### removeKeyedReactions()

> **removeKeyedReactions**(...`reactionKeys`): `void`

Removes the reactions with the specified keys.

#### Parameters

• ...**reactionKeys**: `IKey`[]

#### Returns

`void`

#### Inherited from

`ClassAction.removeKeyedReactions`

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

`ClassAction.removeReactions`

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

`ClassAction.getReactions`

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
