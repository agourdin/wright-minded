import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import './bulma/css/bulma.css';
import './styles/all-styles.css';
import './fontawesome-all.js';

import { loadUser } from './redux/actions/auth/load_user';

import Layout from './app/Layout';

class App extends Component {
  componentDidMount() {
    // API Compliant: ✔
    // Redux Aligned: ✔
    // Tested: WARNING
    this.props.loadUser();
  }

  render() {
    return <Layout />;
  }
}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
