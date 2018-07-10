import { createStore } from 'redux';
import rootReducer from '../reducers/index';

// dispatch ➡️ action creator ➡️ thunk ➡️ action ➡️ reducer

const store = createStore(rootReducer);

export default store;
