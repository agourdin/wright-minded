import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';

import { Link, Redirect } from 'react-router-dom';

import { resetPassword } from './duck/actions';

class PasswordResetSent extends Component {
  render() {
    return (
      <div className="login hero is-fullheight">
        Instructions to reset your password have been sent to the email you
        provided. If you can't find the email, please check your spam folder. If
        you still can't find the email,{' '}
        <Link to="/forgot-password">try resetting again</Link>, double checking
        to make sure you enter the email you have associated with your Wright
        Minded account.
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetSent);
