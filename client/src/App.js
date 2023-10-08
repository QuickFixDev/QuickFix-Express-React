import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Note the import order

import About from './pages/common/About';
import ContactMe from './pages/common/ContactMe';
import ComplainForm from './pages/resident/ComplainForm';
import Profile from './pages/common/Profile';
import MyComplaints from './pages/resident/MyComplaints';
import ComplaintLog from './pages/admin/ComplaintLog';
import Stats from './pages/admin/Stats';
import WAChat from './pages/admin/WAChat';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MyComplaints />} />
          <Route path="/home" element={<MyComplaints />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-me" element={<ContactMe />} />
          <Route path="/complain-form" element={<ComplainForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/complaint-log" element={<ComplaintLog />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/chat" element={<WAChat />} />
      </Routes>
    </BrowserRouter>
  );
} 
