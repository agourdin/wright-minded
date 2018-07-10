import { SET_STEP } from '../types';

export default function setStep(step) {
  return {
    type: SET_STEP,
    payload: step
  };
}
