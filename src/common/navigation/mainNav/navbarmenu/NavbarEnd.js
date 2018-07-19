import React from 'react';

import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignupButton';

function NavbarEnd() {
  return (
    <div className="navbar-end">
      <LoginButton />
      <SignupButton />
    </div>
  );
}

export default NavbarEnd;
