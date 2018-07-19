import React from 'react';
import { NavLink } from 'react-router-dom';

function Navlink1() {
  return (
    <NavLink
      className="navbar-item has-text-red"
      to="/"
      activeClassName="is-active"
    >
      <span className="tablet">Link 1</span>
    </NavLink>
  );
}

export default Navlink1;
