import { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { signup } from '../../contexts/auth/authActions';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { IAuthUser } from '../../contexts/auth/AuthTypes';
import classNames from 'classnames';

const Signup: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState<IAuthUser>({
    email: '',
    username: '',
    password: '',
    verifiedPassword: '',
  });

  const { email, username, password, verifiedPassword } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(dispatch, formData);
  }

  let emailError, usernameError, passwordError, verifypwError;

  let { errors, isAuthenticated } = state;

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

    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }

  return (
    <div className={classNames("w-8/12 m-auto flex flex-col")}>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
        {emailError && <p className="form-error">{emailError}</p>}
        <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} />
        {usernameError && <p className="form-error">{usernameError}</p>}
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
        {passwordError && <p className="form-error">{passwordError}</p>}
        <input type="password" name="verifiedPassword" placeholder="Verify Password" value={verifiedPassword} onChange={handleChange} />
        {verifypwError && <p className="form-error">{verifypwError}</p>}
        <span><button type="submit">Sign Up</button> or <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Signup;
