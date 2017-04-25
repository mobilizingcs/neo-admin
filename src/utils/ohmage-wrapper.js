import Ohmage from 'ohmage-es6';
import config from 'config';

let ohmage;

function readCookie( name ) {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

if( typeof ohmage === 'undefined' ) {
  let auth_token = readCookie( 'auth_token' ) || null;
  let keycloak_token = readCookie( 'keycloak_token' ) || null;
  ohmage = new Ohmage( config.ohmage_server_url, 'neo-admin', auth_token, keycloak_token );
}

export default ohmage;