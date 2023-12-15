import { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import AccessDenied from '../../../components/access/AccessDenied';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ServerUrl from '../../../constants/ServerUrl';
import { useResidentials } from '../../../hooks/useResidentials';
import { useResidences } from '../../../hooks/useResidences';
import { useUsers } from '../../../hooks/useUsers';
import FilterComponent from '../../../components/filtering/FilterComponent';
import SearchBar from '../../../components/filtering/SearchBar';

function ResidenceListItem({ owner, tenant, residence, setSelectedResidence, deleteResidence, showModal }) {
  return (
    <tr key={residence.residence_id}>
      <td>{`${residence.street_name} #${residence.street_number}`}</td>
      <td>{tenant?.first_name}</td>
      <td>{owner?.first_name}</td>
    </tr>
  );
}

const filterOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const Filter = ({ selectedCategories, handleFilterChange }) => {
  const { roles } = useRoles();

  return (
    <div className="col-md-2 col-3">
      <div className="row row-cols-1">
        <div className="col p-0 g-2 mb-2">
          <div>
            {roles && roles.length > 0 ?
              (
                roles.map((role) => (
                  <div key={role.role_id}>
                    <Checkbox
                      checked={selectedCategories.includes(role.role_id)}
                      className="p-2"
                      onChange={() => handleFilterChange(role.role_id)}
                    >
                      {role.role_name}
                    </Checkbox>
                  </div>
                ))
              ) : (
                <div>
                  hey
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function ResidenceList({ owners, tenants, residences, setSelectedResidence, deleteResidence, showModal }) {

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearch = (value) => {
    setSearch(value);
  }

  return (
    <div className="list container-fluid p-md-5 p-3">
      <div className="row">
        <div className="col text-start">
          <h2 className="fw-bold">Residence manager</h2>
        </div>
        <div className="col">
          <button className="btn btn-primary mb-3">
            <FontAwesomeIcon icon={faPlus} /> Create New Residence
          </button>
        </div>
      </div>

      <div className="row py-3">
        <div className="col">
          <SearchBar onSearch={handleSearch} searchType='users' />
        </div>
        <div className="col-auto">
          <div className="container">
            <FilterComponent options={filterOptions} onSelectFilter={handleSelectFilter} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className='table table-hover'>
            <thead>
              <tr>
                <th className='col-4'>Location</th>
                <th className='col-4'>Tenant</th>
                <th className='col-4'>Owner</th>
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
          </table>
        </div>
      </div>
    </div>
  );
}


function ResidenceManagement() {
  const { authUser, isLoggedIn } = useAuth();
  const { residences, setResidences, deleteResidence } = useResidences();
  const { users: owners } = useUsers(residences.owner_user_id);
  const { users: tenants } = useUsers(residences.tenant_user_id);
  const [selectedResidence, setSelectedResidence] = useState(null);
  const [show, setShow] = useState(false);

  const showModal = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSelectedResidence(null);
  };

  const handleSave = (editedResidence) => {
    console.log('Saving changes:', editedResidence);
    handleClose();
  };

  if (isLoggedIn && (authUser.Role === 'admin' || authUser.Role === 'dev')) {
    return (
      <div className="container-fluid">
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