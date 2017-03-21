import React from 'react';

import { Grid, DataTable, TableHeader } from 'react-mdl';

class CSVPreview extends React.Component {

  constructor( props ) {
    super( props );
  }

  render( ) {
    if( this.props.parsed_accounts.length < 1 ) {
      return (<div></div>);
    }
    return (
      <Grid>
        <DataTable rows={this.props.parsed_accounts}>
          <TableHeader name="first_name">First Name</TableHeader>
          <TableHeader name="last_name">Last Name</TableHeader>
          <TableHeader name="personal_id">Personal ID</TableHeader>
          <TableHeader name="organization">Organization</TableHeader>
          <TableHeader name="username">Username</TableHeader>
          <TableHeader name="password">Password</TableHeader>
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