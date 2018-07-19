import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link, Redirect } from 'react-router-dom';

class UserHome extends Component {
  render() {
    return (
      <div className="register hero is-fullheight">
        User Home for {this.props.auth.user.username}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
