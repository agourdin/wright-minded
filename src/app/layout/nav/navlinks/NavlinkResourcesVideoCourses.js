import React from 'react';
import { NavLink } from 'react-router-dom';

import IconResourcesSublink from '../icons/IconResourcesSublink';

class NavlinkResourcesVideoCourses extends React.Component {
  render() {
    return (
      <NavLink
        className="navbar-item resources sublink"
        to="/resources/video-courses"
        activeClassName="is-active"
      >
        <span>
          <IconResourcesSublink />
        </span>
        Video Courses
      </NavLink>
    );
  }
}

export default NavlinkResourcesVideoCourses;
