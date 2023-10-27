import { BrowserRouter, Route, Routes } from 'react-router-dom';

import About from './pages/common/About';
import ContactMe from './pages/common/ContactMe';
import Profile from './pages/common/Profile';
import MyComplaints from './pages/resident/MyComplaints';
import ComplainForm from './pages/resident/ComplainForm';
import ComplaintLog from './pages/admin/ComplaintLog';
import Stats from './pages/admin/Stats';
import FilterTest from './pages/admin/FilterTest';
import UserStorage from './pages/admin/UserStorage';
import UserEdition from './pages/admin/UserEdition';
import Auth0ProviderWithNavigate from './components/Auth0ProviderWithNavigate'
import Navbar from './components/common/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
          <Navbar />
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
            <Route path="/filter-test" element={<FilterTest/>} />
            <Route path="/user-storage" element={<UserStorage/>} />
            <Route path="/user-edition" element={<UserEdition/>} />
          </Routes>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
} 
