import React from 'react';
import { Link } from 'react-router-dom';

import { objectMapToArray } from 'utils/fn';

export function ClientList(props) {
  let clientList = props.clientList;
  return (
    <div>
      <h3>Clients</h3>
      {objectMapToArray(props.clientList, client => (
        <div key={client.client.id}>
          <Link to={'/dashboard/client/' + client.client.id}>
            {client.client.first_name} {client.client.last_name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ClientList;

// client => {
//   let c = client.client;
//   return (
//     <div key={c.id}>
//       <Link to={'/dashboard/client/' + c.id + '/'}>
//         <div>
//           {c.first_name} {c.last_name}
//         </div>
//         <div>({client.client_type})</div>
//       </Link>
//     </div>
//   );
// }
