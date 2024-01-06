import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateComplaintModal from '../../components/modals/CreateComplaintModal'
import { useState } from "react";

import {
  faPlusCircle,
  faList,
  faHouseChimneyUser
}
  from '@fortawesome/free-solid-svg-icons';

const ResidentPanel = () => {
  const { authUser, isLoggedIn } = useAuth();
  const [showCreateComplaintModal, setShowCreateComplaintModal] = useState(false)

  const handleShowCreateComplaintModal = () => {
    setShowCreateComplaintModal(true)
  }

  const handleHideCreateComplaintModal = () => {
    setShowCreateComplaintModal(false)
  }

  return (
    <div className="list container-fluid p-md-5 p-3">
      <div className="p-4 mb-4 text-center">
        <h1>Welcome {authUser.FirstName}!</h1>
        <span>How can we assist you today?</span>
      </div>
      <div className="row d-flex flex-row align-items-center justify-content-center">
        <NavLink onClick={() => handleShowCreateComplaintModal()} className="col-lg-4 col-md-8 col-sm-10 col-12 text-decoration-none">
          <div className="container text-center rounded-4 p-5 hover-navlink">
            <div className="my-3">
              <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            </div>
            <div className="my-3">
              <span className="">Submit a new report</span>
            </div>
          </div>
        </NavLink>

        <CreateComplaintModal showModal={showCreateComplaintModal} handleCancel={handleHideCreateComplaintModal} />
      </div>

    </div>
  );

};

export default ResidentPanel;
