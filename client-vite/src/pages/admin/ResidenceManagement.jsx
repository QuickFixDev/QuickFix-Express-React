import { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import AccessDenied from '../common/AccessDenied';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ServerUrl from '../../constants/ServerUrl';
import { getResidentials } from '../../contexts/ResidentialContext';
import { getResidences } from '../../contexts/ResidenceContext';

function ResidenceList({ residences, setSelectedResidence, deleteResidence, showModal }) {
    return (
        <div className="residence-list card border-0 p-3">
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <h3>Residence manager</h3>
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
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residences.map((residence) => (
                            <tr key={residence.residence_id}>
                                <td>{residence.residence_id}</td>
                                <td>{residence.street_name} #{residence.street_number}</td>
                                <td>{residence.tenant_user_id}</td>
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
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
'Gerardo', 'Díaz', 'gerardo.diaz@cetis155.edu.mx', '+52 1 449 100 8056'
function ResidenceDetails({ residence, handleClose, handleSave }) {
    const [editedResidence, setEditedResidence] = useState({ ...residence });
    const { residentials } = getResidentials();
    const { residences } = getResidences();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedResidence((prevResidence) => ({
            ...prevResidence,
            [name]: value,
        }));
    };

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Residence</Modal.Title>
            </Modal.Header>


            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formResidentialId">
                        <Form.Label>Residential</Form.Label>
                        {residentials && residentials.length > 0 ? (
                            <select
                                className="form-select"
                                name="residence_id"
                                value={editedResidence.residence_id}
                                onChange={handleChange}
                            >
                                {residentials.map((residential, index) => (
                                    <option key={index} value={residential.residential_id}>
                                        {residential.residential_name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            'No residentials available'
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formResidenceSelect">
                        <Form.Label>Select Residence</Form.Label>
                        {residences && residences.length > 0 ? (
                            <Form.Control as="select" className="form-select">
                                {residences.map((residence, index) => (
                                    <option key={index} value={residence.residence_id}>
                                        {residence.street_name} #{residence.street_number}
                                    </option>
                                ))}
                            </Form.Control>
                        ) : (
                            'No residences available'
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formOwnerUserId">
                        <Form.Label>Owner User ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="owner_user_id"
                            value={editedResidence.owner_user_id}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTenantUserId">
                        <Form.Label>Tenant User ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="tenant_user_id"
                            value={editedResidence.tenant_user_id}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formZipCode">
                        <Form.Label>ZIP Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="zip_code"
                            value={editedResidence.zip_code}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStreetName">
                        <Form.Label>Street Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="street_name"
                            value={editedResidence.street_name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStreetNumber">
                        <Form.Label>Street Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="street_number"
                            value={editedResidence.street_number}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDetails">
                        <Form.Label>Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="details"
                            value={editedResidence.details}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={editedResidence.status}
                            onChange={handleChange}
                        >
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>;
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(editedResidence)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


useAuth
function ResidenceManagement() {
    const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn
    const [residences, setResidences] = useState([]);
    const [selectedResidence, setSelectedResidence] = useState(null);
    const [show, setShow] = useState(false);

    const showModal = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setSelectedResidence(null);
    };

    useEffect(() => {
        fetch(`${ServerUrl}/admin/residences`)
            .then((response) => response.json())
            .then((data) => setResidences(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const deleteResidence = (residenceId) => {
        fetch(`${ServerUrl}/admin/residences/${residenceId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    const updatedResidences = residences.filter((residence) => residence.residence_id !== residenceId);
                    setResidences(updatedResidences);
                }
            })
            .catch((error) => console.error('Error deleting residence:', error));
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
                        <ResidenceList residences={residences} setSelectedResidence={setSelectedResidence} deleteResidence={deleteResidence} showModal={showModal} />
                    </div>
                    <div className="col">
                        {selectedResidence && <ResidenceDetails residence={selectedResidence} handleClose={handleClose} handleSave={handleSave} />}
                    </div>
                </div>
            </div>
        );
    } else {
        return <AccessDenied />
    }
}

export default ResidenceManagement;
