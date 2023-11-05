import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/SideNavbar';
import Footer from './components/common/Footer';
import Auth0ProviderWithNavigate from './components/Auth0ProviderWithNavigate';
import HomePage from './pages/common/AboutPage';
import Profile from './pages/common/Profile';
import MyComplaints from './pages/resident/MyComplaints';
import ComplainForm from './pages/resident/ComplaintStorage';
import ComplaintManagement from './pages/admin/ComplaintManagement';
import Stats from './pages/admin/Stats';
import FilterTest from './pages/admin/FilterTest';
import UserStorage from './pages/admin/UserStorage';
import UserManagement from './pages/admin/UserManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import CreateRole from './pages/admin/RoleStorage';
import TopNavbar from './components/common/TopNavbar';
import Residences from './pages/admin/Residences';

export default function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <TopNavbar></TopNavbar>
        <div className="container-fluid m-0">
          <div className="row full-height p-0">
            <div className="col-xl-2 col-md-1 col-2 bg-danger bg-light position-sticky p-0 border border-1 border-end">
              <Navbar />
            </div>
            <main className="col-xl-10 col-md-11 col-10 p-0">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user/complaints/new" element={<ComplainForm />} />
                <Route path="/user/complaints" element={<MyComplaints />} />
                <Route path="/admin/complaints" element={<ComplaintManagement />} />
                <Route path="/admin/complaints/stats" element={<Stats />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/users/new" element={<UserStorage />} />
                <Route path="/admin/roles" element={<CreateRole />} />
                <Route path="/filter-test" element={<FilterTest />} />
                <Route path="/category-management" element={<CategoryManagement />} />
                <Route path="/admin/residences" element={<Residences />} />
              </Routes>
            </main>
          </div>
        </div>
      </Auth0ProviderWithNavigate>
      <Footer />
    </BrowserRouter>
  );
}
