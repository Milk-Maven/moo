import { createComponent } from "../engine/moo";
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
      return { backgroundColor: state.backgroundColor === "green" ? "blue" : "green" };
    },

    doSomethingElse: (state) => {
      // TODO inject providers (navigation, api services, etc into params)
      return {};
    },
  })
  .setMarkDown((state, actions) => {
    return html`<button moo_value="{state.attribute2}" moo_click="{action.changeBackgroundColor()}"></button>`;
  });

//generate component into markdown
renderMarkdown(testComponent);
