import { AuthAction, IAuthState } from './AuthTypes';

export default (state: IAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case 'SIGNUP_ERROR':
    case 'LOGIN_ERROR':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: action.payload,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    default:
      return state;
  }
}
