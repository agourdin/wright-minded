import types from './types';

///////////////////
// INITIAL STATE //
///////////////////

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: {}
};

/////////////
// REDUCER //
/////////////

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOADING:
      return { ...state, isLoading: true };

    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.user
      };

    case types.LOGIN_SUCCESSFUL:
    case types.REGISTRATION_SUCCESSFUL:
      localStorage.setItem('token', action.data.token);
      return {
        ...state,
        ...action.data,
        isAuthenticated: true,
        isLoading: false,
        errors: null
      };

    case types.AUTHENTICATION_ERROR:
    case types.REGISTRATION_FAILED:
    case types.LOGIN_FAILED:
    case types.LOGOUT_SUCCESSFUL:
      localStorage.removeItem('token');
      return {
        ...state,
        errors: action.data,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    case types.PASSWORD_RESET_FAILED:
      console.log('Password reset failed');
      return {
        ...state,
        passwordResetSuccess: false,
        errors: action.data
      };

    case types.PASSWORD_RESET_SUCCESS:
      console.log('Password reset failed');
      return {
        ...state,
        passwordResetSuccess: true
      };

    default:
      return state;
  }
}
