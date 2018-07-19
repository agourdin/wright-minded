import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from 'redux/actions/auth/logout';

import Dropdown from './userButton/Dropdown';

import IconUser from '../icons/IconUser';

class UserButton extends React.Component {
  render() {
    var username = this.props.auth.user.username;
    return (
      <div
        className="navbar-item"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="user-button">
          <Link to={'/user/' + username + '/dashboard'} className="user-icon">
            <IconUser />
          </Link>
          <Dropdown auth={this.props.auth} />
        </div>
      </div>
    );
  }
}

// BOILERPLATE
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: logout
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserButton);
