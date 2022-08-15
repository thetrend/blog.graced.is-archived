import { FC, useContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { 
  AuthContext, 
  AuthProvider, 
  Login, 
  logout, 
  Signup
} from '~COMPONENTS/Auth';

import { PostProvider } from './components/Posts/PostContext'; // TODO: FIXME:
import { Posts, ManagePost } from '~COMPONENTS/Posts';

import { 
  ThemeFooter,
  ThemeHeader, 
} from '~COMPONENTS/Theme';

import NotFound from './NotFound';

import './App.css';

const App: FC = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <ThemeHeader />
        <div id="content">
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/posts/new" element={<ManagePost />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
        <ThemeFooter />
      </PostProvider>
    </AuthProvider>
  );
};

const Home: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = state;
  return (
    <>
      <div className="pb-5">{isAuthenticated ? (<>Hello, $user. <span className="link" onClick={() => logout(dispatch)}>Logout?</span></>) : <Link to="/login">Login</Link>}</div>
      <Posts />
    </>
  );
};

export default App;
