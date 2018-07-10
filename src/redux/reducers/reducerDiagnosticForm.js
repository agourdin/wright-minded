import {
  GET_AVAILABLE_TESTS,
  LOAD_TEST_TO_STORE,
  LOAD_SAT_CONVERSION_TO_STORE,
  SET_LOADING_TEST_STATUS,
  LOG_USER_ANSWER,
  SET_DIAGNOSTIC_IN_PROGRESS_STATUS
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case GET_AVAILABLE_TESTS:
      return Object.assign({}, state, {
        available_tests: action.payload
      });

    case LOAD_TEST_TO_STORE:
      return Object.assign({}, state, {
        sections: action.payload.sections,
        section_names: action.payload.section_names,
        loading_test_status: action.payload.loading_test_status
      });

    case SET_LOADING_TEST_STATUS:
      return Object.assign({}, state, {
        loading_test_status: action.payload
      });

    case SET_DIAGNOSTIC_IN_PROGRESS_STATUS:
      return Object.assign({}, state, {
        diagnostic_in_progress_status: action.payload
      });

    case LOG_USER_ANSWER:
      var newState = { ...state };
      var newSections = newState.sections;
      newSections[action.payload.step][
        action.payload.question_num
      ].user_answer =
        action.payload.user_answer;
      return Object.assign({}, state, {
        sections: newSections
      });

    case LOAD_SAT_CONVERSION_TO_STORE:
      return Object.assign({}, state, {
        conversion_chart: action.payload
      });

    default:
      return state;
  }
}
