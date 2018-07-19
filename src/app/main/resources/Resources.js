import React from 'react';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';

export default class Resources extends React.Component {
  componentDidMount() {
    document.title = 'Resources';
  }
  render() {
    return (
      <div className="container resources-splash">
        <div className="columns is-8">
          <div className="column">
            <Fade in={true} timeout={250} style={{ transitionDelay: 50 }}>
              <div>
                <Link to="/resources/video-courses">
                  <div className="resource-select videos">
                    <div style={{ marginRight: '0.5em' }}>
                      <i className="fas fa-arrow-left" />
                    </div>
                    <div>Video Courses</div>
                  </div>
                </Link>
                <div className="description">
                  Watch videos on SAT questions and more.
                </div>
              </div>
            </Fade>
          </div>
          <div className="column">
            <Fade in={true} timeout={250} style={{ transitionDelay: 100 }}>
              <div>
                <Link to="/resources/diagnostic-tools">
                  <div className="resource-select tools">
                    <div>Diagnostic Tools</div>
                    <div style={{ marginLeft: '0.5em' }}>
                      <i className="fas fa-arrow-right" />
                    </div>
                  </div>
                </Link>
                <div className="description">
                  Enter your answers to a test and get a diagnostic breakdown.
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    );
  }
}
