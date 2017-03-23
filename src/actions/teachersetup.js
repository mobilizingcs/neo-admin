import ohmage from '../utils/ohmage-wrapper';
import AppError from '../utils/AppError';
import Papa from 'papaparse';

export const PARSE_CSV = 'PARSE_CSV';
export const UPDATE_CSV_VIEW = 'UPDATE_CSV_VIEW';
export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNTS';
export const CREATE_ACCOUNT_RESPONSE = 'CREATE_ACCOUNT_RESPONSE';

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

function createAccount( account ) {
  return {
    type: CREATE_ACCOUNT_REQUEST,
    account
  }
}

function createAccountResponse( response ) {
  return {
    type: CREATE_ACCOUNT_RESPONSE,
    response
  }
}

// Thunks

export function createOhmageAccounts( account_list ) {
  return dispatch => {
    for( let i = 0; i < account_list.length; i++ ) {
      dispatch( createAccount( account_list[ i ] ) );
      ohmage.userSetup( Object.assign( account_list[ i ], { status: '' } ) )
        .catch( error => {
          throw new AppError( 'action', 'API call failed', {
            step: 'userSetup'
          }, error );
        })
        .then( account => {
          return ohmage.userUpdate( {
            username: account.username,
            new_account: true,
            campaign_creation_privilege: true,
            class_creation_privilege: true,
            user_setup_privilege: true
          } )
          .catch( error => {
            throw new AppError( 'action', 'API call failed', {
              step: 'userUpdate'
            }, error );
          } );
        } )
        .then( permissions_set => {
          if( permissions_set ) {
            dispatch( createAccountResponse( true ) );
          }
        } )
        .catch( error => {
          if( error.layer === 'action' &&
              error.props.step === 'userUpdate' ) {
            // todo: report error for this step 
            // resumehere + test if the above promise chain actually works!
          }
        } );
    }
    return;
  }
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
          status: {
            created: false,
            permissions_set: false
          }
        } );
      }
      dispatch( updateCsvView( accounts_to_create ) );
    } } )
  }
}