import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Actions
import loadUser from 'redux/actions/auth/load_user';

// Components
import Main from 'app/main/Main';
import User from 'app/user/User';

export class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <Router>
          <Route path="/" component={User} />
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
