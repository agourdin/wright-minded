import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link, Redirect } from 'react-router-dom';

import { register } from '../../../redux/actions/auth/register';

class Register extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    passwordError: false
  };

  componentDidMount() {
    this.usernameField.focus();
  }

  onSubmit = e => {
    e.preventDefault();
    var username = this.state.username;
    var email = this.state.email;
    var password = this.state.password;
    if (this.state.password === this.state.password2) {
      this.props.register(username, email, password);
    } else {
      this.setState({ passwordError: true });
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
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
      !this.state.username ||
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
            {/* <div className="control-group name">
              <label htmlFor="name">Your name</label>
              <div className="controls">
                <input
                  type="name"
                  id="register_name"
                  ref={input => {
                    this.usernameField = input;
                  }}
                  placeholder="We use this to help customize the site for you."
                  onChange={e =>
                    this.setState({
                      name: e.target.value
                    })
                  }
                />
              </div>
            </div> */}
            <div className="columns">
              <div className="username column">
                <div className="control-group username">
                  <label htmlFor="username">Username</label>
                  <div className="controls">
                    <input
                      type="text"
                      id="register_username"
                      placeholder="e.g. jsmith"
                      ref={input => {
                        this.usernameField = input;
                      }}
                      onChange={e =>
                        this.setState({ username: e.target.value })
                      }
                    />
                    <div className="error">
                      {this.props.errors.find(e => e.field === 'username') &&
                        'Username is already taken!'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="email column">
                <div className="control-group email">
                  <label htmlFor="email">Email address</label>
                  <div className="controls">
                    <input
                      type="text"
                      id="register_email"
                      placeholder="e.g. jsmith@example.com"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                    <div className="error">
                      {this.props.errors.find(e => e.field === 'email') &&
                        'Please enter a valid email address!'}
                    </div>
                  </div>
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

{
  /* <div style={{ marginTop: '5em' }}>
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
</div> */
}
