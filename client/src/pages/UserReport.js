import React from 'react';
import ReportDetail from '../components/ReportDetail'
import Profile from '../components/Profile'

const UserReport = () => {
    return (
        <div className="container mt-5 w-50 p-xl-5 p-3 border rounded">
            <Profile />
            <ReportDetail />
        </div>
    );
};

export default UserReport;
