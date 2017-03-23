import { PARSE_CSV, UPDATE_CSV_VIEW,
  CREATE_ACCOUNT_REQUEST, CREATE_ACCOUNT_RESPONSE }
  from '../actions/teachersetup';

const initialState = {
  parsed_accounts: [ ],
  is_creating: false,
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
        is_creating: true
      } );
    case CREATE_ACCOUNT_RESPONSE:
      return Object.assign( { }, state, {
        is_creating: false
      } );
    default:
      return state;
  }

}

export default updateState;