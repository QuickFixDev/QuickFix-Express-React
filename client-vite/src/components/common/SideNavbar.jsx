
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from "../../contexts/AuthContext";
import LoginButton from "../../components/access/LoginButton";
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
  faHouseChimneyUser,
  faCity,
  faHouseChimney,
  faSearch,
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
  faCity: faCity,
  faHouseChimney: faHouseChimney,
  faSearch: faSearch,
};

const routes = [
  { userRequired: 'common', path: '/', label: 'Home', iconName: 'faHome' },
  { userRequired: 'common', path: '/profile', label: 'Profile', iconName: 'faUser' },
  { userRequired: 'resident', path: '/user/complaints', label: 'My reports', iconName: 'faList' },
  { userRequired: 'resident', path: '/user/residences', label: 'Available residences', iconName: 'faHouseChimneyUser' },
  { userRequired: 'admin', path: '/admin/complaints/stats', label: 'Stats', iconName: 'faChartBar' },
  { userRequired: 'admin', path: '/admin/users', label: 'Manage users', iconName: 'faUsers' },
  { userRequired: 'admin', path: '/admin/complaints', label: 'Complaint manager', iconName: 'faClipboard' },
  { userRequired: 'admin', path: '/admin/residences', label: 'Manage residences', iconName: 'faHouseChimney' },
  { userRequired: 'admin', path: '/admin/residentials', label: 'Manage residentials', iconName: 'faCity' },
  { userRequired: 'admin', path: '/admin/roles/new', label: 'Roles', iconName: 'faCrown' },
  { userRequired: 'admin', path: '/role-filter', label: 'Role filter', iconName: 'faSearch' },
  { userRequired: 'admin', path: '/context-test', label: 'JSON DB', iconName: 'faCog' },
];

const Sidebar = () => {
  const { authUser, isLoggedIn } = useAuth();
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="sidebar d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
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
                <div className="col-xl-9 col-0 d-xl-block d-none navlink-text">
                  Home
                </div>
              </div>  
            </div>
          </NavLink>
        ) : (
          <>
            {routes.map((route) =>
              (authUser.Role === route.userRequired || route.userRequired === "common" || authUser.Role === "dev" || authUser.Role === "test") && (
                <div key={route.path}>
                  <NavLink to={route.path} className="custom-navlink px-2 py-4">
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-3 col-12 text-center">
                          <FontAwesomeIcon icon={iconMapping[route.iconName]} />
                        </div>
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
