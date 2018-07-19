import React from 'react';
import { NavLink } from 'react-router-dom';

function Navlink2() {
  return (
    <NavLink
      className="navbar-item has-text-blue"
      to="/how-it-works"
      activeClassName="is-active"
    >
      <span className="tablet">Link 2</span>
    </NavLink>
  );
}

export default Navlink2;
