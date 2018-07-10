import React from 'react';

import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignupButton';

class SmallUserAuth extends React.Component {
  render () {
    return (
      <div className="small-userauth navbar-item is-hidden-desktop">
        <LoginButton />
        <SignupButton />
      </div>
    )
  }
}

export default SmallUserAuth
