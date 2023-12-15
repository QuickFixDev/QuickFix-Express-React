// ComplaintModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';

import { useUsers } from '../../hooks/useUsers';
import { useComplaintStatuses } from '../../hooks/useComplaintStatuses';
import ServerUrl from '../../constants/ServerUrl';


const Chatbox = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        onSendMessage(message);
        setMessage('');
    };

    return (
        <div>
            <div className='row'>
                <p className='fw-bold px-0'>Add a comment</p>
            </div>
            <div className="row py-3 d-flex flex-row justify-content-center align-items-center border">
                <div className="col pe-0">
                    <textarea rows={5} className='form-control border-0' placeholder='Add a summary for update' type="text" name="" id=""
                        style={{
                            boxShadow: 'none',
                            resize: 'none'
                        }}
                    />
                </div>

            </div>
        </div>
    );
}

const ComplaintModal = ({ complaint, onClose }) => {
    const { users } = useUsers();
    const { complaintStatuses } = useComplaintStatuses();

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

        fetch(`${ServerUrl}/admin/complaints-history/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                complaint_id: complaint.id,
                employee_id: selectedEmployee,
                status_id: selectedStatus,
                comment: chatboxMessage,
              }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Form submitted successfully:', data);
                onClose(); // Close the modal on success
              })
              .catch((error) => {
                console.error('Error submitting form:', error);
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
                    <h5 className='fw-bold m-0 my-2'>{complaint.title}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <div className='bg-light p-3 rounded-3'>
                    <p className='m-0'>{complaint.description}</p>
                </div>

                <Form>
                    <div className="row">
                        <div className="col">
                            <input name='complaint_id' id='complaint_id' type="number" value={complaint.id} hidden readOnly/>
                            <Form.Control name='employee_id' id='employee_id' className='my-2' as="select" onChange={(e) => setSelectedEmployee(e.target.value)}>
                                <option>Assign complaint to an employee</option>

                                {users.map((item) => (
                                    item.role_name === 'employee' ? (
                                        <option key={item.user_id} value={item.user_id}>{item.first_name}</option>
                                    ) : (
                                        null
                                    )
                                ))}

                            </Form.Control>
                        </div>
                        <div className="col">
                            <Form.Control name='status_id' id='status_id' className='my-2' as="select" onChange={(e) => setSelectedStatus(e.target.value)}>
                                <option>Change complaint status</option>

                                {complaintStatuses.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}

                            </Form.Control>
                        </div>
                    </div>
                    <div className='p-3'>
                        <div className='row'>
                            <p className='fw-bold px-0'>Add a comment</p>
                        </div>
                        <div className="row py-3 d-flex flex-row justify-content-center align-items-center border">
                            <div className="col pe-0">
                                <textarea
                                    rows={5}
                                    className='form-control border-0'
                                    placeholder='Add a summary for update'
                                    type="text"
                                    name='comment'
                                    id='comment'
                                    value={chatboxMessage}
                                    onChange={(e) => setChatboxMessage(e.target.value)}
                                    style={{
                                        boxShadow: 'none',
                                        borderColor: '#ced4da',
                                        resize: 'none'
                                    }}
                                />
                            </div>
                            <div className="col-auto">
                                <button
                                    className='btn bg-primary'
                                    onClick={handleSubmit}
                                    type="submit"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} className='text-white' />
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>

            </Modal.Body>
        </Modal>
    );
};

export default ComplaintModal;
