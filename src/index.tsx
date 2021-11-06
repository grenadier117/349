import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import root app
import { App } from 'app';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const render = (Component: typeof App) => {
  ReactDOM.render(<Component />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./app'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ApplicationRoot = require('./app').App;
    render(ApplicationRoot);
  });
}

render(App);
