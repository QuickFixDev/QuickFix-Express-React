import { useAuth } from "../../contexts/AuthContext";
import { Link, NavLink } from 'react-router-dom';
import LoginButton from "../../components/common/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

import { useCategories } from "../../hooks/useCategories";
import { useEffect, useState } from "react";
import ResidentPanel from "../resident/ResidentPanel";
import AdminPanel from "../admin/AdminPanel";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faLock,
  faUser,
  faFlag,
  faSearch,
  faFilter,
  faFaceSmile

}
  from '@fortawesome/free-solid-svg-icons';


const details = [
  {
    subtitle: "User Registration and Authentication:",
    description: "Users can log in to their accounts securely via Auth0 authentication.",
    iconName: "faLock"
  },
  {
    subtitle: "User Profiles:",
    description: "Residents have profiles with their essential information.",
    iconName: "faUser"
  },
  {
    subtitle: "Complaint Reporting:",
    description: "Residents can submit service requests or complaints, categorizing them based on categories.",
    iconName: "faFlag"
  },
  {
    subtitle: "Complaint Tracking:",
    description: "Complaints can be categorized by status, such as: 'Open', 'In Progress', or 'Closed'",
    iconName: "faSearch"
  },
  {
    subtitle: "Service categories:",
    description: "The system maintains a list of predefined service categories with descriptions for easy complaint categorization.",
    iconName: "faFilter"
  },
  {
    subtitle: "User-Friendly Interface:",
    description: "The user interface is designed for ease of use, with intuitive forms for complaint submission and profile management.",
    iconName: "faFaceSmile"
  },
]

const iconMapping = {
  faLock: faLock,
  faUser: faUser,
  faFlag: faFlag,
  faSearch: faSearch,
  faFilter: faFilter,
  faFaceSmile: faFaceSmile,
}

const WelcomePage = () => {
  const { authUser, isLoggedIn } = useAuth();
  const { categories, loading } = useCategories();
  const { loginWithRedirect } = useAuth0();

  const [randomGradients, setRandomGradients] = useState([]);

  useEffect(() => {
    // Function to generate a random light color in hexadecimal format
    const randomLightColor = () => {
      const letters = 'CEF'; // Using higher values for lighter colors
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    };

    // Generate random light gradients for each item
    const gradients = Array.from({ length: details.length }, () => {
      const color1 = randomLightColor();
      const color2 = randomLightColor();
      return `linear-gradient(to right, ${color1}, ${color2})`;
    });

    // Set the random light gradients in the state
    setRandomGradients(gradients);
  }, [details]); // Run this effect whenever details change

  return (
    <>

      <div className="container-fluid h-100">
        <div className="row row-cols-lg-2 d-flex flex-row p-md-5 p-3"
          style={{
            background: "linear-gradient(to right, #EBE5FB, #C2FBFA)",
          }}
        >
          <div className="col">
            <h1 className="fw-bold pb-4">
              Having troubles with your residence?
            </h1>

            <p className="fw-light">
              QuickFix

              QuickFix is a system designed to enhance communication between tenants and managers residential complexes and private residences.
              The system facilitates efficient communication between residents and management, allowing users to report and track various maintenance and service requests seamlessly.
            </p>

            <div className="row g-1">
              <Link to={'/user/request'} className="col-auto text-decoration-none">
                <button className="btn btn-primary">
                  Sign up for free
                </button>
              </Link>

              <Link onClick={() => loginWithRedirect()} className="col-auto">
                <button className="btn btn-outline-dark">
                  Sign into your account
                </button>
              </Link>
            </div>

          </div>
          <div className="col d-lg-flex d-none flex-row align-items-center justify-content-center">
            <FontAwesomeIcon icon={faHome} size="10x" />
          </div>
        </div >

        <div className="col-12 p-md-5 p-3 bg-white">
          <h4 className="fw-bold mb-4">
            Features
          </h4>
          <div className="row row-cols-md-3 row-cols-sm-2 row-cols-1">
            {details.map((detail, index) => (
              <div className="col-md-4 rounded-2" key={index}>
                <div className=" shadow-sm rounded-2 mb-4">
                  <div className="rounded-2  container-fluid text-black d-flex flex-col justify-content-center align-items-center p-5"
                    style={{
                      background: randomGradients[index], // Use the random gradient for this item
                      color: 'black', // Set text color to black for better contrast
                    }}
                  >
                    <FontAwesomeIcon icon={iconMapping[detail.iconName]} size="3x" />
                  </div>
                  <div className="p-3">
                    <p className=" fw-bold">{detail.subtitle}</p>
                    <p className="">{detail.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

  if (authUser.Role === 'resident') {
    return <ResidentPanel />
  }
  if (authUser.Role === 'dev') {
    return <AdminPanel />
  }

}

export default HomePage;