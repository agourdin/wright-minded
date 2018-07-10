import React from 'react';
import IconResources from '../icons/IconResources';
import { NavLink } from 'react-router-dom';

class NavlinkResourcesIconOnly extends React.Component {
  render () {
    return (
      <NavLink className="navbar-item resources"
        to="/resources"
        activeClassName="is-active">
        <span><IconResources /></span>
      </NavLink>
    )
  }
}

export default NavlinkResourcesIconOnly
