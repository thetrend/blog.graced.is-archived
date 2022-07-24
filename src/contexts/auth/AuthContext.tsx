import axios from 'axios';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import authReducer from './authReducer';
import { API_AUTH_URL, AuthAction, IAuthState } from './AuthTypes';

export type ContextProps = {
  children?: ReactNode;
};

// TODO: turn this into a helper function?
const getUserRequest = async () => {
  let result = await axios.get(`${API_AUTH_URL}/me`).then(response => response.data).catch(error => error);
  return result;
};

export const initialAuthState: IAuthState = {
  token: null,
  isAuthenticated: await getUserRequest() ? true : false,
  loading: null,
  errors: null,
  message: null
};

export const AuthContext = createContext<{ state: IAuthState, dispatch: Dispatch<AuthAction>; }>({ state: initialAuthState, dispatch: () => null });

export const AuthContextProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};