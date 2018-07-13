import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../../../redux/actions/auth/logout';

class LogoutButton extends React.Component {
  render() {
    return (
      <div className="navbar-item">
        <Link
          to="/"
          onClick={this.props.logout}
          className="button login-button"
        >
          Logout
        </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
