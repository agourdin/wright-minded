import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import IconLogout from '../../../icons/IconLogout';

import { logout } from 'app/main/auth/duck/actions';

function NavlinkLogout(props) {
  return (
    <NavLink className="dropdown-item" to="/" onClick={props.logout}>
      <span>
        <IconLogout />
      </span>
      <span>Logout</span>
    </NavLink>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: logout
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(NavlinkLogout);
