import { FC, useContext, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import axios from 'axios';

import Admin from './Admin';
import NotFound from './NotFound';

import logo from './logo.svg';
import './App.css';
import { AuthContext } from './contexts/auth/AuthContext';

const App: FC = () => {
  const { state } = useContext(AuthContext);
  
  useEffect(() => {
      console.log(state);
  }, [state]);
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
        <Route />
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
        {state.isAuthenticated ? (<Link to="/admin">Link to Admin Panel</Link>) : <Link to="/admin/login">Log In</Link>}
      </header>
      <main>{}</main>
    </div>
  );
};

const Posts: FC = () => {
  const [message, setMessage] = useState<string>();
  const fetchData = async () => {
    try {
      let result = await axios.get('/api/posts');
      if (Array.isArray(result.data)) {
        result.data.map(user => {
          setMessage(user)         
        })
      }
      console.log(result.data);
    } catch (err) {
      console.log(err);
      setMessage('Failed to retrieve data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="blog-posts">
      {message}
    </div>
  );
};

export default App;
