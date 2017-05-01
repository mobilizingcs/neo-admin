import {  REQUEST_LOGS,
          RECEIVE_LOGS,
          REQUEST_LOCAL_LOGS_STATE,
          RECEIVE_LOCAL_LOGS_STATE } from '../actions/auditconsole';

const initialState = {
  is_fetching: false,
  local_state: {
    is_fetched: false,
    is_fetching: false,
    state: {
      count: 0
    }
  }
};

function localState( state = initialState.local_state, action ) {
  switch( action.type ) {
    case REQUEST_LOCAL_LOGS_STATE:
      return Object.assign( { }, state, {
        is_fetching: true
      } );
    case RECEIVE_LOCAL_LOGS_STATE:
      return Object.assign( { }, state, {
        is_fetching: false,
        is_fetched: true,
        state: action.state
      } );
    default:
      return state;
  }
}

function auditConsole( state = initialState, action ) {
  if( typeof state === 'undefined' ) {
    return initialState;
  }
  switch( action.type ) {
    case REQUEST_LOGS:
      return Object.assign( { }, state, {
        is_fetching: true
      } );
    case RECEIVE_LOGS:
      return Object.assign( { }, state, {
        is_fetching: false
      } );
    case REQUEST_LOCAL_LOGS_STATE:
    case RECEIVE_LOCAL_LOGS_STATE:
      return Object.assign( { }, state, {
        local_state: localState( state.local_state, action )
      } )
    default:
      return state;
  }
}

export default auditConsole;