import React from 'react';
import { connect } from 'react-redux';

import Notification from './Notification';
import { clearNotification } from '../../actions/notification';

class Notifications extends React.Component {
  constructor( props ) {
    super( props );
    this.clearNotification = this.clearNotification.bind( this );
  }

  clearNotification( ) {
    this.props.dispatch( clearNotification( 0 ) );
  }

  render( ) {
    return <Notification duration={1000} onTimeout={this.clearNotification}
    text={this.props.notifications.length > 0 ? this.props.notifications[0].text : false} />;
  }
}

const mapStateToProps = ( state ) => {
  return {
    notifications: state.notifications
  }
}

export default connect( mapStateToProps, null )( Notifications );