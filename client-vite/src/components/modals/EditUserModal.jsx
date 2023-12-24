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

                </div>
            </Modal.Body>
        </Modal >
    );
};

export default AccessModal;
