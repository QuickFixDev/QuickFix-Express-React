import Graphic from '../../components/graphics/Graphic'
import { useAuth } from '../../contexts/AuthContext';
import { useComplaints } from "../../hooks/useComplaints";
import { useComplaintsHistory } from "../../hooks/useComplaintsHistory";
import { useUsers } from "../../hooks/useUsers";
import { useComplaintStatuses } from "../../hooks/useComplaintStatuses";
import { useState } from 'react';
import CustomAlert from '../../components/alerts/CustomAlert';
import ComplaintInfoModal from '../../components/modals/ComplaintInfoModal';

const getLatestComplaintsHistory = (complaintsHistory) => {
    const { complaintStatuses } = useComplaintStatuses();

    const maxPrimaryIdMap = {};
    complaintsHistory.forEach(({ complaint_id, history_id }) => {
        const isSecondaryIdNotPresent = !(complaint_id in maxPrimaryIdMap);
        const isPrimaryIdGreaterThanMax = history_id > maxPrimaryIdMap[complaint_id];

        if (isSecondaryIdNotPresent || isPrimaryIdGreaterThanMax) {
            maxPrimaryIdMap[complaint_id] = history_id;
        }
    });

    return complaintsHistory.filter(({ history_id, complaint_id, status_id }) =>
        history_id === maxPrimaryIdMap[complaint_id] &&
        !['Closed', 'Rejected'].includes(complaintStatuses.find((status) => status.id === status_id)?.name.toLowerCase())
    );
};

const EmployeePanel = () => {
    const { authUserm, isLoggedIn } = useAuth();
    const { complaints, loading } = useComplaints();
    const { complaintsHistory, isLoading: complaintsHistoryLoading } = useComplaintsHistory({ employeeId: 13 });
    const { users } = useUsers();
    const { complaintStatuses } = useComplaintStatuses();

    const resultArray = getLatestComplaintsHistory(complaintsHistory)

    const [showComplaintInfoModal, setShowComplaintInfoModal] = useState(false)
    const [selectedComplaintId, setSelectedComplaintId] = useState(0)
    const [selectedStatusId, setSelectedStatusId] = useState(0)

    const handleHistoryClick = (complaint_id, status_id) => {
        setSelectedComplaintId(complaint_id)
        setSelectedStatusId(status_id)
        setShowComplaintInfoModal(true)
    }

    const handleCloseComplaintInfoModal = () => {
        setShowComplaintInfoModal(false)
    }

    if (!complaintsHistoryLoading && complaintsHistory.length < 1) {
        return (
            <div className="container-fluid px-md-5 px-1">
                <div className="row py-5 px-4">
                    <h2>Complaints assigned to you</h2>
                </div>

                fw-bold

                <div aria-label='alert' className='row px-4 py-3'>
                    <CustomAlert title={'All done'} message={'You have no complaints assigned for now!'} type={'success'} />
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="container-fluid px-md-5 px-1">
                    <div className="row">
                        <h2 className="py-5 px-4">Complaints assigned to you</h2>
                    </div>
                    <div aria-label='table' className='row px-4 py-3'>
                        <div className="row py-2 text-secondary" aria-label='header'>
                            <div className="col-6">Name</div>
                            <div className="col-3">Assigned by</div>
                            <div className="col-3">Status</div>
                        </div>

                        {complaintsHistoryLoading ? (
                            <span>Loading...</span>
                        ) : (
                            resultArray.map(({ history_id, employee_comment, admin_id, status_id, complaint_id }) => (
                                <div key={history_id} className="row py-2 border-top cursor-pointer" onClick={() => handleHistoryClick(complaint_id, status_id)} aria-label=''>
                                    <div className="col-6 fw-bold">{employee_comment}</div>
                                    <div className="col-3">
                                        {users.find((user) => user.user_id === admin_id)?.first_name || 'User not found'}
                                    </div>
                                    <div className="col-3">
                                        {complaintStatuses.find((status) => status.id === status_id)?.name || 'No status was found'}
                                    </div>
                                </div>
                            ))
                        )}


                    </div>
                </div>

                <ComplaintInfoModal showModal={showComplaintInfoModal} handleClose={handleCloseComplaintInfoModal} complaintId={selectedComplaintId} statusId={selectedStatusId} />
            </>
        );
    }
};

export default EmployeePanel;