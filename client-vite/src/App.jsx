import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/SideNavbar';
import TopNavbar from './components/common/TopNavbar';
import Footer from './components/common/Footer';
import Auth0ProviderWithNavigate from './components/Auth0ProviderWithNavigate';
import AboutPage from './pages/common/AboutPage';
import HomePage from './pages/common/HomePage';
import Profile from './pages/common/Profile';

import MyComplaints from './pages/resident/MyComplaints';
import ComplainForm from './pages/resident/ComplaintStorage';
import ResidentPanel from './pages/resident/ResidentPanel';

import ComplaintManagement from './pages/admin/ComplaintManagement';
import Stats from './pages/admin/Stats';
import FilterTest from './pages/admin/FilterTest';
import UserStorage from './pages/admin/UserStorage';
import UserManagement from './pages/admin/UserManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import CreateRole from './pages/admin/RoleStorage';
import Residences from './pages/admin/Residences';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './components/common/DashBoard';

import { useAuth0 } from '@auth0/auth0-react';
import ContextTest from './pages/common/ContextTest';

export default function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <AuthProvider>
          <TopNavbar></TopNavbar>
          <div className="container-fluid m-0">
            <div className="row full-height p-0">
              <div className="col-xl-2 col-md-1 col-2 bg-danger bg-light position-sticky p-0 border border-1 border-end">
                <Navbar />
              </div>
              <main className="col-xl-10 col-md-11 col-10 p-0">
                <Routes>

                  <Route path="/user/complaints/new" element={<ComplainForm />} />
                  <Route path="/user/complaints" element={<MyComplaints />} />

                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/profile" element={<Profile />} />

                  <Route path="/admin/complaints" element={<ComplaintManagement />} />
                  <Route path="/admin/complaints/stats" element={<Stats />} />
                  <Route path="/admin/users" element={<UserManagement />} />
                  <Route path="/admin/users/new" element={<UserStorage />} />
                  <Route path="/admin/roles/new" element={<CreateRole />} />
                  <Route path="/filter-test" element={<FilterTest />} />
                  <Route path="/category-management" element={<CategoryManagement />} />
                  <Route path="/admin/residences" element={<Residences />} />
                  <Route path="/context-test" element={<ContextTest />} />
                  <Route path="/resident-panel" element={<ResidentPanel />} />
                </Routes>

              </main>
            </div>
          </div>
        </AuthProvider>
      </Auth0ProviderWithNavigate>
      <Footer />
    </BrowserRouter>
  );
}
