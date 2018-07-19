import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';

//// Components
// Common
import Nav from 'common/navigation/userNav/Nav';
import Footer from 'common/footer/Footer';
import NotFound from 'common/notFound/NotFound';
// User
import UserHome from './userHome/UserHome';
import UserDashboard from './userDashboard/UserDashboard';
import UserProfile from './userProfile/UserProfile';

export const User = () => {
  return (
    <div>
      <Nav />
      <Route exact path="/" component={UserHome} />
      <Route exact path="/dashboard" component={UserDashboard} />
      <Route exact path="/profile" component={UserProfile} />
      <Route component={NotFound} />
      <Footer />
    </div>
  );
};

export default User;
