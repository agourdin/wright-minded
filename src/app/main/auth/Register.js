import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link, Redirect } from 'react-router-dom';

import './styles/register.css';

import { register } from './duck/actions';

class Register extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    passwordError: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this._input.focus();
  }

  onSubmit = e => {
    e.preventDefault();
    let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let username = this.state.email;
    let email = this.state.email;
    let password = this.state.password;
    if (this.state.password === this.state.password2) {
      this.props.register(username, email, password, first_name, last_name);
    } else {
      this.setState({ passwordError: true });
    }
  };

  render() {
    if (this.state.passwordError) {
      var passwordError = <div className="error">Passwords don't match!</div>;
    } else {
      passwordError = null;
    }
    // if (this.props.errors.find(e => e.field === 'non_field_errors')) {
    //   var non_field_error = (
    //     <div className="bad-login">
    //       <div className="uh-oh">Uh oh!</div>
    //       <div className="error-message">
    //         {
    //           this.props.errors.find(e => e.field === 'non_field_errors')
    //             .message
    //         }
    //       </div>
    //     </div>
    //   );
    // } else {
    //   non_field_error = null;
    // }
    if (
      !this.state.first_name ||
      !this.state.last_name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.password2
    ) {
      var registerButton = <div className="button disabled">Register</div>;
    } else {
      registerButton = (
        <button className="button" type="submit">
          Register
        </button>
      );
    }
    return (
      <div className="register hero is-fullheight">
        <form className="register-form" onSubmit={this.onSubmit}>
          <div className="form">
            <div className="columns">
              <div className="first-name column">
                <div className="control-group username">
                  <label htmlFor="first_name">First name</label>
                  <div className="controls">
                    <input
                      type="text"
                      id="register_first_name"
                      placeholder="e.g. Jane"
                      ref={input => (this._input = input)}
                      onChange={e =>
                        this.setState({ first_name: e.target.value })
                      }
                    />
                    <div className="error">
                      {this.props.errors.find(e => e.field === 'first_name') &&
                        'First name error!'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="last-name column">
                <div className="control-group username">
                  <label htmlFor="last_name">Last name</label>
                  <div className="controls">
                    <input
                      type="text"
                      id="register_last_name"
                      placeholder="e.g. Smith"
                      onChange={e =>
                        this.setState({ last_name: e.target.value })
                      }
                    />
                    <div className="error">
                      {this.props.errors.find(e => e.field === 'last_name') &&
                        'Last name error!'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="control-group email">
              <label htmlFor="email">Email address</label>
              <div className="controls">
                <input
                  type="text"
                  id="register_email"
                  placeholder="e.g. jsmith@example.com"
                  onChange={e =>
                    this.setState({
                      email: e.target.value,
                      username: e.target.value
                    })
                  }
                />
                <div className="error">
                  {this.props.errors.find(e => e.field === 'email') &&
                    'Please enter a valid email address!'}
                </div>
              </div>
            </div>
            <div className="control-group password">
              <label htmlFor="password">Password</label>
              <div className="controls">
                <input
                  type="password"
                  id="register_password"
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
              </div>
            </div>

            <div className="button-group">{registerButton}</div>
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
