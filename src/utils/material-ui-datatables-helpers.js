class TableDataHandler {
  constructor( data = [ ], columns = [ ], rows_per_page = 10, search_function ) {
    // todo: refactor this.data as this.data_view?
    // this.data is the "current view" for the table
    // this.data_copy is the actual data out of which the "current view" is obtained
    // this.data contents should never be modified... instead, return new arrays
    // for pagination/filtering/sorting based on this.data
    this.data;
    this.data_copy;
    this.setDataCopy( data );
    this.columns = columns;
    this.rows_per_page = rows_per_page;
    this.data_search_function = search_function;
  }

  setData( data ) {
    if( !data ) throw new Error( 'Unable to set data: ' + data );
    this.data = data;
    this.total_pages = this.data.length / this.rows_per_page;
    this.current_page = 1;
    this.search_query = '';
  }

  setDataCopy( data ) {
    // We make a copy of the original data received to reset the data if
    // filters are cleared out
    this.data_copy = JSON.parse( JSON.stringify( data ) );
    this.setData( this.data_copy );
  }

  get totalObjectCount( ) {
    return this.data.length;
  }

  set currentPage( value ) {
    if( value < 1 || value > ( this.total_pages + 1 ) ) {
      throw new Error( 'Page out of range of data' );
    }
    this.current_page = value;
  }
  get currentPage( ) {
    return this.current_page;
  }

  get currentPageData( ) {
    if( this.data.length === 0 ) return [ ];

    const page_data_start_index = (this.currentPage - 1) * this.rows_per_page;
    let page_data_end_index = (this.currentPage) * this.rows_per_page;
    if( page_data_end_index >= this.data.length ) {
      page_data_end_index = this.data.length - 1;
    }
    return this.data.slice( page_data_start_index, page_data_end_index );
  }

  set searchQuery( value ) {
    this.search_query = value.trim( ).toLowerCase( );
    if( this.search_query.length > 0 ) {
      // always search on the original data
      this.setData( this.data_copy.filter( this.data_search_function, this.search_query ) );
    } else {
      this.setData( this.data_copy );
    }
  }

}


export { TableDataHandler };