import { RECEIVE_SUMMARY } from '../actions/summary';

const initialState = {
	preferences: [ ]
};

function updateSummary( state = initialState, action ) {
	if( typeof state === 'undefined' ) {
		return initialState;
	}

	switch( action.type ) {
		case RECEIVE_SUMMARY:
			return Object.assign( { }, state, {
				preferences: [
					...action.preferences
				]
			} );
		default:
			return state;
	}
}

export default updateSummary;