import React from 'react';
import { NavLink } from 'react-router-dom';

function Navlink4() {
  return (
    <NavLink
      className="navbar-item has-text-yellow"
      to="/resources"
      activeClassName="is-active"
    >
      <span className="tablet">Link 4</span>
    </NavLink>
  );
}

export default Navlink4;
