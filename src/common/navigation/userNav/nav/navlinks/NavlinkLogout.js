import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import IconLogout from '../icons/IconLogout';

import { logout } from 'app/main/auth/duck/actions';

class NavlinkLogout extends React.Component {
  render() {
    return (
      <NavLink className="dropdown-item" to="/" onClick={this.props.logout}>
        <span>
          <IconLogout />
        </span>
        <span>Logout</span>
      </NavLink>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: logout
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavlinkLogout);
