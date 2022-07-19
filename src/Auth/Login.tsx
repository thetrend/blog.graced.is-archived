import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { login } from '../contexts/auth/authActions';
import { IAuthUser, LocationProps } from '../contexts/auth/AuthTypes';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Login: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { errors, isAuthenticated } = state;
  const [formData, setFormData] = useState<IAuthUser>({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  const from = location.state?.from?.pathname || '/';
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setFormData({ ...formData, [e.target.name]: e.target.value });
  const submitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(dispatch, formData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [state]);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={submitLogin}>
        {errors && <p className="form-error">{errors[0].message}</p>}
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
        <button type="submit">Login</button> or <Link to="/admin/signup">Sign Up</Link>
      </form>
    </>
  );
};

export default Login;
