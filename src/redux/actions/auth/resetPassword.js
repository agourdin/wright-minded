import { PASSWORD_RESET_FAILED } from '../types';
import { SERVER_URL, API_AUTH_PASSWORD_RESET } from '../urls';
import axios from 'axios';

export const resetPassword = email => {
  return (dispatch, getState) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify({ email });
    let url = SERVER_URL + API_AUTH_PASSWORD_RESET;
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
        dispatch({ type: PASSWORD_RESET_FAILED, data: error.response.data });
        throw error.response.data;
      });
  };
};
