import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from 'antd';
import 'antd/lib/checkbox/style';
import 'antd/lib/style';
import AccessDenied from '../../components/access/AccessDenied';
import ServerUrl from '../../constants/ServerUrl';
import { useAuth } from '../../contexts/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../../hooks/useCategories';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useComplaints } from '../../hooks/useComplaints';
import { useComplaintsHistory } from '../../hooks/useComplaintsHistory';

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

const ComplaintItem = ({ title, description, status }) => {
    return (
        <div className='row border-top py-2 cursor-pointer'>
            <div className="col">
                <div className="row fw-bold">{title}</div>
                <div className="row">{description}</div>
            </div>
            <div className="col-2 d-flex flex-col align-items-center justify-content-center">
                <span className=''>{status}</span>
            </div>
        </div>
    );
}

const ComplaintTableHeader = () => {
    return (
        <div className='row py-3'>
            <div className="col">
                <div className="row fw-bold">Complaint</div>
            </div>
            <div className="col-2 d-flex flex-col align-items-center justify-content-center">
                <span className='fw-bold'>status</span>
            </div>
        </div>
    );
}

const ComplaintPanel = () => {
    const { authUser, isLoggedIn } = useAuth()
    const { complaints, isLoading: complaintsLoading } = useComplaints()
    const { complaintsHistory, isLoading: complaintsHitoryLoading } = useComplaintsHistory()

    const latestUpdates = getLatestUpdates()
    const oldestUpdates = getOldestUpdates()

    console.log("Latest Updates:", latestUpdates);
    console.log("Oldest Updates:", oldestUpdates);

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
        <div className="row">
            <div className="col-3" aria-label='filter section'></div>

            <div className="col-9" aria-label='content section'>
                <ComplaintTableHeader />
                <div className="row row-cols-1">
                    {complaints.map((complaint) => (
                        <div className="col">
                            <ComplaintItem title={complaint.title} description={complaint.description} status={'closed'} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ComplaintPanel;