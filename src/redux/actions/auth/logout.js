import { LOGOUT_SUCCESSFUL, AUTHENTICATION_ERROR } from '../types';
import { SERVER_URL, API_AUTH_LOGOUT } from '../urls';
import axios from 'axios';

export const logout = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    let headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    let url = SERVER_URL + API_AUTH_LOGOUT;
    return axios({
      method: 'post',
      url: url,
      body: '',
      headers: headers
    })
      .then(res => {
        if (res.status === 204) {
          return { status: res.status, data: {} };
        } else if (res.status < 500) {
          return { status: res.status, data: res.data };
        } else {
          console.log('Server Error!');
          throw res;
        }
      })
      .then(res => {
        if (res.status === 204) {
          dispatch({ type: LOGOUT_SUCCESSFUL });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        }
      });
  };
};
