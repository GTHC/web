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

// redux persist
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { PersistGate } from 'redux-persist/es/integration/react';

// containers
import App from './containers/App'

// CSS/styling
import 'semantic-ui-css/semantic.min.css';

import { configureStore, DevTools, history } from './utils/store';

const { store, persistor } = configureStore();


class Kville extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div>
            <App history={history} />
            <DevTools />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default Kville;
