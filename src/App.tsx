import { FC, useContext, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Admin from './Admin';
import NotFound from './NotFound';

import logo from './logo.svg';
import './App.css';
import { AuthContext } from './contexts/auth/AuthContext';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="posts" element={<Posts />} /> {/* TODO: what do with this? */}
        <Route path="admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const Home: FC = () => {
  const { state } = useContext(AuthContext);
  return (
    <div className="blog">
      <header id="top">
        <img src={logo} className="logo" alt="graced.is" />
        {state.isAuthenticated ? (<Link to="/admin">Welcome, $user.</Link>) : <Link to="/admin/login">Log In</Link>}
      </header>
    </div>
  );
};

const Posts: FC = () => {
   return (
    <div className="blog-posts">
      Posts to come soon
    </div>
  );
};

export default App;
