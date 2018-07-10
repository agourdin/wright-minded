import React from 'react';
import NavbarStart from './navbarmenu/NavbarStart';
import NavbarSD from './navbarmenu/NavbarSD';
import NavbarFull from './navbarmenu/NavbarFull';
import NavbarEnd from './navbarmenu/NavbarEnd';

export default class NavbarMenu extends React.Component {
  render() {
    const isNavburgerActive = this.props.isNavburgerActive;
    return (
      <div
        className={isNavburgerActive ? 'navbar-menu is-active' : 'navbar-menu'}
      >
        <NavbarStart />
        <NavbarSD />
        <NavbarFull />
        <NavbarEnd />
      </div>
    );
  }
}
