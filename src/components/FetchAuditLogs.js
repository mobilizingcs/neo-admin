import React from 'react';
import { connect } from 'react-redux';

import { Textfield, Button } from 'react-mdl';

import { fetchLogs } from '../actions/auditconsole';

class FetchAuditLogs extends React.Component {

	constructor( props ) {
		super( props );
    this.state = { 
      form: {
        uri: '/app/',
        client_value: '',
        device_id: '',
        request_result: '',
        from_date: '',
        to_date: ''        
      }
    };

    this.handleSubmit = this.handleSubmit.bind( this ); 
    this.handleChange = this.handleChange.bind( this );
	}

  handleSubmit( event ) {
    event.preventDefault( );
    const { dispatch } = this.props;    
    dispatch( fetchLogs( this.state.form ) );
  }

  handleFetchButton( ) {
    
  }

  handleChange( event ) {    
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
		  <form onSubmit={this.handleSubmit}>
			  <Textfield onChange={this.handleChange} name="uri" label="URI" />
        <Textfield onChange={this.handleChange} name="client_value" label="Client" />
        <Textfield onChange={this.handleChange} name="device_id" label="Device ID" />
        <label>Request Result: </label>
        <select value={this.state.request_result} onChange={this.handleChange} name="request_result">
          <option value="">any</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
        <Textfield onChange={this.handleChange} name="from_date" label="From (Date)" />
        <Textfield onChange={this.handleChange} name="to_date" label="To (Date)" />   
        <Button type='submit'>Fetch</Button>
			</form>
       
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