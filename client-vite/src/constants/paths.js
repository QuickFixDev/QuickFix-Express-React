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
    { path: '/user/complaints', label: 'My reports', iconName: 'faList' },
    { path: '/user/residences', label: 'Available residences', iconName: 'faHouseChimneyUser' },
];
