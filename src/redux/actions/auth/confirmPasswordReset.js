import { PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILED } from '../types';
import { SERVER_URL, API_AUTH_CONFIRM_PASSWORD_RESET } from '../urls';
import axios from 'axios';

export const confirmPasswordReset = (
  new_password1,
  new_password2,
  uid,
  token
) => {
  return (dispatch, getState) => {
    // const { uid, token } = props.match.params;
    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify({ new_password1, new_password2, uid, token });
    let url = SERVER_URL + API_AUTH_CONFIRM_PASSWORD_RESET;
    return axios({
      method: 'post',
      url: url,
      data: body,
      headers: headers
    })
      .then(res => {
        dispatch({ type: PASSWORD_RESET_SUCCESS, data: res.data });
      })
      .catch(error => {
        dispatch({ type: PASSWORD_RESET_FAILED, data: error.response.data });
        throw error.response.data;
      });
  };
};
