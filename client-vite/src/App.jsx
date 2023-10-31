import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/common/HomePage';
import Profile from './pages/common/Profile';
import MyComplaints from './pages/resident/MyComplaints';
import ComplainForm from './pages/resident/ComplainForm';
import ComplaintManagement from './pages/admin/ComplaintManagement';
import Stats from './pages/admin/Stats';
import FilterTest from './pages/admin/FilterTest';
import UserStorage from './pages/admin/UserStorage';
import UserManagementPanel from './pages/admin/UserManagementPanel';

import Auth0ProviderWithNavigate from './components/Auth0ProviderWithNavigate'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/complain-form" element={<ComplainForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-complaints" element={<MyComplaints />} />
            <Route path="/complaint-management" element={<ComplaintManagement />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/filter-test" element={<FilterTest/>} />
            <Route path="/user-storage" element={<UserStorage/>} />
            <Route path="/user-management" element={<UserManagementPanel/>} />
          </Routes>
          <Footer/>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
} 
