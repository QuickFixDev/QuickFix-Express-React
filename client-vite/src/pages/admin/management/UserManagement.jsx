// UserManager.js
import React, { useState, useEffect } from "react";
import ServerUrl from "../../../constants/ServerUrl";
import AccessDenied from '../../../components/access/AccessDenied';

import SearchBar from "../../../components/filtering/SearchBar";
import FilterComponent from "../../../components/filtering/FilterComponent";
import { Checkbox } from "antd";
import UserModal from "../../../components/modals/UserModal";

import { useUsers } from "../../../hooks/useUsers";
import { useRoles } from "../../../hooks/useRoles";
import { useAuth } from "../../../contexts/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useResidences } from "../../../hooks/useResidences";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faInfoCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import AccessRequest from "../../../components/access/AccessRequest";

const filterOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const Filter = ({ selectedCategories, handleFilterChange }) => {
    const { roles } = useRoles();

    return (
        <div className="col-md-2 col-3">
            <div className="row row-cols-1">
                <div className="col p-0 g-2 mb-2">
                    <div>
                        {roles && roles.length > 0 ?
                            (
                                roles.map((role) => (
                                    <div key={role.role_id}>
                                        <Checkbox
                                            checked={selectedCategories.includes(role.role_id)}
                                            className="p-2"
                                            onChange={() => handleFilterChange(role.role_id)}
                                        >
                                            {role.role_name}
                                        </Checkbox>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    hey
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

const UserManager = () => {
    const { users, isLoading: usersLoading } = useUsers();
    const { residences } = useResidences();
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedUser, setSelectedUser] = useState(null);
    const { isLoggedIn } = useAuth();

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const handleSelectFilter = (filter) => {
        setSelectedFilter(filter);
    };

    const handleSearch = (value) => {
        setSearch(value);
    }

    useEffect(() => {
        console.log(search);
    }, [search]);

    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip();
    }, []);

    const pendingUsersCount = users.filter(user => user.status === 'Pending request');

    const filteredUsers = users.filter((user) => {
        return search.toLowerCase() === '' ||
            user.first_name.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name.toLowerCase().includes(search.toLowerCase()) ||
            user.user_id.toString().includes(search.toLowerCase());
    });

    return (
        <div className="list container-fluid p-md-5 p-3">
            <div className="row d-flex flex-row align-items-center">
                <div className="col-auto text-start">
                    <h2 className="m-0 fw-bold">User manager</h2>
                </div>
                <div class="col text-start">
                    <button
                        className="btn btn-white p-0"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Click a user to manage user info"
                    >
                        <FontAwesomeIcon icon={faInfoCircle} className="text-primary"></FontAwesomeIcon>
                    </button>
                </div>
            </div>

            <div className="row py-3">
                <div className="col">
                    <SearchBar onSearch={handleSearch} searchType='users' />
                </div>
                <div className="col-auto">
                    <div className="container">
                        <FilterComponent options={filterOptions} onSelectFilter={handleSelectFilter} />
                    </div>
                </div>
            </div>

            <div className="row">
                <AccessRequest count={pendingUsersCount.length} />
            </div>

            <div className="row">
                <div className="col">
                    <table className="table table-hover mt-4">
                        <thead>
                            <tr>
                                <th className="col-3">User</th>
                                <th className="col-3">Role</th>
                                <th className="col-3 d-none d-lg-table-cell">Status</th>
                                <th className="col-3 d-none d-lg-table-cell">Residence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers
                                    .sort((a, b) => a.user_id - b.user_id) // Sort the users by user ID
                                    .map((user) => (
                                        <tr className="cursor-pointer" key={user.user_id} onClick={() => handleUserClick(user)}>
                                            <td>{user.first_name} {user.last_name}</td>
                                            <td>{user.role_name}</td>
                                            <td className="d-none d-lg-table-cell">{user.status}</td>
                                            <td className="d-none d-lg-table-cell">
                                                {residences.map((residence) => (
                                                    residence.tenant_user_id === user.user_id ? (
                                                        <div key={residence.residence_id}>
                                                            {`${residence.street_name} ${residence.street_number}`}
                                                        </div>
                                                    ) : (
                                                        <div>- - -</div>
                                                    )))
                                                }
                                            </td>
                                        </tr>
                                    ))
                            ) : (usersLoading ? (<tr><td>Loading...</td></tr>) : (<tr><td>No users found</td></tr>))
                            }
                        </tbody>
                    </table>

                    {selectedUser && (
                        <UserModal user={selectedUser} onClose={handleCloseModal} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserManager;
