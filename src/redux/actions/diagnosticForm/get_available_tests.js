import { GET_AVAILABLE_TESTS } from '../types';
import { SERVER_URL, API_TESTS_AVAILABLE } from '../urls';
import axios from 'axios';

export default function getAvailableTests() {
  return dispatch => {
    var url = SERVER_URL + API_TESTS_AVAILABLE;
    axios.get(url).then(res => {
      const availabletests = res.data;
      dispatch(getAvailableTestsAsync(availabletests));
    });
  };
}

function getAvailableTestsAsync(availabletests) {
  return {
    type: GET_AVAILABLE_TESTS,
    payload: availabletests
  };
}
