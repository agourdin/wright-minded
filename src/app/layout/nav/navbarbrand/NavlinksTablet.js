import React from 'react';

import NavlinkWhoIAmIconOnly from '../navlinks/NavlinkWhoIAmIconOnly';
import NavlinkHowItWorksIconOnly from '../navlinks/NavlinkHowItWorksIconOnly';
import NavlinkRatesAndServicesIconOnly from '../navlinks/NavlinkRatesAndServicesIconOnly';
import NavlinkResourcesIconOnly from '../navlinks/NavlinkResourcesIconOnly';

class NavlinksTablet extends React.Component {
  render () {
    return (
      <div className="navlinks-tablet"
          style={{
            margin: 'auto',
            position: 'relative',
            zIndex: '30'
          }}>
        <div className="tabs">
          <ul>
            <NavlinkWhoIAmIconOnly />
            <NavlinkHowItWorksIconOnly />
            <NavlinkRatesAndServicesIconOnly />
            <NavlinkResourcesIconOnly />
          </ul>
        </div>
      </div>
    )
  }
}

export default NavlinksTablet
