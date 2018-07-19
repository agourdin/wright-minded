import React from 'react';
import { Link } from 'react-router-dom';

function SignupButton() {
  return (
    <div className="navbar-item">
      <Link to="/register" className="button signup-button">
        Sign Up
      </Link>
    </div>
  );
}

export default SignupButton;
