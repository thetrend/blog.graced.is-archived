import {
  AuthContext,
  AuthTypes,
  signup,
} from '~COMPONENTS/Auth';

import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';
import { Navigate } from 'react-router';
import classNames from 'classnames';
import axios from 'axios';
import { API_AUTH_URL } from '~NETLIFY/auth/types';

const Signup: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState<AuthTypes.AuthUser>({
    email: '',
    username: '',
    password: '',
    verifiedPassword: '',
  });

  const [disabledPage, setDisabledPage] = useState<string | null>();

  const { email, username, password, verifiedPassword } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(dispatch, formData);
  };

  let emailError, usernameError, passwordError, verifypwError;

  let { errors, isAuthenticated } = state;

  if (errors && errors.length > 0) {
    errors.forEach((error: AuthTypes.AuthError) => {
      switch (error.name) {
        case 'email':
          emailError = error.message;
          break;
        case 'username':
          usernameError = error.message;
          break;
        case 'password':
          passwordError = error.message;
          break;
        case 'verifiedPassword':
          verifypwError = error.message;
          break;
        default:
          break;
      }
    });
  }

  useEffect(() => {
    const verifyPageStatus = async () => {
      const response = await axios.post(`${API_AUTH_URL}/signup`, {}).then(res => res.data);
      if (response.message) {
        setDisabledPage(response.message);
      }
    };
    verifyPageStatus();

  }, [disabledPage, isAuthenticated]);

  return (
    !isAuthenticated &&
    <div className={classNames("w-8/12 m-auto flex flex-col")}>
      <h1>Signup</h1>
      {disabledPage ? <h2 className={classNames('font-normal')}>{disabledPage}</h2> : <form onSubmit={handleSignup}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
        {emailError && <p className="form-error">{emailError}</p>}
        <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} />
        {usernameError && <p className="form-error">{usernameError}</p>}
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
        {passwordError && <p className="form-error">{passwordError}</p>}
        <input type="password" name="verifiedPassword" placeholder="Verify Password" value={verifiedPassword} onChange={handleChange} />
        {verifypwError && <p className="form-error">{verifypwError}</p>}
        <span><button type="submit">Sign Up</button> or <Link to="/login">Login</Link></span>
      </form>}
    </div>
  ) || <Navigate to="/" replace />;
};

export default Signup;
