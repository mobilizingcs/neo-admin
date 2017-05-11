import React from 'react';
import { connect } from 'react-redux';

import {  Paper,
          IconButton } from 'material-ui';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';
import DataTables from 'material-ui-datatables';

import AddClassMembers from './AddClassMembers';

import { TableDataHandler } from '../../utils/material-ui-datatables-helpers';
import { flashNotification } from '../../actions/notification';

import ohmage from '../../utils/ohmage-wrapper';

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

    this.members_selected = [ ];
    this.all_members_selected = false;

    this.class_urn = '';
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
    this.class_urn = props.class_urn;
  }

  deleteMembers = (  ) => {
    // todo: confirm action with modal
    let members_to_delete = [ ];
    if( this.all_members_selected ) {
      members_to_delete = this.data.objects;
    }
    else if( this.members_selected.length > 0 ) {
      members_to_delete = this.data.findObjects( this.members_selected );
    }

    if( members_to_delete.length > 0 ) {
      members_to_delete = members_to_delete.map( member => member.username );
      members_to_delete = members_to_delete.join( ',' );
      ohmage.classUpdate( this.class_urn, {
          user_list_remove: members_to_delete
        } )
        .then( success => {
          if( success ) {
            this.props.dispatch( flashNotification( 'Class members deleted successfully.' ) );
            if( typeof this.props.onRefreshSignal === 'function' ) this.props.onRefreshSignal( );
          } else {
            throw new Error( 'API call failed.' );
          }
        } )
        .catch( ( ) => {
          // todo: handle
        } );
    }
  };

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

  tableSelectRows = ( rows ) => {
    if( rows.length === 1 ) {
      if( typeof rows[ 0 ] === 'string' ) {
        if( rows[ 0 ] === 'none' ) {
          this.all_members_selected = false;
          return;
        } else if( rows[ 0 ] === 'all' ) {
          this.all_members_selected = true;
          return;
        } else {
          // Just one, actual row was selected... proceed normally
        }
      }
    } else if( rows.length === 0 ) {
      return;
    }
    this.members_selected = rows;
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
                    showCheckboxes={true}
                    selectable={true}
                    multiSelectable={true}
                    enableSelectAll={true}
                    columns={this.data.columns}
                    data={this.data.currentPageData}
                    page={this.data.currentPage}
                    count={this.data.totalObjectCount}
                    toolbarIconRight={ [
                      <IconButton iconClassName='material-icons'
                                  tooltip='Delete Members'
                                  onTouchTap={this.deleteMembers}>
                        delete
                      </IconButton>
                    ] }
                    onRowSelection={this.tableSelectRows}
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

export default connect( )( ClassMembers );