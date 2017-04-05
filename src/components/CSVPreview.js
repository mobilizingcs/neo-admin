import React from 'react';

import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui';
import { ActionDone, ActionHistory, AlertWarning } from 'material-ui/svg-icons';

class CSVPreview extends React.Component {

  constructor( props ) {
    super( props );
  }

  render( ) {
    if( this.props.parsed_accounts.length < 1 ) {
      return (<div>CSV Preview Window</div>);
    }
    return (
      <div>
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Personal ID</TableHeaderColumn>
              <TableHeaderColumn>Organization</TableHeaderColumn>
              <TableHeaderColumn>Username Prefix</TableHeaderColumn>
              <TableHeaderColumn>Email Address</TableHeaderColumn>
              <TableHeaderColumn>Account Status</TableHeaderColumn>
              <TableHeaderColumn>Permissions Status</TableHeaderColumn>
              <TableHeaderColumn>Username</TableHeaderColumn>
              <TableHeaderColumn>Password</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.parsed_accounts.map( (account, index) => {
              let account_status;
              if( account.status_created === 'success' ) {
                account_status = (<span><ActionDone /> Created</span>);
              }
              else if( account.status_created === 'waiting' ) {
                account_status = (<span><ActionHistory /> Waiting</span>);
              }
              else {
                account_status = (<span><AlertWarning /> Failed</span>);
              }

              let account_permissions;
              if( account.status_permissions_set === 'success' ) {
                account_permissions = <span><ActionDone /> Set</span>;
              }
              else if( account.status_permissions_set === 'waiting' ) {
                account_permissions = <span><ActionHistory /> Waiting</span>;
              }
              else {
                account_permissions = <span><AlertWarning /> Failed</span>;
              }

              return (
                <TableRow key={index}>
                  <TableRowColumn>{account.first_name}</TableRowColumn>
                  <TableRowColumn>{account.last_name}</TableRowColumn>
                  <TableRowColumn>{account.personal_id}</TableRowColumn>
                  <TableRowColumn>{account.organization}</TableRowColumn>
                  <TableRowColumn>{account.username_prefix}</TableRowColumn>
                  <TableRowColumn>{account.email_address}</TableRowColumn>
                  <TableRowColumn>{account_status}</TableRowColumn>
                  <TableRowColumn>{account_permissions}</TableRowColumn>
                  <TableRowColumn>{account.username}</TableRowColumn>
                  <TableRowColumn>{account.password}</TableRowColumn>
                </TableRow>
              );
            } )}
          </TableBody>
        </Table>
      </div>
      );
  }

}

export default CSVPreview;