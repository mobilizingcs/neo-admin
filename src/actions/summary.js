import ohmage from '../utils/ohmage-wrapper';

export const UPDATE_SUMMARY = 'UPDATE_SUMMARY';
export const REQUEST_SUMMARY = 'REQUEST_SUMMARY';
export const RECEIVE_SUMMARY = 'RECEIVE_SUMMARY';

export function updateSummary( ) {
	return { type: UPDATE_SUMMARY };
}

function requestSummary( ) {
	return {
		type: REQUEST_SUMMARY
	};
}

function receiveSummary( preferences ) {
	return {
		type: RECEIVE_SUMMARY,
		preferences
	};
}

export function fetchSummary( ) {
	return dispatch => {
		dispatch( requestSummary( ) );
		return ohmage.readConfig( )
		    	.then( preferences => {
		    		const _preferences = [ ];
		    		for( const key in preferences ) {
		    			_preferences.push( { key: key, value: preferences[ key ].toString( ) } );
		    		}
		    		return dispatch( receiveSummary( _preferences ) );
		    	} );
	}
}