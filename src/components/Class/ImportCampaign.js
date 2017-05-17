import React from 'react';
import {  DropDownMenu,
          MenuItem,
          TextField } from 'material-ui';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';

import Utils from '../../utils/utils';

class ImportCampaign extends React.Component {

  static xml_directory = 'static/campaign_xml_files/';
  static campaigns = [ 'DiningOut', 'FoodHabits', 'FootSize', 'FreeTime', 'Height', 'Media', 'Nutrition', 'Nutrition_v2', 'OneDayTrash', 'PersonalityColor', 'Snack', 'StressChill', 'TimePerception', 'TimeUse', 'Trash', 'TrashType', 'TrashWarmUp'];

  constructor( props ) {
    super( props );

    // get these from parent component
    this.urn_prefix = '';
    this.name_prefix = ''
    this.state = {
      chosenCampaignIndex: -1,
      urn: '',
      name: ''
    };
  }

  handleChange = ( event, index, value ) => {
    this.setState( {
      chosenCampaignIndex: value,
      name: this.name_prefix + ' - ' + ImportCampaign.campaigns[ value ],
      urn: this.urn_prefix + ':' + Utils.urnify( ImportCampaign.campaigns[ value ] )
    } );
  };

  render( ) {
    return (
      <div>
        <Grid fluid>
          <Row middle='xs'>
            <Col xs={3}>
              Campaign XML
            </Col>
            <Col xs={9}>
              <DropDownMenu value={this.state.chosenCampaignIndex} onChange={this.handleChange}>
                <MenuItem key={-1} value={-1} primaryText='Choose a campaign' />
                {
                  ImportCampaign.campaigns.map( ( campaign, index ) => {
                    return (<MenuItem key={index} value={index} primaryText={campaign} />);
                  } )
                }
              </DropDownMenu>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField style={{width:'100%'}} floatingLabelText='Campaign URN' value={this.state.urn} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField style={{width:'100%'}} floatingLabelText='Campaign Name' value={this.state.name} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ImportCampaign;