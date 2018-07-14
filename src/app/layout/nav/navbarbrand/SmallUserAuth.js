import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginButton from '../buttons/LoginButton';
import LogoutButton from '../buttons/LogoutButton';
import SignupButton from '../buttons/SignupButton';

class SmallUserAuth extends React.Component {
  render() {
    return (
      <div className="small-userauth navbar-item is-hidden-desktop">
        {this.props.auth.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        {this.props.auth.isAuthenticated ? null : <SignupButton />}
      </div>
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
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallUserAuth);
