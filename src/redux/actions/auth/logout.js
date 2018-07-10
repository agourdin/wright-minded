import { LOGOUT_SUCCESSFUL, AUTHENTICATION_ERROR } from '../types';
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
    let url = 'http://localhost:8000/api/v0.1/auth/logout';
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
          console.log('Res.status = 204');
          dispatch({ type: LOGOUT_SUCCESSFUL });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        }
      });
  };
};
