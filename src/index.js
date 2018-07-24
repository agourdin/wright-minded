// ES2015+ polyfill
// import 'babel-polyfill';
// Base React imports
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'utils/registerServiceWorker';

// Redux imports
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import {
  connectRouter,
  ConnectedRouter,
  routerMiddleware
} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

// Style imports
import 'styles/bulma/css/bulma.css';
import 'styles/all-styles.css';
import 'styles/fontawesome-all.js';

// App import
import App from 'App';

/////////////////
// REDUX SETUP //
/////////////////

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  [],
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk
    )
  )
);

/////////////////
// MAIN RENDER //
/////////////////

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
