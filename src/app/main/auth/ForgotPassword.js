import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { Link, Redirect } from 'react-router-dom';

import { resetPassword } from './duck/actions';

class ForgotPassword extends Component {
  state = {
    email: ''
  };

  componentDidMount() {
    this.emailField.focus();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.resetPassword(this.state.email);
    this.props.history.push('/password-reset-sent');
  };

  render() {
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }
    if (!this.state.email) {
      var submitButton = <div className="button disabled">Submit</div>;
    } else {
      submitButton = (
        <button className="button" type="submit">
          Submit
        </button>
      );
    }
    return (
      <div className="login hero is-fullheight">
        <form className="login-form" onSubmit={this.onSubmit}>
          <div className="form">
            <div className="control-group email">
              <label htmlFor="username">Email</label>
              <div className="controls">
                <input
                  type="text"
                  id="forgot_password_email"
                  ref={input => {
                    this.emailField = input;
                  }}
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <div className="error">
                  {this.props.errors.find(e => e.field === 'email') &&
                    'Please enter a valid email address.'}
                </div>
              </div>
            </div>

            <div className="button-group">{submitButton}</div>
          </div>
        </form>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
