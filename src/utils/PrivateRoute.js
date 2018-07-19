import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      props.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

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
