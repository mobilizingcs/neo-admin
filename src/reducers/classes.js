import { REQUEST_CLASSES, RECEIVE_CLASSES } from '../actions/classes';

const initialState = {
  class_list: {
    is_fetching: false,
    is_fetched: false,
    list: [ ]
  }
};

function classList( state = initialState.class_list, action ) {
  switch( action.type ) {
    case REQUEST_CLASSES:
      return Object.assign( { }, state, {
        is_fetching: true
      } );
    case RECEIVE_CLASSES:
      return Object.assign( { }, state, {
        is_fetched: true,
        is_fetching: false,
        list: action.classes
      } );
    default:
      return state;
  }
}

function classes( state = initialState, action ) {

  switch( action.type ) {
    case REQUEST_CLASSES:
    case RECEIVE_CLASSES:
      return Object.assign( { }, state, {
        class_list: classList( state.class_list, action )
      } );
    default:
      return state;
  }
}

export default classes;