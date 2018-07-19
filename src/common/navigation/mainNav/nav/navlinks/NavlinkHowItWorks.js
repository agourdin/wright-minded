import React from 'react';
import IconHowItWorks from '../icons/IconHowItWorks';
import { NavLink } from 'react-router-dom';

class NavlinkHowItWorks extends React.Component {
  render() {
    return (
      <NavLink
        className="navbar-item has-text-blue"
        to="/how-it-works"
        activeClassName="is-active"
      >
        <span>
          <IconHowItWorks />
        </span>
        <span className="tablet">How It Works</span>
      </NavLink>
    );
  }
}

export default NavlinkHowItWorks;
