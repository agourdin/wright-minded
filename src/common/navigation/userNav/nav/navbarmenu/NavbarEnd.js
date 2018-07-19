import React from 'react';

import UserButton from '../buttons/UserButton';

export default class NavbarEnd extends React.Component {
  render() {
    return (
      <div className="navbar-end">
        <UserButton />
      </div>
    );
  }
}
