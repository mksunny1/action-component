import { ClassAction } from "class-action";
/**
 * Stores functiona args for calling functions at any time with
 * them. We can also extend to make the `call` method do whatever
 * we want.
 *
 * We use this for implementing calculations...
 *
 */
export class CalcAction extends ClassAction {
    static { this.calc = ((...args) => args.join('')); }
    constructor(args, index, ...reactions) {
        super(...reactions);
        this.args = args;
        this.index = index;
    }
    getUndefinedValue() {
        return '';
    }
    act(context) {
        if (this.index !== null && context) {
            this.args[this.index] = (context?.value === undefined) ? this.getUndefinedValue() : context.value;
        }
        const calc = this.constructor.calc;
        const value = calc(...this.args);
        this.doReactions({ value });
    }
}
