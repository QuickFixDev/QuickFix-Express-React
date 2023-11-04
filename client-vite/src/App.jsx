import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/common/HomePage';
import Profile from './pages/common/Profile';
// import UseContextTest from './pages/common/UseContextTest';

import MyComplaints from './pages/resident/MyComplaints';
import ComplainForm from './pages/resident/ComplaintStorage';
import ComplaintManagement from './pages/admin/ComplaintManagement';
import Stats from './pages/admin/Stats';
import FilterTest from './pages/admin/FilterTest';
import UserStorage from './pages/admin/UserStorage';
import UserManagement from './pages/admin/UserManagement';

import Auth0ProviderWithNavigate from './components/Auth0ProviderWithNavigate'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer';
import CategoryManagement from './pages/admin/CategoryManagement';
import CreateRole from './pages/admin/RoleStorage';

export default function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/complaints/new" element={<ComplainForm />} />
            <Route path="/user/complaints" element={<MyComplaints />} />
            <Route path="/admin/complaints" element={<ComplaintManagement />} />
            <Route path="/admin/complaints/stats" element={<Stats />} />
            <Route path="/admin/users" element={<UserManagement/>} />
            <Route path="/admin/users/new" element={<UserStorage/>} />
            <Route path="/admin/roles" element={<CreateRole/>} />
            <Route path="/filter-test" element={<FilterTest/>} />
            <Route path="/category-management" element={<CategoryManagement/>} />
            {/* <Route path="/use-context-test" element={<UseContextTest/>} /> */}
          </Routes>
          <Footer/>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
} 
