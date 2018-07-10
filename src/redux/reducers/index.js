import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import DiagnosticFormReducer from './reducerDiagnosticForm';
import Auth from './auth';

const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  diagnostic_form: DiagnosticFormReducer,
  auth: Auth
});

export default rootReducer;
