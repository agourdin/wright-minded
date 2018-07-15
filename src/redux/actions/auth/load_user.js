import { USER_LOADING, USER_LOADED, AUTHENTICATION_ERROR } from '../types';
import { SERVER_URL, API_AUTH_USER } from '../urls';
import axios from 'axios';

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    const token = getState().auth.token;

    let headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    // var url = 'http://localhost:8000/api/v0.1/auth/user';
    let url = SERVER_URL + API_AUTH_USER;
    return (
      axios({
        method: 'get',
        url: url,
        headers: headers
      })
        // return axios
        //   .get(url, { headers })
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
            dispatch({ type: USER_LOADED, user: res.data });
            return res.data;
          } else if (res.status >= 400 && res.status < 500) {
            dispatch({ type: AUTHENTICATION_ERROR, data: res.data });
            throw res.data;
          }
        })
    );
  };
};
