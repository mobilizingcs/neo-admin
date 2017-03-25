import { PARSE_CSV, UPDATE_CSV_VIEW,
  CREATE_ACCOUNT_REQUEST, CREATE_ACCOUNT_RESPONSE,
  SET_PERMISSIONS_REQUEST, SET_PERMISSIONS_RESPONSE }
  from '../actions/teachersetup';

const initialState = {
  parsed_accounts: [ ],
  creating: 0,
  setting_permissions: 0,
  created: 0,
  permissions_set: 0,
  account_creation_attempted: false
};

function updateState( state, action ) {
  if( typeof state === 'undefined' ) {
    return initialState;
  }

  switch( action.type ) {
    case PARSE_CSV:
      // todo: perhaps reset parsed_accounts if doing a force parse?
      return Object.assign( { }, state );
    case UPDATE_CSV_VIEW:
      return Object.assign( { }, state, {
        parsed_accounts: action.parsed_accounts
      } );
    case CREATE_ACCOUNT_REQUEST:
      return Object.assign( { }, state, {
        account_creation_attempted: true,
        creating: state.creating + 1
      } );
    case CREATE_ACCOUNT_RESPONSE:
      return Object.assign( { }, state, {
        creating: state.creating - 1,
        created: action.success ? state.created + 1 : state.created,
        parsed_accounts: state.parsed_accounts.map( ( item, index ) => {
          if( index === action.account_index ) {
            const object = {
              status_created: 'failure'
            };
            if( action.success ) {
              object.status_created = 'success';
              object.username = action.username;
              object.password = action.password;
            }
            return Object.assign( { }, item, object );
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
        permissions_set: action.success ? state.permissions_set + 1 : state.permissions_set,
        parsed_accounts: state.parsed_accounts.map( ( item, index ) => {
          if( index === action.account_index ) {
            return Object.assign( { }, item, {
              status_permissions_set: action.success ? 'success' : 'failure'
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