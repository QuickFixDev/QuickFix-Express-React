
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from "../../contexts/AuthContext";
import LoginButton from "../../components/common/LoginButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faTrash,
  faUserPlus,
  faHome,
  faUser,
  faList,
  faChartBar,
  faClipboard,
  faUsers,
  faCrown,
  faCog,
  faHouseChimneyUser
}
  from '@fortawesome/free-solid-svg-icons';

const iconMapping = {
  faPlusCircle: faPlusCircle,
  faTrash: faTrash,
  faUserPlus: faUserPlus,
  faHome: faHome,
  faUser: faUser,
  faList: faList,
  faChartBar: faChartBar,
  faClipboard: faClipboard,
  faUsers: faUsers,
  faCrown: faCrown,
  faCog: faCog,
  faHouseChimneyUser: faHouseChimneyUser,
  // Add more icons as needed
};

const routes = [
  { userRequired: 'common', path: '/', label: 'Home', iconName: 'faHome' },
  { userRequired: 'common', path: '/profile', label: 'Profile', iconName: 'faUser' },
  { userRequired: 'resident', path: '/user/complaints/new', label: 'Complain form', iconName: 'faPlusCircle' },
  { userRequired: 'resident', path: '/user/complaints', label: 'My complaints', iconName: 'faList' },
  { userRequired: 'admin', path: '/admin/complaints/stats', label: 'Stats', iconName: 'faChartBar' },
  { userRequired: 'admin', path: '/admin/complaints', label: 'User complaints', iconName: 'faClipboard' },
  { userRequired: 'admin', path: '/admin/users', label: 'Users', iconName: 'faUsers' },
  { userRequired: 'admin', path: '/admin/roles/new', label: 'Roles', iconName: 'faCrown' },
  { userRequired: 'admin', path: '/admin/residences', label: 'Residences', iconName: 'faHouseChimneyUser' },
  { userRequired: 'common', path: '/context-test', label: 'Context', iconName: 'faCog' },
  // { userRequired: 'admin', path: '/category-management', label: 'Category management' },
];


const Sidebar = () => {
  const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="sidebar">
        <div className="spinner-border text-secondary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="sidebar" style={{ minHeight: '100vh' }}>
      <div className="menu ">

        {!isLoggedIn ? (
          <NavLink to={'/'} className="custom-navlink px-2 py-4">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-12 text-center">
                  <FontAwesomeIcon icon={faHome} />
                </div>
                {/* This div will be hidden on screens smaller than xl */}
                <div className="col-xl-9 col-0 d-xl-block d-none navlink-text">
                  Home
                </div>
              </div>
            </div>
          </NavLink>
        ) : (
          <>
            {routes.map((route) =>
              (authUser.Role === route.userRequired || route.userRequired === "common" || authUser.Role === "dev") && (
                <div key={route.path}>
                  <NavLink to={route.path} className="custom-navlink px-2 py-4">
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-3 col-12 text-center">
                          <FontAwesomeIcon icon={iconMapping[route.iconName]} />
                        </div>
                        {/* This div will be hidden on screens smaller than xl */}
                        <div className="col-xl-9 col-0 d-xl-block d-none navlink-text">
                          {route.label}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              )
            )}
          </>
        )}


      </div>
    </div>
  );
};

export default Sidebar;