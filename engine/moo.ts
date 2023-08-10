import { getId } from "./farmtools";
type ComponentMarkDown<T> = (state: Readonly<T>, actionParams) => string;
type ComponentActions<T> = { [actionName: string]: (state: Readonly<T>) => Partial<T> };
export const createComponent = (componentName: string) => {
  const metadata = { id: getId() };
  const setState = <T>(stateParams: T) => {
    const state: T = stateParams; // state for the component
    const setActions = (actionsParams: ComponentActions<T>) => {
      const actions = Object.keys(actionsParams).reduce((p, c) => {
        return {
          ...p,
          [c]: () => {
            actionsParams[c](Object.freeze(state)); // call the action, pass in the state
          },
        };
      }, {});
      const setMarkDown = (markdownParams: ComponentMarkDown<T>) => {
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
