import React from 'react';
import IconRatesAndServices from '../icons/IconRatesAndServices';
import { NavLink } from 'react-router-dom';

class NavlinkRatesAndServicesIconOnly extends React.Component {
  render () {
    return (
      <NavLink className="navbar-item rates-and-services"
        to="/rates-and-services"
        activeClassName="is-active">
        <span><IconRatesAndServices /></span>
      </NavLink>
    )
  }
}

export default NavlinkRatesAndServicesIconOnly
