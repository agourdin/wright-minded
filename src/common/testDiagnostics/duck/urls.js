import constants from 'common/duck/constants';

//////////
// URLs //
//////////

export const SERVER_URL = constants.SERVER_URL;
export const API_TESTS = SERVER_URL + 'api/v0.1/tests/';
export const API_TESTS_AVAILABLE = SERVER_URL + 'api/v0.1/tests/available/';
export const API_TEST_ANSWERS = SERVER_URL + 'api/v0.1/test_answers/';
export const API_TEST_TYPES = SERVER_URL + 'api/v0.1/test_types/';
export const API_SECTIONS = SERVER_URL + 'api/v0.1/sections/';
export const API_QUESTION_TYPES = SERVER_URL + 'api/v0.1/question_types/';
export const API_QUESTIONS = SERVER_URL + 'api/v0.1/questions/';
export const API_USER_ANSWERS = SERVER_URL + 'api/v0.1/user_answers/';
export const API_SAT_SCORE_CONVERSIONS =
  SERVER_URL + 'api/v0.1/sat_score_conversions?testid=';

export default {
  API_TESTS,
  API_TESTS_AVAILABLE,
  API_TEST_ANSWERS,
  API_TEST_TYPES,
  API_SECTIONS,
  API_QUESTION_TYPES,
  API_QUESTIONS,
  API_USER_ANSWERS,
  API_SAT_SCORE_CONVERSIONS
};
