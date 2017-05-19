import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {  Popover,
          Menu,
          MenuItem,
          RaisedButton,
          Chip } from 'material-ui';

import {  Row,
          Col } from 'react-flexbox-grid';

import { flashNotification } from '../../actions/notification';

import BetterAutoComplete from '../utils/BetterAutoComplete';

import ohmage from '../../utils/ohmage-wrapper';

class AddClassMembers extends React.Component {

  static propTypes = {
    onRefreshSignal: PropTypes.func,
    class_urn: PropTypes.string.isRequired
  };

  constructor( props ) {
    super( props );
    this.state = {
      all_users: [ ],
      users_to_add_as_members: [ ],
      role: 'restricted',
      search_text: '',
      role_popover_open: false,
      role_popover_anchor_el: null
    };
  }

  filterDataSource = ( search_query, text ) => {
    console.log('called');
    search_query = search_query.trim( ).toLowerCase( );
    text = text.toLowerCase( );
    if( text.indexOf( search_query ) > -1 ) {
      return true;
    }
    return false;
  };

  addUserToNewMembers = ( element, index ) => {
    if( index > -1
        && this.state.users_to_add_as_members.indexOf( element.username ) < 0 ) {
      this.setState( {
        users_to_add_as_members: this.state.users_to_add_as_members.concat( [ this.state.all_users[ index ].username ] )
      } );
    } else {
      this.props.dispatch( flashNotification( 'Member already added.' ) );
    }
  };

  transformUserForAutocomplete = user => {
    if( !!user.personal ) {
      return {
        search_field: (
                        ( user.personal.first_name || '' )
                        + ' ' + ( user.personal.last_name || '' )
                        + ' ' + ( user.username )
                      ).toLowerCase( ),
        label: ( user.personal.first_name || '' )
                + ' ' + ( user.personal.last_name || '' )
                + ' (' + user.username + ')',
        username: user.username
      };
    }
    else {
      return { search_field: user.username, label: user.username, username: user.username };
    }
  };

  populateState = ( ) => {
    ohmage.userSearch( )
          .then( users => {
            let _users = [ ];
            for( let key in users ) {
              _users.push( this.transformUserForAutocomplete( users[ key ] ) );
            }
            this.setState( {
              all_users: _users
            } )
          } );
  };

  openRolePopover = event => {
    event.preventDefault( );
    this.setState( {
      role_popover_open: true,
      role_popover_anchor_el: event.currentTarget
    } );
  };

  closeRolePopover = ( ) => {
    this.setState( {
      role_popover_open: false
    } );
  };

  addNewMembers = role => {
    let user_role_list_add = [ ];

    this.state.users_to_add_as_members.forEach( username => {
      user_role_list_add.push( username + ';' + role );
    } );

    user_role_list_add = user_role_list_add.join( ',' );

    //todo: handle errors & show progress bar & disable elements
    ohmage.classUpdate( this.props.class_urn, {
        user_role_list_add
      } )
      .then( success => {
        if( success ) {
          this.props.dispatch( flashNotification( 'Member(s) added successfully.' ) );
          this.setState( {
            users_to_add_as_members: [ ],
            role_popover_open: false
          } );
          if( typeof this.props.onRefreshSignal === 'function' ) this.props.onRefreshSignal( );
        } else {
          throw new Error( 'API call failed.' );
        }
      } )
      .catch( ( ) => {
        // todo: handle
      } )
  };

  deleteNewMember = ( index ) => {
    this.setState( ( prevState ) => ( {
      users_to_add_as_members: prevState.users_to_add_as_members.filter( ( _ , _index ) => index !== _index  )
    } ) );
  }

  addNewMembersWithRole = role => {
    return ( ) => {
      return this.addNewMembers( role );
    };
  }

  componentDidMount( ) {
    this.populateState( );
  }

  render( ) {
    // this.state.all_users should remove users already present in the class
    // and those in the "toAdd" list
    return (
      <div>
        <h2>Add New Members:</h2>
        <Row style={{marginLeft:'0px'}}>
          <Col xs>
            <Row>
              <Col xs={9}>
                <BetterAutoComplete hint_text="Type a user's name"
                                    onNewRequest={this.addUserToNewMembers}
                                    data_source={this.state.all_users} />
              </Col>
              <Col xs={3}>
                <RaisedButton type='button'
                              onTouchTap={this.openRolePopover}
                              label='Add Members to Class'
                              disabled={this.state.users_to_add_as_members.length === 0}
                              primary={true} />
                <Popover  open={this.state.role_popover_open}
                          anchorEl={this.state.role_popover_anchor_el}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                          targetOrigin={{horizontal: 'left', vertical: 'top'}}
                          onRequestClose={this.closeRolePopover} >
                  <Menu>
                    <MenuItem onTouchTap={this.addNewMembersWithRole( 'restricted' )}
                              primaryText="With restricted role" />
                    <MenuItem onTouchTap={this.addNewMembersWithRole( 'privileged' )}
                              primaryText="With privileged role" />
                  </Menu>
                </Popover>
              </Col>
            </Row>
            <Row>
              {
                this.state.users_to_add_as_members.map( ( username, index ) => {
                  return  (
                    <Chip key={index}
                          onRequestDelete={( ) => this.deleteNewMember( index ) } >
                      {username}
                    </Chip>
                    );
                } )
              }
            </Row>
          </Col>
        </Row>
      </div>
      );
  }
}

export default connect()( AddClassMembers );