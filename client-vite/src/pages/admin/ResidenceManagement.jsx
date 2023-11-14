import { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import AccessDenied from '../common/AccessDenied';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ServerUrl from '../../constants/ServerUrl';

function ResidenceList({ residences, setSelectedResidence, deleteResidence, showModal }) {
    return (
        <div className="residence-list card border-0 p-3">
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <h3>Residence List</h3>
                <button className="btn btn-primary mb-3">
                    <Link className="text-white text-decoration-none" to="/admin/residences/new">
                        <FontAwesomeIcon icon={faPlus} /> Create New Residence
                    </Link>
                </button>
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

function ResidenceDetails({ residence, handleClose, handleSave }) {
    const [editedResidence, setEditedResidence] = useState({ ...residence });

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
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={editedResidence.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={editedResidence.location}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
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
