import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { login } from '../../contexts/auth/authActions';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { IAuthUser } from '../../contexts/auth/AuthTypes';

const Login: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState<IAuthUser>({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(dispatch, formData);
  }

  let { errors, isAuthenticated } = state;

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
      {errors && <p className="form-error">{errors[0].message}</p>}
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login;
