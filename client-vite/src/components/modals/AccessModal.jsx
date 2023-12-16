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

const AccessModal = ({ user, onClose }) => {
    const { users, isLoading: usersLoading } = useUsers();

    const pendingUsers = users.filter(user => user.status === 'Pending request');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${ServerUrl}/admin/users/access/${user.user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: selectedStatus,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('User updated successfully:', data);
                onClose(); // Close the modal on success
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <Modal show={true} onHide={onClose} onExit={() => console.log('Modal is exiting')} onExited={onClose} size='lg' centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5 className='fw-bold m-0 my-2'>User requests</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <Form onSubmit={handleSubmit}>
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
                                                <Link>
                                                    <FontAwesomeIcon className='px-2 text-primary' icon={faCheck} />
                                                </Link>
                                            </td>
                                            <td className='text-center'>
                                                <Link>
                                                    <FontAwesomeIcon className='px-2 text-danger' icon={faX} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                message
                            </div>
                        )}

                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
};

export default AccessModal;
