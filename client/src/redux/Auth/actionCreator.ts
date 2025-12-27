import { LOGIN_SUCCESS, LOGOUT } from './actionTypes';

export const loginSuccess = (token: string) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});
