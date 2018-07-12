import React from 'react';
import { Link } from 'react-router-dom';

class ResourcesSplash extends React.Component {
  render() {
    return (
      <div className="container resources-splash" style={{ marginTop: '5em' }}>
        Resources Splash Page
        <br />
        <Link to="/resources/diagnostic-tools" className="resource-select">
          Diagnostic Tools
        </Link>
        <br />
        <Link to="/resources/video-courses" className="resource-select">
          Video Courses
        </Link>
      </div>
    );
  }
}

export default ResourcesSplash;
