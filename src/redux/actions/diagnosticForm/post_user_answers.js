// import { POST_USER_ANSWERS } from '../types';
import setDiagnosticInProgressStatus from './set_diagnostic_in_progress_status';
import axios from 'axios';

export default function postUserAnswers(
  user,
  test,
  encoded_answer,
  encoder_string
) {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    var url = 'http://localhost:8000/api/v0.1/user_answers/';
    var body = JSON.stringify({ user, test, encoded_answer, encoder_string });
    console.log(body);
    return axios({
      method: 'post',
      url: url,
      data: body,
      headers: headers
    }).then(res => {
      dispatch(setDiagnosticInProgressStatus(false));
    });
  };
}
