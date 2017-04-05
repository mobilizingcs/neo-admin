import React from 'react';
import { connect } from 'react-redux'

import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui';

import { fetchSummary } from '../actions/summary';

class SummaryComponent extends React.Component {

  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch( fetchSummary( ) );
  }

  render( ) {
    const { summary } = this.props;
    return (
      <div style={{margin:'50px'}}>
        <h3>Ohmage Server Information</h3>
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Parameter</TableHeaderColumn>
              <TableHeaderColumn>Value</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {summary.preferences.map( object => {
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
    );
  }

}

function mapStateToProps(state) {
  const { summary } = state;
  return {
    summary
  }
}

export default connect(mapStateToProps)(SummaryComponent);