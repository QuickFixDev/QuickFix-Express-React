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
                <Modal.Title className='fw-bold'>User requests</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <div className="row">
                    {pendingUsers.length > 0 ? (
                        <div>
                            {pendingUsers.map((user) => (
                                <div key={user.user_id} className="row py-3 ">
                                    <div className="col-8">
                                        <div className="row">
                                            <div className="col-auto">
                                                <img className="rounded-5" src="/images/user_placeholder.png" alt="Loading" width={'40px'} />
                                            </div>
                                            <div className="col">
                                                <span> {user.first_name} {user.last_name} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2 text-center">
                                        <button className='btn' onClick={() => { setSelectedUserId(user.user_id); handleDenyRequest(); }} >
                                            <FontAwesomeIcon className='p-2 rounded-5 custom-gray-hover text-secondary' icon={faX} />
                                        </button>
                                    </div>
                                    <div className="col-2 text-center">
                                        <button className='btn' onClick={() => { setSelectedUserId(user.user_id); handleAcceptRequest(); }} >
                                            <FontAwesomeIcon className='p-2 rounded-5 custom-gray-hover text-primary' icon={faCheck} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
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
