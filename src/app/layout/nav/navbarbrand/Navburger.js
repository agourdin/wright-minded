import React from 'react';

export default class Navburger extends React.Component {
  render() {
    const isNavburgerActive = this.props.isNavburgerActive;
    return (
      <div
        className={
          isNavburgerActive ? 'navbar-burger is-active' : 'navbar-burger'
        }
        onClick={this.props.navburgerClick}
        style={{
          position: 'relative',
          top: '0.05em'
        }}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </div>
    );
  }
}
