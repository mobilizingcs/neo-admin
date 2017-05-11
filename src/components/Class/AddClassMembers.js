import React from 'react';

import { connect } from 'react-redux';

import {  AutoComplete,
          Popover,
          Menu,
          MenuItem,
          RaisedButton,
          Chip } from 'material-ui';

import {  Row,
          Col } from 'react-flexbox-grid';

import { flashNotification } from '../../actions/notification';

import ohmage from '../../utils/ohmage-wrapper';

class AddClassMembers extends React.Component {

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
        search_text: '',
        users_to_add_as_members: this.state.users_to_add_as_members.concat( [ this.state.all_users[ index ].username ] )
      } );
    } else {
      this.props.dispatch( flashNotification( 'Member already added.' ) );
      this.setState( {
        search_text: ''
      } );
    }
  };

  updateSearchText = searchText => {
    this.setState( {
      search_text: searchText
    } );
  };

  transformUserForAutocomplete = user => {
    if( !!user.personal ) {
      return {
        label: (user.personal.first_name || '' )
                + ' ' + (user.personal.last_name || '')
                + ' (' + user.username + ')',
        username: user.username
      };
    }
    else {
      return { label: user.username, username: user.username };
    }
  };

  populateState = ( ) => {
    // todo: move to ohmage-es6
    ohmage.__call( '/user/search', { } )
          .then( response => {
            // move this logic to ohmage-es6
            let users = [ ];
            for( let user in response ) {
              response.username = user;
              users.push( response[ user ] );
            }
            return users;
          } )
          .then( users => {
            let _users = [ ];
            for( let key in users ) {
              _users.push( this.transformUserForAutocomplete( users[ key ] ) );
            }
            this.setState( {
              all_users: _users
            } )
          } )
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
        } else {
          throw new Error( 'API call failed.' );
        }
      } )
      .catch( ( ) => {
        // todo: handle
      } )
  };

  addNewMembersWithRole = role => {
    return ( ) => {
      return this.addNewMembers( role );
    };
  }

  componentDidMount( ) {
    this.populateState( );
  }

  render( ) {
    return (
      <div>
        <h2>Add New Members:</h2>
        <Row style={{marginLeft:'0px'}}>
          <Col xs>
            <Row>
              <Col xs={10}>
                <AutoComplete style={{width:'100%'}}
                              textFieldStyle={{width:'100%'}}
                              hintText="Type a user's name"
                              filter={this.filterDataSource}
                              dataSource={this.state.all_users}
                              onUpdateInput={this.updateSearchText}
                              searchText={this.state.search_text}
                              onNewRequest={this.addUserToNewMembers}
                              dataSourceConfig={{text: 'label',value:'username'}}/>
              </Col>
              <Col xs={2}>
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
                          onRequestDelete={() => this.handleRequestDelete(index)} >
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