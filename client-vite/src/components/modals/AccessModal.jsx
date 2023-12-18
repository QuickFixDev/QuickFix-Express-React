// AccessModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { Form, FloatingLabel } from 'react-bootstrap';

import ServerUrl from '../../constants/ServerUrl';
import { useActivityStatuses } from '../../hooks/useActivityStatuses';
import { useUsers } from '../../hooks/useUsers';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFighterJet, faX } from '@fortawesome/free-solid-svg-icons';

const AccessModal = ({ showModal, handleClose }) => {
    const { users, isLoading: usersLoading, fetchData } = useUsers();
    const [selectedUserId, setSelectedUserId] = useState(null);

    const pendingUsers = users.filter(user => user.status === 'Pending request');

    const handleAcceptRequest = () => {
        if (selectedUserId) {
            updateUserStatus(selectedUserId, 2);
            fetchData();
        }
    }

    const handleDenyRequest = () => {
        if (selectedUserId) {
            updateUserStatus(selectedUserId, 4);
            fetchData();
        }
    }

    const updateUserStatus = (userId, newStatus) => {
        fetch(`${ServerUrl}/admin/users/access/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                statusId: newStatus,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('User updated successfully:', data);
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <Modal show={showModal} onHide={handleClose} size='lg' centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>User requests</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <div className="row">
                    {pendingUsers.length > 0 ? (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th className='col-10'>Name</th>
                                    <th className='col-1 text-center'>Accept</th>
                                    <th className='col-1 text-center'>Deny</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingUsers.map((user) => (
                                    <tr key={user.user_id}>
                                        <td>
                                            <span> {user.first_name} {user.last_name} </span>
                                        </td>
                                        <td className='text-center'>
                                            <button
                                                className='btn'
                                                onClick={() => {
                                                    setSelectedUserId(user.user_id);
                                                    handleAcceptRequest();
                                                }}
                                            >
                                                <FontAwesomeIcon className='px-2 text-primary' icon={faCheck} />
                                            </button>
                                        </td>
                                        <td className='text-center'>
                                            <button
                                                className='btn'
                                                onClick={() => {
                                                    setSelectedUserId(user.user_id);
                                                    handleDenyRequest();
                                                }}
                                            >
                                                <FontAwesomeIcon className='px-2 text-danger' icon={faX} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>
                            No users to display
                        </div>
                    )}

                </div>
            </Modal.Body>
        </Modal >
    );
};

export default AccessModal;
