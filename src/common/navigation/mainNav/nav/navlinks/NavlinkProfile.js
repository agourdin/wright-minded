import React from 'react';
import IconProfile from '../icons/IconProfile';
import { NavLink } from 'react-router-dom';

const NavlinkProfile = () => {
  return (
    <NavLink
      className="dropdown-item"
      to="/profile"
      activeClassName="is-active"
    >
      <span>
        <IconProfile />
      </span>
      <span>Profile</span>
    </NavLink>
  );
};

export default NavlinkProfile;
