import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Common
import MainNav from 'common/navigation/MainNav';
import Footer from 'common/footer/Footer';
import DiagnosticForm from 'common/testDiagnostics/DiagnosticForm';
// Auth
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import PasswordResetSent from './auth/PasswordResetSent';
import ConfirmPasswordReset from './auth/ConfirmPasswordReset';
import PasswordResetSuccess from './auth/PasswordResetSuccess';
// Main
import Home from './home/Home';
import WhoIAm from './whoIAm/WhoIAm';
import HowItWorks from './howItWorks/HowItWorks';
import RatesAndServices from './ratesAndServices/RatesAndServices';
import Resources from './resources/Resources';
import NotFound from 'common/notFound/NotFound';

function Main() {
  return (
    <div>
      <MainNav />
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={86} classNames="fade">
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />
                <Route
                  exact
                  path="/password-reset-sent"
                  component={PasswordResetSent}
                />
                <Route
                  exact
                  path="/reset/:uid/:token/"
                  component={ConfirmPasswordReset}
                />
                <Route
                  exact
                  path="/password-reset-successful"
                  component={PasswordResetSuccess}
                />
                <Route exact path="/who-i-am" component={WhoIAm} />
                <Route exact path="/how-it-works" component={HowItWorks} />
                <Route
                  exact
                  path="/rates-and-services"
                  component={RatesAndServices}
                />
                <Route exact path="/resources" component={Resources} />
                <Route
                  exact
                  path="/resources/diagnostic-tools"
                  component={DiagnosticForm}
                />
                <Route
                  exact
                  path="/resources/video-courses"
                  component={() => (
                    <div style={{ marginTop: '5em' }}>Video Courses</div>
                  )}
                />
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

export default Main;
