import React from 'react';
import { connect } from 'react-redux';

import { Grid, Cell, Button } from 'react-mdl';

import { parseCsvFile,
         createAccountsAndSetPermissions } from '../actions/teachersetup';
import CSVPreview from './CSVPreview';


class TeacherSetup extends React.Component {

  constructor( props ) {
    super( props );

    this.csv_file_selected = false;

    this.scanCsvFile = this.scanCsvFile.bind( this );
    this.createAccounts = this.createAccounts.bind( this );
    this.exportCreatedAccounts = this.exportCreatedAccounts.bind( this );
    this.updateCsvFile = this.updateCsvFile.bind( this );
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

  render( ) {
    return (
      <div>
        <Grid>
          <Cell col={12}>
            <p>
            To get started, select the CSV file to import and click the button
            to scan the CSV file.
            </p>
          </Cell>
        </Grid>
        <Grid>
          <Cell col={2}>
            1.<input type="file" id="csv_file" onChange={this.updateCsvFile} />
          </Cell>
          <Cell col={2}>
            2.<Button colored raised type='button' onClick={this.scanCsvFile}
            disabled={!this.csv_file_selected}>
                Scan CSV file
              </Button>
          </Cell>
          <Cell col={2}>
            3.<Button colored raised type='button' onClick={this.createAccounts}
            disabled={
              this.props.parsed_accounts.length === 0 ||
              ( this.props.creating > 0 || this.props.setting_permissions > 0 )
            }>
                Create Accounts
              </Button>
          </Cell>
          <Cell col={2}>
            4.<Button colored raised type='button' onClick={this.exportCreatedAccounts}
            disabled={
              (this.props.created === 0 && this.props.permissions_set === 0)
              || (this.props.creating > 0 || this.props.setting_permissions > 0 )
            }>
                Export Created Accounts
              </Button>
          </Cell>
        </Grid>
        <CSVPreview parsed_accounts={this.props.parsed_accounts} />
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    parsed_accounts: state.teacherSetup.parsed_accounts,
    created: state.teacherSetup.created,
    permissions_set: state.teacherSetup.permissions_set,
    creating: state.teacherSetup.creating,
    setting_permissions: state.teacherSetup.setting_permissions
  }
}

export default connect( mapStateToProps, null )( TeacherSetup );
