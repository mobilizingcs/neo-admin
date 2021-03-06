class TableDataHandler {
  constructor( data = [ ], columns = [ ], rows_per_page = 10, search_function = ( ) => { }, data_sort_function = ( ) => { } ) {
    // this.data_view is the "current view" for the table
    // this.data_copy is the actual data out of which the "current view" is obtained
    // this.data_view contents should never be modified... instead, return new arrays
    // for pagination/filtering/sorting based on this.data_view / this.data_copy
    this.data_view;
    this.data_copy;
    this.setDataCopy( data );
    this.columns = columns;
    this.rows_per_page = rows_per_page;
    this.data_search_function = search_function;
    this.data_sort_function = data_sort_function;
  }

  setData( data ) {
    if( !data ) throw new Error( 'Unable to set data: ' + data );
    this.data_view = data;
    this.total_pages = this.data_view.length / this.rows_per_page;
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
    return this.data_view.length;
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
    if( this.data_view.length === 0 ) return [ ];

    const page_data_start_index = (this.currentPage - 1) * this.rows_per_page;
    let page_data_end_index = (this.currentPage) * this.rows_per_page;
    if( page_data_end_index >= this.data_view.length ) {
      page_data_end_index = this.data_view.length;
    }
    return this.data_view.slice( page_data_start_index, page_data_end_index );
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

  setSortParameters( column, order ) {
    if( typeof this.data_sort_function === 'function' ) {
      this.setData( this.data_copy.sort( this.data_sort_function.call( null, column, order ) ) );
    }
  }

  findObjects( rows ) {
    const current_page_data = this.currentPageData;
    return current_page_data.filter( ( object, index ) => rows.indexOf( index ) > -1 );
  }

  get objects( ) {
    // return a new deep-copied array instead?
    return this.data_copy;
  }

}


export { TableDataHandler };