import React from 'react';
import IconResources from '../icons/IconResources';
import { NavLink } from 'react-router-dom';

class NavlinkResources extends React.Component {
  render() {
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
}

export default NavlinkResources;
