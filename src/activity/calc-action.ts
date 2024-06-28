import { ClassAction } from "class-action";

export interface ICallable {
    (...args: any): any;
}

export interface ICalcContext {
    value?: any;
}

/**
 * Stores functiona args for calling functions at any time with 
 * them. We can also extend to make the `call` method do whatever 
 * we want.
 * 
 * We use this for implementing calculations...
 * 
 */
export class CalcAction extends ClassAction<ICalcContext> {
    static calc: ICallable = ((...args: any[]) => args.join(''))

    args: any[];
    index: number|null;
    constructor(args: any[], index: number|null, ...reactions: ClassAction<any>[]) {
        super(...reactions);
        this.args = args;
        this.index = index;
    }

    getUndefinedValue() {
        return '';
    }

    act(context?: ICalcContext) {
        if (this.index !== null && context) {
            this.args[this.index] = (context?.value === undefined)? this.getUndefinedValue(): context.value;
        }
        const calc = (<typeof CalcAction>this.constructor).calc;
        const value = calc(...this.args);
        this.doReactions({ value });
    }
}
