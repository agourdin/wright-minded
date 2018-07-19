import React from 'react';
import { NavLink } from 'react-router-dom';

function Logo() {
  return (
    <div className="navbar-item logo">
      <NavLink className="" to="/">
        Wright Minded
      </NavLink>
    </div>
  );
}

export default Logo;
