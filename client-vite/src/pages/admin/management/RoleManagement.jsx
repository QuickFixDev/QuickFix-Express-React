import { useState } from "react";
import IconInfo from "../../../components/icons/IconInfo";
import { useRoles } from "../../../hooks/useRoles"; // Assuming you have a useRoles hook
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EditRoleModal from "../../../components/modals/EditRoleModal"; // You need to create this modal component
import CreateRoleModal from "../../../components/modals/CreateRoleModal"; // You need to create this modal component

const Header = () => {
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);

  const handleShowCreateRoleModal = () => {
    setShowCreateRoleModal(true);
  };

  const handleHideCreateRoleModal = () => {
    setShowCreateRoleModal(false);
  };

  return (
    <>
      <div className="row d-flex flex-row align-items-center">
        <div className="col-auto text-start">
          <h2 className="m-0">Role manager</h2>
        </div>
        <div className="col text-start">
          <IconInfo
            message="Click on a role to manage its data."
          />
        </div>
        <div className="col text-end">
          <button onClick={() => handleShowCreateRoleModal()} className="btn btn-primary">
            <div className="row">
              <div className="col-auto">New</div>
              <div className="col-auto">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
          </button>
        </div>
      </div>

      <CreateRoleModal showModal={showCreateRoleModal} handleCancel={() => handleHideCreateRoleModal()} />
    </>
  );
};

const RoleListHeader = () => {
  return (
    <div className="row py-2">
      <div className="col fw-bold">Role Name</div>
    </div>
  );
};

const RoleItem = ({ id, name }) => {
  return (
    <div className="row py-3 cursor-pointer custom-gray-hover border-top">
      <div className="col">{name}</div>
    </div>
  );
};

const RoleManagement = () => {
  const { roles, isLoading: rolesLoading } = useRoles(); // Assuming you have a useRoles hook
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState({});

  const handleShowEditRoleModal = (role) => {
    setShowEditRoleModal(true);
    setRoleToEdit(role);
  };

  const handleHideEditRoleModal = () => {
    setShowEditRoleModal(false);
    setRoleToEdit({});
  };

  return (
    <div className="p-5">
      <Header />

      <div className="mt-4" id="table">
        <RoleListHeader />

        {rolesLoading ? (
          <span>loading...</span>
        ) : (
          roles.map((role) => (
            <div key={role.id} onClick={() => handleShowEditRoleModal(role)}>
              <RoleItem
                id={role.role_id}
                name={role.role_name}
              />
            </div>
          ))
        )}
      </div>

      <EditRoleModal showModal={showEditRoleModal} handleCancel={() => handleHideEditRoleModal()} role={roleToEdit} />
    </div>
  );
};

export default RoleManagement;
