// AccessRequestModal.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

import { useResidences } from '../../hooks/useResidences';
import { useUsers } from '../../hooks/useUsers';
import { useAuth0 } from '@auth0/auth0-react';

import ServerUrl from '../../constants/ServerUrl';
import CustomAlert from '../alerts/CustomAlert';


const validateForm = (formData) => {
    const { users, isLoading: usersLoading, fetchData } = useUsers();
    const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'status_id', 'role_id'];

    for (const field of requiredFields) {
        if (!formData[field]) {
            return {
                isValid: false,
                title: 'Complete the form',
                text: `Please fill in the ${field} field.`,
                type: 'warning'
            };
        }
    }

    if (users.some(user => user.email === formData.email || user.phone === formData.phone)) {
        return {
            isValid: false,
            title: 'Existing account',
            text: 'Email or phone number already exists. Cannot request access.',
            type: 'error'
        };
    }

    return { isValid: true };
};

const AccessRequestModal = ({ showModal, handleClose }) => {
    const { residences, isLoading: residencesLoading } = useResidences();
    const { loginWithRedirect } = useAuth0();
    const { isLoading: usersLoading, fetchData } = useUsers();

    const [message, setMessage] = useState({ title: '', text: '', type: '' })
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        residence_id: 0,
        status_id: 1,
        role_id: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validation = validateForm(formData);

        if (!validation.isValid) {
            setMessage({ title: validation.title, text: validation.text, type: validation.type, });
            return;
        }

        fetch(`${ServerUrl}/user/new-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Request saved successfully:', formData);
            })
            .catch((error) => {
                console.error('Error saving request:', error);
            });



    };

    return (
        <Modal show={showModal} onHide={handleClose} size='lg' centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Request access</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <form action="">

                    {message.text ? (
                        <CustomAlert title={message.title} message={message.text} type={message.type} hover={false} />
                    ) : (
                        null
                    )}

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
                        <select onChange={handleChange} className='form-control bg-light' name="residence_id" id="residence_id" value={formData.residence_id} type=''>
                            <option className='form-control' value="">Select your residence</option>
                            {residences.map((residence) => (
                                <option className='form-control' key={residence.residence_id} value={residence.residence_id}>
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
                        <button onClick={handleSubmit} className='col-12 btn btn-primary'>
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