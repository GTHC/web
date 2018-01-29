import React, { Component } from 'react';

// redux tools
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

// redux dev tools
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// containers
import App from './containers/App'

// CSS/styling
import 'semantic-ui-css/semantic.min.css';

// import * as allReducers from './reducers';

const reducers = combineReducers({
  // ...allReducers,
  router: routerReducer,
});

const history = createHistory();
const middleware = routerMiddleware(history);

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={false}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>,
);

let enhancer;

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development!');
  enhancer = compose(
    applyMiddleware(middleware, thunkMiddleware),
    DevTools.instrument(),
  );
} else {
  enhancer = compose(
    applyMiddleware(middleware, thunkMiddleware),
  );
}

const store = createStore(reducers, enhancer);

class Kville extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <App history={history} />
          { process.env.NODE_ENV === 'development' ?
            <DevTools /> : null
          }
        </div>
      </Provider>
    );
  }
}

export default Kville;
