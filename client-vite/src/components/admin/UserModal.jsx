// UserModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Form, FloatingLabel } from 'react-bootstrap';

import ServerUrl from '../../constants/ServerUrl';
import { useRoles } from '../../hooks/useRoles';
import { useActivityStatuses } from '../../hooks/useActivityStatuses';
import { useResidences } from '../../hooks/useResidences';

const UserModal = ({ user, onClose }) => {
    const { roles } = useRoles();
    const { activityStatuses } = useActivityStatuses();
    const { residences } = useResidences();

    const [selectedRole, setSelectedRole] = useState(user.role_name);
    const [selectedActivityStatus, setSelectedActivityStatus] = useState(user.status);
    const [selectedResidence, setSelectedResidence] = useState(user.status);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);


    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [chatboxMessage, setChatboxMessage] = useState('');

    const handleSubmit = (e) => {
        console.log('Submitting Form:', {
            complaintId: complaint.id,
            selectedEmployee,
            selectedStatus,
            chatboxMessage,
        });

        e.preventDefault();

        fetch(`${ServerUrl}/admin/users/edit/${user.user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                role_id: selectedRole,
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
        <Modal
            show={true}
            onHide={onClose}
            onExit={() => console.log('Modal is exiting')}
            onExited={onClose}
            size='xl' centered
            backdrop="static"
        >
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
                    <div className="row">
                        <div className="col my-2">
                            <FloatingLabel controlId="last_name" label="Last Name">
                                <Form.Control name='last_name' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className="row row-cols-md-2 row-cols-1">
                        <div className="col my-2">
                            <FloatingLabel controlId="email" label="Email">
                                <Form.Control name='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FloatingLabel >
                        </div>
                        <div className="col my-2">
                            <FloatingLabel controlId="phone" label="Phone">
                                <Form.Control name='phone' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </FloatingLabel >
                        </div>
                    </div>
                    <div className="row row-cols-md-2 row-cols-1">
                        <div className="col my-2">
                            <FloatingLabel controlId="role_id" label="Role">
                                <Form.Control name='role_id' as="select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                                    {roles.map((role) => (
                                        role.role_name === user.role_name ? (
                                            <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                                        ) : (
                                            null
                                        )
                                    ))}
                                    {roles.map((role) => (
                                        role.role_name !== user.role_name ? (
                                            <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                                        ) : (
                                            null
                                        )
                                    ))}
                                </Form.Control>
                            </FloatingLabel >

                        </div>
                        <div className="col my-2">
                            <FloatingLabel controlId="status_id" label="Status">
                                <Form.Control name='status_id' as="select" value={selectedActivityStatus} onChange={(e) => setSelectedActivityStatus(e.target.value)}>
                                    {activityStatuses.map((activityStatus) => (
                                        activityStatus.name === user.status ? (
                                            <option key={activityStatus.id} value={activityStatus.id}>{activityStatus.name}</option>
                                        ) : (
                                            null
                                        )
                                    ))}

                                    {activityStatuses.map((activityStatus) => (
                                        activityStatus.name !== user.status ? (
                                            <option key={activityStatus.id} value={activityStatus.id}>{activityStatus.name}</option>
                                        ) : (
                                            null
                                        )
                                    ))}
                                </Form.Control>
                            </FloatingLabel >
                        </div>
                    </div>
                        <div className="row">
                            <div className="col my-2">
                                <FloatingLabel controlId="status_id" label="Status">
                                    <Form.Control name='status_id' as="select" value={selectedActivityStatus} onChange={(e) => setSelectedActivityStatus(e.target.value)}>
                                        {activityStatuses.map((activityStatus) => (
                                            activityStatus.name === user.status ? (
                                                <option key={activityStatus.id} value={activityStatus.id}>{activityStatus.name}</option>
                                            ) : (
                                                null
                                            )
                                        ))}

                                        {activityStatuses.map((activityStatus) => (
                                            activityStatus.name !== user.status ? (
                                                <option key={activityStatus.id} value={activityStatus.id}>{activityStatus.name}</option>
                                            ) : (
                                                null
                                            )
                                        ))}
                                    </Form.Control>
                                </FloatingLabel >
                            </div>
                        </div>
                    <div className="row">
                        <div className="col my-2">
                            <Button type='submit'>
                                Save changes
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
};

export default UserModal;
