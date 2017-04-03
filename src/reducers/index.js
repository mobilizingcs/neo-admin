import { combineReducers } from 'redux';
import summary from './summary';
import teacherSetup from './teacherSetup';
import progressBar from './progressBar';
import notifications from './notifications';

const rootReducer = combineReducers({
	summary,
  teacherSetup,
  progressBar,
  notifications
});

export default rootReducer;