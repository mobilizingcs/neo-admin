import React from 'react';

import {  RaisedButton,
          Divider,
          TextField,
          Paper } from 'material-ui';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import ClassMembers from './ClassMembers';
import AddClassMembers from './AddClassMembers';

import ohmage from '../../utils/ohmage-wrapper';

// this component is named ClassComponent to prevent name-clashing with the JS
// keyword class
class ClassComponent extends React.Component {

  constructor( props ) {
    super( props );
    // todo: verify this input is sanitized for xss
    this.class_urn_param = this.props.match.params.urn;

    this.state = {
      urn: this.class_urn,
      name: 'This is the class name',
      description: 'This is some sample description',
      associated_campaigns: [ ],
      class_members: [ ]
    }
  }

  populateState = ( class_urn = this.class_urn_param ) => {
    // todo: move to ohmage-es6
    ohmage.__call( '/class/read', { class_urn_list: [ class_urn ], with_user_list: true } )
          .then( response => {
            // move this logic to ohmage-es6
            let classes = [ ];
            for( let each_class in response ) {
              let user_list = [ ];

              const users = response[ each_class ].users;
              for( let username in users ) {
                const user = { };
                user.role = users[ username ];
                user.username = username;
                user_list.push( user );
              }

              response[ each_class ].class_urn = each_class;
              response[ each_class ].users = user_list;
              classes.push( response[ each_class ] );
            }
            return classes;
          } )
          .then( classes => {
            this.setState( {
              urn: classes[ 0 ].class_urn,
              name: classes[ 0 ].name,
              description: !!classes[ 0 ].description ? classes[ 0 ].description : '',
              class_members: classes[ 0 ].users
            } )
          } )
  };

  componentDidMount( ) {
    this.populateState( );
  }

  handleUpdateForm = ( ) => {

  };

  render( ) {
    return (
      <div>
        <Paper style={{padding: 30, marginLeft: 1}}>
          <Grid fluid>
            <Row>
              <Col xs>
                <h1>Class Meta Data</h1>
              </Col>
            </Row>
            <ValidatorForm ref="form" onSubmit={this.handleUpdateForm}>
              <Row>
                <Col xs>
                  <TextField style={{width:'100%'}}
                      disabled={true}
                      value={this.state.urn}
                      floatingLabelText="Class URN"
                    />
                </Col>
              </Row>
              <Row>
                <Col xs>
                  <TextValidator style={{width:'100%'}}  floatingLabelText="Class Name"
                                  onChange={this.handleChange}
                                  name="name"
                                  value={this.state.name}
                                  validators={['required']}
                                  errorMessages={['this field is required']} />
                </Col>
              </Row>
              <Row>
                <Col xs>
                  <TextValidator style={{width:'100%'}}  floatingLabelText="Class Description"
                                  onChange={this.handleChange}
                                  name="description"
                                  value={this.state.description}
                                  multiLine={true}
                                  rows={3} />
                </Col>
              </Row>
              <Row>
                <Col xs>
                  <RaisedButton label="Update" primary={true} type="submit" />
                </Col>
              </Row>
            </ValidatorForm>
          </Grid>
        </Paper>
        <Divider />
        <Paper style={{padding: 30, marginLeft: 1}}>
          <Grid fluid>
            <Row>
              <Col xs>
                <h1>Class Members</h1>
              </Col>
            </Row>
            <Row>
              <Col xs style={{marginLeft:'22px'}}>
                <AddClassMembers class_urn={this.state.urn} />
              </Col>
            </Row>
            <ClassMembers class_urn={this.state.urn}
                          class_members={this.state.class_members}
                          onRefreshSignal={this.populateState} />
          </Grid>
        </Paper>
      </div>
      );
  }
}

export default ClassComponent;