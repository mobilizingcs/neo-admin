import { FLASH_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/notification';

const initialState = [ ];

function notifications( state = initialState, action ) {
  if( typeof state === 'undefined' ) {
    return initialState;
  }

  switch( action.type ) {
    case FLASH_NOTIFICATION:
      return [
        ...state.slice( 0, state.length ),
        { text: action.text }
      ];
    case CLEAR_NOTIFICATION:
      return [
        ...state.slice( 0, action.index ),
        ...state.slice( action.index + 1 )
      ];
    default:
      return state;
  }
}

export default notifications;