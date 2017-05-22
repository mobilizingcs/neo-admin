import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { IconButton } from 'material-ui';
import { AvReplay } from 'material-ui/svg-icons';

import { fetchClasses } from '../../actions/classes';

import { TableDataHandler } from '../../utils/material-ui-datatables-helpers';
import EnhancedDataTable from '../utils/EnhancedDataTable';

class Classes extends React.Component {

  static columns = [ {
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

  static sort_functions = {
    sort_asc_users: ( a, b ) => a.user_list_length - b.user_list_length,
    sort_desc_users: ( a, b ) => b.user_list_length - a.user_list_length,
    sort_asc_campaigns: ( a, b ) => a.campaign_list_length - b.campaign_list_length,
    sort_desc_campaigns: ( a, b ) => b.campaign_list_length - a.campaign_list_length
  };

  static sortFunction = function( column, order ) {
    let sort_function = '';
    if( column === 'user_list_length' ) {
      sort_function = order === 'asc' ? 'sort_asc_users' : 'sort_desc_users';
    } else if( column === 'campaign_list_length' ) {
      sort_function = order === 'asc' ? 'sort_asc_campaigns' : 'sort_desc_campaigns';
    }
    if( sort_function !== '' ) {
      return Classes.sort_functions[ sort_function ];
    } else {
      return ( ) => { };
    }
  };

  static searchFunction = function( object ) {
    if( object.class_urn.indexOf( this ) > -1 ) {
      return true;
    }
    if( object.name.toLowerCase( ).indexOf( this ) > -1 ) {
      return true;
    }
    return false;
  };

  constructor( props ) {
    super( props );
    this.data = new TableDataHandler( props.class_list.list,
                                      Classes.columns,
                                      10,
                                      Classes.searchFunction,
                                      Classes.sortFunction );
    this.state = {
      sort_function: null,
      re_render_table: 0
    };
  }

  handleRefreshClick = ( ) => {
    // re_render_table is used to re-render the child component to clear off
    // the filter & search values since
    this.setState( prevState => ( {
      sort_function: null,
      re_render_table: prevState.re_render_table + 1
    } ) );
    this.props.dispatch( fetchClasses( ) );
  };

  handleCellClick = ( row, column, object ) => {
    this.props.history.push( '/class/' + object.class_urn );
  };

  componentDidMount( ) {
    this.props.dispatch( fetchClasses( ) );
  }

  componentWillReceiveProps( props ) {
    let classes = props.class_list.list;
    this.data.setDataCopy( classes );
  }

  render( ) {
    return (
      <div>
         <EnhancedDataTable key={this.state.re_render_table}
                            DataHandler={this.data}
                            height={'auto'}
                            selectable={false}
                            showRowHover={true}
                            showCheckboxes={false}
                            showHeaderToolbar={true}
                            title='Classes'
                            onCellClick={this.handleCellClick}
                            onCellDoubleClick={this.handleCellClick}
                            toolbarIconRight={[
                              <IconButton
                                onClick={this.handleRefreshClick}
                              >
                                <AvReplay />
                              </IconButton>
                            ]} />
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