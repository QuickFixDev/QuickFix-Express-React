// UserManager.js
import React, { useState, useEffect } from "react";
import ServerUrl from "../../../constants/ServerUrl";
import AccessDenied from '../../common/AccessDenied';

import SearchBar from "../../../components/common/SearchBar";
import FilterComponent from "../../../components/common/FilterComponent";
import { Checkbox } from "antd";
import UserModal from "../../../components/admin/UserModal";

import { useUsers } from "../../../hooks/useUsers";
import { useRoles } from "../../../hooks/useRoles";
import { useAuth } from "../../../contexts/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useResidences } from "../../../hooks/useResidences";

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
    const { users, loading } = useUsers();
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

    const filteredUsers = users.filter((user) => {
        return search.toLowerCase() === '' ||
            user.first_name.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name.toLowerCase().includes(search.toLowerCase()) ||
            user.user_id.toString().includes(search.toLowerCase());
    });

    return (
        <div className="list container-fluid p-md-5 p-3">
            <div className="row">
                <div className="col text-start">
                    <h2 className="fw-bold">User manager</h2>
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
                <div className="col">
                    <table className="table table-hover mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Status</th>
                                <th>Residence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers
                                .sort((a, b) => a.user_id - b.user_id) // Sort the users by user ID
                                .map((user) => (
                                    <tr className="cursor-pointer" key={user.user_id} onClick={() => handleUserClick(user)}>
                                        <td>{user.user_id}</td>
                                        <td>
                                            <div>
                                                <strong>{user.first_name} {user.last_name}</strong>
                                            </div>
                                        </td>
                                        <td>
                                            {user.status}
                                        </td>
                                        <td>
                                            {residences.map((residence) => (
                                                residence.tenant_user_id === user.user_id && (
                                                    <div key={residence.residence_id}>
                                                        {`${residence.street_name} ${residence.street_number}`}
                                                    </div>
                                                )))
                                            }
                                        </td>
                                    </tr>
                                ))
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
