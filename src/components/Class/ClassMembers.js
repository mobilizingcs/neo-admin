import React from 'react';

import { Paper } from 'material-ui';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';
import DataTables from 'material-ui-datatables';

import AddClassMembers from './AddClassMembers';


class ClassMembers extends React.Component {
  constructor( props ) {
    super( props );
    this.columns = [ {
        key: 'username',
        label: 'Username'
      }, {
        key: 'role',
        label: 'Role'
      }
    ];
  }

  render( ) {
    return (
      <div>
        <Paper style={{padding: 30, marginLeft: 1}}>
          <Grid fluid>
            <AddClassMembers class_urn={this.props.class_urn} />
            <Row>
              <Col>
                <DataTables
                    selectable={true}
                    showRowHover={true}
                    columns={this.columns}
                    data={this.props.class_members}
                    showCheckboxes={true}
                    onCellClick={this.handleCellClick}
                    onCellDoubleClick={this.handleCellDoubleClick}
                    onFilterValueChange={this.handleFilterValueChange}
                    onSortOrderChange={this.handleSortOrderChange}
                    page={1}
                    multiSelectable={true}
                    count={10}
                  />
              </Col>
            </Row>
          </Grid>
        </Paper>
      </div>
      );
  }
}

export default ClassMembers;