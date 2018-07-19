import React from 'react';
import IconWhoIAm from '../../icons/IconWhoIAm';
import { NavLink } from 'react-router-dom';

function NavlinkWhoIAm() {
  return (
    <NavLink
      className="navbar-item has-text-red"
      to="/who-i-am"
      activeClassName="is-active"
    >
      <span>
        <IconWhoIAm />
      </span>
      <span className="tablet">Who I Am</span>
    </NavLink>
  );
}

export default NavlinkWhoIAm;
