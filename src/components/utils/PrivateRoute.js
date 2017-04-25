import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
  constructor( ) {
    super( );
            console.log('wat');

  }
  render( ) {

    let { component: Component, ...rest } = this.props;
    return <Route {...rest} render={ props => {
      if( rest.shouldRender ) {
        return <Component {...props} />
      }
      else {
        return <Redirect to='/unauthorized' />;
      }
    } } />
  }
}


export default PrivateRoute;