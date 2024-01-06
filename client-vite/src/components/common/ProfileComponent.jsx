import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from '../../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileImage = ({ imageUrl, altText }) => (
    <div className="container-fluid d-flex flex-row justify-content-center pb-5">
        <img className="rounded-circle" src={imageUrl} alt={altText} />
    </div>
);

ProfileImage.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
};

const DataRow = ({ label, value }) => (
    <tr>
        <td>{label}</td>
        <td>{value}</td>
    </tr>
);

DataRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
};

const BootstrapTable = () => {
    const { authUser, isLoggedIn } = useAuth();
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="container p-sm-5 p-0 profile-container">
            <div className="p-4 ps-0 mb-4">
                <h2>My Profile</h2>
            </div>
            <div className="row profile-row">
                <div className="p-4">
                    <ProfileImage imageUrl={user.picture} altText={user.name} />
                    <table className="table table-hover table-bordered profile-table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" className="w-50">Type</th>
                                <th scope="col" className="w-50">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <DataRow label="Name" value={`${authUser.FirstName} ${authUser.LastName}`} />
                            <DataRow label="Role" value={authUser.Role} />
                            <DataRow label="Email" value={user.email} />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BootstrapTable;
