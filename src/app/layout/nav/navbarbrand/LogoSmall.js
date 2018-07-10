import React from 'react';
import { NavLink } from 'react-router-dom';

class LogoSmall extends React.Component {
  render () {
    return (
      <NavLink className="navbar-item is-hidden-desktop small-navlogo"
        to="/"
        style={{
          marginRight: '0em !important'
        }}>
        <h2>WM</h2>
      </NavLink>
    )
  }
}

export default LogoSmall
