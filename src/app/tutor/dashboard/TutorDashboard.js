import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { flattenObject } from 'utils/fn';
import { loadClients } from './duck/actions';

import Hero from 'common/wrappers/styling/Hero';

import ClientList from './components/ClientList';
import ClientProfile from './clientProfile/ClientProfile';

class TutorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        tutorid: this.props.auth.user.id
      }
    };

    this.handleEnrollmentStatusFilter = this.handleEnrollmentStatusFilter.bind(
      this
    );
  }

  componentDidMount() {
    this.props.loadClients({ tutorid: this.state.params.tutorid });
  }

  handleEnrollmentStatusFilter(status) {
    if (status === '') {
      let newParams = this.state.params;
      delete newParams['status'];
      this.props.loadClients(newParams);
    } else {
      this.props.loadClients({
        ...this.state.params,
        status: status
      });
    }
    this.setState(prevState => (prevState.params['status'] = status));
  }

  render() {
    if (this.props.clients.isLoading) {
      return (
        <Hero>
          <h1>Loading...</h1>
        </Hero>
      );
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
                  Tutor Dashboard for {user.first_name} {user.last_name}
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
        <button
          className="button"
          onClick={() => this.handleEnrollmentStatusFilter('active')}
        >
          ACTIVE
        </button>
        <button
          className="button"
          onClick={() => this.handleEnrollmentStatusFilter('inactive')}
        >
          INACTIVE
        </button>
        <button
          className="button"
          onClick={() => this.handleEnrollmentStatusFilter('')}
        >
          ALL
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TutorDashboard);
