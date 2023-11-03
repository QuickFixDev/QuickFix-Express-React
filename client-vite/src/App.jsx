import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/common/HomePage';
import Profile from './pages/common/Profile';
import UseContextTest from './pages/common/UseContextTest';

import MyComplaints from './pages/resident/MyComplaints';
import ComplainForm from './pages/resident/ComplainForm';
import ComplaintManagement from './pages/admin/ComplaintManagement';
import Stats from './pages/admin/Stats';
import FilterTest from './pages/admin/FilterTest';
import UserStorage from './pages/admin/UserStorage';
import UserManagement from './pages/admin/UserManagement';

import Auth0ProviderWithNavigate from './components/Auth0ProviderWithNavigate'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer';
import CategoryManagement from './pages/admin/CategoryManagement';
import CreateRole from './pages/admin/CreateRole';

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
            <Route path="/users" element={<UserManagement/>} />
            <Route path="/category-management" element={<CategoryManagement/>} />
            <Route path="/roles" element={<CreateRole/>} />
            <Route path="/use-context-test" element={<UseContextTest/>} />
          </Routes>
          <Footer/>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
} 
