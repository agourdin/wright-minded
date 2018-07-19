import React from 'react';
import Navburger from './navbarbrand/Navburger';
import Logo from './navbarbrand/Logo';

function NavbarBrand(props) {
  return (
    <div className="navbar-brand">
      <Logo />
      <Navburger
        isNavburgerActive={props.isNavburgerActive}
        navburgerClick={props.navburgerClick}
      />
    </div>
  );
}

export default NavbarBrand;
