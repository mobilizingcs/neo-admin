import React from 'react';

import { Divider, Paper } from 'material-ui';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';

import ClassMembers from './ClassMembers';
import AddClassMembers from './AddClassMembers';
import ClassMeta from './ClassMeta';

import ohmage from '../../utils/ohmage-wrapper';

// this component is named ClassComponent to prevent name-clashing with the JS
// keyword class
class ClassComponent extends React.Component {

  constructor( props ) {
    super( props );
    // todo: verify this input is sanitized for xss
    this.class_urn_param = this.props.match.params.urn;

    this.state = {
      urn: this.class_urn_param,
      name: '',
      description: '',
      associated_campaigns: [ ],
      class_members: [ ]
    }
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
  };

  componentDidMount( ) {
    this.populateState( );
  }

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
            <Row>
              <Col xs>
                <h1>Campaigns</h1>
              </Col>
            </Row>
            <Row>
              <Col xs style={{marginLeft:'22px'}}>
                <h2>Import new campaigns</h2>
              </Col>
            </Row>
            <Row>
              <Col xs style={{marginLeft:'22px'}}>
                <h2>Attach existing campaigns</h2>
              </Col>
            </Row>
            <h2>Campaigns</h2>
          </Grid>
        </Paper>
      </div>
      );
  }
}

export default ClassComponent;