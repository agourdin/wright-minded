import React from 'react';
import NavbarBrand from './nav/NavbarBrand';
import NavbarMenu from './nav/NavbarMenu';

export const doToggleNavburger = prevState => ({
  isNavburgerActive: !prevState.isNavburgerActive
});

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isNavburgerActive: false };
    this.toggleNavburger = this.toggleNavburger.bind(this);
  }

  toggleNavburger() {
    this.setState(doToggleNavburger);
  }

  render() {
    const isNavburgerActive = this.state.isNavburgerActive;
    return (
      <div className="container">
        <nav className="navbar is-fixed-top" aria-label="main navigation">
          <div
            className="navcontainer container"
            style={{
              paddingBottom: '0',
              marginBottom: '0'
            }}
          >
            <NavbarBrand
              isNavburgerActive={isNavburgerActive}
              navburgerClick={this.toggleNavburger}
            />
            <NavbarMenu isNavburgerActive={isNavburgerActive} />
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
