import React from 'react';
import { Link } from 'react-router-dom';

function LoginButton() {
  return (
    <div className="navbar-item">
      <Link to="/login" className="button login-button">
        Login
      </Link>
    </div>
  );
}

export default LoginButton;
