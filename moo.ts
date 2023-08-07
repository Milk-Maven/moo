import { getId } from "./farmtools";
import { ElementEvents } from "./fauna";
type ComponentActions<T> = { [actionName: string]: (state: Readonly<T>) => Partial<T> };
type ComponentMarkDown<T> = { markdown: (state: Readonly<T>) => string };
type MarkDownOptions = { eventNames: [keyof ElementEvents] };
// type ComponentMarkdown = ({ eventNames }: MarkDownOptions) => void;
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
      const setMarkDown = <T>(actionsParams: ComponentMarkDown<T>) => {
        console.log(state);
        // eventNames;
        // const markdown = markdownParams;
        return "";
      };
      return { setMarkDown };
    };
    return { setActions };
  };
  return { setState };
};
// example of component instance
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
  .setMarkDown({ markdown: (state) => {
    state.

  } });
// .markDown((state) => {
//   html`<div></div>`;
// });
