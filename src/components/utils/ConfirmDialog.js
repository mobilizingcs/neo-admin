import React from 'react';
import PropTypes from 'prop-types';

import {  FlatButton,
          Dialog } from 'material-ui';

class ConfirmDialog extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      open: false
    };
  }

  handleOpen = ( ) => {
    this.setState( {
      open: true
    } );
  };

  handleClose = ( ) => {
    this.setState( {
      open: false
    } );
  };

  confirmationSuccess = ( ) => {
    this.props.onConfirm( );
    this.handleClose( );
  };

  confirmationFailure = ( ) => {
    this.handleClose( );
  };

  render( ) {
    return (
      <Dialog title={this.props.title}
              actions={[
                  <FlatButton label="No"
                              primary={true}
                              onTouchTap={this.confirmationFailure}  />,
                  <FlatButton label="Yes"
                              primary={true}
                              keyboardFocused={true}
                              onTouchTap={this.confirmationSuccess} />
                ]}
              modal={false}
              open={this.state.open}
              onRequestClose={this.confirmationFailure} >
        {this.props.text}
      </Dialog>
      );
  }

}

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default ConfirmDialog;