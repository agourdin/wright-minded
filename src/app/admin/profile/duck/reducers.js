import types from './types';

///////////////////
// INITIAL STATE //
///////////////////

const initialState = {
  isLoading: true,
  profile: null,
  errors: {}
};

/////////////
// REDUCER //
/////////////

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_PROFILE_LOADING:
      return { ...state, isLoading: true };

    case types.USER_PROFILE_LOADED:
      return {
        ...state,
        isLoading: false,
        profile: action.profile
      };

    case types.AUTHENTICATION_ERROR:
      return {
        ...state,
        errors: action.data,
        profile: null,
        isLoading: false
      };

    default:
      return state;
  }
}
