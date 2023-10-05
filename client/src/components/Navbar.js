import React from 'react';

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
            <li className="nav-item">
              <a
                href="/"
                className="btn-outline-primary nav-link centered-expand-underline"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/test"
                className="btn-outline-primary nav-link centered-expand-underline"
              >
                Test
              </a>
            </li>
            <li>
              <a
                href="/complain-form"
                className="btn-outline-primary nav-link centered-expand-underline"
              >
                Complain form
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/about "
                className="btn-outline-primary nav-link centered-expand-underline"
              >
                About
              </a>
            </li>

            {loggedIn ? (
              <>
                <li className="nav-item">
                  <a
                    href="/profile"
                    className="nav-link centered-expand-underline"
                  >
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/logout"
                    className="nav-link centered-expand-underline"
                  >
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
