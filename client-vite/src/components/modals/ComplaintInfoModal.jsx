// ComplaintInfoModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Steps } from 'antd';
import { useComplaints } from '../../hooks/useComplaints';
import { useComplaintsHistory } from '../../hooks/useComplaintsHistory';
import { useComplaintStatuses } from '../../hooks/useComplaintStatuses';

const { Step } = Steps;

const ComplaintInfoModal = ({ showModal, handleClose, complaintId, statusId }) => {
    const { complaints } = useComplaints({ complaintId: complaintId });
    const { complaintsHistory } = useComplaintsHistory({ complaintId: complaintId })
    const { complaintStatuses } = useComplaintStatuses()

    const [currentStep, setCurrentStep] = useState(0);

    const statusIdToNameMap = {};
    complaintStatuses.forEach(status => {
        statusIdToNameMap[status.id] = status.name;
    });

    const steps = complaintsHistory.map(item => ({
        title: statusIdToNameMap[item.status_id],
        description: item.employee_comment,
    }));

    return (
        <Modal show={showModal} onHide={handleClose} size='lg' centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className='fw-bold'>Complaint info</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <div className="row">
                    {complaints.map((complaint) => (
                        complaint.id === complaintId ? (
                            <div key={complaint.id} className="row">
                                <p className='fw-bold'>
                                    {complaint.title}
                                </p>
                                <p>
                                    {complaint.description}
                                </p>
                            </div>
                        ) : null
                    ))}
                </div>
                <Steps
                    progressDot
                    direction="vertical"
                    current={1}
                    items={steps}
                />
            </Modal.Body>
        </Modal>
    );
};

export default ComplaintInfoModal;
