import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'material-ui';

import Utils from '../../utils/utils';


// todo: optimize this component

class BetterAutoComplete extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      data: [ ]
    };
    this.data = [];
    this.text_field_ref = null;
    this.search_text = '';
  }

  componentWillReceiveProps( nextProps ) {
    this.data = nextProps.data_source;
  }

  search = Utils.debounce( ( ) => {
    const search_text = this.search_text.trim( ).toLowerCase( );
    if( search_text === '' ) return this.setState( { data: [ ] } );
    const data = this.data.filter( ( object ) => {
      return object.search_field.indexOf( search_text ) > -1;
    } );
    this.setState( {
      data
    } );
  }, 300 );

  onUpdateInput = ( search_text ) => {
    this.search_text = search_text;
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
                            searchText={this.search_text}
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