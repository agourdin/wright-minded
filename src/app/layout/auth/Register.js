import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link, Redirect } from 'react-router-dom';

import { register } from '../../../redux/actions/auth/register';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: ''
  };

  onSubmit = e => {
    e.preventDefault();
    var username = this.state.username;
    var email = this.state.email;
    var password = this.state.password;
    if (this.state.password === this.state.password2) {
      this.props.register(username, email, password);
    } else {
      alert("Passwords don't match!");
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ marginTop: '5em' }}>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Register</legend>
            {this.props.errors.length > 0 && (
              <ul>
                {this.props.errors.map(error => (
                  <li key={error.field}>{error.message}</li>
                ))}
              </ul>
            )}
            <p>
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                id="email"
                onChange={e => this.setState({ email: e.target.value })}
              />
            </p>
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
              <label htmlFor="password">Confirm password</label>
              <input
                type="password"
                id="password2"
                onChange={e => this.setState({ password2: e.target.value })}
              />
            </p>
            <p>
              <button type="submit">Register</button>
            </p>

            <p>
              Already have an account? <Link to="/login">Login</Link>
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
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      register: register
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
