import React from 'react';
import user from '../../contexts/UserContext'
// import { Link } from 'react-router-dom';


const routes = [
  { userRequired: 'common', path: '/', label: 'Home' },
  { userRequired: 'common', path: '/about', label: 'About' },
  { userRequired: 'common', path: '/contact-me', label: 'Contact me' },
  { userRequired: 'common', path: '/profile', label: 'My profile' },
  { userRequired: 'resident', path: '/complain-form', label: 'Complain form' },
  { userRequired: 'resident', path: '/my-complaints', label: 'My complaints' },
  { userRequired: 'admin', path: '/complaint-log', label: 'Complaint log' },
  { userRequired: 'admin', path: '/stats', label: 'Stats' },
  { userRequired: 'common', path: '/logout', label: 'Logout' },
];

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg nav-fill bg-light">
      <div className="container">
        <img src={user.photo} className="mx-2" width="50px" alt="logo" />
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-label="expand nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav">
            <li className="nav-link fw-bold"> {user.role} view </li>
            <div class="border-end mx-2"></div>

            {routes.map((route) => (
              // if permissions                    if common                          if dev
              (user.role === route.userRequired || route.userRequired === "common" || user.role === "dev") ? (
                <li key={route.path} >
                  <a href={route.path} className="btn-outline-primary nav-link underline-on-hover">
                    {route.label}
                  </a>
                </li>) : null
            ))}

          </ul>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;