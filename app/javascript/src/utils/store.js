import React from 'react';

import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
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

const reducer = {
  ...allReducers,
  router: routerReducer,
}

const reducers = persistCombineReducers(config, reducer);

const history = createHistory();
const middleware = routerMiddleware(history);

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-b"
    changePositionKey="ctrl-q"
    defaultIsVisible={false}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>,
);

const enhancer = compose(
  applyMiddleware(middleware, thunkMiddleware),
  DevTools.instrument(),
);

function configureStore() {

  let store = createStore(reducers, enhancer);
  let persistor = persistStore(store);

  return { persistor, store };
}

export {
  configureStore,
  history,
  DevTools
}
