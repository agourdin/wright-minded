import { SET_LOADING_TEST_STATUS } from '../types';

export default function setLoadingTestStatus(status) {
  return {
    type: SET_LOADING_TEST_STATUS,
    payload: status
  };
}
