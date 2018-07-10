import { SET_SELECTED_TEST } from '../types';

export default function setSelectedTest(selectedTestID, selectedTestName) {
  var data = {};
  data.selectedTestID = selectedTestID;
  data.selectedTestName = selectedTestName;
  return {
    type: SET_SELECTED_TEST,
    payload: data
  };
}
