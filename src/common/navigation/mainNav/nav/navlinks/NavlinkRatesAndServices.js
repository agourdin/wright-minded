import React from 'react';
import IconRatesAndServices from '../icons/IconRatesAndServices';
import { NavLink } from 'react-router-dom';

class NavlinkRatesAndServices extends React.Component {
  render() {
    return (
      <NavLink
        className="navbar-item has-text-green"
        to="/rates-and-services"
        activeClassName="is-active"
      >
        <span>
          <IconRatesAndServices />
        </span>
        <span className="tablet">Rates & Services</span>
      </NavLink>
    );
  }
}

export default NavlinkRatesAndServices;
