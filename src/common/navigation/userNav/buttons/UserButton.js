import React from 'react';
import { Link } from 'react-router-dom';

import UserDropdown from './userButton/UserDropdown';

import IconUser from '../icons/IconUser';

function UserButton() {
  return (
    <div className="navbar-item">
      <div className="user-button">
        <Link to="/dashboard" className="user-icon">
          <IconUser />
        </Link>
        <UserDropdown />
      </div>
    </div>
  );
}

export default UserButton;
