import React from 'react';

const Navburger = props => {
  const isNavburgerActive = props.isNavburgerActive;
  return (
    <div
      className={
        isNavburgerActive ? 'navbar-burger is-active' : 'navbar-burger'
      }
      onClick={props.navburgerClick}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  );
};

export default Navburger;
