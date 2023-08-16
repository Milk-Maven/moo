import { getId } from "./farmtools";
export const createComponent = (componentName: string) => {
  const metadata = { id: getId() };
  const setState = <State>(stateParams: State) => {
    const state: State = stateParams; // state for the component
    type ComponentActions<StateArgument, ActionArgument> = {
      [actionName in keyof ActionArgument]: (state: Readonly<StateArgument>) => Partial<StateArgument>;
    };
    const setActions = <ActionArgument>(actionsParams: ComponentActions<State, ActionArgument>) => {
      type ActionProcessed<AC> = { [key in keyof AC] };
      const actions = Object.keys(actionsParams).reduce((p, c) => {
        return {
          ...p,
          [c]: () => {
            actionsParams[c](Object.freeze(state)); // call the action, pass in the state
          },
        };
      }, {} as ActionProcessed<ActionArgument>);
      type ComponentMarkDown<StateArgument> = (
        state: Readonly<StateArgument>,
        actions: ActionProcessed<ActionArgument>
      ) => string;
      const setMarkDown = (markdownParams: ComponentMarkDown<State>) => {
        // actionParams
        const markdown = markdownParams(state, actions);
        // const markdown = markdownParams;
        return { metadata, state, actions, markdown };
      };
      return { setMarkDown };
    };
    return { setActions };
  };
  return { setState };
};
