import React from 'react';

import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { createDevTools } from 'redux-devtools';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunkMiddleware from 'redux-thunk';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import * as allReducers from './../reducers';

const config = {
  key: 'test',
  storage,
};

const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const reducer = {
  ...allReducers,
  router: connectRouter(history),
}

const reducers = persistCombineReducers(config, reducer);

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-b"
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

function configureStore() {

  let store = createStore(reducers, undefined, enhancer);
  let persistor = persistStore(store);

  return { store, persistor };
}

export {
  configureStore,
  history,
  DevTools
}
