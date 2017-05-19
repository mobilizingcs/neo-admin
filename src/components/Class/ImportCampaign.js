import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

import {  DropDownMenu,
          MenuItem,
          RaisedButton } from 'material-ui';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';

import Utils from '../../utils/utils';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ohmage from '../../utils/ohmage-wrapper';
import { flashNotification } from '../../actions/notification';

class ImportCampaign extends React.Component {

  static propTypes = {
    class_urn: PropTypes.string.isRequired,
    name_prefix: PropTypes.string.isRequired,
    onRefreshSignal: PropTypes.func
  };

  // this path is relative to BASENAME in index.js
  static xml_directory = 'static/campaign_xml_files';
  static campaigns = [ 'DiningOut', 'FoodHabits', 'FootSize', 'FreeTime', 'Height', 'Media', 'Nutrition', 'Nutrition_v2', 'OneDayTrash', 'PersonalityColor', 'Snack', 'StressChill', 'TimePerception', 'TimeUse', 'Trash', 'TrashType', 'TrashWarmUp'];

  constructor( props ) {
    super( props );

    // get these from parent component
    this.class_urn = this.props.class_urn;
    this.name_prefix = this.props.name_prefix;

    this.state = {
      form_disabled: false,
      chosenCampaignIndex: -1,
      urn: '',
      name: ''
    };
  }

  componentWillReceiveProps( props ) {
    this.class_urn = props.class_urn;
    this.name_prefix = props.name_prefix;
  }

  updateCampaignChoice = ( event, index, value ) => {
    if( value < 0 ) return;
    this.setState( {
      chosenCampaignIndex: value,
      name: this.name_prefix + ' - ' + ImportCampaign.campaigns[ value ],
      urn: this.class_urn + ':' + Utils.urnify( ImportCampaign.campaigns[ value ] )
    } );
  };

  handleFieldChange = event => {
    this.setState( { [event.target.name]: event.target.value } );
  };

  getXmlFileContents = path => {
    return fetch( path ).then( response => response.text() );
  };

  handleForm = ( ) => {
    this.setState( {
      form_disabled: true
    } );
    const xml_file_path = ImportCampaign.xml_directory
                          + '/' + ImportCampaign.campaigns[ this.state.chosenCampaignIndex ]
                          + '.xml';
    this.getXmlFileContents( xml_file_path )
      .then( xml_string => {
        return ohmage.campaignCreate( 'running',
                                      'shared',
                                      this.class_urn,
                                      xml_string,
                                      { campaign_urn: this.state.urn, campaign_name: this.state.name } )
                .then( success => {
                  if( success ) {
                    this.props.dispatch( flashNotification( 'Campaign created successfully!' ) );
                    if( typeof this.props.onRefreshSignal === 'function' ) {
                      this.props.onRefreshSignal( );
                    }
                  } else {
                    this.props.dispatch( flashNotification( 'API call failed.' ) );
                  }
                } );
      } )
      .catch( error => {
        console.log( error );
      } )
      .then( ( ) => {
        this.setState( {
          form_disabled: false
        } );
      } )
  };

  render( ) {
    return (
      <div>
        <Grid fluid>
          <ValidatorForm ref="form" onSubmit={this.handleForm}>
            <Row middle='xs'>
              <Col xs={3}>
                Campaign XML
              </Col>
              <Col xs={9}>
                <DropDownMenu value={this.state.chosenCampaignIndex}
                              disabled={this.state.form_disabled}
                              onChange={this.updateCampaignChoice}>
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
                <TextValidator  style={{width:'100%'}}
                                floatingLabelText='Campaign URN'
                                name='urn'
                                validators={['required']}
                                onChange={this.handleFieldChange}
                                errorMessages={['This field is required']}
                                disabled={this.state.form_disabled}
                                value={this.state.urn} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <TextValidator  style={{width:'100%'}}
                                floatingLabelText='Campaign Name'
                                name='name'
                                validators={['required']}
                                onChange={this.handleFieldChange}
                                errorMessages={['This field is required']}
                                disabled={this.state.form_disabled}
                                value={this.state.name} />
              </Col>
            </Row>
            <Row end='xs'>
              <Col xs={4}>
                <RaisedButton type='submit'
                              primary={true}
                              disabled={this.state.form_disabled}
                              label='Import' />
              </Col>
            </Row>
          </ValidatorForm>
        </Grid>
      </div>
    );
  }
}

export default connect( )( ImportCampaign );