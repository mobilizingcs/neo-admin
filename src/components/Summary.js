import React from 'react';
import { connect } from 'react-redux'

import { DataTable, TableHeader } from 'react-mdl';

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
				<DataTable
				    shadow={0}
				    rows={summary.preferences}
				>
				    <TableHeader name="key" tooltip="Name of the parameter">Parameter</TableHeader>
				    <TableHeader name="value" tooltip="Value of the parameter">Value</TableHeader>
				</DataTable>
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