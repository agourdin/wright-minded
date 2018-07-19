import React from 'react';

import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignupButton';
import UserButton from '../buttons/UserButton';

export default class NavbarEnd extends React.Component {
  render() {
    return (
      <div className="navbar-end">
        {this.props.isAuthenticated ? <UserButton /> : <LoginButton />}
        {this.props.isAuthenticated ? null : <SignupButton />}
      </div>
    );
  }
}
