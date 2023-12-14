import { Link, NavLink } from "react-router-dom";
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
  const { authUser, isLoggedIn } = useAuth();

  return (
    <div className="list container-fluid p-md-5 p-3">
      <div className="p-4 mb-4 text-center">
        <h1>Welcome {authUser.FirstName}!</h1>
        <span>How can we assist you today?</span>
      </div>
      <div className="row d-flex flex-row row-cols-lg-3 row-cols-1 g-3 px-md-1 px-5">

        <NavLink to={'/user/complaints/new'} className="text-decoration-none">
          <div className="container text-center rounded-4 p-5 hover-navlink">
            <div className="my-3">
              <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            </div>
            <div className="my-3">
              <span className="">Submit a new report</span>
            </div>
          </div>
        </NavLink>

        <NavLink to={'/user/complaints'} className="text-decoration-none">
          <div className="container text-center rounded-4 p-5 hover-navlink">
            <div className="my-3">
              <FontAwesomeIcon icon={faList} size="2x" />
            </div>
            <div className="my-3">
              <span className="">View previous reports</span>
            </div>
          </div>
        </NavLink>

        <NavLink to={'/user/residences'} className="text-decoration-none">
          <div className="container text-center rounded-4 p-5 hover-navlink">
            <div className="my-3">
              <FontAwesomeIcon icon={faHouseChimneyUser} size="2x" />
            </div>
            <div className="my-3">
              <span className="">Available properties</span>
            </div>
          </div>
        </NavLink>

      </div>

    </div>
  );

};

export default ResidentPanel;
