import ohmage from '../utils/ohmage-wrapper';

export const UPDATE_AUTH_TOKEN = 'UPDATE_AUTH_TOKEN';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export function updateAuthToken( user_auth_token ) {
  return {
    type: UPDATE_AUTH_TOKEN,
    user_auth_token
  };
}

export function updateUserProfile( user ) {
  return {
    type: UPDATE_USER_PROFILE,
    user
  };
}

export function logUserOut( ) {
  return { type: UPDATE_AUTH_TOKEN };
}

// thunks
export function logUserIn( user_auth_token ) {
  return dispatch => {
    dispatch( updateAuthToken( user_auth_token ) );
    ohmage._setToken( user_auth_token );
    let username;
    ohmage.whoAmI( )
      .then( response => {
        username = response.username;
        return ohmage.userRead( [ username ] );
      } )
      .then( user => {
        const user_profile = user[ username ];
        user_profile.username = username;
        dispatch( updateUserProfile( user_profile ) );
      } )
  };
}