import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import App from './components/App';
import Summary from './components/Summary';

const store = configureStore( );

// Render the main component into the dom
ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      	<Route path="/summary" component={Summary} />
      	<Route path="/classes" />
      	<Route path="/users" />
      	<Route path="/audits" />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
