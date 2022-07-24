import { FC, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NotFound from '../NotFound';

import AdminHome from './AdminHome';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import { AuthContext } from '../contexts/auth/AuthContext';

const Admin: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <div className="admin-panel">
      <Routes>
        <Route index element={<AdminHome/>} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="posts/*" element={<AdminPosts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const AdminPosts: FC = () => {
  return (
    <>
      This is dummy text
    </>
  );
};

export default Admin;
