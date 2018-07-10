import React from 'react';
import IconHowItWorks from '../icons/IconHowItWorks';
import { NavLink } from 'react-router-dom';

class NavlinkHowItWorksIconOnly extends React.Component {
  render () {
    return (
      <NavLink className="navbar-item how-it-works"
        to="/how-it-works"
        activeClassName="is-active">
        <span><IconHowItWorks /></span>
      </NavLink>
    )
  }
}

export default NavlinkHowItWorksIconOnly
