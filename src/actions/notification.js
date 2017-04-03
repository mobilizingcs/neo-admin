export const FLASH_NOTIFICATION = 'FLASH_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export function flashNotification( text ) {
  return {
    type: FLASH_NOTIFICATION,
    text
  };
}

export function clearNotification( index ) {
  return {
    type: CLEAR_NOTIFICATION,
    index
  };
}