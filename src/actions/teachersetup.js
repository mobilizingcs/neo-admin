import ohmage from '../utils/ohmage-wrapper';
import AppError from '../utils/AppError';
import Papa from 'papaparse';

export const PARSE_CSV = 'PARSE_CSV';
export const UPDATE_CSV_VIEW = 'UPDATE_CSV_VIEW';
export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNTS';
export const CREATE_ACCOUNT_RESPONSE = 'CREATE_ACCOUNT_RESPONSE';
export const SET_PERMISSIONS_REQUEST = 'SET_PERMISSIONS_REQUEST';
export const SET_PERMISSIONS_RESPONSE = 'SET_PERMISSIONS_RESPONSE';

export function parseCsv( ) {
  return {
    type: PARSE_CSV
  };
}

export function updateCsvView( parsed_accounts ) {
  return {
    type: UPDATE_CSV_VIEW,
    parsed_accounts
  };
}

function createAccount( account_index ) {
  return {
    type: CREATE_ACCOUNT_REQUEST,
    account_index
  }
}

function createAccountResponse( success, account_index, response ) {
  return {
    type: CREATE_ACCOUNT_RESPONSE,
    account_index,
    success,
    username: response.username,
    password: response.password
  }
}

function setPermissions( account_index ) {
  return {
    type: SET_PERMISSIONS_REQUEST,
    account_index
  }
}

function setPermissionsResponse( success, account_index ) {
  return {
    type: SET_PERMISSIONS_RESPONSE,
    success,
    account_index
  }
}

// Thunks

export function createAccountsAndSetPermissions( account_list ) {
  return dispatch => {
    for( let i = 0; i < account_list.length; i++ ) {
      ( (account, index) => {
        dispatch( createAccount( index ) );
        let params = Object.assign( { }, account, {
          status_created: null,
          status_permissions_set: null
        } );
        ohmage.userSetup( params )
          .catch( error => {
            // todo: display error on screen
            dispatch( createAccountResponse( false, index ) );
            throw new AppError( 'action', 'API call failed', {
              step: 'userSetup'
            }, error );
          })
          .then( account => {
            dispatch( createAccountResponse( true, index, account ) );
            dispatch( setPermissions( index ) );
            return ohmage.userUpdate( {
                username: account.username,
                new_account: true,
                campaign_creation_privilege: true,
                class_creation_privilege: true,
                user_setup_privilege: true
              } )
              .catch( error => {
                // todo: display error on screen
                dispatch( setPermissionsResponse( false, index ) );
                throw new AppError( 'action', 'API call failed', {
                  step: 'userUpdate'
                }, error );
              } )
              .then( ( ) => {
                dispatch( setPermissionsResponse( true, index ) );
              } )
          } );
      } )( account_list[ i ], i );
    }
  };
}

export function parseCsvFile( file_object ) {
  return dispatch => {
    dispatch( parseCsv( ) );
    Papa.parse( file_object, { complete: results => {
      results = results.data;
      let accounts_to_create = [ ];
      // todo: add a field mapping wizard here!
      for( let i = 1; i < results.length; i++ ) {
        accounts_to_create.push( {
          first_name: results[ i ][ 0 ],
          last_name: results[ i ][ 1 ],
          personal_id: results[ i ][ 2 ],
          organization: results[ i ][ 3 ],
          username_prefix: results[ i ][ 4 ],
          email_address: results[ i ][ 5 ],
          status_created: 'waiting',
          status_permissions_set: 'waiting'
        } );
      }
      dispatch( updateCsvView( accounts_to_create ) );
    } } )
  }
}