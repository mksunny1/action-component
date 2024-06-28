[**action-component**](../README.md) • **Docs**

***

[action-component](../globals.md) / processValue

# Function: processValue()

> **processValue**(`value`, `roots`, `result`, `reactions`, `options`?): `IMap`\<[`CalcAction`](../classes/CalcAction.md)\>

A utility function used in [ComponentAction#createActions](../classes/ComponentAction.md#createactions) implementations 
to process an attribute value and create the appropriate actions. The 
created actions are added to the given `result` object. Any reactions 
passed are nested in the created actions. The optional options object 
contain values for the static fields defined in ComponentAction to control 
what meanings are attached to the tokens in the value.

## Parameters

• **value**: `string`

• **roots**: `ActionObject`[]

• **result**: `IMap`\<`object`\>

• **reactions**: `ClassAction`\<`any`\>[] = `[]`

• **options?**: [`IProcessValueOptions`](../interfaces/IProcessValueOptions.md)

## Returns

`IMap`\<[`CalcAction`](../classes/CalcAction.md)\>

## Example

```ts
import { processValue } from 'action-component'
import { ActionObject } from 'action-object'
const root = { planets: { jupiter: 5 } }
const result = {};
const actionRoot = new ActionObject(root)
processValue('%planets.jupiter', [actionRoot], result, [], {
    setPrefix: '%'
});
console.log(result)  // { 'planets.jupiter': { call: [] } }
```

## Defined in

[src/component/component-action.ts:174](https://github.com/mksunny1/action-component/blob/c02ca15116f22d8d4043bf27a05c090705180bcc/src/component/component-action.ts#L174)
