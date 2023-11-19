import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from 'react-router-dom';
import LoginButton from "../../components/common/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

import { getCategories } from "../../contexts/CategoryContext";
import { useEffect, useState } from "react";
import ResidentPanel from "../resident/ResidentPanel";

const WelcomePage = () => {
  const { authUser, isLoggedIn } = useAuth();
  const { categories, loading } = getCategories();
  const { loginWithRedirect } = useAuth0();

  return (
    <>

      <div className="list container-fluid h-100  p-md-5 p-3">

        <div className="row d-flex flex-row g-3">
          <div className="col-12">
            <div className="container text-center rounded-4 p-3">
              <div className="street my-5">
                <h1> Hey! welcome to QuickFix </h1>
              </div>
            </div>
          </div>
          <NavLink to={'/user/request'} className="col-md-6 col-12 hover-navlink">
            <div className="container text-center rounded-4 p-5 shadow-md">
              <div className="my-3">
                <h3>New around here?</h3>
              </div>
              <div className="my-3">
                <p>Sign up for free!</p>
              </div>
            </div>
          </NavLink>
          <NavLink className="col-md-6 col-12 hover-navlink" onClick={() => loginWithRedirect()}>
              <div className="container text-center rounded-4 p-5 shadow-md">
                <div className="my-3">
                  <h3>Do you have an account?</h3>
                </div>
                <div className="my-3">
                  <p>Sign into your account</p>
                </div>
              </div>
          </NavLink>
        </div>

      </div >
    </>
  );
}

const HomePage = () => {
  const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn

  if (!isLoggedIn) {
    return <WelcomePage />
  }

  if (authUser.Role === 'resident' || authUser.Role === 'dev') {
    return <ResidentPanel />
  }

}

export default HomePage;