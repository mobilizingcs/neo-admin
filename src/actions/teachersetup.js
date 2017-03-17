// import ohmage from '../utils/ohmage-wrapper';
import Papa from 'papaparse';

export const PARSE_CSV = 'PARSE_CSV';
export const UPDATE_CSV_VIEW = 'UPDATE_CSV_VIEW';
export const CREATE_ACCOUNTS_REQUEST = 'CREATE_ACCOUNTS';
export const CREATE_ACCOUNTS_RESPONSE = 'CREATE_ACCOUNTS_RESPONSE';

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

function createAccounts( account_list ) {
  return {
    type: CREATE_ACCOUNTS_REQUEST,
    account_list
  }
}

function createAccountsResponse( response ) {
  return {
    type: CREATE_ACCOUNTS_RESPONSE,
    response
  }
}

// Thunks

export function createOhmageAccounts( account_list ) {
  return dispatch => {
    dispatch( createAccounts( account_list ) );
    // todo: call ohmage with a batch user creation API
    return;
  }
}

export function parseCsvFile( file_object ) {
  return dispatch => {
    dispatch( parseCsv(  ) );
    Papa.parse( file_object, { complete: results => {
      results = results.data;
      let accounts_to_create = [ ];
      let generatePasswords = results[ 0 ].length === 6;
      // todo: add a field mapping wizard here!
      for( let i = 1; i < results.length; i++ ) {
        accounts_to_create.push( {
          first_name: results[ i ][ 0 ],
          last_name: results[ i ][ 1 ],
          personal_id: results[ i ][ 2 ],
          organization: results[ i ][ 3 ],
          email_address: results[ i ][ 4 ],
          username: results[ i ][ 5 ],
          password: !generatePasswords ? results[ i ][ 6 ] : null
        } );
      }
      dispatch( updateCsvView( accounts_to_create ) );
    } } )
  }
}