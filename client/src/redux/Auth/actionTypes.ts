export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export type AuthAction = { type: typeof LOGIN_SUCCESS; payload: string } | { type: typeof LOGOUT };
