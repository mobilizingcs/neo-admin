/*
 * JavaScript client library for Ohmage 2.xx
 * Autor: Kapeel Sable <kapeel.sable@gmail.com>
 * License: Apache 2
 */

import 'isomorphic-fetch';
import AppError from './AppError';

class Ohmage {
  constructor( server_url, client, auth_token, keycloak_token ) {
    this.server_url = server_url;
    this.client = client || 'ohmage.js';
    this.auth_token = auth_token || null;
    this.keycloak_token = keycloak_token || null;
    if( ( this.auth_token === null
      && this.keycloak_token === null )
      || !this.server_url ) {
      throw new Error('Invalid constructor parameters.');
    }
  }

  __call( endpoint, data = { } ) {

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    if( !!this.keycloak_token ) {
      headers[ 'Authorization' ] = 'Bearer ' + this.keycloak_token;
    }
    else if( !!this.auth_token ) {
      data['auth_token'] = this.auth_token;
    }

    data[ 'client' ] = this.client;

    var formBody = [];
    for (var key in data) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(data[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    return fetch( this.server_url + endpoint, {
        method: 'post',
        headers: headers,
        body: formBody
      } )
      .then( response => {
        if( response.status === 200 ) {
          return response.json( )
              .then( body => {
                if( body.result === 'success' ) {
                  return !!body.data ? body.data : true;
                }
                else {
                  throw new AppError( 'ohmage', 'API response failed.', { body } );
                }
              } );
        }
        else {
          throw new AppError( 'https', 'HTTPS error occurred.', response );
        }
      } )
      .catch( exception => {
        throw new AppError( 'ohmage_api', 'API call failed', null, exception );
      } );
  }

  _updateToken( auth_token ) {
    this.auth_token = auth_token;
  }

  whoAmI( ) {
    return this.__call( '/user/whoami' );
  }

  readConfig( ) {
    return this.__call( '/config/read' );
  }

  getLogs( parameters ) {
    return this.__call( '/audit/read', parameters );
  }

  userCreate( parameters ) {
    return this.__call( '/user/create', parameters );
  }

  userSetup( parameters ) {
    return this.__call( '/user/setup', parameters );
  }

  userUpdate( parameters ) {
    return this.__call( '/user/update', parameters );
  }

}

export default Ohmage;
