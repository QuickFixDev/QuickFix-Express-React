import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';

import Auth0ProviderWithNavigate from './components/access/Auth0ProviderWithNavigate';
import Navbar from './components/common/SideNavbar';
import TopNavBar from './components/common/TopNavBar';

import Stats from './pages/common/Stats';
import HomePage from './pages/common/HomePage';
import Profile from './pages/common/Profile';
import ContextTest from './pages/common/ContextTest';
import NotificationPanel from './pages/common/NotificationPanel';
import PageNotFound from './pages/common/PageNotFound';
import TextSwapper from './pages/common/TextSwapper';

import MyComplaints from './pages/resident/MyComplaints';
import ComplainForm from './pages/resident/ComplaintStorage';
import ResidentPanel from './pages/resident/ResidentPanel';
import ResidenceList from './pages/resident/ResidenceList'

import ResidentialsManagement from './pages/admin/management/ResidentialsManagement';
import ResidenceManagement from './pages/admin/management/ResidenceManagement';
import UserManagement from './pages/admin/management/UserManagement';
import ComplaintManagement from './pages/admin/management/ComplaintManagement';
import CategoryManagement from './pages/admin/management/CategoryManagement';
import RoleManagement from './pages/admin/management/RoleManagement';

import UserStorage from './pages/admin/creation/UserStorage';
import ResidenceStorage from './pages/admin/creation/ResidenceStorage';
import ResidentialStorage from './pages/admin/creation/ResidentialStorage';

import EmployeePanel from './pages/employee/EmployeePanel';

import Form from './pages/form_test/Form'

import 'bootstrap/dist/css/bootstrap.min.css'
import AccessDenied from './pages/common/AccessDenied';
import DropdownTest from './pages/form_test/DropdownTest';
import BottomNavBar from './components/common/BottomNavBar';

function LoginRequiredPage({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <>
      {children}
    </>
  } else {
    return (
      <AccessDenied isLoggedIn={isLoggedIn} requiredRole={'no role required'} userRole={'no role required'} hasPaid={true} />
    );
  }
}

function ResidentPage({ children }) {
  const { authUser, isLoggedIn } = useAuth();

  if (isLoggedIn && authUser.Role === 'resident' || authUser.Role === 'dev' || authUser.Role === 'tester') {
    return <>
      {children}
    </>
  } else {
    return (
      <AccessDenied isLoggedIn={isLoggedIn} requiredRole={['resident', 'dev', 'tester']} userRole={authUser.Role} hasPaid={true} />
    );
  }
}

function AdminPage({ children }) {
  const { authUser, isLoggedIn } = useAuth();

  if (isLoggedIn && authUser.Role === 'admin' || authUser.Role === 'dev' || authUser.Role === 'tester') {
    return <>
      {children}
    </>
  } else {
    return (
      <AccessDenied isLoggedIn={isLoggedIn} requiredRole={['admin', 'dev', 'tester']} userRole={authUser.Role} hasPaid={true} />
    );
  }
}

function DevPage({ children }) {
  const { authUser, isLoggedIn } = useAuth();

  if (isLoggedIn && authUser.Role === 'dev' || authUser.Role === 'tester') {
    return <>
      {children}
    </>
  } else {
    return (
      <AccessDenied isLoggedIn={isLoggedIn} requiredRole={['dev', 'tester']} userRole={authUser.Role} hasPaid={true} />
    );
  }
}

function EmployeePage({ children }) {
  const { authUser, isLoggedIn } = useAuth();

  if (isLoggedIn && authUser.Role === 'employee' || authUser.Role === 'dev' || authUser.Role === 'tester') {
    return <>
      {children}
    </>
  } else {
    return (
      <AccessDenied isLoggedIn={isLoggedIn} requiredRole={['employee', 'dev', 'tester']} userRole={authUser.Role} hasPaid={true} />
    );
  }
}

function OwnerPage({ children }) {
  const { authUser, isLoggedIn } = useAuth();

  if (isLoggedIn && authUser.Role === 'owner' || authUser.Role === 'dev' || authUser.Role === 'tester') {
    return <>
      {children}
    </>
  } else {
    return (
      <AccessDenied isLoggedIn={isLoggedIn} requiredRole={['owner', 'dev', 'tester']} userRole={authUser.Role} hasPaid={true} />
    );
  }
}

function ConditionalSidebar({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <>
      {children}
    </>
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <AuthProvider>
          <TopNavBar />
          <div className="container-fluid m-0">
            <div className="row full-height p-0">
              <ConditionalSidebar>
                <div className="col-xl-2 col-md-1 d-md-block d-none bg-light position-sticky p-0">
                  <Navbar />
                </div>
              </ConditionalSidebar>
              <main className="col p-0">
                <Routes>
                  {/* Non-protected routes (common) */}
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/swapper" element={<TextSwapper />} />
                  <Route path="/access-denied" element={<AccessDenied />} />
                  <Route path="/form-test" element={<Form />} />
                  <Route path="/dropdown-test" element={<DropdownTest />} />


                  {/* Common routes (no login required) */}
                  <Route path="/profile" element={<LoginRequiredPage><Profile /></LoginRequiredPage>} />
                  <Route path="/notification-panel" element={<LoginRequiredPage><NotificationPanel /></LoginRequiredPage>} />

                  {/* Resident protected routes (login required) */}
                  <Route path="/user/complaints/new" element={<ResidentPage> <ComplainForm /> </ResidentPage>} />
                  <Route path="/user/complaints" element={<ResidentPage> <MyComplaints /> </ResidentPage>} />
                  <Route path="/user/residences" element={<ResidentPage> <ResidenceList /> </ResidentPage>} />
                  <Route path="/resident-panel" element={<ResidentPage> <ResidentPanel /> </ResidentPage>} />

                  {/* Admin protected routes (login required) */}
                  <Route path="/admin/complaints" element={<AdminPage> <ComplaintManagement /> </AdminPage>} />
                  <Route path="/admin/complaints/stats" element={<AdminPage> <Stats /> </AdminPage>} />
                  <Route path="/admin/users" element={<AdminPage> <UserManagement /> </AdminPage>} />
                  <Route path="/admin/users/new" element={<AdminPage> <UserStorage /> </AdminPage>} />
                  <Route path="/admin/roles" element={<AdminPage> <RoleManagement /> </AdminPage>} />
                  <Route path="/admin/residences" element={<AdminPage> <ResidenceManagement /> </AdminPage>} />
                  <Route path="/admin/residences/new" element={<AdminPage> <ResidenceStorage /> </AdminPage>} />
                  <Route path="/admin/residentials" element={<AdminPage> <ResidentialsManagement /> </AdminPage>} />
                  <Route path="/admin/residentials/new" element={<AdminPage> <ResidentialStorage /> </AdminPage>} />
                  <Route path="/category-management" element={<AdminPage> <CategoryManagement /> </AdminPage>} />

                  {/* Employee protected routes (login required) */}

                  {/* Dev protected routes (login required) */}
                  <Route path="/context-test" element={<DevPage> <ContextTest /> </DevPage>} />

                  {/* Owner protected routes (login required) */}
                </Routes>
              </main>
            </div>
          </div>
          <BottomNavBar />
        </AuthProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}
