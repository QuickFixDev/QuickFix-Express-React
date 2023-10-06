import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Note the import order

import Home from './pages/Home';
import About from './pages/About';
import ContactMe from './pages/ContactMe';
import ComplainForm from './pages/ComplainForm';
import UserProfile from './pages/UserProfile';
import UserReport from './pages/UserReport';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/contact-me" element={<ContactMe />} />
        <Route path="/complain-form" element={<ComplainForm />} />
        <Route path="/user-report" element={<UserReport />} />
      </Routes>
    </BrowserRouter>
  );
}
