import React from 'react'

import NavlinkWhoIAm from '../navlinks/NavlinkWhoIAm';
import NavlinkHowItWorks from '../navlinks/NavlinkHowItWorks';
import NavlinkRatesAndServices from '../navlinks/NavlinkRatesAndServices';
import NavlinkResources from '../navlinks/NavlinkResources';

class NavbarFull extends React.Component {
  render () {
    return (
      <div className="navlinks-full is-hidden-touch"
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

export default NavbarFull
