import { useState } from "react";
import IconInfo from "../../../components/icons/IconInfo";
import { useResidences } from "../../../hooks/useResidences";
import { useUsers } from "../../../hooks/useUsers";
import EditResidenceModal from "../../../components/modals/EditResidenceModal";
import CreateResidenceModal from "../../../components/modals/CreateResidenceModal";
import { Button } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [showCreateResidenceModal, setShowCreateResidenceModal] = useState(false)

  const handleShowCreateResidenceModal = () => {
    setShowCreateResidenceModal(true)
  }

  const handleHideCreateResidenceModal = () => {
    setShowCreateResidenceModal(false)
  }

  return (
    <>
      <div className="row d-flex flex-row align-items-center">
        <div className="col-auto text-start">
          <h2 className="m-0">Residence manager</h2>
        </div>
        <div className="col text-start">
          <IconInfo
            message=
            {
              "Click on a residence to manage its data."
            }
          />
        </div>
        <div className="col text-end">
          <button onClick={() => handleShowCreateResidenceModal()} className="btn btn-primary">
            <div className="row">
              <div className="col-auto">New</div>
              <div className="col-auto">
                <FontAwesomeIcon icon={faHome} />
              </div>
            </div>
          </button>
        </div>
      </div>

      <CreateResidenceModal showModal={showCreateResidenceModal} handleCancel={() => handleHideCreateResidenceModal()} />
    </>
  );
}

const ResidenceListHeader = () => {
  return (
    <div className="row py-2">
      <div className="col fw-bold">Street name</div>
      <div className="col fw-bold">Street number</div>
      <div className="col fw-bold">Owner</div>
    </div>
  );
}

const ResidenceItem = ({ name, number, owner }) => {
  return (
    <div className="row py-3 cursor-pointer custom-gray-hover border-top">
      <div className="col">{name}</div>
      <div className="col">{number}</div>
      <div className="col">{owner}</div>
    </div>
  );
}

const ResidenceManagement = () => {
  const { residences, isLoading: residencesLoading } = useResidences()
  const { users } = useUsers()
  const [showEditResidenceModal, setShowEditResidenceModal] = useState(false)
  const [residenceToEdit, setResidenceToEdit] = useState({})




  const handleShowEditResidenceModal = (residence) => {
    setShowEditResidenceModal(true)
    setResidenceToEdit(residence)
  }

  const handleHideEditResidenceModal = () => {
    setShowEditResidenceModal(false)
    setResidenceToEdit({})
  }

  return (
    <div className="p-5">
      <Header />

      <div className="mt-4" id="table">
        <ResidenceListHeader />

        {residencesLoading ? (
          <span>loading...</span>
        ) : (
          residences.map((residence) => (
            <div key={residence.residence_id} onClick={() => handleShowEditResidenceModal(residence)}>
              <ResidenceItem
                name={residence.street_name}
                number={residence.street_number}
                owner={
                  residence.owner_user_id &&
                  users &&
                  users.find(user => user.user_id === residence.owner_user_id)?.first_name
                  + ' ' +
                  users.find(user => user.user_id === residence.owner_user_id)?.last_name
                }
              />
            </div>
          ))
        )}

      </div>

      <EditResidenceModal showModal={showEditResidenceModal} handleCancel={() => handleHideEditResidenceModal()} residence={residenceToEdit} />
    </div>
  )
}

export default ResidenceManagement;