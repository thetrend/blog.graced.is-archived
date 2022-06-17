import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminHome } from './AdminHome';

const Admin: FC = () => {
  return (
    <div className="admin-panel">
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="posts/*" element={<DummyPosts />} />
      </Routes>
    </div>
  );
};

const DummyPosts: FC = () => {
  return (
    <>
      This is dummy text
    </>
  );
};

export default Admin;