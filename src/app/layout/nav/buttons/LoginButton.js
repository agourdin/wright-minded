import React from 'react';
import { Link } from 'react-router-dom';

class LoginButton extends React.Component {
  render() {
    return (
      <div className="navbar-item">
        <Link to="/login" className="login-button">
          Login
        </Link>
      </div>
    );
  }
}

export default LoginButton;
