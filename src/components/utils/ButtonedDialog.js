import React from 'react';

import { Dialog, RaisedButton } from 'material-ui';

class ButtonedDialog extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      openDialog: false
    };
  }

  handleOpenDialog = ( ) => {
    this.setState({
      openDialog: true
    });
  };

  handleCloseDialog = ( ) => {
    this.setState({
      openDialog: false
    });
  };

  render( ) {
    return (
      <div>
        <RaisedButton label={this.props.button_label}
                      primary={true}
                      onClick={this.handleOpenDialog} />
        <Dialog title={this.props.dialog_title}
                modal={false}
                open={this.state.openDialog}
                onRequestClose={this.handleCloseDialog} >
            {this.props.children}
        </Dialog>
      </div>
    );
  }
}

export default ButtonedDialog;