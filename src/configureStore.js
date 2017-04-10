import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { persistStore, autoRehydrate } from 'redux-persist';

import utils from './utils/utils.js';

import { batchedSubscribe } from 'redux-batched-subscribe';

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
      autoRehydrate( )
    )
  );
  persistStore( store, {
    whitelist: [ 'userSession' ],
    debounce: 200
  }, onRehydrate );
  return store;
}
