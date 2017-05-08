import { combineReducers } from 'redux';
import summary from './summary';
import teacherSetup from './teacherSetup';
import progressBar from './progressBar';
import notifications from './notifications';
import auditConsole from './auditConsole';
import userSession from './userSession';
import classes from './classes';

const rootReducer = combineReducers({
	summary,
  teacherSetup,
  progressBar,
  notifications,
  auditConsole,
  userSession,
  classes
});

export default rootReducer;