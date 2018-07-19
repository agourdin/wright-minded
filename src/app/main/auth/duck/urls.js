//////////
// URLs //
//////////

export const SERVER_URL = 'http://localhost:8000/';
export const API_AUTH = SERVER_URL + 'api/v0.1/auth/';
export const API_AUTH_REGISTER = SERVER_URL + 'api/v0.1/auth/register';
export const API_AUTH_LOGIN = SERVER_URL + 'api/v0.1/auth/login';
export const API_AUTH_LOGOUT = SERVER_URL + 'api/v0.1/auth/logout';
export const API_AUTH_USER = SERVER_URL + 'api/v0.1/auth/user';
export const API_AUTH_PASSWORD_RESET = SERVER_URL + 'rest-auth/password/reset/';
export const API_AUTH_CONFIRM_PASSWORD_RESET =
  SERVER_URL + 'rest-auth/password/reset/confirm/';

export default {
  API_AUTH,
  API_AUTH_REGISTER,
  API_AUTH_LOGIN,
  API_AUTH_LOGOUT,
  API_AUTH_USER,
  API_AUTH_PASSWORD_RESET,
  API_AUTH_CONFIRM_PASSWORD_RESET
};
