import { useState, useEffect } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AccessDenied from '../common/AccessDenied';
import { getRoles } from "../../contexts/RoleContext";

import { Table } from 'react-bootstrap';

const NewRequestNotification = ({ count }) => {
    return (
        <div>
            {count > 0 ? (
                <div className="alert alert-success">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div>
                            You have {count} access {count === 1 ? 'request' : 'requests'}!
                        </div>
                        <button className="btn btn-success">Manage requests</button>
                    </div>
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    );
};

function UserList({ users, setSelectedUser, deleteUser, showModal }) {
    return (
        <div className="user-list card border-0 p-3">
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <h3>User manager</h3>
                <button className="btn btn-primary mb-3">
                    <Link className="text-white text-decoration-none" to="/admin/users/new">
                        <FontAwesomeIcon icon={faUserPlus} /> Create New User
                    </Link>
                </button>
            </div>
            <div className="card-body">
                {/* Use Table component from react-bootstrap */}
                <Table bordered={false} hover>
                    <thead style={{ backgroundColor: '#f2f2f2' }}>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.role}</td>
                                <td className="text-end">
                                    <Button
                                        variant="outline-primary"
                                        className="me-2"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            showModal();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => deleteUser(user.user_id)}
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

function UserDetails({ user, handleClose, handleSave }) {
    const { roles } = getRoles();
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={editedUser.first_name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={editedUser.last_name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formResidence">
                        <Form.Label>Residence</Form.Label>
                        <Form.Control
                            type="text"
                            name="residence"
                            value={editedUser.residence}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label>PhoneNumber</Form.Label>
                        <Form.Control
                            type="number"
                            name="phone_number"
                            value={editedUser.phone_number}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            name="role"
                            value={editedUser.role}
                            onChange={handleChange}
                        >

                            <option value="">Select role</option>
                            {roles.map((role, index) => (
                                <option key={index} value={role.role_name} onChange={handleChange}>
                                    {role.role_name}
                                </option>
                            ))}

                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(editedUser)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function UserManagement() {
    const { authUser, isLoggedIn } = useAuth();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [show, setShow] = useState(false);

    const showModal = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        fetch(`${ServerUrl}/admin/users`)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const deleteUser = (userId) => {
        fetch(`${ServerUrl}/admin/users/${userId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    const updatedUsers = users.filter((user) => user.user_id !== userId);
                    setUsers(updatedUsers);
                }
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    const handleSave = (editedUser) => {
        console.log('Saving changes:', editedUser);
        // Logic to save changes to the server
        handleClose();
    };

    if (isLoggedIn && (authUser.Role === 'admin' || authUser.Role === 'dev')) {
        return (
            <div className="container mt-4">
                <div className="row row-cols-1">
                    <div className="col">
                        <NewRequestNotification count={2} />
                    </div>
                    <div className="col">
                        <UserList users={users} setSelectedUser={setSelectedUser} deleteUser={deleteUser} showModal={showModal} />
                    </div>
                    <div className="col">
                        {selectedUser && <UserDetails user={selectedUser} handleClose={handleClose} handleSave={handleSave} />}
                    </div>
                </div>
            </div>
        );
    } else {
        return <AccessDenied />
    }
}

export default UserManagement;
