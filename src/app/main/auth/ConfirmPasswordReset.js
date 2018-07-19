import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { Link, Redirect } from 'react-router-dom';

import { confirmPasswordReset } from 'redux/actions/auth/confirmPasswordReset';

class ConfirmPasswordReset extends Component {
  state = {
    password: '',
    password2: '',
    passwordError: false
  };

  componentDidMount() {
    this.passwordField.focus();
  }

  onSubmit = e => {
    e.preventDefault();
    var password = this.state.password;
    var password2 = this.state.password2;
    if (this.state.password === this.state.password2) {
      let uid = this.props.match.params.uid;
      let token = this.props.match.params.token;
      this.props.confirmPasswordReset(password, password2, uid, token);
    } else {
      this.setState({ passwordError: true });
    }
  };

  render() {
    if (this.props.passwordResetSuccess) {
      this.props.history.push('/password-reset-successful');
    }
    if (this.state.passwordError) {
      var passwordError = <div className="error">Passwords don't match!</div>;
    } else {
      passwordError = null;
    }
    if (!this.state.password || !this.state.password2) {
      var submitButton = <div className="button disabled">Change Password</div>;
    } else {
      submitButton = (
        <button className="button" type="submit">
          Change Password
        </button>
      );
    }
    return (
      <div className="register hero is-fullheight">
        <form className="register-form" onSubmit={this.onSubmit}>
          <div className="form">
            <div className="control-group password">
              <label htmlFor="password">Password</label>
              <div className="controls">
                <input
                  type="password"
                  id="register_password"
                  ref={input => {
                    this.passwordField = input;
                  }}
                  onChange={e =>
                    this.setState({
                      password: e.target.value,
                      passwordError: false
                    })
                  }
                />
              </div>
            </div>

            <div className="control-group password two">
              <label htmlFor="password">Confirm Password</label>
              <div className="controls">
                <input
                  type="password"
                  id="register_password2"
                  onChange={e =>
                    this.setState({
                      password2: e.target.value,
                      passwordError: false
                    })
                  }
                />
                <div>{passwordError}</div>
                <div className="error">
                  {this.props.errors.find(e => e.field === 'new_password2') &&
                    this.props.errors.find(e => e.field === 'new_password2')
                      .message}
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
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
    passwordResetSuccess: state.auth.passwordResetSuccess
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      confirmPasswordReset: confirmPasswordReset
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConfirmPasswordReset)
);
