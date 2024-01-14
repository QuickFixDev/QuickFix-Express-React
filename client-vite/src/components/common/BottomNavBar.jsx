import { faPlusCircle, faTrash, faUserPlus, faHome, faUser, faList, faChartBar, faClipboard, faUsers, faCrown, faCog, faHouseChimneyUser, faCity, faHouseChimney, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

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

const commonRoutes = [
    { path: '/', label: 'Home', iconName: 'faHome' },
]

const devRoutes = [
    { path: '/profile', label: 'Profile', iconName: 'faUser' },
    { path: '/', label: 'Home', iconName: 'faHome' },
    { allowedUsers: ['dev', 'tester', 'dev'], path: '/context-test', label: 'JSON DB', iconName: 'faCog' },
];

const adminRoutes = [
    { path: '/', label: 'Home', iconName: 'faHome' },
    { path: '/profile', label: 'Profile', iconName: 'faUser' },
    { path: '/admin/complaints/stats', label: 'Stats', iconName: 'faChartBar' },
    { path: '/admin/users', label: 'Manage users', iconName: 'faUsers' },
    { path: '/admin/complaints', label: 'Complaint manager', iconName: 'faClipboard' },
    { path: '/admin/residences', label: 'Manage residences', iconName: 'faHouseChimney' },
    { path: '/admin/residentials', label: 'Manage residentials', iconName: 'faCity' },
    { path: '/admin/roles', label: 'Role manager', iconName: 'faCrown' },
];

const residentRoutes = [
    { path: '/', label: 'Home', iconName: 'faHome' },
    { path: '/profile', label: 'Profile', iconName: 'faUser' },
    { path: '/user/complaints', label: 'Reports', iconName: 'faList' },
    { path: '/user/residences', label: 'Residences', iconName: 'faHouseChimneyUser' },
];

const routesByType = [
    { userType: 'common', routes: commonRoutes },
    { userType: 'dev', routes: devRoutes },
    { userType: 'admin', routes: adminRoutes },
    { userType: 'resident', routes: residentRoutes },
]

const BottomNavBar = () => {
    const { authUser } = useAuth();
    const [selectedRouteId, setSelectedRouteId] = useState();
    const assignedRoutes = authUser ? routesByType.find(route => route.userType === authUser.Role)?.routes : commonRoutes;

    const handleRouteClick = (index) => {
        setSelectedRouteId(index)
    }

    return (
        <div className="row row-cols-5 fixed-bottom bg-white navbar-shadow d-md-none d-flex flex-row justify-content-evenly py-2">
            {assignedRoutes && assignedRoutes.map((route, index) => (
                <div onClick={() => setSelectedRouteId(index)} key={index} className='col column-center-xy'>
                    <div className={`column-center-xy cursor-pointer p-2 rounded-3 navbar-bottom-button ${selectedRouteId === index && 'bg-blue-1 text-blue-8'}`}>
                        <FontAwesomeIcon icon={iconMapping[route.iconName]} className='my-1 px-3' />
                        <span className='text-size-12'>{route.label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BottomNavBar;