import React from 'react';

import { Grid, Cell, DataTable, TableHeader } from 'react-mdl';

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
        <DataTable rows={this.props.parsed_accounts}>
          <TableHeader name="first_name">First Name</TableHeader>
          <TableHeader name="last_name">Last Name</TableHeader>
          <TableHeader name="personal_id">Personal ID</TableHeader>
          <TableHeader name="organization">Organization</TableHeader>
          <TableHeader name="username_prefix">Username Prefix</TableHeader>
          <TableHeader name="email">Email Address</TableHeader>
          <TableHeader name="status"
            cellFormatter={ status => status.created && status.permissions_set ? 'Created' : 'Not created' }>
            Account Status
          </TableHeader>
        </DataTable>
      </Grid>
      );
  }

}

export default CSVPreview;