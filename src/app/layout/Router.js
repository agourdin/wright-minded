import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './auth/Login';
import Register from './auth/Register';
import Home from './content/Home';
import WhoIAm from './content/WhoIAm';
import HowItWorks from './content/HowItWorks';
import RatesAndServices from './content/RatesAndServices';
import Resources from './content/Resources';
import DiagnosticTools from './content/resources/content/DiagnosticTools';
import VideoCourses from './content/resources/content/VideoCourses';

class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/who-i-am" component={WhoIAm} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/rates-and-services" component={RatesAndServices} />
        <Route exact path="/resources" component={Resources} />
        <Route
          exact
          path="/resources/diagnostic-tools"
          component={DiagnosticTools}
        />
        <Route exact path="/resources/video-courses" component={VideoCourses} />
      </Switch>
    );
  }
}

export default Router;

// OLD WORKING VERSION
// class Router extends React.Component {
//   render () {
//     return (
//       <Switch>
//         <Route exact path='/' component={Home}/>
//         <Route path='/who-i-am' component={WhoIAm}/>
//         <Route path='/how-it-works' component={HowItWorks}/>
//         <Route path='/rates-and-services' component={RatesAndServices}/>
//         <Route exact path='/resources' component={Resources}/>
//       </Switch>
//     )
//   }
// }
//
// export default Router
