import React from 'react';
import NavbarStart from './navbarmenu/NavbarStart';
import NavbarEnd from './navbarmenu/NavbarEnd';

function NavbarMenu(props) {
  const isNavburgerActive = props.isNavburgerActive;
  return (
    <div
      className={isNavburgerActive ? 'navbar-menu is-active' : 'navbar-menu'}
    >
      <NavbarStart />
      <NavbarEnd />
    </div>
  );
}

export default NavbarMenu;
