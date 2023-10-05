import React from 'react';
// import { Link } from 'react-router-dom';

const generalRoutes = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/complain-form', label: 'Complain form' },
  { path: '/user-report', label: 'User report' },
];


const loggedIn = true; // You can replace this with your authentication logic

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md nav-fill bg-light">
      <div className="container">
        <img src="/images/QuickFix_logo.png" className="mx-2" width="50px" alt="logo" />
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-label="expand nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav">
            {generalRoutes.map((route) => (
              <li key={route.path}>
                <a href={route.path} className="btn-outline-primary nav-link centered-expand-underline">
                  {route.label}
                </a>
              </li>
            ))}

            {loggedIn ? (
              <>
                <li className="nav-item">
                  <a href="/user-profile" className="nav-link centered-expand-underline">
                    My profile
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/logout" className="nav-link centered-expand-underline">
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a href="/login" className="nav-link centered-expand-underline">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
