import { combineReducers } from 'redux';
import summary from './summary';
import teacherSetup from './teacherSetup';
import progressBar from './progressBar';
import notifications from './notifications';
import auditConsole from './auditConsole';

const rootReducer = combineReducers({
	summary,
  teacherSetup,
  progressBar,
  notifications,
  auditConsole
});

export default rootReducer;