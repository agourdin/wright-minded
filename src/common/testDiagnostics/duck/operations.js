import urls from './urls';
import actions from './actions';
import axios from 'axios';

////////////////
// OPERATIONS //
////////////////

export function getAvailableTests() {
  return dispatch => {
    var url = urls.API_TESTS_AVAILABLE;
    axios.get(url).then(res => {
      const availabletests = res.data;
      dispatch(actions.getAvailableTestsAsync(availabletests));
    });
  };
}

export function loadSATConversionToStore(testid) {
  return dispatch => {
    var url = urls.API_SAT_SCORE_CONVERSIONS + testid;
    axios.get(url).then(res => {
      const conversionChart = res.data;
      dispatch(actions.loadSATConversionToStoreAsync(conversionChart));
    });
  };
}

export function loadTestToStore(pk) {
  return dispatch => {
    var url = urls.API_TESTS + pk + '/';
    dispatch(actions.setLoadingTestStatus(true));
    axios.get(url).then(res => {
      const test = res.data;
      dispatch(actions.loadTestToStoreAsync(test));
    });
  };
}

export default {
  getAvailableTests,
  loadSATConversionToStore,
  loadTestToStore
};
