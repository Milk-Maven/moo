import { createComponent } from "../engine/moo";
// @ts-ignore
type Component<T, U> = {
  metadata: {
    id: string;
  };
  state: T;
  actions: U;
  markdown: string;
};
const renderMarkdown = <T, U>(component: Component<T, U>) => {
  const element = document.createElement("div");
  element.innerHTML = component.markdown;
  console.log(element.innerHTML);
  const root = document.getElementById("moo");
  if (root) {
    root.appendChild(element);
  }
  // const MOO_VALUE_REGEX = /moo_value=\{[^}]+\}/g;
  // const MOO_IF_REGEX = /moo_if=\{[^}]+\}/g;
  // const MOO_CLICK_REGEX = /moo_if=\{[^}]+\}/g;
  // const MOO_FOR_REGEX = /moo_if=\{[^}]+\}/g;
  // console.log(component.markdown);
  // const matches = component.markdown.match(MOO_VALUE_REGEX);
  // const matches = component.markdown.match(MOO_IF_REGEX);
  // const matches = component.markdown.match(MOO_CLICK_REGEX);
  // const matches = component.markdown.match(MOO_FOR_REGEX);
};
const testComponent = createComponent("test component")
  .setState({ attribute3: "attribute1", attribute2: "attribute2", backgroundColor: "green", sameAsPropsInReact: true })
  .setActions({
    changeBackgroundColor: (state) => {
      return { backgroundColor: "blue" };
    },
  })
  .setMarkDown((state, actions) => {
    return `<button moo_value={state.attribute2} moo_click={action.changeBackgroundColo}></button>`;
  });
console.log("running");
renderMarkdown(testComponent);
console.log("stopped");
// renderMarkdown(testComponent);
