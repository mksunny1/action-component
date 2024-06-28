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
export declare class CalcAction extends ClassAction<ICalcContext> {
    static calc: ICallable;
    args: any[];
    index: number | null;
    constructor(args: any[], index: number | null, ...reactions: ClassAction<any>[]);
    getUndefinedValue(): string;
    act(context?: ICalcContext): void;
}
//# sourceMappingURL=calc-action.d.ts.map