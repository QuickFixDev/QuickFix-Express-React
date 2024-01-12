// import { faArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, json, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import SearchPagesModal from '../../components/modals/SearchPagesModal'

const PageNotFound = () => {
  const location = useLocation();
  const { authUser } = useAuth()
  const [showSearchPagesModal, setShowSearchPagesModal] = useState(false)

  const handleShowSearchPagesModal = () => {
    setShowSearchPagesModal(true)
  }

  const handleHideSearchPagesModal = () => {
    setShowSearchPagesModal(false)
  }


  const routes = [
    { allowedRoles: ['user'], title: 'Home page', path: '/home', description: 'Home' },
    { allowedRoles: ['dev', 'tester', 'resident', 'admin', 'employee', 'owner'], title: 'My profile', path: '/profile', description: 'Profile' },
    { allowedRoles: ['dev', 'tester', 'resident'], title: 'My reports', path: '/user/complaints', description: 'My reports' },
    { allowedRoles: ['dev', 'tester', 'resident'], title: 'Residences list', path: '/user/residences', description: 'Available residences' },
    { allowedRoles: ['dev', 'tester', 'admin'], title: 'page', path: '/admin/complaints/stats', description: 'Stats' },
    { allowedRoles: ['dev', 'tester', 'admin'], title: 'page', path: '/admin/users', description: 'Manage users' },
    { allowedRoles: ['dev', 'tester', 'admin'], title: 'page', path: '/admin/complaints', description: 'Complaint manager' },
    { allowedRoles: ['dev', 'tester', 'admin'], title: 'page', path: '/admin/residences', description: 'Manage residences' },
    { allowedRoles: ['dev', 'tester', 'admin'], title: 'page', path: '/admin/residentials', description: 'Manage residentials' },
    { allowedRoles: ['dev', 'tester', 'admin'], title: 'page', path: '/admin/roles', description: 'Role manager' },
    { allowedRoles: ['dev', 'tester'], title: 'page', path: '/context-test', description: 'JSON DB' },
  ];

  const filteredRoutes = routes.filter((route) => {
    const { allowedRoles, title, description } = route;

    if (authUser.length > 0) {
      return (
        allowedRoles.includes(authUser.Role)
      );
    } else {
      return (
        allowedRoles.includes('user')
      );
    }
  });

  return (
    <div className="h-90-vh d-flex flex-column justify-content-center align-items-center">
      <div className='text-center'>
        <h1 className="my-0 py-0 display-1 fw-bold">404</h1>
        <h2 className="my-0 py-0 text-muted">page not found</h2>
      </div>
      <div className='text-center mt-4'>
        <p className=''>
          The requested URL
          <mark className='p-1 mx-1'>{location.pathname}</mark>
          was not found on this server.
        </p>
      </div>
      <div className='text-center mt-4'>
        <button className='btn btn-primary' onClick={handleShowSearchPagesModal}>
          Search
        </button>
      </div>
      <SearchPagesModal showModal={showSearchPagesModal} handleCancel={() => handleHideSearchPagesModal()} data={filteredRoutes} />
    </div>

  )
}

export default PageNotFound;