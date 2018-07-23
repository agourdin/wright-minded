import types from './types';

///////////////////
// INITIAL STATE //
///////////////////

const initialState = {
  isLoading: true,
  clientList: null,
  errors: {}
};

/////////////
// REDUCER //
/////////////

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.CLIENT_PROFILES_LOADING:
      return { ...state, isLoading: true };

    case types.CLIENT_PROFILE_LOADING:
      return { ...state, isLoading: true };

    case types.CLIENT_PROFILES_LOADED:
      return {
        ...state,
        isLoading: false,
        clientList: action.clients
      };

    case types.CLIENT_PROFILE_LOADED:
      return {
        ...state,
        isLoading: false,
        client: action.client
      };

    case types.AUTHENTICATION_ERROR:
      return {
        ...state,
        errors: action.data,
        clientList: null,
        isLoading: false
      };

    default:
      return state;
  }
}
