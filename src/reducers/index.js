import { combineReducers } from 'redux';
import summary from './summary';
import teacherSetup from './teacherSetup';
import progressBar from './progressBar';

const rootReducer = combineReducers({
	summary,
  teacherSetup,
  progressBar
});

export default rootReducer;