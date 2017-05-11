import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import DataTables from 'material-ui-datatables';
import { IconButton } from 'material-ui';
import { AvReplay } from 'material-ui/svg-icons';

import { fetchClasses } from '../../actions/classes';

class Classes extends React.Component {

  constructor( props ) {
    super( props );
    this.classes_table_columns = [ {
        key: 'class_urn',
        label: 'URN'
      }, {
        key: 'name',
        label: 'Name'
      }, {
        key: 'user_list_length',
        label: 'Number of Users',
        sortable: true
      }, {
        key: 'campaign_list_length',
        label: 'Number of Campaigns',
        sortable: true
      }
    ];
    this.sort_functions = {
      sort_asc_users: ( a, b ) => a.user_list_length - b.user_list_length,
      sort_desc_users: ( a, b ) => b.user_list_length - a.user_list_length,
      sort_asc_campaigns: ( a, b ) => a.campaign_list_length - b.campaign_list_length,
      sort_desc_campaigns: ( a, b ) => b.campaign_list_length - a.campaign_list_length
    };
    this.state = {
      sort_function: null,
      search_query: '',
      re_render_table: 0
    };
  }

  handleRefreshClick = ( ) => {
    // re_render_table is used to re-render the child component to clear off
    // the filter & search values since

    // todo: handle with prevState
    this.setState( {
      sort_function: null,
      search_query: '',
      re_render_table: this.state.re_render_table + 1
    } );
    this.props.dispatch( fetchClasses( ) );
  };

  handleSortOrderChange = ( column, order ) => {
    let sort_function;
    if( column === 'user_list_length' ) {
      sort_function = order === 'asc' ? 'sort_asc_users' : 'sort_desc_users';
    } else if( column === 'campaign_list_length' ) {
      sort_function = order === 'asc' ? 'sort_asc_campaigns' : 'sort_desc_campaigns';
    }
    this.setState( {
      sort_function: sort_function
    } );
  };

  searchFunction = ( object ) => {
    if( object.class_urn.indexOf( this.state.search_query ) > -1 ) {
      return true;
    }
    if( object.name.toLowerCase( ).indexOf( this.state.search_query ) > -1 ) {
      return true;
    }
    return false;
  };

  handleFilterValueChange = ( search_query ) => {
    this.setState( {
      search_query: search_query
    } );
  }

  handleCellClick = ( row, column, object ) => {
    this.props.history.push( '/class/' + object.class_urn );
  }

  componentDidMount( ) {
    this.props.dispatch( fetchClasses( ) );
  }

  render( ) {
    let classes = this.props.class_list.list;
    if( this.state.search_query.trim( ) !== '' ) {
      classes = classes.filter( this.searchFunction );
    }
    return (
      <div>
         <DataTables key={this.state.re_render_table} height={'auto'}
                      selectable={false}
                      showRowHover={true}
                      columns={this.classes_table_columns}
                      data={classes}
                      showCheckboxes={false}
                      showHeaderToolbar={true}
                      title='Classes'
                      onCellClick={this.handleCellClick}
                      onCellDoubleClick={this.handleCellClick}
                      onFilterValueChange={this.handleFilterValueChange}
                      onSortOrderChange={this.handleSortOrderChange}
                      page={1}
                      toolbarIconRight={[
                        <IconButton
                          onClick={this.handleRefreshClick}
                        >
                          <AvReplay />
                        </IconButton>
                      ]}
                      count={classes.length} />
      </div>
    );
  }

}

function mapStateToProps( state ) {
  const { classes } = state;

  function preProcessClasses( _classes ) {
    let classes = [ ].concat( _classes );
    if( !classes || classes.length === 0 ) return [ ];
    for(let each_class in classes) {
      classes[ each_class ].user_list_length = classes[ each_class ].usernames.length;
      classes[ each_class ].campaign_list_length = classes[ each_class ].campaigns.length;
    }
    return classes;
  }

  classes.class_list.list = preProcessClasses( classes.class_list.list );
  return {
    class_list: classes.class_list
  }
}

export default withRouter( connect( mapStateToProps )( Classes ) );