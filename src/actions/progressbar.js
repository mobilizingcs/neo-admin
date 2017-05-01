export const SHOW_PROGRESS_BAR = 'SHOW_PROGRESS_BAR';
export const HIDE_PROGRESS_BAR = 'HIDE_PROGRESS_BAR';

export function showProgressBar( indeterminate = true, progress_type = 'linear', value ) {
  return {
    type: SHOW_PROGRESS_BAR,
    indeterminate,
    progress_type,
    value
  };
}

export function hideProgressBar( ) {
  return { type: HIDE_PROGRESS_BAR };
}