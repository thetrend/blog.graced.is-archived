import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { ContextProps } from '../ContextProps';
import authReducer from './authReducer';
import { AuthAction, IAuthState } from './AuthTypes';

export const initialAuthState: IAuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  errors: null,
  message: null,
};

export const AuthContext = createContext<{ state: IAuthState, dispatch: Dispatch<AuthAction> }>({ state: initialAuthState, dispatch: () => null });

export const AuthProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};