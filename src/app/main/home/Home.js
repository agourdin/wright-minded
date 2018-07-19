import React from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';

class Home extends React.Component {
  componentDidMount() {
    document.title = 'Wright Minded';
  }
  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="content has-text-centered">
              <Fade in={true} timeout={250} style={{ transitionDelay: 100 }}>
                <h1 className="title is-1">Elite Private Tutoring</h1>
              </Fade>
              <Fade in={true} timeout={250} style={{ transitionDelay: 175 }}>
                <h2 className="subtitle is-3">Some stuff</h2>
              </Fade>
              <Fade in={true} timeout={250} style={{ transitionDelay: 250 }}>
                <Link
                  className="learnmore-button button is-warning is-large"
                  to="/who-i-am"
                >
                  Learn More &nbsp;<i className="fal fa-arrow-right" />
                </Link>
              </Fade>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
