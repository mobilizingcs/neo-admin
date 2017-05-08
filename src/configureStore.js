import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

// To persist some part of the state to localStorage
import { persistStore, autoRehydrate } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';

// To buffer all actions before state is rehydrated by redux-persist
// todo: make this work
import createActionBuffer from 'redux-action-buffer'

// To batch actions with a debounce... this is to prevent cascading renders
import { batchedSubscribe } from 'redux-batched-subscribe';

import utils from './utils/utils.js';
const loggerMiddleware = createLogger( );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore( preloadedState, onRehydrate ) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      ),
      batchedSubscribe( utils.debounce( notify => {
        notify( );
      }, 100 ) ),
      autoRehydrate( ),
      applyMiddleware(
        createActionBuffer(REHYDRATE)
      )
    )
  );
  persistStore( store, {
    whitelist: [ 'userSession' ],
    debounce: 200
  }, onRehydrate );
  return store;
}
