import React from 'react';
import DataTables from 'material-ui-datatables';
import PropTypes from 'prop-types';
import { TableDataHandler } from '../../utils/material-ui-datatables-helpers';

class EnhancedDataTable extends React.Component {

  static propTypes = {
    DataHandler: PropTypes.instanceOf( TableDataHandler ).isRequired
  };

  constructor( props ) {
    super( props );
    this.DataHandler = this.props.DataHandler;
  }

  tableSearch = ( search_query ) => {
    this.DataHandler.searchQuery = search_query;
    this.forceUpdate( );
  };

  tableNextPage = ( ) => {
    this.DataHandler.currentPage++;
    this.forceUpdate( );
  };

  tablePreviousPage = ( ) => {
    this.DataHandler.currentPage--;
    this.forceUpdate( );
  };

  tableSortOrderChange = ( column, order ) => {
    this.DataHandler.setSortParameters( column, order );
    this.forceUpdate( );
  };

  render( ) {
    return (
      <div>
        {<DataTables  {...this.props}
                      columns={this.DataHandler.columns}
                      data={this.DataHandler.currentPageData}
                      page={this.DataHandler.currentPage}
                      count={this.DataHandler.totalObjectCount}
                      onNextPageClick={this.tableNextPage}
                      onPreviousPageClick={this.tablePreviousPage}
                      onFilterValueChange={this.tableSearch}
                      onSortOrderChange={this.tableSortOrderChange} />}
      </div>
    );
  }
}

export default EnhancedDataTable;