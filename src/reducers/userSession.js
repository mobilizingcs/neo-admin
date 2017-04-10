import { UPDATE_AUTH_TOKEN, UPDATE_USER_PROFILE } from '../actions/usersession';

const initialState = {
  is_logged_in: false,
  user_auth_token: '',
  user: { }
};

function userSession( state = initialState, action ) {
  if( typeof state === 'undefined' ) {
    return initialState;
  }

  switch( action.type ) {
    case UPDATE_AUTH_TOKEN:
      return Object.assign( { }, state, {
        is_logged_in: !!action.user_auth_token,
        user_auth_token: !!action.user_auth_token ? action.user_auth_token : ''
      } );
    case UPDATE_USER_PROFILE:
      return Object.assign( { }, state, {
        user: action.user
      } );
    default:
      return state;
  }
}

export default userSession;