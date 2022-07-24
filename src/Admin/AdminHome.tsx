import { FC, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext';

const AdminHome: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = state;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <p>This is the admin panel. You must be authenticated to access this.</p>
      <Link to="/admin/login">Login</Link>
    </>);
};

export default AdminHome;