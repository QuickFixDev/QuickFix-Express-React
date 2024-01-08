import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import 'antd/lib/checkbox/style';
import 'antd/lib/style';
import AccessDenied from '../../components/access/AccessDenied';
import { useAuth } from '../../contexts/AuthContext';

import LoadingSpinner from '../../components/common/LoadingSpinner';

import SearchBar from '../../components/filtering/SearchBar';
import FilterComponent from '../../components/filtering/FilterComponent';

import { useComplaints } from '../../hooks/useComplaints';
import { useComplaintsHistory } from '../../hooks/useComplaintsHistory';
import IconInfo from '../../components/icons/IconInfo';
import ComplaintDetailsModal from '../../components/modals/ComplaintDetailsModal';
import CreateComplaintModal from '../../components/modals/CreateComplaintModal';

const groupUpdatesByComplaintId = (array) => {
    const updatesByComplaint = {};
    array.forEach(update => {
        const { complaint_id } = update;
        if (!updatesByComplaint[complaint_id]) {
            updatesByComplaint[complaint_id] = [];
        }
        updatesByComplaint[complaint_id].push(update);
    });

    return updatesByComplaint;
}

const getLatestUpdates = () => {
    const { complaintsHistory } = useComplaintsHistory()
    const updatesByComplaint = groupUpdatesByComplaintId(complaintsHistory);
    return Object.values(updatesByComplaint).map(updates => {
        const sortedUpdates = updates.sort((a, b) => new Date(b.modified_date) - new Date(a.modified_date));
        return sortedUpdates[0];
    });
};

const getOldestUpdates = () => {
    const { complaintsHistory } = useComplaintsHistory()
    const updatesByComplaint = groupUpdatesByComplaintId(complaintsHistory);
    return Object.values(updatesByComplaint).map(updates => {
        const sortedUpdates = updates.sort((a, b) => new Date(a.modified_date) - new Date(b.modified_date));
        return sortedUpdates[0];
    });
};

const ComplaintTableHeader = () => {
    return (
        <div className='row py-3'>
            <div className="col">
                <span>Complaint</span>
            </div>
            <div className="col-2 d-flex flex-column align-items-center justify-content-center">
                <span className='fw-bold'>status</span>
            </div>
        </div>
    );
}

const ComplaintItem = ({ title, description, status }) => {
    return (
        <div className='row border-top py-2 cursor-pointer'>

            <div className="col">
                <span className='fw-bold'>{title}</span>
                <p className='m-0'>{description}</p>
            </div>
            <div className="col-2 d-flex flex-column align-items-center justify-content-center">
                <span className=''>{status}</span>
            </div>
        </div>
    );
}

const Header = () => {
    const [showCreateComplaintModal, setShowCreateComplaintModal] = useState(false)

    const handleShowCreateComplaintModal = () => {
        setShowCreateComplaintModal(true)
    }

    const handleHideCreateComplaintModal = () => {
        setShowCreateComplaintModal(false)
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row d-flex flex-row align-items-center">
                        <div className="col-auto text-start">
                            <h2 className="m-0">My reports</h2>
                        </div>
                        <div className="col text-start">
                            <IconInfo
                                message=
                                {
                                    "Click on a complaint to see its status and details."
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="col text-end">
                    <button /* onClick={handleShowCreateModal} */ onClick={() => handleShowCreateComplaintModal()} className="btn btn-primary">
                        <div className="row row-cols-2">
                            <div className="col-auto">
                                <span>New</span>
                            </div>
                            <div className='col-auto'>
                                <FontAwesomeIcon icon={faFlag} />
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <CreateComplaintModal showModal={showCreateComplaintModal} handleCancel={handleHideCreateComplaintModal} />
        </>
    );
}

const ComplaintPanel = () => {
    const { authUser, isLoggedIn } = useAuth()
    const { complaints, isLoading: complaintsLoading } = useComplaints()
    const { complaintsHistory, isLoading: complaintsHitoryLoading } = useComplaintsHistory()
    const [showComplaintDetailsModal, setShowComplaintDetailsModal] = useState(false)
    const [selectedComplaint, setSelectedComplaint] = useState(null)

    const handleShowComplaintDetailsModal = (complaint) => {
        setShowComplaintDetailsModal(true)
        setSelectedComplaint(complaint)
    }

    const handleHideComplaintDetailsModal = () => {
        setShowComplaintDetailsModal(false)
    }

    const latestUpdates = getLatestUpdates()
    const oldestUpdates = getOldestUpdates()

    const filterOptions = [
        {},
    ]

    if (!isLoggedIn) {
        return (
            <AccessDenied />
        );
    }

    if (authUser.Role !== 'resident' && authUser.Role !== 'dev') {
        return (
            <AccessDenied />
        );
    }

    return (
        <>
            <div className="container p-md-5 p-3">
                <Header />

                <div className="row py-3">
                    <div className="col-10" aria-label='search'>
                        <div className="col">
                            <SearchBar searchType='reports' />
                        </div>
                    </div>
                    <div className="col-2" aria-label='filters'></div>
                </div>

                <div className="container">
                    <ComplaintTableHeader />

                    {complaintsLoading ? (
                        <span>Loading...</span>
                    ) : (
                        complaints.map((complaint) => (
                            <div key={complaint.id} onClick={() => handleShowComplaintDetailsModal(complaint)}>
                                <ComplaintItem title={complaint.title} description={complaint.description} status={'closed'} />
                            </div>
                        ))
                    )}

                </div>
            </div>

            <ComplaintDetailsModal showModal={showComplaintDetailsModal} handleCancel={handleHideComplaintDetailsModal} complaint={selectedComplaint} />
        </>
    )
}

export default ComplaintPanel;