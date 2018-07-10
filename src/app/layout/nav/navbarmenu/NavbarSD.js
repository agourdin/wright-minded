import React from 'react'

import NavlinkWhoIAm from '../navlinks/NavlinkWhoIAm';
import NavlinkHowItWorks from '../navlinks/NavlinkHowItWorks';
import NavlinkRatesAndServices from '../navlinks/NavlinkRatesAndServices';
import NavlinkResources from '../navlinks/NavlinkResources';

class NavbarSD extends React.Component {
  render () {
    return (
      <div className="navlinks-sd is-hidden-touch"
            style={{
              margin: 'auto',
              position: 'relative',
              zIndex: '30'
            }}>
        <div className="tabs">
          <ul>
            <NavlinkWhoIAm />
            <NavlinkHowItWorks />
            <NavlinkRatesAndServices />
            <NavlinkResources />
          </ul>
        </div>
      </div>
    )
  }
}

export default NavbarSD
