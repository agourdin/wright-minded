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

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      console.log(this.props);
      return <Redirect to="/" />;
    }
    return (
      <div style={{ marginTop: '5em' }}>
        <form onSubmit={this.onSubmit}>
          <fieldset>
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
          </fieldset>
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
