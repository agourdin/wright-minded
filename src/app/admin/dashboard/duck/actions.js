import types from './types';
import urls from './urls';
import axios from 'axios';

import { flattenObject, addQueryParams } from 'utils/fn';
import { urlWithParams } from 'utils/helpers';

/////////////
// ACTIONS //
/////////////

export function loadClients(params) {
  return (dispatch, getState) => {
    dispatch({ type: types.CLIENT_PROFILES_LOADING });

    const token = getState().auth.token;

    let headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    let url = urls.API_CLIENT_PROFILES;
    url = urlWithParams(url, params);
    console.log(url);
    return axios({
      method: 'get',
      url: url,
      headers: headers
    })
      .then(res => {
        if (res.status < 500) {
          return { status: res.status, data: res.data };
        } else {
          console.log('Server Error!');
          throw res;
        }
      })
      .then(res => {
        let clientList = res.data.reduce(
          (clients, client) => ({ ...clients, [client.client.id]: client }),
          {}
        );
        if (res.status === 200) {
          dispatch({
            type: types.CLIENT_PROFILES_LOADED,
            clients: clientList
          });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        }
      });
  };
}

export function loadClient(clientid) {
  return (dispatch, getState) => {
    dispatch({ type: types.CLIENT_PROFILE_LOADING });

    const token = getState().auth.token;

    let headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    let url = urls.API_CLIENT_PROFILES + clientid + '/';
    console.log(url);
    return axios({
      method: 'get',
      url: url,
      headers: headers
    })
      .then(res => {
        if (res.status < 500) {
          return { status: res.status, data: res.data };
        } else {
          console.log('Server Error!');
          throw res;
        }
      })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          dispatch({
            type: types.CLIENT_PROFILE_LOADED,
            client: res.data
          });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        }
      });
  };
}

export default {
  loadClients,
  loadClient
};
