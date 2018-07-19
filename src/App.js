import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

// Actions
import loadUser from 'redux/actions/auth/load_user';

// Components
import Main from 'app/main/Main';
import Loading from 'common/loading/Loading';

// Loadable Components
const LoadableUser = Loadable({
  loader: () => import('app/user/User'),
  loading: Loading,
  timeout: 20000
});

export class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <Router>
          <Route path="/" component={LoadableUser} />
        </Router>
      );
    } else {
      return (
        <Router>
          <Route path="/" component={Main} />
        </Router>
      );
    }
  }
}

// BOILERPLATE
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadUser: loadUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
