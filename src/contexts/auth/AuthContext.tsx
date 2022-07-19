import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import authReducer from './authReducer';
import { AuthAction, IAuthState } from './AuthTypes';

export type ContextProps = {
  children?: ReactNode
}

export const initialAuthState: IAuthState = {
  token: null,
  isAuthenticated: null,
  loading: null,
  errors: null,
  message: null
};

export const AuthContext = createContext<{state: IAuthState, dispatch: Dispatch<AuthAction>}>(initialAuthState);

export const AuthContextProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
};