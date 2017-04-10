import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { logUserIn } from 'actions/usersession';

import ohmage from './utils/ohmage-wrapper';

import App from './components/App';
import Summary from './components/Summary';
//import Class from './components/Class';
//import CreateClass from './components/CreateClass';

import AuditConsole from './components/AuditConsole/AuditConsole';
import TeacherSetup from './components/TeacherSetup/TeacherSetup';

const store = configureStore( undefined, ( ) => {
  console.log( 'Rehydrant called' );
  const userSession = store.getState( ).userSession;
  const auth_token = ohmage._getToken( );
  // if the auth_token cookie is not empty,
  if( !!auth_token ) {
    // update the state with this token from cookie
    store.dispatch( logUserIn( auth_token ) );
  }
  else {
    // otherwise, update ohmageUtil with token from the state
    ohmage._setToken( userSession.user_auth_token );
  }
} );
// todo: add listener for ohmage wrapper/ohmage which is called in case
// the ohmage token is invalidated by a request to the server

// Render the main component into the dom
ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      	<Route path="summary" title="Summary" component={Summary} />
      	{/*<Route path="classes" component={Class} >
          <Route path="/class/new" component={CreateClass} />
        </Route>
      	<Route path="users" />*/}
      	<Route path="audit-console" title="Audit & API Console" component={AuditConsole} />
        <Route path="teacher-setup" title="Teacher Setup Wizard" component={TeacherSetup} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
