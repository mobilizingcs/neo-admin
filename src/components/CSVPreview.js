import React from 'react';

import { Grid, Cell, DataTable, TableHeader, Icon } from 'react-mdl';

class CSVPreview extends React.Component {

  constructor( props ) {
    super( props );
  }

  render( ) {
    if( this.props.parsed_accounts.length < 1 ) {
      return (<Grid><Cell col={12}>CSV Preview Window</Cell></Grid>);
    }
    return (
      <Grid>
        <Cell col={12}>
          <DataTable rows={this.props.parsed_accounts}>
            <TableHeader name="first_name">First Name</TableHeader>
            <TableHeader name="last_name">Last Name</TableHeader>
            <TableHeader name="personal_id">Personal ID</TableHeader>
            <TableHeader name="organization">Organization</TableHeader>
            <TableHeader name="username_prefix">Username Prefix</TableHeader>
            <TableHeader name="email_address">Email Address</TableHeader>
            <TableHeader name="status_created"
              cellFormatter={
                status_created => {
                  if( status_created === 'success' ) {
                    return (<span><Icon name="done" /> Created</span>);
                  }
                  else if( status_created === 'waiting' ) {
                    return (<span><Icon name="history" /> Waiting</span>);
                  }
                  else {
                    return (<span><Icon name="warning" /> Failed</span>);
                  }
                }
              }>
              Account Status
            </TableHeader>
            <TableHeader name="status_permissions_set"
              cellFormatter={
                status_permissions_set => {
                  if( status_permissions_set === 'success' ) {
                    return (<span><Icon name="done" /> Set</span>);
                  }
                  else if( status_permissions_set === 'waiting' ) {
                    return (<span><Icon name="history" /> Waiting</span>);
                  }
                  else {
                    return (<span><Icon name="warning" /> Failed</span>);
                  }
                }
              }>
              Permissions Status
            </TableHeader>
            <TableHeader name="username">Username</TableHeader>
            <TableHeader name="password">Password</TableHeader>
          </DataTable>
        </Cell>
      </Grid>
      );
  }

}

export default CSVPreview;