import { login, logout, signup } from "~COMPONENTS/Auth/actions";
import { AuthContext, AuthProvider } from "~COMPONENTS/Auth/AuthContext";
import Signup from "~COMPONENTS/Auth/Signup";
import Login from '~COMPONENTS/Auth/Login';

import authReducer from './reducer';
import * as AuthTypes from '~NETLIFY/auth/types';

export {
  AuthContext,
  AuthProvider,
  authReducer,
  AuthTypes,
  login,
  Login,
  logout,
  signup,
  Signup,
};
