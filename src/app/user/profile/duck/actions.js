import types from './types';
import urls from './urls';
import axios from 'axios';

import { flattenObject } from 'utils/fn';

/////////////
// ACTIONS //
/////////////

export function loadUserProfile(id) {
  return (dispatch, getState) => {
    dispatch({ type: types.USER_PROFILE_LOADING });

    const token = getState().auth.token;

    let headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    let url = urls.API_USER_PROFILE + id;
    return axios({
      method: 'get',
      url: url,
      headers: headers
    })
      .then(res => {
        console.log(res);
        if (res.status < 500) {
          return { status: res.status, data: res.data };
        } else {
          console.log('Server Error!');
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          let profile = flattenObject(res.data[0]);
          dispatch({
            type: types.USER_PROFILE_LOADED,
            profile: profile
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
  loadUserProfile
};
