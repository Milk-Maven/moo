import { getId } from "./farm-tools";

export const createProvider = () => {
  const metadata = { id: getId() };
  const setState = <State>(stateParams: State) => {
    const state: State = stateParams;
    type ProviderActions<StateArgument, ActionArgument> = {
      [actionName in keyof ActionArgument]: (state: Readonly<StateArgument>) => Partial<StateArgument>;
    };
    const setActions = <ActionArgument>(actionsParams: ProviderActions<State, ActionArgument>) => {
      type ActionProcessed<AC> = { [key in keyof AC]: () => void };
      const actions = Object.keys(actionsParams).reduce((p, c) => {
        return {
          ...p,
          [c]: () => {
            actionsParams[c](Object.freeze(state)); // call the action, pass in the state
          },
        };
      }, {} as ActionProcessed<ActionArgument>);
      return { state: Object.freeze(state), actions, metadata };
    };
    return { setActions };
  };
  return { setState };
};
