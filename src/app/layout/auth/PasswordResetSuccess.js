import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';

import { Link, Redirect } from 'react-router-dom';

import { resetPassword } from '../../../redux/actions/auth/resetPassword';

class PasswordResetSuccess extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login hero is-fullheight">
        Congratulations! Your password has been successfully reset!
        <Link to="/login">Click here to log in again</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  console.log(state);
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetPassword: resetPassword,
      push: push
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PasswordResetSuccess
);
