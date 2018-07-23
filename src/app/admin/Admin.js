import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//// Components
// Common
import UserNav from 'common/navigation/UserNav';
import Footer from 'common/footer/Footer';
import NotFound from 'common/notFound/NotFound';
// User
import AdminHome from './home/AdminHome';
import AdminProfile from './profile/AdminProfile';
import AdminDashboard from './dashboard/AdminDashboard';
import ClientProfile from './dashboard/clientProfile/ClientProfile';

function Admin() {
  return (
    <div>
      <UserNav />
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={86} classNames="fade">
              <Switch location={location}>
                <Redirect from="/login" to="/" />
                <Redirect from="/register" to="/" />
                <Route exact path="/" component={AdminHome} />
                <Route exact path="/profile" component={AdminProfile} />
                <Route path="/dashboard" component={AdminDashboard} />
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

export default Admin;
