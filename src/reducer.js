import { combineReducers } from 'redux';
import authReducer from 'app/main/auth/duck/index';
import userReducer from 'app/user/profile/duck/index';
import clientReducer from 'app/admin/dashboard/duck/index';
import diagnosticFormReducer from 'common/testDiagnostics/duck/index';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  clients: clientReducer,
  diagnosticForm: diagnosticFormReducer
});

export default rootReducer;
