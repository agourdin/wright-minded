import React from 'react';

import NavlinkDashbaord from '../../navlinks/NavlinkDashboard';
import NavlinkProfile from '../../navlinks/NavlinkProfile';
import NavlinkLogout from '../../navlinks/NavlinkLogout';

class Dropdown extends React.Component {
  render() {
    return (
      <div className="user-dropdown">
        <NavlinkDashbaord />
        <NavlinkProfile />
        <NavlinkLogout />
      </div>
    );
  }
}

export default Dropdown;
