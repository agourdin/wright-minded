import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link, Redirect } from 'react-router-dom';

import { login } from '../../../redux/actions/auth/login';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  componentDidMount() {
    this.usernameField.focus();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (this.props.errors.find(e => e.field === 'non_field_errors')) {
      var non_field_error = (
        <div className="bad-login">
          <div className="uh-oh">Uh oh!</div>
          <div className="error-message">
            {
              this.props.errors.find(e => e.field === 'non_field_errors')
                .message
            }
          </div>
        </div>
      );
    } else {
      non_field_error = null;
    }
    if (!this.state.username || !this.state.password) {
      var loginButton = <div className="button disabled">Login</div>;
    } else {
      loginButton = (
        <button className="button" type="submit">
          Login
        </button>
      );
    }
    return (
      <div className="login hero is-fullheight">
        <form className="login-form" onSubmit={this.onSubmit}>
          <div className="form">
            <div>{non_field_error}</div>
            <div className="control-group username">
              <label htmlFor="username">Username</label>
              <div className="controls">
                <input
                  type="text"
                  id="login_username"
                  ref={input => {
                    this.usernameField = input;
                  }}
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div className="error">
                  {this.props.errors.find(e => e.field === 'username') &&
                    this.props.errors.find(e => e.field === 'username').message}
                </div>
              </div>
            </div>
            <div className="control-group password">
              <label htmlFor="password">Password</label>
              <div className="controls">
                <input
                  type="password"
                  id="login_password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <div className="error">
                  {this.props.errors.find(e => e.field === 'password') &&
                    this.props.errors.find(e => e.field === 'password').message}
                </div>
              </div>
            </div>
            <div className="button-group">{loginButton}</div>

            <div className="columns">
              <div className="column register">
                <Link to="/register">Create an account</Link>
              </div>
              <div className="column forgot-password">
                <Link to="/forgot-password">Forgot password</Link>
              </div>
            </div>
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
      login: login
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

{
  /* <fieldset>
  <legend>Login</legend>
  {this.props.errors.length > 0 && (
    <ul>
      {this.props.errors.map(error => (
        <li key={error.field}>{error.message}</li>
      ))}
    </ul>
  )}
  <p>
    <label htmlFor="username">Username</label>
    <input
      type="text"
      id="username"
      onChange={e => this.setState({ username: e.target.value })}
    />
  </p>
  <p>
    <label htmlFor="password">Password</label>
    <input
      type="password"
      id="password"
      onChange={e => this.setState({ password: e.target.value })}
    />
  </p>
  <p>
    <button type="submit">Login</button>
  </p>

  <p>
    Don't have an account? <Link to="/register">Register</Link>
  </p>
</fieldset> */
}
