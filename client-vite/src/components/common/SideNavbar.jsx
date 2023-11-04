
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import tentant from '../../contexts/UserContext';
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
  { userRequired: 'admin', path: '/admin/roles', label: 'Roles', iconName: 'faCrown' },
  { userRequired: 'admin', path: '/admin/residences', label: 'Residences', iconName: 'faHouseChimneyUser' },
  { userRequired: 'common', path: '/use-context-test', label: 'Context', iconName: 'faCog' },
  // { userRequired: 'admin', path: '/category-management', label: 'Category management' },
];


const Sidebar = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="sidebar">
        <div className="spinner-border text-secondary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="menu ">

        {routes.map((route) =>
          (tentant.role === route.userRequired || route.userRequired === "common" || tentant.role === "dev") && (
            <div key={route.path}>
              <NavLink to={route.path} className="custom-navlink px-2 py-4">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-2 text-end">
                      <FontAwesomeIcon icon={iconMapping[ route.iconName ]} />
                    </div>
                    {/* This div will be hidden on screens smaller than md */}
                    <div className="col-0 col-md-10 d-none d-md-block navlink-text">
                      {route.label}
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
