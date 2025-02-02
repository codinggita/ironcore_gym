import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../src/components/signup.jsx';
import Login from '../src/components/login.jsx';
import ForgotPassword from '../src/components/forgot-password.jsx';
import ForgotPassword2 from '../src/components/forgot-password2.jsx';
import ForgotPassword3 from '../src/components/forgot-password3.jsx';
import ForgotPassword4 from '../src/components/forgot-password4.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password2" element={<ForgotPassword2 />} />
        <Route path="/forgot-password3" element={<ForgotPassword3 />} />
        <Route path="/forgot-password4" element={<ForgotPassword4 />} />
      </Routes>
    </Router>
  </StrictMode>
);