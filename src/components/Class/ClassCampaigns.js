import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { IconButton } from 'material-ui';

import {  Row,
          Col } from 'react-flexbox-grid';

import ConfirmDialog from '../utils/ConfirmDialog';

import { TableDataHandler } from '../../utils/material-ui-datatables-helpers';
import { flashNotification } from '../../actions/notification';
import EnhancedDataTable from '../utils/EnhancedDataTable';

import ohmage from '../../utils/ohmage-wrapper';

class ClassCampaigns extends React.Component {

  static propTypes = {
    campaigns: PropTypes.array.isRequired,
    class_urn: PropTypes.string.isRequired,
    onRefreshSignal: PropTypes.func
  };

  static columns = [ {
      key: 'name',
      label: 'Name'
    }, {
      key: 'campaign_urn',
      label: 'URN',
      style: {
        width: '40%'
      }
    }, {
      key: 'running_state',
      label: 'Running State'
    }
  ];

  static searchFunction = function( object ) {
    // 'this' is the search query
    const text = object.name.trim().toLowerCase() + ' ' + object.campaign_urn;
    if( text.indexOf( this ) > -1 ) {
      return true;
    }
    return false;
  };

  constructor( props ) {
    super( props );

    this.data = new TableDataHandler( props.campaigns,
                                      ClassCampaigns.columns,
                                      10,
                                      ClassCampaigns.searchFunction );
    this.confirm_removal_dialog = null;
    this.campaigns_to_remove = [ ];
    this.class_urn = '';
  }

  componentWillReceiveProps( props ) {
    this.data.setDataCopy( props.campaigns );
    this.class_urn = props.class_urn;
  }

  confirmRemovalAction = ( ) => {
    if( this.campaigns_to_remove.length > 0 ) {
      this.confirm_removal_dialog.handleOpen( );
    } else {
      this.props.dispatch( flashNotification( 'Please select a campaign to remove' ) );
    }
  };

  tableSelectRows = ( rows = [ ] ) => {
    if( Array.isArray( rows ) ) {
      this.campaigns_to_remove = rows;
    }
  };

  removeCampaign = ( ) => {
    let campaign_to_remove = this.data.findObjects( this.campaigns_to_remove );
    campaign_to_remove = campaign_to_remove[ 0 ] || false;
    if( !!campaign_to_remove ) {
      // todo: move to ohmage-es6
      ohmage.__call( '/campaign/update', {
          campaign_urn: campaign_to_remove.campaign_urn,
          class_list_remove: this.class_urn
        } )
        .then( success => {
          if( success ) {
            this.props.dispatch( flashNotification( 'Campaign removed from class successfully.' ) );
          } else {
            throw new Error( 'API call failed.' );
          }
        } )
        .catch( error => {
          this.props.dispatch( flashNotification( 'Failed to remove campaign from class.' ) );
          console.error( error );
        } );
    }
  }

  render( ) {
    return (
      <div>
        <Row>
          <Col xs>
            <ConfirmDialog  ref={ instance => this.confirm_removal_dialog = instance }
                            title='Campaign Removal Confirmation'
                            onConfirm={this.removeCampaign}
                            text='Are you sure you want to remove (detach) this campaign?' />
            <EnhancedDataTable  DataHandler={this.data}
                                title='Campaigns in Class'
                                filterHintText='Search existing campaign names'
                                showHeaderToolbar={true}
                                selectable={true}
                                showRowHover={true}
                                showCheckboxes={true}
                                rowSizeList={[]}
                                rowSizeLabel=''
                                onRowSelection={this.tableSelectRows}
                                toolbarIconRight={ [
                                  <IconButton iconClassName='material-icons'
                                              tooltip='Remove Campaign from class'
                                              onTouchTap={this.confirmRemovalAction}>
                                    delete
                                  </IconButton>
                                ] } />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect( )( ClassCampaigns );