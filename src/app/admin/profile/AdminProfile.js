import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { dateTimeStringToDateString } from 'utils/fn';

import { loadUserProfile } from './duck/actions';

import Hero from 'common/wrappers/styling/Hero';

class UserProfile extends Component {
  render() {
    let user = this.props.auth.user;
    return (
      <Hero>
        <h1 className="has-text-green">
          Admin Profile for {user.first_name} {user.last_name}
        </h1>
        <p>Stuff goes here.</p>
      </Hero>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
