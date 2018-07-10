import React from 'react';

import NavlinkWhoIAm from '../navlinks/NavlinkWhoIAm';
import NavlinkHowItWorks from '../navlinks/NavlinkHowItWorks';
import NavlinkRatesAndServices from '../navlinks/NavlinkRatesAndServices';
import NavlinkResources from '../navlinks/NavlinkResources';
import NavlinkResourcesDiagnosticTools from '../navlinks/NavlinkResourcesDiagnosticTools';
import NavlinkResourcesVideoCourses from '../navlinks/NavlinkResourcesVideoCourses';

class NavbarStart extends React.Component {
  render() {
    return (
      <div className="navbar-start">
        <div className="container is-hidden-desktop">
          <NavlinkWhoIAm />
          <NavlinkHowItWorks />
          <NavlinkRatesAndServices />
          <NavlinkResources />
          <NavlinkResourcesDiagnosticTools />
          <NavlinkResourcesVideoCourses />
        </div>
      </div>
    );
  }
}

export default NavbarStart;
