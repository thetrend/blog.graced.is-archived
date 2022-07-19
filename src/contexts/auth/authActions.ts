import axios from 'axios';
import { Dispatch } from 'react';
import { API_AUTH_URL, AuthAction, IAuthUser } from './AuthTypes';

export const signup = async (dispatch: Dispatch<AuthAction>, formData: IAuthUser) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/signup`, formData);
    if (Array.isArray(response.data)) {
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: response.data
      });
    }
    login(dispatch, formData);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (dispatch: Dispatch<AuthAction>, formData: IAuthUser) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/login`, formData);
    if (Array.isArray(response.data)) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: response.data,
      })
    }
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
}

export const getUserID = async (dispatch: Dispatch<AuthAction>) => {
  try {
    const response = await axios.get(`${API_AUTH_URL}/me`);
    if (response.data.hasOwnProperty('message')) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: response.data,
      })
    }
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data,
    })
  } catch (error) {
    console.log(error);
  }
}
