import { LOGIN_SUCCESSFUL, LOGIN_FAILED, AUTHENTICATION_ERROR } from '../types';
import { SERVER_URL, API_AUTH_LOGIN } from '../urls';
import axios from 'axios';

export const login = (username, password) => {
  return (dispatch, getState) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify({ username, password });
    let url = SERVER_URL + API_AUTH_LOGIN;
    return axios({
      method: 'post',
      url: url,
      data: body,
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
        if (res.status === 200) {
          console.log('200 successful');
          dispatch({ type: LOGIN_SUCCESSFUL, data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        } else {
          console.log('Login failed');
          dispatch({ type: LOGIN_FAILED, data: res.data });
          throw res.data;
        }
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAILED, data: error.response.data });
        throw error.response.data;
      });
  };
};
