import React from 'react';
// import { Link } from 'react-router-dom';

// const user = {
//   loggedIn: true,
//   role: 'resident'
// }

const routes = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact-me', label: 'Contact me' },
  { path: '/user-report', label: 'User report' },
  { path: '/complain-form', label: 'Complain form' },
  { path: '/user-profile', label: 'My profile' },
  { path: '/logout', label: 'Logout' },
];

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md nav-fill bg-light">
      <div className="container">
        <img src="/images/QuickFix_logo.png" className="mx-2" width="50px" alt="logo" />
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-label="expand nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav">
            {routes.map((route) => (
              <li key={route.path}>
                <a href={route.path} className="btn-outline-primary nav-link underline-on-hover">
                  {route.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;