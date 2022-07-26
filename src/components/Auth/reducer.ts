import { AuthTypes } from '~COMPONENTS/Auth';

export default (state: AuthTypes.AuthState, action: AuthTypes.AuthAction): AuthTypes.AuthState => {
  switch (action.type) {
    case 'SIGNUP_ERROR':
    case 'LOGIN_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: action.payload,
      }
    case 'LOGIN_SUCCESS':
      console.log(action.payload);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        loading: false,
      }
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: null,
      }
    default:
      return state;
  }
}
