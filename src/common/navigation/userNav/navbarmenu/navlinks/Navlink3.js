import React from 'react';
import { NavLink } from 'react-router-dom';

function Navlink3() {
  return (
    <NavLink
      className="navbar-item has-text-green"
      to="/rates-and-services"
      activeClassName="is-active"
    >
      <span className="tablet">Link 3</span>
    </NavLink>
  );
}

export default Navlink3;
