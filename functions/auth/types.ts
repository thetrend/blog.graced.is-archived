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
    type: 'SIGNUP_ERROR' | 'LOGIN_ERROR',
    payload?: AuthError[];
  } | {
    type: 'LOGOUT_SUCCESS'
  };

export type AuthUser = {
  email: string;
  password: string;
  username?: string,
  verifiedPassword?: string;
}

export type AuthState = {
  token?: string | null,
  isAuthenticated?: boolean | null,
  loading?: boolean | null,
  errors?: AuthError[] | null;
  message?: string | null;
  id?: string | null;
}

export interface IAuthContext {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}
