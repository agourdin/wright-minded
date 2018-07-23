import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { flattenObject } from 'utils/fn';
import { loadClients } from './duck/actions';

import Hero from 'common/wrappers/styling/Hero';

import ClientList from './components/ClientList';
import ClientProfile from './clientProfile/ClientProfile';

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.loadClients(this.props.auth.user.id);
  }
  render() {
    if (this.props.clients.isLoading) {
      return <h1>Loading...</h1>;
    }
    let user = this.props.auth.user;
    return (
      <Hero>
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={() => (
              <div>
                <h1 className="has-text-red">
                  Admin Dashbaord for {user.first_name} {user.last_name}
                </h1>
                <ClientList clientList={this.props.clients.clientList} />
              </div>
            )}
          />
          <Route
            path="/dashboard/client/:id"
            render={props => (
              <ClientProfile
                {...props}
                clientList={this.props.clients.clientList}
              />
            )}
          />
        </Switch>
      </Hero>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    clients: state.clients
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadClients: loadClients
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
