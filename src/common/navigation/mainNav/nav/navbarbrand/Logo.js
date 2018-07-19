import React from 'react';
import { NavLink } from 'react-router-dom';

class Logo extends React.Component {
  render() {
    return (
      <div className="navbar-item logo">
        <NavLink className="" to="/">
          Wright Minded
        </NavLink>
        {/* <NavLink className="is-hidden-desktop" to="/">
          WM
        </NavLink> */}
      </div>
    );
  }
}

export default Logo;
