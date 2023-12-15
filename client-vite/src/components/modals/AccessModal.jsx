// AccessModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Form, FloatingLabel } from 'react-bootstrap';

import ServerUrl from '../../constants/ServerUrl';
import { useRoles } from '../../hooks/useRoles';
import { useActivityStatuses } from '../../hooks/useActivityStatuses';
import { useResidences } from '../../hooks/useResidences';

const AccessModal = ({ user, onClose }) => {
    const { activityStatuses } = useActivityStatuses();

    const [selectedRole, setSelectedRole] = useState(user.role_name);
    const [selectedActivityStatus, setSelectedActivityStatus] = useState(user.status);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

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
        <Modal show={true} onHide={onClose} onExit={() => console.log('Modal is exiting')} onExited={onClose} size='xl' centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5 className='fw-bold m-0 my-2'>Edit User</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col my-2 floating-placeholder">
                            <FloatingLabel controlId="first_name" label="First Name">
                                <Form.Control name='first_name' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </FloatingLabel>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
};

export default AccessModal;
