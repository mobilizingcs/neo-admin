import ohmage from '../utils/ohmage-wrapper';
import AppError from '../utils/AppError';
import Papa from 'papaparse';
import { showProgressBar, hideProgressBar } from './progressbar';
import { flashNotification } from './notification';

export const RESET_STATE = 'RESET_STATE';
export const PARSE_CSV = 'PARSE_CSV';
export const UPDATE_CSV_VIEW = 'UPDATE_CSV_VIEW';
export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';
export const CREATE_ACCOUNT_RESPONSE = 'CREATE_ACCOUNT_RESPONSE';
export const SET_PERMISSIONS_REQUEST = 'SET_PERMISSIONS_REQUEST';
export const SET_PERMISSIONS_RESPONSE = 'SET_PERMISSIONS_RESPONSE';

export function resetState( ) {
  return {
    type: RESET_STATE
  };
}

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
  const action = {
    type: CREATE_ACCOUNT_RESPONSE,
    account_index,
    success
  };
  if( success ) {
    action.username = response.username;
    action.password = response.password;
  }
  return action;
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
    const task = (account, index, dispatch) => {
      dispatch( createAccount( index ) );
      let params = Object.assign( { }, account, {
        status_created: null,
        status_permissions_set: null
      } );
      const promise_to_return = ohmage.userSetup( params )
        .catch( error => {
          dispatch( flashNotification( 'Could not create user: '
            + params.first_name + ' ' + params.last_name ) );
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
              dispatch( flashNotification( 'Could not set permissions for user: '
              + params.first_name + ' ' + params.last_name ) );
              dispatch( setPermissionsResponse( false, index ) );
              throw new AppError( 'action', 'API call failed', {
                step: 'userUpdate'
              }, error );
            } )
            .then( ( ) => {
              dispatch( setPermissionsResponse( true, index ) );
            } )
        } );
        return promise_to_return.catch( error => error );
    };

    let tasks = [ ];
    dispatch( showProgressBar( true ) );
    for( let i = 0; i < account_list.length; i++ ) {
      tasks.push( task( account_list[ i ], i, dispatch ) );
    }
    return Promise.all( tasks )
      .then( ( ) => {
        dispatch( flashNotification( 'Account setup complete.' ) );
        dispatch( hideProgressBar( ) );
      } );
  };
}

export function parseCsvFile( file_object ) {
  return dispatch => {
    dispatch( parseCsv( ) );
    try {
    Papa.parse( file_object, {
      complete: results => {
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
      },
      error: ( ) => {
        dispatch( flashNotification( 'Unable to parse the CSV file.' ) );
      } } )
    }
    catch( e ) {
      dispatch( flashNotification( 'Unable to parse the CSV file.' ) );
    }
  }
}