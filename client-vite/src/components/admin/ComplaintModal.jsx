// ComplaintModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';


const Chatbox = () => {
    const [textareaValue, setTextareaValue] = useState('');

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const calculateRows = (text) => {
        const lineCount = (text.match(/\n/g) || []).length + 1;
        return Math.min(lineCount, 10); // Limit to a maximum of 10 rows
    };

    return (
        <form className='form mt-4'>
            <div>
                <p className='fw-bold'>Add a comment</p>
            </div>
            <div className="row py-3 d-flex flex-row justify-content-center align-items-center border">
                <div className="col pe-0">
                    <textarea rows={5} className='form-control border-0' placeholder='Add a summary for update' type="text" name="" id=""
                        style={{
                            boxShadow: 'none',
                            borderColor: '#ced4da', // Set the border color to the default color
                            resize: 'none'
                            /* Add any additional styles you want to remove during the active state */
                        }}
                    />
                </div>
                <div className="col-auto">
                    <button className='btn bg-primary'>
                        <FontAwesomeIcon icon={faPaperPlane} className='text-white' />
                    </button>
                </div>
            </div>
        </form>
    );
}

const ComplaintModal = ({ complaint, onClose }) => {
    return (
        <Modal
            show={true}
            onHide={onClose}
            onExit={() => console.log('Modal is exiting')}  // Add your exit animation logic here
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

                <div className=''>
                    <Form>
                        <div className="row">
                            <div className="col">
                                <Form.Control className='my-2' as="select">
                                    <option>Assign complaint to an employee</option>
                                    <option>Employee 1</option>
                                    <option>Employee 2</option>
                                    <option>Employee 3</option>
                                </Form.Control>
                            </div>
                            <div className="col">
                                <Form.Control className='my-2' as="select">
                                    <option>Change complaint status</option>
                                    <option>Status 1</option>
                                    <option>Status 2</option>
                                    <option>Status 3</option>
                                </Form.Control>
                            </div>
                        </div>
                    </Form>
                </div>

                <Chatbox />
            </Modal.Body>
        </Modal>
    );
};

export default ComplaintModal;
