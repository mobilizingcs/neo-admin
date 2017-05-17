import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { RaisedButton, TextField } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import ohmage from '../../utils/ohmage-wrapper';
import { flashNotification } from '../../actions/notification';

class ClassMeta extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urn: PropTypes.string.isRequired
  };

  constructor( props ) {
    super( props );

    this.state = {
      urn: '',
      name: '',
      description: '',
      form_disabled: true
    };
  }

  componentWillReceiveProps( props ) {
    const { urn, name, description } = props;
    this.setState( {
      urn,
      name,
      description,
      form_disabled: false
    } );
  }

  handleChange = event => {
    this.setState( { [event.target.name]: event.target.value } );
  };

  handleUpdateForm = ( ) => {
    this.setState( {
      form_disabled: true
    } );
    ohmage.classUpdate( this.props.urn, {
        class_name: this.state.name,
        description: this.state.description
      } )
      .then( success => {
        if( success ) {
          this.props.dispatch( flashNotification( 'Class updated successfully.' ) );
        } else {
          throw new Error( 'API call failed.' );
        }
      } )
      .catch( ( ) => {
        this.props.dispatch( flashNotification( 'Failed to update class.' ) );
      } )
      .then( ( ) => {
        this.setState( {
          form_disabled: false
        } );
      } );
  };

  render( ) {
    return (
      <div>
        <Row>
          <Col xs>
            <h1>Meta Data</h1>
          </Col>
        </Row>
        <ValidatorForm ref="form" onSubmit={this.handleUpdateForm}>
          <Row>
            <Col xs>
              <TextField  style={{width:'100%'}}
                          disabled={true}
                          value={this.state.urn}
                          floatingLabelText="Class URN" />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <TextValidator  style={{width:'100%'}}
                              floatingLabelText="Class Name"
                              onChange={this.handleChange}
                              name="name"
                              value={this.state.name}
                              validators={['required']}
                              disabled={this.state.form_disabled}
                              errorMessages={['this field is required']} />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <TextValidator  style={{width:'100%'}}
                              floatingLabelText="Class Description"
                              onChange={this.handleChange}
                              name="description"
                              value={this.state.description}
                              multiLine={true}
                              disabled={this.state.form_disabled}
                              rows={3} />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <RaisedButton disabled={this.state.form_disabled}
                            label="Update"
                            primary={true}
                            type="submit" />
            </Col>
          </Row>
        </ValidatorForm>
      </div>
    );
  }
}

export default connect( )( ClassMeta );