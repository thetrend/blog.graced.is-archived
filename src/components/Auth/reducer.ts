import { AuthTypes } from '~COMPONENTS/Auth';

export default (state: AuthTypes.AuthState, action: AuthTypes.AuthAction): AuthTypes.AuthState => {
  switch (action.type) {
    case 'SIGNUP_ERROR':
    case 'LOGIN_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: undefined,
        isAuthenticated: false,
        loading: false,
        errors: (action.type === 'SIGNUP_ERROR') ? action.payload : undefined,
        error: (action.type === 'LOGIN_ERROR') ? action.payload.error : undefined,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        loading: false,
      };
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem('token');
      return {
        ...state,
        token: undefined,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};
