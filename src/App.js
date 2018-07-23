import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import uuidv4 from 'uuid/v4';

// Actions
import { loadUser } from 'app/main/auth/duck/actions';

// Components
import Main from 'app/main/Main';
import Loading from 'common/loading/Loading';

// Loadable Components
const LoadableUser = Loadable({
  loader: () => import('app/user/User'),
  loading: Loading,
  timeout: 20000
});
const LoadableAdmin = Loadable({
  loader: () => import('app/admin/Admin'),
  loading: Loading,
  timeout: 20000
});
const LoadableTutor = Loadable({
  loader: () => import('app/tutor/Tutor'),
  loading: Loading,
  timeout: 20000
});

export class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    if (this.props.auth.user) {
      if (this.props.auth.user.is_superuser) {
        return (
          <Router>
            <Route path="/" component={LoadableAdmin} />
          </Router>
        );
      }
      if (this.props.auth.user.is_staff) {
        return (
          <Router>
            <Route path="/" component={LoadableTutor} />
          </Router>
        );
      }
    }
    if (this.props.auth.isAuthenticated) {
      return (
        <Router>
          <Route path="/" component={LoadableUser} />
        </Router>
      );
    } else {
      if (!localStorage.getItem('wmanon')) {
        localStorage.setItem('wmanon', uuidv4());
      }
    }
    return (
      <Router>
        <Route path="/" component={Main} />
      </Router>
    );
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
