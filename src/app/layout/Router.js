import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import PasswordResetSent from './auth/PasswordResetSent';
import ConfirmPasswordReset from './auth/ConfirmPasswordReset';
import PasswordResetSuccess from './auth/PasswordResetSuccess';
import Home from './content/Home';
import WhoIAm from './content/WhoIAm';
import HowItWorks from './content/HowItWorks';
import RatesAndServices from './content/RatesAndServices';
import Resources from './content/Resources';
import DiagnosticTools from './content/resources/content/DiagnosticTools';
import VideoCourses from './content/resources/content/VideoCourses';

export default class Router extends React.Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route
                  path="/password-reset-sent"
                  component={PasswordResetSent}
                />
                <Route
                  path="/reset/:uid/:token/"
                  component={ConfirmPasswordReset}
                />
                <Route
                  path="/password-reset-successful"
                  component={PasswordResetSuccess}
                />
                <Route path="/who-i-am" component={WhoIAm} />
                <Route path="/how-it-works" component={HowItWorks} />
                <Route
                  path="/rates-and-services"
                  component={RatesAndServices}
                />
                <Route exact path="/resources" component={Resources} />
                <Route
                  exact
                  path="/resources/diagnostic-tools"
                  component={DiagnosticTools}
                />
                <Route
                  exact
                  path="/resources/video-courses"
                  component={VideoCourses}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}
