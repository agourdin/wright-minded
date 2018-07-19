import { combineReducers } from 'redux';
import authReducer from 'app/main/auth/duck/index';

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
