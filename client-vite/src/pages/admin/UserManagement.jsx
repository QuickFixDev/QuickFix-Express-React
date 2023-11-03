/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function UserList({ users, setSelectedUser, deleteUser }) {

    return (
        <div className="user-list card border-0 shadow-md p-3">
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <h3>User List</h3>
                <button className="btn btn-primary mb-3">
                    <Link className='text-white text-decoration-none' to="/user-storage">
                        <FontAwesomeIcon icon={faUserPlus} /> Create New User
                    </Link>
                </button>
            </div>
            <div className="card-body">

                {/* Map over the user data and generate list items */}
                <ul className="list-group mt-3">
                    {users.map((user) => (
                        <li key={user.user_id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <span className="me-3">{user.first_name + ' ' + user.last_name}</span>
                                <span className="badge bg-secondary">{user.role}</span>
                            </div>
                            <div>
                                <button
                                    className="btn btn-outline-primary me-2"
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => deleteUser(user.user_id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                {/* Additional user actions */}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function UserDetails({ user }) {
    return (
        <div className="user-details card border-0 shadow-md p-3">
            <div className="card-header bg-white border-0">
                <h3>User Details</h3>
            </div>
            <div className="card-body">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="first_name_input" value={user.first_name} />
                    <label htmlFor="first_name_input">First name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="last_name_input" value={user.last_name} />
                    <label htmlFor="last_name_input">Last name</label>
                </div>
                <div className="form-floating mb-3">
                    <select className="form-select" id="roleSelect" value={user.first_name}>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="user">User</option>
                    </select>
                    <label htmlFor="roleSelect">Role</label>
                </div>

                <div className="button-group">
                    <div className="d-flex flex-column my-3">
                        <button className="btn btn-primary my-1">Save Changes</button>
                        <button className="btn btn-outline-primary my-1">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserManagement() {
    const [ users, setUsers ] = useState([]);
    const [ selectedUser, setSelectedUser ] = useState(null);

    useEffect(() => {
        fetch(`${ServerUrl}/users`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const deleteUser = (userId) => {
        fetch(`${ServerUrl}/users/${userId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(`HTTP error! Status: ${response.status}`);
                }
                const updatedUsers = users.filter((user) => user.user_id !== userId);
                setUsers(updatedUsers);
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-6">
                    <UserList users={users} setSelectedUser={setSelectedUser} deleteUser={deleteUser} />
                </div>
                <div className="col-lg-6">
                    {selectedUser && <UserDetails user={selectedUser} />}
                </div>
            </div>
        </div>
    );
}

export default UserManagement;
