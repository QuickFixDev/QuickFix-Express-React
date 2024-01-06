// CreateUserModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { Form, FloatingLabel } from 'react-bootstrap';

import ServerUrl from '../../constants/ServerUrl';
import { useUsers } from '../../hooks/useUsers';
import { Button } from 'antd';
import { useRoles } from '../../hooks/useRoles';
import { useActivityStatuses } from '../../hooks/useActivityStatuses';
import { useResidences } from '../../hooks/useResidences';

const CreateUserModal = ({ showModal, handleClose }) => {
    const { roles, isLoading: rolesLoading } = useRoles();
    const { residences, isLoading: residencesLoading } = useResidences();
    const { activityStatuses, isLoading: activityStatusesLoading } = useActivityStatuses();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role_id: '',
        status_id: '2',
        residence_id: '',
    });

    const handleChange = (e) => {   
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${ServerUrl}/admin/users/new-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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
                <Modal.Title className='fw-bold'>Create user</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col my-2 floating-placeholder">
                            <FloatingLabel controlId="first_name" label="First Name">
                                <Form.Control name='first_name' type="text" onChange={handleChange} />
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col my-2">
                            <FloatingLabel controlId="last_name" label="Last Name">
                                <Form.Control name='last_name' type="text" onChange={handleChange} />
                            </FloatingLabel>
                        </div>
                    </div>
                    
                    <div className="row row-cols-md-2 row-cols-1">
                        <div className="col my-2">
                            <FloatingLabel controlId="email" label="Email">
                                <Form.Control name='email' type="text" onChange={handleChange} />
                            </FloatingLabel >
                        </div>
                        <div className="col my-2">
                            <FloatingLabel controlId="phone" label="Phone">
                                <Form.Control name='phone' type="text" onChange={handleChange} />
                            </FloatingLabel >
                        </div>
                    </div>
                    <div className="row row-cols-md-2 row-cols-1">
                        <div className="col my-2">
                            <FloatingLabel controlId="role_id" label="Role">
                                <Form.Control name='role_id' as="select" onChange={handleChange}>
                                    <option value=""> Select a role </option>
                                    {rolesLoading ? (
                                        <option value="">Loading...</option>
                                    ) : (
                                        roles.map((role) => (
                                            <option key={role.role_id} value={role.role_id}> {role.role_name} </option>
                                        ))
                                    )}

                                </Form.Control>
                            </FloatingLabel >
                        </div>
                        <div className="col my-2">
                            <FloatingLabel controlId="residence_id" label="Residence">
                                <Form.Control name='residence_id' as="select" value={formData.selectedActivityStatus} onChange={handleChange}>
                                    <option value=""> Select a residence </option>
                                    {residencesLoading ? (
                                        <option value="">Loading...</option>
                                    ) : (
                                        residences.map((residence) => (
                                            <option key={residence.residence_id} value={residence.residence_id}>
                                                {residence.street_name}
                                            </option>
                                        ))
                                    )}
                                </Form.Control>
                            </FloatingLabel >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col my-2">
                            <button className='btn btn-primary'>
                                Create user
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
};

export default CreateUserModal;
