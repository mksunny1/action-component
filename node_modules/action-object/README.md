# Action Object

This is a simple library for creating reactive objects. It helps to create objects with method or property descriptor logic that may need to be modified later without introducing performance issues from multiple code compilation. The library also exports some object-related class-actions and utility functions.

An action object is an object with `set` and `call` [class-actions](https://github.com/mksunny1/class-action) which are triggered when the corresponding properties are set or methods are invoked. The object may additionally or alternatively contain a `children` object which maps its keys to nested action objects. The nesting can run to any depth, so that any object can be wrapped with an action object. We have used action-action to implement a transparent and extensible reactivity system in [action-component](https://github.com/mksunny1/action-component).


## Installation

`npm i action-object`


## Usage

```js
import { ActionObject } from "action-object";
const myObject = { a: 1, b: 2 }
const myActionObject = new ActionObject(myObject);
myActionObject.addActions('b', [
    { act(context) { console.log(`${context.key} set to ${context.value}`) } }
], 'set');
myActionObject.set('a', 99);
myActionObject.set('b', 100);    // prints 'b set to 100'
const proxy = myActionObject.createProxy();
proxy.b = 200;                   // prints 'b set to 200'

```


## Documentation

This library exports a single class with a very simple API which can be picked up in a few minutes [here](./docs/api/classes/ActionObject.md).


## Contributing

Help improve Action-object by contributing to this project. You can contribute in many ways. See the [contributing guidelines](./CONTRIBUTING.md). You can also show your support by sponsoring us.

[![](https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=S2ZW3RJSDHASW)

Thank you for contributing.


## Sponsors

...

