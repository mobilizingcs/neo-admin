import React from 'react';
import { connect } from 'react-redux';
import {  Dialog,
          RaisedButton } from 'material-ui';

import { ContentAdd, ContentClear } from 'material-ui/svg-icons';

import FetchAuditLogs from './FetchAuditLogs';
import { fetchLocalLogsState } from '../actions/auditconsole';

class AuditConsole extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      openDialog: false
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog( ) {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog( ) {
    this.setState({
      openDialog: false
    });
  }

  componentDidMount() {
    if( !this.props.local_state.is_fetched ) {
      this.props.dispatch( fetchLocalLogsState( ) );
    }
  }


  render( ) {

    return (
      <div style={{margin:'50px'}}>
        <span>Current Log Count: {this.props.local_state.state.count}</span>
        <RaisedButton
          label='Append More Data'
          primary={true}
          icon={<ContentAdd />}
          onClick={this.handleOpenDialog} />
        <RaisedButton
          label='Clear Local Data'
          icon={<ContentClear />}
          secondary={true} />
        <Dialog
          title="Fetch Ohmage Audit Data"
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog} >
          <FetchAuditLogs />
        </Dialog>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { auditConsole } = state;
  return {
    local_state: auditConsole.local_state
  }
}

export default connect(mapStateToProps)(AuditConsole);