import { ActionComponent } from "./action-component";
import { ComplexComponentAction, IComponentActionContext, IComponentActions } from "./component-action";
export declare class ComponentIfAction extends ComplexComponentAction {
    static attr: string;
    static addTo(actionComponent: typeof ActionComponent, index?: number): void;
    createActions(context: IComponentActionContext): IComponentActions;
}
//# sourceMappingURL=if-action.d.ts.map