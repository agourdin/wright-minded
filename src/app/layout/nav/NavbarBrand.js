import React from 'react';
import Navburger from './navbarbrand/Navburger';
import Logo from './navbarbrand/Logo';
import LogoSmall from './navbarbrand/LogoSmall';
import NavlinksTablet from './navbarbrand/NavlinksTablet';
import SmallUserAuth from './navbarbrand/SmallUserAuth';

export default class NavbarBrand extends React.Component {
  render() {
    const isNavburgerActive = this.props.isNavburgerActive;
    return (
      <div className="navbar-brand">
        <Navburger
          isNavburgerActive={isNavburgerActive}
          navburgerClick={this.props.navburgerClick}
        />
        <Logo />
        <LogoSmall />
        <NavlinksTablet />
        <SmallUserAuth />
      </div>
    );
  }
}
