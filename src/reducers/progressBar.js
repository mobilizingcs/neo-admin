import { SHOW_PROGRESS_BAR, HIDE_PROGRESS_BAR } from '../actions/progressbar';

const initialState = {
  is_visible: false,
  is_indeterminate: false,
  value: 0,
  progress_type: 'linear'
};

function progressBar( state, action ) {
  if( typeof state === 'undefined' ) {
    return initialState;
  }

  switch( action.type ) {
    case SHOW_PROGRESS_BAR:
      const obj = {
        is_visible: true,
        is_indeterminate: action.indeterminate || false
      };
      if( !!action.value ) {
        obj.value = action.value;
      }
      if( !!action.progress_type ) {
        obj.progress_type = action.progress_type;
      }
      return Object.assign( { }, state, obj );
    case HIDE_PROGRESS_BAR:
      return Object.assign( { }, initialState );
    default:
      return state;
  }
}

export default progressBar;