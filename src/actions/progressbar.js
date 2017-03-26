export const SHOW_PROGRESS_BAR = 'SHOW_PROGRESS_BAR';
export const HIDE_PROGRESS_BAR = 'HIDE_PROGRESS_BAR';

export function showProgressBar( indeterminate, progress, buffer ) {
  return {
    type: SHOW_PROGRESS_BAR,
    indeterminate,
    progress,
    buffer
  };
}

export function hideProgressBar( ) {
  return { type: HIDE_PROGRESS_BAR };
}