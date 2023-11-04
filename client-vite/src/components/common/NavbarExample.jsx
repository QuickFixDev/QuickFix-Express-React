import { NavLink } from 'react-router-dom';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import tentant from '../../contexts/UserContext';


const routes = [
    { userRequired: 'common', path: '/', label: 'Home' },
    { userRequired: 'common', path: '/profile', label: 'My profile' },
    { userRequired: 'resident', path: '/complain-form', label: 'Complain form' },
    { userRequired: 'resident', path: '/my-complaints', label: 'My complaints' },
    { userRequired: 'admin', path: '/stats', label: 'Stats' },
    { userRequired: 'admin', path: '/complaint-management', label: 'Complaint management' },
    { userRequired: 'admin', path: '/users', label: 'User management' },
    { userRequired: 'admin', path: '/roles', label: 'Role management' },
    { userRequired: 'common', path: '/use-context-test', label: 'Context' },
    // { userRequired: 'admin', path: '/category-management', label: 'Category management' },
];

const Navbar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="container">
                <div className="spinner-border text-secondary" role="status">
                </div>
            </div>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg nav-fill bg-light">
            <div className="container">
                {isAuthenticated ? (
                    <img src={user.picture} className="mx-2" width="50px" alt="logo" />
                ) : (
                    <img src='/images/QuickFix_logo.png' className="mx-2" width="50px" alt="logo" />
                )}

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-label="expand nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav">
                        <li className="nav-link fw-bold"> {tentant.role} view </li>
                        <div className="border-end mx-2"></div>

                        {routes.map((route) => (
                            // if permissions                      if common                           if dev
                            (tentant.role === route.userRequired || route.userRequired === "common" || tentant.role === "dev") ? (
                                <li key={route.path} >
                                    <NavLink to={route.path} className="btn-outline-primary nav-link underline-on-hover">
                                        {route.label}
                                    </NavLink>
                                </li>) : null
                        ))}

                        <li>
                            <LoginButton />
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;