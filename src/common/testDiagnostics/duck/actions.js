import types from './types';
import urls from './urls';
import { groupByKeys } from 'utils/fn';
import axios from 'axios';

/////////////
// ACTIONS //
/////////////

export function getAvailableTestsAsync(availabletests) {
  return {
    type: types.GET_AVAILABLE_TESTS,
    payload: availabletests
  };
}

export function loadSATConversionToStoreAsync(conversionChart) {
  return {
    type: types.LOAD_SAT_CONVERSION_TO_STORE,
    payload: conversionChart
  };
}

export function loadTestToStoreAsync(test) {
  var data = {};
  var qs = test.questions;
  data.section_names = Array.from(
    new Set(test.questions.map(question => question.section_name))
  );
  data.sections = groupByKeys(qs, function(q) {
    return [q.section_num, q.section_name];
  });
  for (var s in data.sections) {
    data.sections[s].forEach(function(q) {
      q['user_answer'] = '';
    });
  }
  data.loading_test_status = false;
  return {
    type: types.LOAD_TEST_TO_STORE,
    payload: data
  };
}

export function logUserAnswer(step, question_num, user_answer) {
  var data = {};
  data.step = step;
  data.question_num = question_num;
  data.user_answer = user_answer;
  return {
    type: types.LOG_USER_ANSWER,
    payload: data
  };
}

export function postUserAnswers(user, test, answer) {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    var url = urls.API_USER_ANSWERS;
    var body = JSON.stringify({ user, test, answer });
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

export function setDiagnosticInProgressStatus(status) {
  return {
    type: types.SET_DIAGNOSTIC_IN_PROGRESS_STATUS,
    payload: status
  };
}

export function setLoadingTestStatus(status) {
  return {
    type: types.SET_LOADING_TEST_STATUS,
    payload: status
  };
}

export function setSelectedTest(selectedTestID, selectedTestName) {
  var data = {};
  data.selectedTestID = selectedTestID;
  data.selectedTestName = selectedTestName;
  return {
    type: types.SET_SELECTED_TEST,
    payload: data
  };
}

export function setStep(step) {
  return {
    type: types.SET_STEP,
    payload: step
  };
}

export default {
  getAvailableTestsAsync,
  loadSATConversionToStoreAsync,
  loadTestToStoreAsync,
  logUserAnswer,
  postUserAnswers,
  setDiagnosticInProgressStatus,
  setLoadingTestStatus,
  setSelectedTest,
  setStep
};
