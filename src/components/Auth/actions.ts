import { Dispatch } from 'react';

import axios from 'axios';
import setAuthToken from '~UTILS/setAuthToken';
import { API_AUTH_URL, AuthAction, AuthUser } from '~NETLIFY/auth/types';

// Signup User
export const signup = async (dispatch: Dispatch<AuthAction>, formData: AuthUser) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/signup`, formData);
    if (Array.isArray(response.data)) {
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: response.data
      });
    }
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Login User
export const login = async (dispatch: Dispatch<AuthAction>, formData: AuthUser) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/login`, formData);
    if (Object.hasOwn(response.data, 'error')) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: response.data,
      });
    }
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data,
    });
    setAuthToken(response.data.token);
  } catch (error) {
    console.log(error);
  }
};

// Logout User
export const logout = async (dispatch: Dispatch<AuthAction>) => {
  try {
    const response = await axios.get(`${API_AUTH_URL}/logout`);
    if (response.data.isAuthenticated === false) {
      dispatch({ type: 'LOGOUT_SUCCESS' });
    }
  } catch (error) {
    console.log(error);
  }
};
