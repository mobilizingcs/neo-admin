import React from 'react';
import { connect } from 'react-redux';

import {  Step,
          Stepper,
          StepLabel,
          RaisedButton } from 'material-ui';

import { parseCsvFile,
         createAccountsAndSetPermissions,
         resetState } from '../actions/teachersetup';

import CSVPreview from './CSVPreview';

class TeacherSetup extends React.Component {

  constructor( props ) {
    super( props );

    this.csv_file_selected = false;

    this.scanCsvFile = this.scanCsvFile.bind( this );
    this.createAccounts = this.createAccounts.bind( this );
    this.exportCreatedAccounts = this.exportCreatedAccounts.bind( this );
    this.updateCsvFile = this.updateCsvFile.bind( this );
    this.restartProcess = this.restartProcess.bind( this );
    this.removeCsvFile = this.removeCsvFile.bind( this );
  }

  removeCsvFile( ) {
    this.props.dispatch( resetState( ) );
  }

  restartProcess( ) {
    if( confirm( 'Have you exported the CSV file? Click Cancel to go back to save the file.' ) ) {
      this.props.dispatch( resetState( ) );
    }
  }

  scanCsvFile( event ) {
    event.preventDefault( );
    this.props.dispatch( parseCsvFile( document.getElementById( 'csv_file' ).files[0] ) );
  }

  createAccounts( event ) {
    event.preventDefault( );
    this.props.dispatch( createAccountsAndSetPermissions( this.props.parsed_accounts ) );
  }

  exportCreatedAccounts( event ) {
    event.preventDefault( );
    let account_list = this.props.parsed_accounts;
    let csv_file_content = 'data:text/csv;charset=utf-8,';
    csv_file_content += 'First Name, Last Name, Personal ID, Organization, Email Address';
    csv_file_content += ',Username,Password,Account,Permissions\n';
    let rows = [ ];
    for( let i = 0; i < account_list.length; i++ ) {
      let row = [ ];
      row.push( account_list[ i ].first_name );
      row.push( account_list[ i ].last_name );
      row.push( account_list[ i ].personal_id );
      row.push( account_list[ i ].organization );
      row.push( account_list[ i ].email_address );
      row.push( account_list[ i ].username );
      row.push( account_list[ i ].password );
      row.push( account_list[ i ].status_created ? 'Created' : 'Not created' );
      row.push( account_list[ i ].status_permissions_set ? 'Set' : 'Not set' );
      rows.push( row.join( ',' ) );
    }
    csv_file_content += rows.join( '\n' );

    let a = document.createElement( 'a' );
    a.href = encodeURI( csv_file_content );
    a.target = '_blank';
    a.download = 'teacher_accounts.csv';
    document.body.appendChild( a );
    a.click( );
    document.body.removeChild( a );
  }

  updateCsvFile( event ) {
    this.csv_file_selected = !!event.target.value;
    this.forceUpdate( );
  }

  renderStep( step ) {
    switch( step ) {
      case 0:
      return (
        <div>
          <p>
            To get started, select the CSV file to import and click the button
            to scan the CSV file.
          </p>
          <input type="file" id="csv_file" onChange={this.updateCsvFile} />
          <RaisedButton label='Scan CSV File' primary={true} type='button'
            onClick={this.scanCsvFile} />
        </div>
      );
      case 1:
      return (
        <div>
          <RaisedButton label='Create Accounts' primary={true} type='button'
            disabled={
              this.props.parsed_accounts.length === 0 ||
              ( this.props.creating > 0 || this.props.setting_permissions > 0 )
            }
            onClick={this.createAccounts} />
          <RaisedButton label='Reupload CSV File' secondary={true} type='button'
            onClick={this.removeCsvFile} />
          <CSVPreview parsed_accounts={this.props.parsed_accounts} />
        </div>
      );
      case 2:
      return (
        <div>
          <RaisedButton label='Export Created Accounts' primary={true} type='button'
          onClick={this.exportCreatedAccounts} />
          <RaisedButton label='Restart Process' secondary={true} type='button'
          onClick={this.restartProcess} />
          <CSVPreview parsed_accounts={this.props.parsed_accounts} />
        </div>
      );
    }
  }

  render( ) {
    const contentStyle = {margin: '0 16px'};
    const activeStep = this.props.step;

    return (
      <div style={{width: '100%', margin: 'auto'}}>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Upload a CSV file</StepLabel>
          </Step>
          <Step>
            <StepLabel>Preview New Accounts</StepLabel>
          </Step>
          <Step>
            <StepLabel>Export Created Accounts</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          { this.renderStep( activeStep ) }
        </div>
      </div>
    );
  }
}

function getStepBasedOnState( state ) {
  if( state.parsed_accounts.length === 0 ) {
    // if there are no parsed accounts, we are in step 0
    return 0;
  }
  else if( state.parsed_accounts.length > 0 ) {
    // if there are parsed accounts,
    if( state.creating === 0 && state.setting_permissions === 0 ) {
      // and there is no ongoing work,
      if( state.created > 0 || state.permissions_set > 0 ) {
        // and some work is already done, we are in step 2 (the final step)
        return 2;
      }
    }
    return 1;
  }
}

const mapStateToProps = ( state ) => {
  return {
    step: getStepBasedOnState( state.teacherSetup ),
    parsed_accounts: state.teacherSetup.parsed_accounts,
    created: state.teacherSetup.created,
    permissions_set: state.teacherSetup.permissions_set,
    creating: state.teacherSetup.creating,
    setting_permissions: state.teacherSetup.setting_permissions
  }
}

export default connect( mapStateToProps, null )( TeacherSetup );
