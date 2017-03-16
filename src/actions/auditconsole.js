import ohmage from '../utils/ohmage-wrapper';

export const REQUEST_LOGS = 'REQUEST_LOGS';
export const RECEIVE_LOGS = 'RECEIVE_LOGS';

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

export function fetchLogs( parameters ) {
  return dispatch => {
    dispatch( requestLogs( parameters ) );
    return ohmage.getLogs( parameters )
            .then( logs => {
              console.log( logs );
              return logs;
            } )
  }
}