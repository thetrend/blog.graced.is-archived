import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react';
import { IAuthUser, LocationProps } from '../contexts/auth/AuthTypes';
import { AuthContext } from '../contexts/auth/AuthContext';
import { signup } from '../contexts/auth/authActions';
import { useLocation, useNavigate } from 'react-router';

const Signup: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { errors, isAuthenticated } = state;
  const [formData, setFormData] = useState<IAuthUser>({
    email: '',
    username: '',
    password: '',
    verifiedPassword: '',
  });
  const {
    email,
    username,
    password,
    verifiedPassword
  } = formData;
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  const from = location.state?.from?.pathname || '/';
  // TODO: move this to a hook? Using this for all forms
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setFormData({ ...formData, [e.target.name]: e.target.value });
  const submitSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(dispatch, formData);
  };

  let emailError, usernameError, passwordError, verifypwError;

  if (errors && errors.length > 0) {
    errors.forEach(error => {
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
    if (isAuthenticated) {
      return navigate(from, { replace: true });
    }
  }, [state]);

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={submitSignup}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
        {emailError && <p className="form-error">{emailError}</p>}
        <input type="username" name="username" placeholder="Username" value={username} onChange={handleChange} />
        {usernameError && <p className="form-error">{usernameError}</p>}
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
        {passwordError && <p className="form-error">{passwordError}</p>}
        <input type="password" name="verifiedPassword" placeholder="Verify Password" value={verifiedPassword} onChange={handleChange} />
        {verifypwError && <p className="form-error">{verifypwError}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default Signup;
