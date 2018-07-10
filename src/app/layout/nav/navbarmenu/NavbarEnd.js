import React from 'react';

import LogoutButton from '../buttons/LogoutButton';
import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignupButton';

class NavbarEnd extends React.Component {
  render() {
    return (
      <div
        className="navbar-end is-hidden-touch"
        style={{
          width: '200px',
          position: 'relative',
          right: '0px'
        }}
      >
        <LogoutButton />
        <LoginButton />
        <SignupButton />
      </div>
    );
  }
}

export default NavbarEnd;
