import { FC, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import axios from 'axios';

import Admin from './Admin';
import NotFound from './NotFound';

import logo from './logo.svg';
import './App.css';

const App: FC = () => {
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
  return (
    <div className="blog">
      <header id="top">
        <img src={logo} className="logo" alt="graced.is" />
        <Link to="/admin">Link to Admin Panel</Link>
      </header>
    </div>
  );
};

const Posts: FC = () => {
  const [message, setMessage] = useState<string>();
  const fetchData = async () => {
    try {
      let result = await axios.get('/api/auth/signup');
      setMessage(result.data.message);
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
