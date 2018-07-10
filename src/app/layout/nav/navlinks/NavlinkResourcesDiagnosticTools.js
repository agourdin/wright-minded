import React from 'react';
import { NavLink } from 'react-router-dom';

import IconResourcesSublink from '../icons/IconResourcesSublink';

class NavlinkResourcesDiagnosticTools extends React.Component {
  render() {
    return (
      <NavLink
        className="navbar-item resources sublink"
        to="/resources/diagnostic-tools"
        activeClassName="is-active"
      >
        <span>
          <IconResourcesSublink />
        </span>
        Diagnostic Tools
      </NavLink>
    );
  }
}

export default NavlinkResourcesDiagnosticTools;
