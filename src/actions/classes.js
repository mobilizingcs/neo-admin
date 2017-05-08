import ohmage from '../utils/ohmage-wrapper';
import { showProgressBar, hideProgressBar } from './progressbar';
import { flashNotification } from './notification';

export const REQUEST_CLASSES = 'REQUEST_CLASSES';
export const RECEIVE_CLASSES = 'RECEIVE_CLASSES';

function requestClasses( ) {
  return {
    type: REQUEST_CLASSES
  };
}

function receiveClasses( classes ) {
  return {
    type: RECEIVE_CLASSES,
    classes
  };
}

// Thunks

export function fetchClasses( ) {
  return dispatch => {
    dispatch( showProgressBar( true ) );
    dispatch( requestClasses( ) );
    // use updated ohmage-es6
    // todo: handle errors
    return ohmage.__call( '/class/search', { } )
            .then( response => {
              // move this logic to ohmage-es6
              let classes = [ ];
              for( let each_class in response ) {
                response[ each_class ].class_urn = each_class;
                classes.push( response[ each_class ] );
              }
              return classes;
            } )
            .then( classes => {
              dispatch( receiveClasses( classes ) );
              dispatch( hideProgressBar( ) );
            } )
            .catch( error => {
              dispatch( flashNotification( 'An error occurred while trying to fetch classes.' ) );
              dispatch( hideProgressBar( ) );
            } )
  }
}