import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LogoutButton from '../buttons/LogoutButton';
import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignupButton';

class NavbarEnd extends React.Component {
  render() {
    console.log(this.props.auth.isAuthenticated);
    return (
      <div
        className="navbar-end "
        style={{
          width: '200px',
          position: 'relative',
          right: '0px'
        }}
      >
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

export default connect(mapStateToProps, mapDispatchToProps)(NavbarEnd);
