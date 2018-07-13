import {
  REGISTRATION_SUCCESSFUL,
  REGISTRATION_FAILED,
  AUTHENTICATION_ERROR
} from '../types';
import { SERVER_URL, API_AUTH_REGISTER } from '../urls';
import axios from 'axios';

export function register(username, email, password) {
  return (dispatch, getState) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify({ username, email, password });
    let url = SERVER_URL + API_AUTH_REGISTER;
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
          dispatch({ type: REGISTRATION_SUCCESSFUL, data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        } else {
          dispatch({ type: REGISTRATION_FAILED, data: res.data });
          throw res.data;
        }
      })
      .catch(error => {
        dispatch({ type: REGISTRATION_FAILED, data: error.response.data });
        throw error.response.data;
      });
  };
}
