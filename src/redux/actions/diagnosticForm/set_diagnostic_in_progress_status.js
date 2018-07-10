import { SET_DIAGNOSTIC_IN_PROGRESS_STATUS } from '../types';

export default function setDiagnosticInProgressStatus(status) {
  return {
    type: SET_DIAGNOSTIC_IN_PROGRESS_STATUS,
    payload: status
  };
}
