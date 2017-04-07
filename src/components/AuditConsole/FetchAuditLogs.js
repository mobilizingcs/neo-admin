import React from 'react';
import { connect } from 'react-redux';

import {  TextField,
          RaisedButton,
          MenuItem,
          SelectField } from 'material-ui';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';

import { fetchLogs } from '../../actions/auditconsole';

class FetchAuditLogs extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      form: {
        uri: '',
        client_value: '',
        device_id: '',
        request_result: null,
        from_date: '',
        to_date: ''
      }
    };

    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleTextChange = this.handleTextChange.bind( this );
    this.handleSelectChange = this.handleSelectChange.bind( this );
  }

  handleSubmit( event ) {
    event.preventDefault( );
    this.props.dispatch( fetchLogs( this.state.form ) );
  }

  handleFetchButton(  ) {
  }

  handleSelectChange( event, index, value ) {
    this.setState({
      form: {
        ...this.state.form,
        request_result: value
      }
    });
  }

  handleTextChange( event ) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  }

  render( ) {
    return (
      <Grid fluid>
        <form onSubmit={this.handleSubmit}>
          <Row around="xs">
            <Col>
              <TextField onChange={this.handleTextChange} name="uri" floatingLabelText="URI" />
            </Col>
            <Col>
              <TextField onChange={this.handleTextChange} name="client_value" floatingLabelText="Client" />
            </Col>
          </Row>
          <Row around="xs">
            <Col>
              <TextField onChange={this.handleTextChange} name="device_id" floatingLabelText="Device ID" />
            </Col>
            <Col>
              <SelectField
                floatingLabelText="Request Result"
                value={this.state.form.request_result}
                onChange={this.handleSelectChange} >
                <MenuItem value={null} primaryText="" />
                <MenuItem value={'success'} primaryText="Success" />
                <MenuItem value={'failure'} primaryText="Failure" />
              </SelectField>
            </Col>
          </Row>
          <Row around="xs">
            <Col>
              <TextField onChange={this.handleTextChange} name="from_date" floatingLabelText="From (Date)" />
            </Col>
            <Col>
              <TextField onChange={this.handleTextChange} name="to_date" floatingLabelText="To (Date)" />
            </Col>
          </Row>
          <Row end="xs">
            <Col>
              <RaisedButton type='submit' primary={true} label='Fetch' />
            </Col>
          </Row>
        </form>
      </Grid>
    );
  }

}

function mapStateToProps(state) {
  const { auditconsole } = state;
  return {
    auditconsole
  }
}

export default connect(mapStateToProps)(FetchAuditLogs);