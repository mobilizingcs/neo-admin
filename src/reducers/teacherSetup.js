import { PARSE_CSV, UPDATE_CSV_VIEW,
  CREATE_ACCOUNT_REQUEST, CREATE_ACCOUNT_RESPONSE,
  SET_PERMISSIONS_REQUEST, SET_PERMISSIONS_RESPONSE }
  from '../actions/teachersetup';

const initialState = {
  parsed_accounts: [ ],
  creating: 0,
  setting_permissions: 0,
  is_parsing: false
};

function updateState( state, action ) {
  if( typeof state === 'undefined' ) {
    return initialState;
  }

  switch( action.type ) {
    case PARSE_CSV:
      return Object.assign( { }, state, {
        is_parsing: true
      } );
    case UPDATE_CSV_VIEW:
      return Object.assign( { }, state, {
        is_parsing: false,
        parsed_accounts: action.parsed_accounts
      } );
    case CREATE_ACCOUNT_REQUEST:
      return Object.assign( { }, state, {
        creating: state.creating + 1
      } );
    case CREATE_ACCOUNT_RESPONSE:
      return Object.assign( { }, state, {
        creating: state.creating - 1,
        parsed_accounts: state.parsed_accounts.map( ( item, index ) => {
          if( index === action.account_index ) {
            return Object.assign( { }, item, {
              status_created: true,
              username: action.username,
              password: action.password
            } );
          }
          else {
            return item;
          }
        } )
      } );
    case SET_PERMISSIONS_REQUEST:
      return Object.assign( { }, state, {
        setting_permissions: state.setting_permissions + 1
      } );
    case SET_PERMISSIONS_RESPONSE:
      return Object.assign( { }, state, {
        setting_permissions: state.setting_permissions - 1,
        parsed_accounts: state.parsed_accounts.map( ( item, index ) => {
          if( index === action.account_index ) {
            return Object.assign( { }, item, {
              status_permissions_set: action.response
            } );
          }
          else {
            return item;
          }
        } )
      } );
    default:
      return state;
  }

}

export default updateState;