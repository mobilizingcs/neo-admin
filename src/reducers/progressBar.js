import { SHOW_PROGRESS_BAR, HIDE_PROGRESS_BAR } from '../actions/progressbar';

const initialState = {
  is_visible: false,
  is_indeterminate: false,
  progress: -1,
  buffer: -1
};

function progressBar( state = initialState, action ) {
  if( typeof state === 'undefined' ) {
    return initialState;
  }

  switch( action.type ) {
    case SHOW_PROGRESS_BAR:
      const obj = {
        is_visible: true,
        is_indeterminate: action.indeterminate || false
      };
      if( !!action.progress ) {
        obj.progress = action.progress;
      }
      if( !!action.buffer ) {
        obj.buffer = action.buffer;
      }
      return Object.assign( { }, state, obj );
    case HIDE_PROGRESS_BAR:
      return Object.assign( { }, initialState );
    default:
      return state;
  }
}

export default progressBar;