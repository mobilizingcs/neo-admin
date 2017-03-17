import { combineReducers } from 'redux';
import summary from './summary';
import teacherSetup from './teacherSetup';

const rootReducer = combineReducers({
	summary,
  teacherSetup
});

export default rootReducer;