import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/user/userLogin';  
import UserHome  from './components/user/userHome';
import RegistrationPage from './components/user/userReg';
import AdminLogin from './components/admin/login';
import AdminHome from './components/admin/adminHome';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={< UserHome  />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/home' element={<AdminHome />} />
      </Routes>
    </>
  );
};

export default App;
