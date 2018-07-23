import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { dateTimeStringToDateString } from 'utils/fn';

import { loadClient } from '../duck/actions';

import Hero from 'common/wrappers/styling/Hero';

export function ClientProfile(props) {
  let client = props.clientList[props.match.params.id];
  return (
    <Hero>
      <h1 className="has-text-green">Client Profile</h1>
      <p>
        Client Profile for {client.client.first_name} {client.client.last_name}
      </p>
      <p>Stuff goes here.</p>
    </Hero>
  );
}

export default ClientProfile;

// class ClientProfile extends Component {
//   componentDidMount() {
//     this.props.loadClient(this.props.match.params.id);
//   }
//   render() {
//     console.log(this.props.client);
//     if (this.props.client.isLoading) {
//       return <h1>Loading...</h1>;
//     }
//     let user = this.props.auth.user;
//     console.log(user);
//     let client = this.props.client.client;
//     console.log(client);
//     let c = client.client;
//     return (
//       <Hero>
//         <h1 className="has-text-green">
//           Client Profile for {c.first_name} {c.last_name}
//         </h1>
//         <p>Stuff goes here.</p>
//       </Hero>
//     );
//   }
// }
//
// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//     client: state.clients
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {
//       loadClient: loadClient
//     },
//     dispatch
//   );
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile);
