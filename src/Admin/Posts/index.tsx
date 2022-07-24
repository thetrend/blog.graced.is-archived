import { FC, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from '../../NotFound';
import { AuthContext } from '../../contexts/auth/AuthContext';

const Admin: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <Routes>
      <Route index element={<AdminPostList />} />
      <Route path="create" element={<AdminNewPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const AdminPostList: FC = () => {
  return (
    <>
      Time to iterate over a list of posts
    </>
  );
};

const AdminNewPost: FC = () => {
  return (
    <>
      Time to create a new post !
    </>
  )
}

export default Admin;
