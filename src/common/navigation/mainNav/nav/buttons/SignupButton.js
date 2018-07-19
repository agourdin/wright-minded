import React from 'react';
import { Link } from 'react-router-dom';

class SignupButton extends React.Component {
  render() {
    return (
      <div className="navbar-item">
        <Link to="/register" className="button signup-button">
          Sign Up
        </Link>
      </div>
    );
  }
}

export default SignupButton;
