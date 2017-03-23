import React from 'react';
import { connect } from 'react-redux';

import {  Grid, Cell, Button } from 'react-mdl';

import { parseCsvFile, createAccountsAndSetPermissions } from '../actions/teachersetup';
import CSVPreview from './CSVPreview';


class TeacherSetup extends React.Component {

  constructor( props ) {
    super( props );
    this.scanCsvFile = this.scanCsvFile.bind( this );
    this.createAccounts = this.createAccounts.bind( this );
  }

  scanCsvFile( event ) {
    event.preventDefault( );
    this.props.dispatch( parseCsvFile( document.getElementById( 'csv_file' ).files[0] ) );
  }

  createAccounts( event ) {
    event.preventDefault( );
    this.props.dispatch( createAccountsAndSetPermissions( this.props.parsed_accounts ) );
  }

  render( ) {
    return (
      <div>
        <Grid>
          <Cell col={12}>To get started, select the CSV file to import and click the button to scan the CSV file</Cell>
          <Cell col={3}>
            1. <input type="file" id="csv_file" />
          </Cell>
          <Cell col={3}>
            2. <Button colored raised type='button' onClick={this.scanCsvFile}>Scan CSV file</Button>
          </Cell>
          <Cell col={3}>
            3. <Button colored raised type='button' onClick={this.createAccounts}>Create Accounts</Button>
          </Cell>
        </Grid>
        <CSVPreview parsed_accounts={this.props.parsed_accounts} />
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    parsed_accounts: state.teacherSetup.parsed_accounts
  }
}

export default connect( mapStateToProps, null )(TeacherSetup);
