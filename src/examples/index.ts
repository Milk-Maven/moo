import { createComponent } from "../engine/moo-component";
import { createProvider } from "../engine/moo-provider";
type Component<T, U> = {
  metadata: {
    id: string;
  };
  state: T;
  actions: U;
  markdown: string;
};
const renderMarkdown = <T, U>(component: Component<T, U>) => {
  console.log("starting");
  const root = document.querySelector<HTMLDivElement>("#moo");
  if (root) {
    root.innerHTML = component.markdown;
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

const testComponent = createComponent("testComponent")
  .setState({ attribute3: "attribute1", attribute2: "attribute2", backgroundColor: "green", sameAsPropsInReact: true })
  .setActions({
    doSomethingElse: (_state) => {
      return {};
    },
  })
  .setMarkDown((_state, _actions) => {
    return `<button moo_value="{state.attribute2}" moo_click="{action.changeBackgroundColor()}">here is some button</button>`;
  });

//generate component into markdown
renderMarkdown(testComponent);

const testProvider = createProvider("testProvider")
  .setState({ someStateForThisService: "" })
  .setActions({
    testFunction: (_state) => {
      return { someStateForThisService: "asdf" };
    },
  });

testProvider.actions.testFunction();
