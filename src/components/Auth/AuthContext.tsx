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
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  errors: null,
  message: null,
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
