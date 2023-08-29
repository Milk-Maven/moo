import { createProvider } from "./moo-provider";

const myProvider = createProvider()
  .setState({ someStateForThisService: "" })
  .setActions({
    testFunction: (_state) => {
      return { someStateForThisService: "asdf" };
    },
  });

const myOtherProvider = createProvider()
  .setState({ stateForThisServiceAsWell: "" })
  .setActions({
    testFunction: (_state) => {
      return { stateForThisServiceAsWell: "asdf" };
    },
  });

// const myComponent = createComponent()
//   .setState({ attribute3: "attribute1", attribute2: "attribute2", backgroundColor: "green", sameAsPropsInReact: true })
//   .setActions({
//     doSomethingElse: (_state) => {
//       return { attribute3: "" };
//     },
//   })
//   .setMarkDown((_state, _actions) => {
//     return `<button moo_value="{state.attribute2}" moo_click="{action.changeBackgroundColor()}">here is some button</button>`;
//   });

// const myOtherComponent = createComponent()
//   .setState({ attribute3: "attribute1", attribute2: "attribute2", backgroundColor: "green", sameAsPropsInReact: true })
//   .setActions({
//     doSomethingElse: (_state) => {
//       return {};
//     },
//   })
//   .setMarkDown((_state, _actions) => {
//     return `<button moo_value="{state.attribute2}" moo_click="{action.changeBackgroundColor()}">here is some button</button>`;
//   });
const createApp = () => {
  const setProviders = <Providers>(providerParams: Providers) => {
    const providers = providerParams;
    const setComponents = <Components>(componentParams: (providers: Providers) => Components) => {
      const components = componentParams;
      type AppRoutes = (providers: Providers, components: Readonly<Components>) => string;
      const setRoutes = (routeParams: AppRoutes) => {
        const routes = routeParams;
        return { providers, components };
      };
      return { setRoutes };
    };
    return { setComponents };
  };
  return { setProviders };
};

createApp()
  .setProviders({ myProvider, myOtherProvider })
  .setComponents((createComponent) => {
    return {
      myComponent: createComponent({ myProvider, myOtherProvider })
        .setState((provider) => {
          return {
            attribute3: "attribute1",
            attribute2: "attribute2",
            backgroundColor: "green",
            sameAsPropsInReact: true,
          };
        })
        .setActions({
          doSomethingElse: (_state) => {
            return {};
          },
        })
        .setMarkDown((_state, _actions) => {
          return `<button moo_value="{state.attribute2}" moo_click="{action.changeBackgroundColor()}">here is some button</button>`;
        }),
    };
  });
// .setRoutes(({ myProvider }) => {
//   myProvider.actions;
//   myComponent.actions.doSomethingElse();
//   myOtherComponent.actions.doSomethingElse();
//   return "";
// });
