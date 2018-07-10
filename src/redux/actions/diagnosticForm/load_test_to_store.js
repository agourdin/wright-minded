import { LOAD_TEST_TO_STORE } from '../types';
import { SERVER_URL, API_TESTS } from '../urls';
import setLoadingTestStatus from './set_loading_test_status';
import axios from 'axios';

function groupByKeys(array, f) {
  var groups = {};
  array.forEach(function(o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
}

export default function loadTestToStore(pk) {
  return dispatch => {
    console.log('loadTestToStore:');
    console.log(pk);
    var url = SERVER_URL + API_TESTS + pk + '/';
    dispatch(setLoadingTestStatus(true));
    axios.get(url).then(res => {
      const test = res.data;
      dispatch(loadTestToStoreAsync(test));
    });
  };
}

function loadTestToStoreAsync(test) {
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
    type: LOAD_TEST_TO_STORE,
    payload: data
  };
}
