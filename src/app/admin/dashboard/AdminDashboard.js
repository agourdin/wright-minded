import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { flattenObject, removeFromArray } from 'utils/fn';
import { manageParams } from 'utils/helpers';
import { loadClients } from './duck/actions';

import Hero from 'common/wrappers/styling/Hero';

import ClientList from './components/ClientList';
import ClientProfile from './clientProfile/ClientProfile';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleFilters = this.handleFilters.bind(this);
  }

  componentDidMount() {
    this.props.loadClients();
  }

  handleFilters(params, namespace) {
    this.setState(manageParams(params, namespace), () => {
      this.props.loadClients(this.state[namespace]);
    });
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
        {/* <input
          className="input"
          value={this.state.params.tutorids}
          onChange={e => {
            this.setState(prevState => {
              prevState['tutorids'] += e;
            });
            this.handleTutorFilter(this.state.params.tutorids);
          }}
        /> */}
        <button
          className="button"
          onClick={() =>
            this.handleFilters({ enrollment_status: 'active' }, 'client_params')
          }
        >
          ACTIVE
        </button>
        <button
          className="button"
          onClick={() =>
            this.handleFilters(
              { enrollment_status: 'inactive' },
              'client_params'
            )
          }
        >
          INACTIVE
        </button>
        <div className="button-group">
          <button
            className="button"
            onClick={() => {
              console.log('hit button 15');
              this.handleFilters({ tutor_m: '15' }, 'client_params');
            }}
          >
            15
          </button>
          <button
            className="button"
            onClick={() => {
              console.log('hit button 16');
              this.handleFilters({ tutor_m: '16' }, 'client_params');
            }}
          >
            16
          </button>
          <button
            className="button"
            onClick={() => {
              console.log('hit button 17');
              this.handleFilters({ tutor_m: '17' }, 'client_params');
            }}
          >
            17
          </button>
          <button
            className="button"
            onClick={() => this.handleFilters({ tutor_m: '' }, 'client_params')}
          >
            Clear
          </button>
        </div>

        <button
          className="button"
          onClick={() => {
            this.handleFilters();
          }}
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
