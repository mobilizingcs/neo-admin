import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter,
          Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from './configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { logUserIn, logUserOut } from 'actions/usersession';

import ohmage from './utils/ohmage-wrapper';

import App from './components/App';


const store = configureStore( undefined, ( ) => {
  console.log( 'Rehydrant called' );
  const userSession = store.getState( ).userSession;
  let auth_token = ohmage._getToken( );
  // if the auth_token cookie is not empty,
  if( !auth_token ) {
    // update ohmageUtil with token from the state
    ohmage._setToken( userSession.user_auth_token );
    auth_token = userSession.user_auth_token;
  }
  // Log user in with this token (to make sure this token is still valid)
  if( auth_token !== '' ) {
    store.dispatch( logUserIn( auth_token ) );
  }
} );

ohmage._onUnknownTokenError( ( ) => {
  // If the token was invalidated, for any reason...
  // ... update the state & remove the token from the ohmage util
  store.dispatch( logUserOut( ) );
  ohmage._setToken( '' );
} )

// Render the main component into the dom
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter basename="/navbar/admin">
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
