import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from '../../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const BootstrapTable = () => {
    const { authUser, isLoggedIn } = useAuth();
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div className="container p-sm-5 p-0">
            <div className="p-4 ps-0 mb-4">
                <h2 className='fw-bold'>My profile</h2>
            </div>
            <div className="row ">
                <div className="p-4">
                    <div className="container-fluid d-flex flex-row justify-content-center pb-5">
                        <img className="rounded-circle" src={user.picture} alt={user.name} />
                    </div>

                    <table className="table table-hover border">
                        <thead>
                            <tr>
                                <th scope="col" className="w-50">Type</th>
                                <th scope="col" className="w-50">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{authUser.FirstName} {authUser.LastName}</td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>{authUser.Role}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

};


export default BootstrapTable;