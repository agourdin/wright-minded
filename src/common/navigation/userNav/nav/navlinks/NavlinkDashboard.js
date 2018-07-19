import React from 'react';
import IconDashboard from '../icons/IconDashboard';
import { NavLink } from 'react-router-dom';

class NavlinkHowItWorks extends React.Component {
  render() {
    return (
      <NavLink className="dropdown-item" to="/dashboard">
        <span>
          <IconDashboard />
        </span>
        <span>Dashboard</span>
      </NavLink>
    );
  }
}

export default NavlinkHowItWorks;
