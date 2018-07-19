import React from 'react';
import IconResources from '../../icons/IconResources';
import { NavLink } from 'react-router-dom';

function NavlinkResources() {
  return (
    <NavLink
      className="navbar-item has-text-yellow"
      to="/resources"
      activeClassName="is-active"
    >
      <span>
        <IconResources />
      </span>
      <span className="tablet">Resources</span>
    </NavLink>
  );
}

export default NavlinkResources;
