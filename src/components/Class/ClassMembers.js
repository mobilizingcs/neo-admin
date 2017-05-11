import React from 'react';
import { connect } from 'react-redux';

import {  Paper,
          IconButton,
          Dialog } from 'material-ui';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';
import DataTables from 'material-ui-datatables';

import ConfirmDialog from '../utils/ConfirmDialog';

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
                                        // 'this' is the search query
                                        if( object.username.indexOf( this ) > -1 ) {
                                          return true;
                                        }
                                        return false;
                                      } );
    this.state = {
      confirm_dialog: false
    };
  }

  componentWillReceiveProps( props ) {
    this.data.setDataCopy( props.class_members );
    this.class_urn = props.class_urn;
  }

  deleteMembers = ( ) => {
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
            throw new Error( 'API call failed: success != true' );
          }
        } )
        .catch( error => {
          this.props.dispatch( flashNotification( 'Failed to delete the class members.' ) );
          console.error( error );
        } );
    }
  };

  confirmDeleteAction = (  ) => {
    if( this.members_selected.length > 0 || this.all_members_selected ) {
      this.confirm_dialog.handleOpen( );
    } else {
      this.props.dispatch( flashNotification( 'Please select members to delete.' ) );
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

  tableSelectRows = ( rows = [ ] ) => {
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
        <Row>
          <Col xs>
            <ConfirmDialog  ref={ instance => this.confirm_dialog = instance }
                            title='Confirmation'
                            onConfirm={this.deleteMembers}
                            text='Are you sure you want to delete the members?' />
            <DataTables showHeaderToolbar={true}
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
                                      onTouchTap={this.confirmDeleteAction}>
                            delete
                          </IconButton>
                        ] }
                        onRowSelection={this.tableSelectRows}
                        onNextPageClick={this.tableNextPage}
                        onPreviousPageClick={this.tablePreviousPage}
                        onFilterValueChange={this.tableSearch}
                        rowSizeList={[]}
                        rowSizeLabel='' />
          </Col>
        </Row>
      );
  }
}

export default connect( )( ClassMembers );