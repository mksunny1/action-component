[**action-component**](../README.md) • **Docs**

***

[action-component](../globals.md) / PopAction

# Class: PopAction

Removes last element item(s). Note that this (and splice) 
will not work well if you do an 'if' directly on the item 
elements. You need to find other solutions for such scenarios, 
such as putting the conditional element(s) inside the main 
item elements or extending this class to account for it...

## Extends

- `ClassAction`\<`IObjectCallActionContext`\>

## Constructors

### new PopAction()

> **new PopAction**(`context`): [`PopAction`](PopAction.md)

#### Parameters

• **context**: [`IForContext`](../interfaces/IForContext.md)

#### Returns

[`PopAction`](PopAction.md)

#### Overrides

`ClassAction<IObjectCallActionContext>.constructor`

#### Defined in

[src/component/for-action.ts:56](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/for-action.ts#L56)

## Properties

### context

> **context**: [`IForContext`](../interfaces/IForContext.md)

#### Defined in

[src/component/for-action.ts:55](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/for-action.ts#L55)

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

• **context?**: `IObjectCallActionContext`

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

[src/component/for-action.ts:61](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/for-action.ts#L61)

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

• **context?**: `IObjectCallActionContext`

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

• **context?**: `IObjectCallActionContext`

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

• **context?**: `IObjectCallActionContext`

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

• **context?**: `IObjectCallActionContext`

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
