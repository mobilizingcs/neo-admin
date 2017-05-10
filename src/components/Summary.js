import React from 'react';
import { connect } from 'react-redux'

import {  RaisedButton,
          Table,
          TableHeader,
          TableRow,
          TableHeaderColumn,
          TableBody,
          TableRowColumn,
          Paper } from 'material-ui';

import { fetchSummary } from '../actions/summary';

class Summary extends React.Component {

  constructor( props ) {
    super( props );
    this.updateSummary = this.updateSummary.bind( this );
  }

  updateSummary( ) {
    this.props.dispatch( fetchSummary( ) );
  }

  componentDidMount() {
    if( this.props.summary.preferences.length === 0 ) {
      this.updateSummary( );
    }
  }

  render( ) {
    return (
     <Paper style={{padding: 30, marginLeft: 1}}>
      <div style={{margin:'50px'}}>
        <h3>Ohmage Server Information</h3>
        <RaisedButton label='Refresh' primary={true} type='button'
        onClick={this.updateSummary} />
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Parameter</TableHeaderColumn>
              <TableHeaderColumn>Value</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.summary.preferences.map( object => {
              return (
                <TableRow key={object.key}>
                  <TableRowColumn>{object.key}</TableRowColumn>
                  <TableRowColumn>{object.value}</TableRowColumn>
                </TableRow>
              );
            } )}
          </TableBody>
        </Table>
      </div>
    </Paper>
    );
  }

}

function mapStateToProps(state) {
  const { summary } = state;
  return {
    summary
  };
}

export default connect( mapStateToProps )( Summary );