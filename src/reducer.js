import { combineReducers } from 'redux';
import authReducer from 'app/main/auth/duck/index';
import diagnosticFormReducer from 'common/testDiagnostics/duck/index';

const rootReducer = combineReducers({
  auth: authReducer,
  diagnosticForm: diagnosticFormReducer
});

export default rootReducer;
