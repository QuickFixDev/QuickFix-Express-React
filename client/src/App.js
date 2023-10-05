import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Note the import order

import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import FetchUserTest from './pages/FetchUserTest';
import ComplainForm from './pages/ComplainForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/test" element={<FetchUserTest />} />
        <Route path="/complain-form" element={<ComplainForm />} />
      </Routes>
    </BrowserRouter>
  );
}
