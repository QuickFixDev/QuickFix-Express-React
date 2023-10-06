import React from 'react';
import ReportDetail from '../components/ReportDetail'
import Profile from '../components/Profile'

const UserReport = () => {
    return (
        <div className="container d-flex flex-column align-content-center border rounded w-75 mt-5 p-xl-5 p-3">
            <Profile />
            <ReportDetail />
        </div>
    );
};

export default UserReport;
