import { getId } from "./farm-tools";
export const setComponentContext = () => {
  const createComponent = <Providers>(context: Providers) => {
    const metadata = { id: getId() };
    const setState = <State>(stateParams: (providers: Providers) => State) => {
      const state: State = stateParams(context); // state for the component
      type ComponentActions<StateArgument, ActionArgument> = {
        [actionName in keyof ActionArgument]: (state: Readonly<StateArgument>) => Partial<StateArgument>;
      };
      const setActions = <ActionArgument>(actionsParams: ComponentActions<State, ActionArgument>) => {
        type ActionProcessed = { [key in keyof ActionArgument]: () => void };
        const actions = Object.keys(actionsParams).reduce((p, c) => {
          return {
            ...p,
            [c]: () => {
              actionsParams[c](Object.freeze(state));
            },
          };
        }, {} as ActionProcessed);
        type ComponentMarkDown<StateArgument> = (state: Readonly<StateArgument>, actions: ActionProcessed) => string;
        const setMarkDown = (markdownParams: ComponentMarkDown<State>) => {
          const markdown = markdownParams(state, actions);
          return { metadata, state: Object.freeze(state), actions, markdown };
        };
        return { setMarkDown };
      };
      return { setActions };
    };
    return { setState };
  };
  return { createComponent };
};
