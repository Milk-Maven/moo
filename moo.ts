import { getId } from "./farmtools";
document.getElementById("")?.onclick;
type ComponentActions<T> = { [actionName: string]: (state: Readonly<T>) => Partial<T> };
type ComponentMarkdown = (markdown: Readonly<string>) => void;
type Component = {};
const createComponent = (componentName: string) => {
  const metadata = { id: getId() };
  const setState = <T>(stateParams: T) => {
    const state: T = stateParams;
    const setActions = (actionsParams: ComponentActions<T>) => {
      const actions = Object.keys(actionsParams).reduce((p, c) => {
        return {
          ...p,
          [c]: () => {
            const updatedState = actionsParams[c](Object.freeze(stateParams));
          },
        };
      }, {});
      const markDown = <T>(markdownParams: string) => {
        const markdown = markdownParams;
        return "";
      };
      return { markDown };
    };
    return { setActions };
  };
  return { setState };
};
document.getElementById("")?.onclick;

createComponent("test component")
  .setState({ attribute1: "attribute1", attribute2: "attribute2", backgroundColor: "green", sameAsPropsInReact: true })
  .setActions({
    onclick: (state) => {
      return { attribute1: "updatedValue" };
    },
    changeBackGroundColor: (state) => {
      const backgroundColor = state.backgroundColor === "green" ? "blue" : "green";
      return { backgroundColor };
    },
  })
  .markDown(() => {
    html`<div></div>`;
  });
