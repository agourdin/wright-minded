import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import NotificationSystem from 'react-notification-system';
// import NotificationGenerator from 'react-notification-system';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import {
  connectRouter,
  ConnectedRouter,
  routerMiddleware
} from 'connected-react-router';
import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
// import reducers from './redux/reducers';
import rootReducer from './redux/reducers';

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
      <Router>
        <App />
      </Router>
      {/* <Notifications /> */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

//////////////////
// SCRATCH MODE //
//////////////////

// console.log(Result);
// console.log(JSON.stringify(Result));
// var result = Result;
// result = result.map(r => (
//   <div>
//     {r}
//     <br />
//   </div>
// ));
// ReactDOM.render(<div>{}</div>, document.getElementById('root'));
// registerServiceWorker();
///////////////////////////////////////////////////////////////////////////////

////////////////////////////
// PRIVATE ROUTING METHOD //
////////////////////////////

// class RootContainerComponent extends Component {
//
//   componentDidMount() {
//     this.props.loadUser();
//   }
//
//   PrivateRoute = ({component: ChildComponent, ...rest}) => {
//     return <Route {...rest} render={props => {
//       if (this.props.auth.isLoading) {
//         return <em>Loading...</em>;
//       } else if (!this.props.auth.isAuthenticated) {
//         return <Redirect to="/login" />;
//       } else {
//         return <ChildComponent {...props} />
//       }
//     }} />
//   }
//
//   render() {
//     let {PrivateRoute} = this;
//     return (
//       <BrowserRouter>
//         <Switch>
//           <PrivateRoute exact path="/" component={PonyNote} />
//           <Route exact path="/login" component={Login} />
//           <Route component={NotFound} />
//         </Switch>
//       </BrowserRouter>
//     );
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     loadUser: () => {
//       return dispatch(auth.loadUser());
//     }
//   }
// }
//
// let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);
//
// export default class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <RootContainer />
//       </Provider>
//     )
//   }
// }

/////////////////////////
// NOTIFICATIONS SUITE //
/////////////////////////

// class Notifications extends NotificationSystem {
//   constructor() {
//     super();
//     this.state = {
//       allowHTML: false,
//       viewHeight: null
//     };
//   }
//
//   _notificationSystem = null;
//
//   notification = {
//     title: '!!! WARNING !!!',
//     message:
//       'This site is still in alpha! It is not ready for public consumption.',
//     autoDismiss: 0,
//     level: 'error',
//     position: 'tc',
//     action: {
//       label: 'Got it!'
//     }
//   };
//
//   _notificationSystemInstance() {
//     return this._notificationSystem;
//   }
//
//   componentWillMount() {
//     this.setState({ viewHeight: window.innerHeight });
//   }
//
//   componentDidMount() {
//     this._notificationSystem = this.refs.notificationSystem;
//     this._notificationSystem.addNotification(this.notification);
//   }
//
//   render() {
//     return (
//       <div className="wrapper">
//         <NotificationGenerator
//           notifications={this._notificationSystemInstance}
//           allowHTML={this._allowHTML}
//         />
//         <NotificationSystem
//           ref="notificationSystem"
//           allowHTML={this.state.allowHTML}
//         />
//       </div>
//     );
//   }
// }
