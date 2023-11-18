import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faPlusCircle,
  faList,
  faHouseChimneyUser
}
  from '@fortawesome/free-solid-svg-icons';


// { userRequired: 'resident', path: '/user/complaints/new', label: 'Submit report', iconName: 'faPlusCircle' },
// { userRequired: 'resident', path: '/user/complaints', label: 'My reports', iconName: 'faList' },
// { userRequired: 'resident', path: '/user/residences', label: 'Available residences', iconName: 'faHouseChimneyUser' },


const ResidentPanel = () => {
  const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn

  return (
    <div className="list container-fluid p-md-5 p-3">
      <div className="p-4 mb-4 text-center">
        <h1>Welcome {authUser.FirstName}!</h1>
        <span>How can we assist you today?</span>
      </div>
      <div className="row d-flex flex-row row-cols-lg-3 row-cols-1 g-3">
        <div className="col">
          <Link to="/user/complaints/new">
            <button className="btn btn-outline-primary rounded-4 p-4 w-100">
              <div className="row row-cols-1">
                <div className="col p-lg-3 p-1">
                <FontAwesomeIcon icon={faPlusCircle} size="2x" />
                </div>
                <div className="col p-lg-3 p-1">
                  <span className="">Submit a new report</span>
                </div>
              </div>
            </button>
          </Link>
        </div>
        <div className="col">
          <Link to={`/user/complaints`}>
            <button className="btn btn-outline-primary rounded-4 p-4 w-100">
            <div className="row row-cols-1">
                <div className="col p-lg-3 p-1">
                  <FontAwesomeIcon icon={faList} size="2x" />
                </div>
                <div className="col p-lg-3 p-1">
                  <span className="">View previous reports</span>
                </div>
              </div>
            </button>
          </Link>
        </div>
        <div className="col">
          <Link to="/user/residences">
            <button className="btn btn-outline-primary rounded-4 p-4 w-100">
              <div className="row row-cols-1">
                <div className="col p-lg-3 p-1">
                  <FontAwesomeIcon icon={faHouseChimneyUser} size="2x" />
                </div>
                <div className="col p-lg-3 p-1">
                  <span className="">Search for available properties</span>
                </div>
              </div>
            </button>
          </Link>
        </div>
      </div>

    </div>
  );

};

export default ResidentPanel;
