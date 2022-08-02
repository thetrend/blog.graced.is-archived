import { Dispatch } from 'react';

export const API_AUTH_URL: string = '/api/auth';
export const FAUNA_USERS_EMAIL_INDEX: string = 'users_by_email';

export type AuthError = {
  name: 'email' | 'username' | 'password' | 'verifiedPassword' | 'login';
  message: string;
};

export type AuthAction =
  | {
    type: 'LOGIN_SUCCESS',
    payload: {
      token: string,
      isAuthenticated: boolean,
    };
  } | {
    type: 'SIGNUP_ERROR',
    payload: AuthError[];
  } | {
    type: 'LOGIN_ERROR',
    payload: {
      error: AuthError,
    };
  } | {
    type: 'LOGOUT_SUCCESS';
  };

export type AuthUser = {
  email: string;
  password: string;
  username?: string,
  verifiedPassword?: string;
};

export type AuthState = {
  error?: AuthError;
  errors?: AuthError[];
  id?: string;
  isAuthenticated?: boolean;
  loading?: boolean;
  message?: string;
  token?: string;
};

export interface IAuthContext {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}
