import React from 'react';
import { connect } from 'react-redux';
import { 	Grid, Cell, Button, Icon,
					Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl';

import FetchAuditLogs from './FetchAuditLogs';

class AuditConsole extends React.Component {

	constructor( props ) {
		super( props );
    this.state = {};
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
    //const { dispatch } = this.props;
	}


	render( ) {
		return (
			<div style={{margin:'50px'}}>
				<Grid>
					<Cell col={2}>
						<Button onClick={this.handleOpenDialog} raised colored ripple>
							<Icon name="add" /> Append Data
						</Button>
					</Cell>
					<Cell col={2}>
						<Button raised colored ripple>
							<Icon name="add" /> Clear Data
						</Button>
					</Cell>
				</Grid>
				<Grid>
					<Grid>
						<Cell col={12}>
							Console goes here
						</Cell>
					</Grid>
				</Grid>
         <Dialog open={this.state.openDialog} style={{width: '700px'}}>
          <DialogTitle>Fetch Ohmage Audit data</DialogTitle>
          <DialogContent style={{width: '600px'}}>
            <FetchAuditLogs />
          </DialogContent>
           <DialogActions>
            <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
			</div>
		);
	}

}

function mapStateToProps(state) {
  const { auditconsole } = state;
  return {
    auditconsole
  }
}

export default connect(mapStateToProps)(AuditConsole);