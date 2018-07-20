import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//// Components
// Common
import UserNav from 'common/navigation/UserNav';
import Footer from 'common/footer/Footer';
import NotFound from 'common/notFound/NotFound';
// User
import UserHome from './home/UserHome';
import UserDashboard from './dashboard/UserDashboard';
import UserProfile from './profile/UserProfile';

function User() {
  return (
    <div>
      <UserNav />
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={100} classNames="fade">
              <Switch location={location}>
                <Redirect from="/login" to="/" />
                <Redirect from="/register" to="/" />
                <Route exact path="/" component={UserHome} />
                <Route exact path="/dashboard" component={UserDashboard} />
                <Route exact path="/profile" component={UserProfile} />
                <Route component={NotFound} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
      <Footer />
    </div>
  );
}

export default User;
