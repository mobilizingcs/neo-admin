import Dexie from 'dexie';

const db = new Dexie( 'ohmage_admin' );
db.version( 1 ).stores( {
  audit_logs: '++, uri, received_millis, response.result, *extra_data.user'
} );
export default db;