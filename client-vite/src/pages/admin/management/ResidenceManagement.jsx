import { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import AccessDenied from '../../common/AccessDenied';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ServerUrl from '../../../constants/ServerUrl';
import { useResidentials } from '../../../hooks/useResidentials';
import { useResidences } from '../../../hooks/useResidences';
import { useUsers } from '../../../hooks/useUsers';

function ResidenceListItem({ owner, tenant, residence, setSelectedResidence, deleteResidence, showModal }) {
  return (
    <tr key={residence.residence_id}>
      <td>{residence.residence_id}</td>
      <td>{`${residence.street_name} #${residence.street_number}`}</td>
      <td>{tenant?.first_name}</td>
      <td>{owner?.first_name}</td>
      <td className="text-end">
        <Button
          variant="outline-primary"
          className="me-2"
          onClick={() => {
            setSelectedResidence(residence);
            showModal();
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => deleteResidence(residence.residence_id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );
}


function ResidenceList({ owners, tenants, residences, setSelectedResidence, deleteResidence, showModal }) {
  return (
    <div className="residence-list card border-0 p-3">
      <div className="container d-flex flex-row justify-content-between align-items-center">
        <h2 className='fw-bold'>Residence manager</h2>
        <Link className="text-white text-decoration-none" to="/admin/residences/new">
          <button className="btn btn-primary mb-3">
            <FontAwesomeIcon icon={faPlus} /> Create New Residence
          </button>
        </Link>
      </div>
      <div className="card-body">
        <Table bordered={false} hover>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Residential</th>
              <th>Location</th>
              <th>Tenant</th>
              <th>Owner</th>
              <th className='text-end'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {residences.map((residence) => (
              <ResidenceListItem
                key={residence.residence_id}
                owner={owners[residence.owner_user_id]}
                tenant={tenants[residence.tenant_user_id]}
                residence={residence}
                setSelectedResidence={setSelectedResidence}
                deleteResidence={deleteResidence}
                showModal={showModal}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

// ... (No changes to ResidenceDetails component)

function ResidenceManagement() {
  const { authUser, isLoggedIn } = useAuth();
  const { residences, setResidences, deleteResidence } = useResidences();
  const { users: owners } = useUsers(residences.owner_user_id); // Custom hook for fetching owner details
  const { users: tenants } = useUsers(residences.tenant_user_id); // Custom hook for fetching tenant details
  const [selectedResidence, setSelectedResidence] = useState(null);
  const [show, setShow] = useState(false);

  const showModal = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSelectedResidence(null);
  };

  const handleSave = (editedResidence) => {
    console.log('Saving changes:', editedResidence);
    // Logic to save changes to the server
    handleClose();
  };

  if (isLoggedIn && (authUser.Role === 'admin' || authUser.Role === 'dev')) {
    return (
      <div className="container mt-4">
        <div className="row row-cols-1">
          <div className="col">
            <ResidenceList owners={owners} tenants={tenants} residences={residences} setSelectedResidence={setSelectedResidence} deleteResidence={deleteResidence} showModal={showModal} />
          </div>
          <div className="col">
            {selectedResidence && <ResidenceDetails residence={selectedResidence} handleClose={handleClose} handleSave={handleSave} />}
          </div>
        </div>
      </div>
    );
  } else {
    return <AccessDenied />;
  }
}

export default ResidenceManagement;