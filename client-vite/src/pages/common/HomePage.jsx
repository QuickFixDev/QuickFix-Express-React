import { useAuth } from "../../contexts/AuthContext";
import { Link, NavLink } from 'react-router-dom';
import LoginButton from "../../components/access/LoginButton";
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
import AccessRequestModal from "../../components/modals/AccessRequestModal";
import EmployeePanel from "../employee/EmployeePanel";

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
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleHideModal = () => {
    setShowModal(false);
  }

  const [randomGradients, setRandomGradients] = useState([]);

  useEffect(() => {
    // Function to generate a random light color in hexadecimal format
    const randomLightColor = () => {
      const colors = [
        '#B7FFEC',
        '#B9FFFF',
        '#DCD9FF',
        '#F7D1FF',
        '#FFD9EB',
      ];
      const randomIndex = Math.floor(Math.random() * colors.length)
      const randomColor = colors[randomIndex];
      return randomColor;
    };

    // Generate random light gradients for each item
    const gradients = Array.from({ length: details.length }, () => {
      let repeat = true;

      while (repeat) {
        let color1 = randomLightColor();
        let color2 = randomLightColor();

        if (color1 !== color2) {
          repeat = false;
          return `linear-gradient(to right, ${color1}, ${color2})`;
        }
      }
    });


    // Set the random light gradients in the state
    setRandomGradients(gradients);
  }, [details]);

  return (
    <>

      <div className="container-fluid h-100">
        <div className="row row-cols-lg-2 d-flex flex-row p-0 px-md-5 px-3"
          style={{
            background: "linear-gradient(to right, #FBF7FF, #C2FBFA)",
          }}
        >
          <div className="col">

            <div className="row">
              <h1 className="fw-bold m-0 mt-5">
                Having troubles with your residence?
              </h1>
            </div>

            <div className="row">
              <p className="fw-light m-0 mt-4 ">
                QuickFix is a system designed to enhance communication between tenants and managers residential complexes and private residences.
                The system facilitates efficient communication between residents and management, allowing users to report and track various maintenance and service requests seamlessly.
              </p>
            </div>


            <div className="row px-2">
              <button onClick={handleShowModal} className="mt-4 btn btn-outline-primary">
                Create an account
              </button>
            </div>
            <div className="row px-2">
              <button onClick={() => loginWithRedirect()} className="mt-2 mb-5 col btn btn-primary">
                Sign into your account
              </button>
            </div>

          </div>
          <div className="col d-lg-flex d-none flex-row align-items-center justify-content-center">
            <img src="/svg/QuickFixGray.svg" alt="System Photo" className="user-photo mx-3" width={'200px'} />
          </div>
        </div >

        <div className="col-12 p-md-5 p-3 bg-white">
          <h4 className="fw-bold mb-4">
            Features
          </h4>
          <div className="row row-cols-md-3 row-cols-sm-2 row-cols-1">
            {details.map((detail, index) => (
              <div className="col-md-4 rounded-2 mb-4" key={index}>
                <div className=" shadow-sm h-100 rounded-2">
                  <div className="container-fluid text-black d-flex flex-column justify-content-center align-items-center p-5"
                    style={{
                      background: randomGradients[index],
                      color: 'black',
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

      <AccessRequestModal showModal={showModal} handleClose={handleHideModal} />
    </>
  );
}

const HomePage = () => {
  const { authUser, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <WelcomePage />
  }

  if (authUser.Role === 'resident') {
    return <ResidentPanel />
  }
  if (authUser.Role === 'dev') {
    return <EmployeePanel />
  }

}

export default HomePage;