import ohmage from '../utils/ohmage-wrapper';
import db from '../utils/db';

export const REQUEST_LOGS = 'REQUEST_LOGS';
export const RECEIVE_LOGS = 'RECEIVE_LOGS';
export const REQUEST_LOCAL_LOGS_STATE = 'REQUEST_LOCAL_LOGS_STATE';
export const RECEIVE_LOCAL_LOGS_STATE = 'RECEIVE_LOCAL_LOGS_STATE';

export function requestLogs( parameters ) {
  return {
    type: REQUEST_LOGS,
    parameters: parameters
  };
}

export function receiveLogs( json ) {
  return {
    type: RECEIVE_LOGS,
    logs: json
  };
}

function requestLocalLogsState( ) {
  return {
    type: REQUEST_LOCAL_LOGS_STATE
  };
}

function receiveLocalLogsState( state ) {
  return {
    type: RECEIVE_LOCAL_LOGS_STATE,
    state
  };
}

// Thunks
export function fetchLocalLogsState( ) {
  return dispatch => {
    dispatch( requestLocalLogsState( ) );
    db.audit_logs.count( )
      .then( value => {
        dispatch( receiveLocalLogsState( {
          count: value
        } ) );
      } )
  };
}

export function fetchLogs( parameters ) {
  return dispatch => {
    dispatch( requestLogs( parameters ) );
    return ohmage.getLogs( parameters )
      .then( logs => {
        for( let i = 0; i < logs.audits.length; i++ ) {
          db.audit_logs.add( logs.audits[ i ] );
        }
      } )
      .then( ( ) => {
        dispatch( requestLogs( parameters ) );
      } );
  };
}

