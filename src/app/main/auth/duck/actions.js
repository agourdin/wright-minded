import types from './types';
import urls from './urls';
import axios from 'axios';

/////////////
// ACTIONS //
/////////////

export function loadUser() {
  return (dispatch, getState) => {
    dispatch({ type: types.USER_LOADING });

    const token = getState().auth.token;

    let headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    let url = urls.API_AUTH_USER;
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
        if (res.status === 200) {
          dispatch({ type: types.USER_LOADED, user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        }
      });
  };
}

export function login(username, password) {
  return (dispatch, getState) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify({ username, password });
    let url = urls.API_AUTH_LOGIN;
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
          dispatch({ type: types.LOGIN_SUCCESSFUL, data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        } else {
          console.log('Login failed');
          dispatch({ type: types.LOGIN_FAILED, data: res.data });
          throw res.data;
        }
      })
      .catch(error => {
        dispatch({ type: types.LOGIN_FAILED, data: error.response.data });
        throw error.response.data;
      });
  };
}

export function logout() {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    let headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    let url = urls.API_AUTH_LOGOUT;
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
          dispatch({ type: types.LOGOUT_SUCCESSFUL });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        }
      });
  };
}

export function register(username, email, password, first_name, last_name) {
  return (dispatch, getState) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify({
      username,
      email,
      password,
      first_name,
      last_name
    });
    let url = urls.API_AUTH_REGISTER;
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
          dispatch({ type: types.REGISTRATION_SUCCESSFUL, data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        } else {
          dispatch({ type: types.REGISTRATION_FAILED, data: res.data });
          throw res.data;
        }
      })
      .catch(error => {
        dispatch({
          type: types.REGISTRATION_FAILED,
          data: error.response.data
        });
        throw error.response.data;
      });
  };
}

export function resetPassword(email) {
  return (dispatch, getState) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify({ email });
    let url = urls.API_AUTH_PASSWORD_RESET;
    console.log('Firing resetPassword');
    return axios({
      method: 'post',
      url: url,
      data: body,
      headers: headers
    })
      .then(response => {})
      .catch(error => {
        // If request is bad...
        // Show an error to the user
        dispatch({
          type: types.PASSWORD_RESET_FAILED,
          data: error.response.data
        });
        throw error.response.data;
      });
  };
}

export function confirmPasswordReset(new_password1, new_password2, uid, token) {
  return (dispatch, getState) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify({ new_password1, new_password2, uid, token });
    let url = urls.API_AUTH_CONFIRM_PASSWORD_RESET;
    return axios({
      method: 'post',
      url: url,
      data: body,
      headers: headers
    })
      .then(res => {
        dispatch({ type: types.PASSWORD_RESET_SUCCESS, data: res.data });
      })
      .catch(error => {
        dispatch({
          type: types.PASSWORD_RESET_FAILED,
          data: error.response.data
        });
        throw error.response.data;
      });
  };
}

export default {
  loadUser,
  login,
  logout,
  register,
  resetPassword,
  confirmPasswordReset
};
