import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { dateTimeStringToDateString } from 'utils/fn';

import { loadUserProfile } from './duck/actions';

import Hero from 'common/wrappers/styling/Hero';

class UserProfile extends Component {
  componentDidMount() {
    this.props.loadUserProfile(this.props.auth.user.id);
  }

  render() {
    if (this.props.user.isLoading) {
      return <Hero>Loading...</Hero>;
    }
    let profile = this.props.user.profile;
    return (
      <Hero>
        <h1 className="has-text-green">
          User Profile for {profile.first_name} {profile.last_name}
        </h1>
        <p>User since: {dateTimeStringToDateString(profile.created_at)}</p>
        <p>Email: {profile.email}</p>
        <p>City: {profile.city}</p>
        <p>Country: {profile.country}</p>
      </Hero>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.userProfile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadUserProfile: loadUserProfile
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
