import React from 'react';

import { Paper } from 'material-ui';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';
import DataTables from 'material-ui-datatables';

import AddClassMembers from './AddClassMembers';

import { TableDataHandler } from '../../utils/material-ui-datatables-helpers';


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
    this.data = new TableDataHandler( props.class_members,
                                      this.columns,
                                      10,
                                      function( object ) {
                                        // this is the search query
                                        if( object.username.indexOf( this ) > -1 ) {
                                          return true;
                                        }
                                        return false;
                                      } );
  }

  componentWillReceiveProps( props ) {
    this.data.setDataCopy( props.class_members );
  }

  tableSearch = ( search_query ) => {
    this.data.searchQuery = search_query;
    this.forceUpdate( );
  };

  tableNextPage = ( ) => {
    this.data.currentPage++;
    this.forceUpdate( );
  };

  tablePreviousPage = ( ) => {
    this.data.currentPage--;
    this.forceUpdate( );
  };

  render( ) {
    return (
      <div>
        <Paper style={{padding: 30, marginLeft: 1}}>
          <Grid fluid>
            <Row>
              <Col xs>
                <h1>Class Members</h1>
              </Col>
            </Row>
            <Row>
              <Col xs style={{marginLeft:'22px'}}>
                <AddClassMembers class_urn={this.props.class_urn} />
              </Col>
            </Row>
            <Row>
              <Col xs>
                <DataTables
                    showHeaderToolbar={true}
                    title='Current Class Members'
                    filterHintText='Search existing members'
                    selectable={true}
                    showRowHover={true}
                    columns={this.data.columns}
                    data={this.data.currentPageData}
                    showCheckboxes={true}
                    page={this.data.currentPage}
                    multiSelectable={true}
                    count={this.data.totalObjectCount}
                    onNextPageClick={this.tableNextPage}
                    onPreviousPageClick={this.tablePreviousPage}
                    onFilterValueChange={this.tableSearch}
                    rowSizeList={[]}
                    rowSizeLabel=''
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