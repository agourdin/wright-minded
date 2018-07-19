import React from 'react';

import Navlink1 from './navlinks/Navlink1';
import Navlink2 from './navlinks/Navlink2';
import Navlink3 from './navlinks/Navlink3';
import Navlink4 from './navlinks/Navlink4';

function NavbarStart() {
  return (
    <div className="navbar-start">
      <div className="level">
        <div className="level-item">
          <Navlink1 />
        </div>
        <div className="level-item">
          <Navlink2 />
        </div>
        <div className="level-item">
          <Navlink3 />
        </div>
        <div className="level-item">
          <Navlink4 />
        </div>
      </div>
    </div>
  );
}

export default NavbarStart;
