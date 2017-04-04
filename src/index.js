import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';
import Summary from './components/Summary';
//import Class from './components/Class';
//import CreateClass from './components/CreateClass';

import AuditConsole from './components/AuditConsole';
import TeacherSetup from './components/TeacherSetup';

injectTapEventPlugin();
const store = configureStore( );

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
      	<Route path="audits" title="Audit Console" component={AuditConsole} />
        <Route path="teacher-setup" title="Teacher Setup Wizard" component={TeacherSetup} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
