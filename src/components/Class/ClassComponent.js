import React from 'react';

import { Divider, Paper } from 'material-ui';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';

import ClassMembers from './ClassMembers';
import AddClassMembers from './AddClassMembers';
import ClassMeta from './ClassMeta';
import ClassCampaigns from './ClassCampaigns';
import ImportCampaign from './ImportCampaign';

import ButtonedDialog from '../utils/ButtonedDialog';

import ohmage from '../../utils/ohmage-wrapper';

// this component is named ClassComponent to prevent name-clashing with the JS
// keyword class
class ClassComponent extends React.Component {

  constructor( props ) {
    super( props );
    // todo: verify this input is sanitized for xss
    this.class_urn_param = this.props.match.params.urn;

    this.state = {
      urn: '',
      name: '',
      description: '',
      associated_campaigns: [ ],
      class_members: [ ]
    };

    this.import_campaign_dialog = null;
  }

  populateState = ( class_urn = this.class_urn_param ) => {
    ohmage.classRead( [ class_urn ], { with_user_list: true } )
          .then( classes => {
            this.setState( {
              urn: classes[ 0 ].class_urn,
              name: classes[ 0 ].name,
              description: !!classes[ 0 ].description ? classes[ 0 ].description : '',
              class_members: classes[ 0 ].users
            } )
          } )
          .catch( error => {
            console.error( error );
          } )
          .then( ( ) => {
            // todo: move to ohmage-es6
            return ohmage.__call( '/campaign/read', { output_format: 'short', class_urn_list: [ class_urn ] } )
                    .then( response => {
                      let campaigns = [ ];
                      for( let each_campaign in response ) {
                        response[ each_campaign ].campaign_urn = each_campaign;
                        campaigns.push( response[ each_campaign ] );
                      }
                      return campaigns;
                    } );
          } )
          .then( response => {
            this.setState( {
              associated_campaigns: response
            } );
          } )
  };

  componentDidMount( ) {
    this.populateState( );
  }

  importCampaignRefreshSignal = ( ) => {
    this.populateState( );
    if( this.import_campaign_dialog ) {
      this.import_campaign_dialog.handleCloseDialog( );
    }
  };

  render( ) {
    return (
      <div>
        <Paper style={{padding: 30, marginLeft: 1}}>
          <Grid fluid>
            <ClassMeta  urn={this.state.urn}
                        name={this.state.name}
                        description={this.state.description} />
          </Grid>
        </Paper>
        <Divider />
        <Paper style={{padding: 30, marginLeft: 1}}>
          <Grid fluid>
            <Row>
              <Col xs>
                <h1>Members</h1>
              </Col>
            </Row>
            <Row>
              <Col xs style={{marginLeft:'22px'}}>
                <AddClassMembers  onRefreshSignal={this.populateState}
                                  class_urn={this.state.urn} />
              </Col>
            </Row>
            <ClassMembers class_urn={this.state.urn}
                          class_members={this.state.class_members}
                          onRefreshSignal={this.populateState} />
          </Grid>
        </Paper>
        <Divider />
        <Paper style={{padding: 30, marginLeft: 1}}>
          <Grid fluid>
            <Row around='xs' middle='xs'>
              <Col xs={9}>
                <h1>Campaigns</h1>
              </Col>
              <Col xs={3} style={{textAlign:'right'}}>
                <ButtonedDialog button_label='Import New Campaign'
                                dialog_title='Import New Campaign'
                                ref={ instance => this.import_campaign_dialog = instance }>
                  <ImportCampaign class_urn={this.state.urn}
                                  name_prefix={this.state.name}
                                  onRefreshSignal={this.importCampaignRefreshSignal}/>
                </ButtonedDialog>
              </Col>
            </Row>
            <ClassCampaigns campaigns={this.state.associated_campaigns}
                            class_urn={this.state.urn} />
          </Grid>
        </Paper>
      </div>
      );
  }
}

export default ClassComponent;