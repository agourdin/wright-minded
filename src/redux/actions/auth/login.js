import { LOGIN_SUCCESSFUL, LOGIN_FAILED, AUTHENTICATION_ERROR } from '../types';
import axios from 'axios';

export const login = (username, password) => {
  return (dispatch, getState) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify({ username, password });
    let url = 'http://localhost:8000/api/v0.1/auth/login';
    return axios({
      method: 'post',
      url: url,
      data: body,
      headers: headers
    })
      .then(res => {
        if (res.status < 500) {
          console.log(res);
          console.log({ status: res.status, data: res.data });
          return { status: res.status, data: res.data };
        } else {
          console.log('Server Error!');
          throw res;
        }
      })
      .then(res => {
        console.log('Firing in second .then');
        console.log(res);
        if (res.status === 200) {
          console.log('200 successful');
          dispatch({ type: LOGIN_SUCCESSFUL, data: res.data });
          console.log(res.data);
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        } else {
          dispatch({ type: LOGIN_FAILED, data: res.data });
          throw res.data;
        }
      });
  };
};
