import { Dispatch } from 'react';

export const API_AUTH_URL: string = '/api/auth';

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
  };

export interface IAuthUser {
  email: string;
  password: string;
  username?: string,
  verifiedPassword?: string;
}

export interface IAuthState {
  token?: string | null,
  isAuthenticated?: boolean | null,
  loading?: boolean | null,
  errors?: AuthError[] | null;
  message?: string | null;
  id?: string | null;
}

export interface IAuthContext {
  state: IAuthState;
  dispatch: Dispatch<AuthAction>;
}

export type LocationProps = {
  state: {
    from: Location;
  };
};
