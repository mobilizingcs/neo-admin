import { combineReducers } from 'redux';

import { PARSE_CSV, UPDATE_CSV_VIEW,
  CREATE_ACCOUNTS_REQUEST, CREATE_ACCOUNTS_RESPONSE }
  from '../actions/teachersetup';

const initialState = {
  parsedAccounts: [ ],
  createdAccounts: [ ],
  isCreating: false,
  isParsing: false
};

function updateState( state, action ) {
  if( typeof state === 'undefined' ) {
    return initialState;
  }

  switch( action.type ) {
    case PARSE_CSV:
      return Object.assign( { }, state, {
        isParsing: true
      } );
    case UPDATE_CSV_VIEW:
      // resume here: update state with the parsed accounts received in this action
      return Object.assign( { }, state, {
        isParsing: false
      } );
    case CREATE_ACCOUNTS_REQUEST:
      return Object.assign( { }, state, {
        isCreating: true
      } );
    case CREATE_ACCOUNTS_RESPONSE:
      return Object.assign( { }, state, {
        isCreating: false
      } );
    default:
      return state;
  }

}

export default updateState;