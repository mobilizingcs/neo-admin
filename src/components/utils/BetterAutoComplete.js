import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'material-ui';

import utils from '../../utils/utils';

class BetterAutoComplete extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      data: [ ],
      search_text: ''
    };
    this.data = [];
    this.text_field_ref = null;
  }

  componentWillReceiveProps( nextProps ) {
    this.data = nextProps.data_source;
  }

  search = utils.debounce( ( ) => {
    const search_text = this.state.search_text.trim( ).toLowerCase( );
    if( search_text === '' ) return this.setState( { data: [ ] } );
    const data = this.data.filter( ( object ) => {
      return object.search_field.indexOf( search_text ) > -1;
    } );
    this.setState( {
      data
    } );
  }, 300 );

  onUpdateInput = ( search_text ) => {
    this.setState( {
      search_text
    } );
    this.search( );
  };

  onNewRequest = ( ...args ) => {
    this.onUpdateInput( '' );
    this.props.onNewRequest( ...args );
  }

  render( ) {

    return ( <AutoComplete  style={{width:'100%'}}
                            textFieldStyle={{width:'100%'}}
                            hintText={this.props.hint_text}
                            filter={( ) => true}
                            dataSource={this.state.data}
                            onUpdateInput={this.onUpdateInput}
                            searchText={this.state.search_text}
                            onNewRequest={this.onNewRequest}
                            dataSourceConfig={{text: 'label',value:'username'}} />
      );
  }
}

BetterAutoComplete.propTypes = {
  hint_text: PropTypes.string,
  onNewRequest: PropTypes.func,
  data_source: PropTypes.array
};

export default BetterAutoComplete;