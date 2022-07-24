import { AuthAction, IAuthState } from './AuthTypes';

export default (state: IAuthState, action: AuthAction): IAuthState => {
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
