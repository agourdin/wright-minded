import React from 'react';

import NavlinkDashbaord from './navlinks/NavlinkDashboard';
import NavlinkProfile from './navlinks/NavlinkProfile';
import NavlinkLogout from './navlinks/NavlinkLogout';

function UserDropdown() {
  return (
    <div className="user-dropdown">
      <NavlinkDashbaord />
      <NavlinkProfile />
      <NavlinkLogout />
    </div>
  );
}

export default UserDropdown;
