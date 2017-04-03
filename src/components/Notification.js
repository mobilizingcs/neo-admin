import React from 'react';
import { connect } from 'react-redux';

import { Snackbar } from 'react-mdl';

import { clearNotification } from '../actions/notification';

class Notification extends React.Component {
  constructor( ) {
    super( );

    this.handleTimeout = this.handleTimeout.bind( this );
  }

  handleTimeout( ) {
    this.props.dispatch( clearNotification( 0 ) );
  }

  render( ) {
    if( this.props.notifications.length > 0 ) {
      return (
      <Snackbar active={true} onTimeout={this.handleTimeout}>
        {this.props.notifications[0].text}
      </Snackbar> );
    }
    return null;
  }
}

const mapStateToProps = ( state ) => {
  return {
    notifications: state.notifications
  }
}
export default connect( mapStateToProps, null )( Notification );