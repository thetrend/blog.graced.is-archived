import { 
  createContext, 
  Dispatch, 
  useReducer
} from 'react';

import { 
  AuthTypes, 
  authReducer, 
} from '~COMPONENTS/Auth';

import ContextProps from '~SRC/ContextProps';

export const initialAuthState: AuthTypes.AuthState = {
  token: localStorage.getItem('token') || undefined,
  isAuthenticated: localStorage.getItem('token') ? true : undefined,
  loading: true,
  errors: undefined,
  error: undefined,
  message: undefined,
};

export const AuthContext = createContext<{ state: AuthTypes.AuthState, dispatch: Dispatch<AuthTypes.AuthAction> }>
  ({ state: initialAuthState, dispatch: () => null });

export const AuthProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
