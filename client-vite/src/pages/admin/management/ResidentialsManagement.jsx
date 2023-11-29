import { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import AccessDenied from '../../common/AccessDenied';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ServerUrl from '../../../constants/ServerUrl';

function ResidentialList({ residentials, setSelectedResidential, deleteResidential, showModal }) {
    return (
        <div className="residential-list card border-0 p-3">
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <h2 className='fw-bold'>Residential manager</h2>
                <Link className="text-white text-decoration-none" to="/admin/residentials/new">
                    <button className="btn btn-primary mb-3">
                        <FontAwesomeIcon icon={faPlus} /> Create New Residential
                    </button>
                </Link>
            </div>
            <div className="card-body">
                <Table bordered={false} hover>
                    <thead style={{ backgroundColor: '#f2f2f2' }}>
                        <tr>
                            <th>Residential Name</th>
                            <th className='d-none d-md-table-cell'>Country</th>
                            <th className='d-none d-md-table-cell'>State</th>
                            <th>City</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residentials.map((residential) => (
                            <tr key={residential.residential_id}>
                                <td>{residential.residential_name}</td>
                                <td className='d-none d-md-table-cell'>{residential.country}</td>
                                <td className='d-none d-md-table-cell'>{residential.state}</td>
                                <td>{residential.city}</td>
                                <td className="text-end">
                                    <Button
                                        variant="outline-primary"
                                        className="me-2"
                                        onClick={() => {
                                            setSelectedResidential(residential);
                                            showModal();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => deleteResidential(residential.residential_id)}
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

function ResidentialDetails({ residential, handleClose, handleSave }) {
    const [editedResidential, setEditedResidential] = useState({ ...residential });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedResidential((prevResidential) => ({
            ...prevResidential,
            [name]: value,
        }));
    };

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Residential</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formResidentialName">
                        <Form.Label>Residential Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="residential_name"
                            value={editedResidential.residential_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={editedResidential.country}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={editedResidential.state}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={editedResidential.city}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(editedResidential)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function ResidentialsManagement() {
    const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn
    const [residentials, setResidentials] = useState([]);
    const [selectedResidential, setSelectedResidential] = useState(null);
    const [show, setShow] = useState(false);

    const showModal = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setSelectedResidential(null);
    };

    useEffect(() => {
        fetch(`${ServerUrl}/admin/residentials`)
            .then((response) => response.json())
            .then((data) => setResidentials(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const deleteResidential = (residentialId) => {
        fetch(`${ServerUrl}/admin/residentials/${residentialId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    const updatedResidentials = residentials.filter(
                        (residential) => residential.residential_id !== residentialId
                    );
                    setResidentials(updatedResidentials);
                }
            })
            .catch((error) => console.error('Error deleting residential:', error));
    };

    const handleSave = (editedResidential) => {
        console.log('Saving changes:', editedResidential);
        // Logic to save changes to the server
        handleClose();
    };

    if (isLoggedIn && (authUser.Role === 'admin' || authUser.Role === 'dev')) {
        return (
            <div className="container mt-4">
                <div className="row row-cols-1">
                    <div className="col">
                        <ResidentialList
                            residentials={residentials}
                            setSelectedResidential={setSelectedResidential}
                            deleteResidential={deleteResidential}
                            showModal={showModal}
                        />
                    </div>
                    <div className="col">
                        {selectedResidential && (
                            <ResidentialDetails
                                residential={selectedResidential}
                                handleClose={handleClose}
                                handleSave={handleSave}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return <AccessDenied />;
    }
}

export default ResidentialsManagement;