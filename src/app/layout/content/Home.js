import React from 'react';
import { Link } from 'react-router-dom';

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
              <h1 className="title is-1">Elite Private Tutoring</h1>
              <h2 className="subtitle is-3">Some stuff</h2>
              <Link
                className="learnmore-button button is-warning is-large"
                to="/who-i-am"
              >
                Learn More &nbsp;<i className="fal fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
