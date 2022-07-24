import { FC, useContext, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { AuthContext } from './contexts/auth/AuthContext';
import { logout } from './contexts/auth/authActions';

const App: FC = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

const Home: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = state;
  return (
    <>
      {isAuthenticated ?
        <>Hello, $user. <a onClick={() => logout(dispatch)}>Logout?</a></> :
        <><Link to="/login">Login</Link> &middot; <Link to="/signup">Signup</Link></>
      }
    </>
  );
};

export default App;
