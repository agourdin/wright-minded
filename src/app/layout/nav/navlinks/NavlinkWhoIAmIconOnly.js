import React from 'react';
import IconWhoIAm from '../icons/IconWhoIAm';
import { NavLink } from 'react-router-dom';

class NavlinkWhoIAmIconOnly extends React.Component {
  render () {
    return (
      <NavLink className="navbar-item who-i-am"
        to="/who-i-am"
        activeClassName="is-active">
        <span><IconWhoIAm /></span>
      </NavLink>
    )
  }
}

export default NavlinkWhoIAmIconOnly
