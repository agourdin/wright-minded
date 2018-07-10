import React from 'react';
import IconRatesAndServices from '../icons/IconRatesAndServices';
import { NavLink } from 'react-router-dom';

class NavlinkRatesAndServices extends React.Component {
  render () {
    return (
      <NavLink className="navbar-item rates-and-services"
        to="/rates-and-services"
        activeClassName="is-active">
        <span><IconRatesAndServices /></span>
        Rates & Services
      </NavLink>
    )
  }
}

export default NavlinkRatesAndServices
