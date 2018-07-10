import { LOAD_SAT_CONVERSION_TO_STORE } from '../types';
import { SERVER_URL, API_SAT_SCORE_CONVERSIONS } from '../urls';
import axios from 'axios';

export default function loadSATConversionToStore(testid) {
  return dispatch => {
    var url = SERVER_URL + API_SAT_SCORE_CONVERSIONS + testid;
    axios.get(url).then(res => {
      const conversionChart = res.data;
      dispatch(loadSATConversionToStoreAsync(conversionChart));
    });
  };
}

function loadSATConversionToStoreAsync(conversionChart) {
  return {
    type: LOAD_SAT_CONVERSION_TO_STORE,
    payload: conversionChart
  };
}
