import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link, Redirect } from 'react-router-dom';

class UserProfile extends Component {
  render() {
    if (!this.props.auth.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="register hero is-fullheight">
        User Profile for {this.props.auth.user.first_name}
      </div>
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
