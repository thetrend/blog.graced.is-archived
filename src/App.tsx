import { FC } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Admin from './Admin/';

import logo from './logo.svg';
import './App.css';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
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

const NotFound: FC = () => {
  return (
    <div className="error-notfound">
      404 Error: Page not found
    </div>
  );
};

export default App;
