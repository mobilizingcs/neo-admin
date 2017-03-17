import React from 'react';
import { connect } from 'react-redux';

import {  Grid, Cell, Button } from 'react-mdl';

import { parseCsvFile } from '../actions/teachersetup';


class TeacherSetup extends React.Component {

  constructor( props ) {
    super( props );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleSubmit( event ) {
    event.preventDefault( );
    this.props.dispatch( parseCsvFile( document.getElementById( 'csv_file' ).files[0] ) );
  }

  render( ) {
    return (
      <div>
        <Grid>
          <Cell col={12}>To get started, select the CSV file to import and click the button below</Cell>
          <Cell col={12}>
            <input type="file" id="csv_file" />
          </Cell>
          <Cell col={12}>
            <Button type='button' onClick={this.handleSubmit}>Setup Teacher Accounts</Button>
          </Cell>
        </Grid>
      </div>
      );
  }
}

export default connect()(TeacherSetup);
