import React from 'react';
import { Snackbar } from 'material-ui';

class Notification extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      message: props.text
    };
    this.handleTimeout = this.handleTimeout.bind( this );
  }

  handleTimeout( ) {
    this.props.onTimeout( 0 );
  }

  render( ) {
      return <Snackbar open={!!this.props.text} autoHideDuration={this.props.duration}
          message={this.props.text} onRequestClose={this.handleTimeout} />;
  }
}

export default Notification;