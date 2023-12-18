// AccessRequestModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { Form, FloatingLabel } from 'react-bootstrap';

import ServerUrl from '../../constants/ServerUrl';
import { useActivityStatuses } from '../../hooks/useActivityStatuses';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFighterJet, faX } from '@fortawesome/free-solid-svg-icons';
import { useResidences } from '../../hooks/useResidences';
import { useAuth0 } from '@auth0/auth0-react';


const AccessRequestModal = ({ showModal, handleClose }) => {
    const { residences, isLoading: residencesLoading } = useResidences();
    const { loginWithRedirect } = useAuth0();
    
    const [formData, setFormData] = useState({
        residential_id: 0,
        zip_code: 0,
        street_name: '',
        street_number: 0,
        details: '',
        status: 'available',
        owner_user_id: '',
        tenant_user_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        fetch(`${ServerUrl}/user/access-request`, {
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
                <Modal.Title>Request access</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <form action="">
                    <div className="form-group">
                        <label className='my-2' htmlFor="first_name">First name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="form-control bg-light"
                            id="first_name"
                        />
                    </div>
                    <div className="form-group">
                        <label className='my-2' htmlFor="last_name">Last name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="form-control bg-light"
                            id="last_name"
                        />
                    </div>
                    <div className="form-group">
                        <label className='my-2' htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='For e.g. john.doe@gmail.com'
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control bg-light"
                            id="email"
                        />
                    </div>
                    <div className="form-group">
                        <label className='my-2' htmlFor="phone">Phone number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder='+00 234 555 6789'
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control bg-light"
                            id="phone"
                            pattern="[0-9]*"

                        />
                    </div>
                    <div className="form-group">
                        <label className='my-2' htmlFor="residence">Residence</label>
                        <select className='form-control bg-light' name="" id="">
                            <option className='form-control' value="">Select your residence</option>
                            {residences.map((residence) => (
                                <option className='form-control'    key={residence.residence_id} value={residence.residence_id}>
                                    {residence.street_name} {residence.street_number}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mt-4">
                        <button className='col-12 btn btn-outline-primary'>
                            Cancel
                        </button>
                    </div>
                    <div className="form-group mt-2 mb-3">
                        <button className='col-12 btn btn-primary'>
                            Request access
                        </button>
                    </div>

                    <p className='text-center'>
                        You already have an account? <Link onClick={() => loginWithRedirect()}>Log in</Link>
                    </p>
                </form>
            </Modal.Body>
        </Modal >
    );
};

export default AccessRequestModal;
