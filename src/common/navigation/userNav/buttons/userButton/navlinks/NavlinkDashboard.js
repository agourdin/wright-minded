import React from 'react';
import { NavLink } from 'react-router-dom';
import IconDashboard from '../../../icons/IconDashboard';

function NavlinkHowItWorks() {
  return (
    <NavLink className="dropdown-item" to="/dashboard">
      <span>
        <IconDashboard />
      </span>
      <span>Dashboard</span>
    </NavLink>
  );
}

export default NavlinkHowItWorks;
