import React from 'react';

import NavlinkWhoIAm from './navlinks/NavlinkWhoIAm';
import NavlinkHowItWorks from './navlinks/NavlinkHowItWorks';
import NavlinkRatesAndServices from './navlinks/NavlinkRatesAndServices';
import NavlinkResources from './navlinks/NavlinkResources';

function NavbarStart() {
  return (
    <div className="navbar-start">
      <div className="level">
        <div className="level-item">
          <NavlinkWhoIAm />
        </div>
        <div className="level-item">
          <NavlinkHowItWorks />
        </div>
        <div className="level-item">
          <NavlinkRatesAndServices />
        </div>
        <div className="level-item">
          <NavlinkResources />
        </div>
      </div>
    </div>
  );
}

export default NavbarStart;
