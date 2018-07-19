import React from 'react';
import Navburger from './navbarbrand/Navburger';
import Logo from './navbarbrand/Logo';
import NavbarStart from './navbarmenu/NavbarStart';

export default class NavbarBrand extends React.Component {
  render() {
    return (
      <div className="navbar-brand">
        <Logo />
        <Navburger
          isNavburgerActive={this.props.isNavburgerActive}
          navburgerClick={this.props.navburgerClick}
        />
      </div>
    );
  }
}
