import React from 'react';
import onClickOutside from 'react-onclickoutside';

import './styles/nav.css';

import NavbarBrand from './common/NavbarBrand';
import NavbarMenu from './userNav/NavbarMenu';

export const doToggleNavburger = prevState => ({
  isNavburgerActive: !prevState.isNavburgerActive
});

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isNavburgerActive: false };
    this.toggleNavburger = this.toggleNavburger.bind(this);
  }

  handleClickOutside(event) {
    this.setState({
      isNavburgerActive: false
    });
  }

  toggleNavburger() {
    this.setState(doToggleNavburger);
  }

  render() {
    const isNavburgerActive = this.state.isNavburgerActive;
    return (
      <nav className="navbar is-fixed-top" aria-label="main navigation">
        <NavbarBrand
          isNavburgerActive={isNavburgerActive}
          navburgerClick={this.toggleNavburger}
        />
        <NavbarMenu
          isNavburgerActive={isNavburgerActive}
          isAuthenticated={this.props.isAuthenticated}
        />
      </nav>
    );
  }
}

export default onClickOutside(Nav);
