import React from 'react';
import { NavLink } from 'react-router-dom';

class Logo extends React.Component {
  render () {
    return (
      <NavLink className="navbar-item is-hidden-touch navlogo"
        to="/">
        <h2>Wright Minded</h2>
      </NavLink>

    )
  }
}

export default Logo
