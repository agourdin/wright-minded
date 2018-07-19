import React from 'react';
import IconProfile from '../../../icons/IconProfile';
import { NavLink } from 'react-router-dom';

function NavlinkProfile() {
  return (
    <NavLink className="dropdown-item" to="/profile">
      <span>
        <IconProfile />
      </span>
      <span>Profile</span>
    </NavLink>
  );
}

export default NavlinkProfile;
