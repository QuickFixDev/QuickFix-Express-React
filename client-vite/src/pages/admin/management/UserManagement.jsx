// UserManager.js
import React, { useState, useEffect } from "react";

import { Checkbox } from "antd";
import SearchBar from "../../../components/filtering/SearchBar";
import FilterComponent from "../../../components/filtering/FilterComponent";
import UserModal from "../../../components/modals/UserModal";
import AccessRequest from "../../../components/access/AccessRequest";
import IconInfo from "../../../components/icons/IconInfo";

import { useUsers } from "../../../hooks/useUsers";
import { useRoles } from "../../../hooks/useRoles";
import { useAuth } from "../../../contexts/AuthContext";
import { useResidences } from "../../../hooks/useResidences";
import AccessModal from "../../../components/modals/AccessModal";
import { modalGlobalConfig } from "antd/es/modal/confirm";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateUserModal from "../../../components/modals/CreateUserModal";

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
    const { isLoggedIn } = useAuth();

    const [showEditModal, setShowEditModal] = useState(false)

    const [userToEdit, setUserToEdit] = useState({});
    const [showCreateModal, setShowCreateModal] = useState(false)

    const handleShowCreateModal = () => {
        setShowCreateModal(true)
    }

    const handleCloseCreateModal = () => {
        setShowCreateModal(false)
    }

    const handleClickForEdit = (user) => {
        setUserToEdit(user);
        setShowEditModal(true);
    };

    const handleHideEditModal = () => {
        setUserToEdit({});
        setShowEditModal(false);
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

    const pendingUsersCount = users.filter(user => user.status === 'Pending request');

    const filteredUsers = users.filter((user) => {
        const isSearchMatch =
            search.toLowerCase() === '' ||
            user.first_name.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name.toLowerCase().includes(search.toLowerCase()) ||
            user.user_id.toString().includes(search.toLowerCase());

        const isStatusActive = user.status === 'Active';

        return isSearchMatch && isStatusActive;
    });

    return (
        <>
            <div className="list container-fluid p-md-5 p-3">
                <div className="row">
                    <div className="col">
                        <div className="row d-flex flex-row align-items-center">
                            <div className="col-auto text-start">
                                <h2 className="m-0">User manager</h2>
                            </div>
                            <div className="col text-start">
                                <IconInfo
                                    message=
                                    {
                                        "Click on a user to manage their information. You can update user details,assign roles, and handle access requests from this page."
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col text-end">
                        <button onClick={handleShowCreateModal} className="btn btn-primary">
                            <div className="row">
                                <div className="col">
                                    <span>New</span>
                                </div>
                                <div className="col">
                                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="row py-3">
                    <div className="col">
                        <SearchBar onSearch={handleSearch} searchType='users' />
                    </div>
                    <div className="col-auto text-end">
                        <FilterComponent options={filterOptions} onSelectFilter={handleSelectFilter} />
                    </div>
                </div>

                <div className="row">
                    <AccessRequest count={pendingUsersCount.length} />
                </div>

                <div className="row">
                    <div className="col">
                        <div className="user-table mt-4">
                            <div className="row py-2" id="header">
                                <div className="col fw-bold">User</div>
                                <div className="col fw-bold d-lg-block d-none">Role</div>
                                <div className="col fw-bold d-lg-block d-none">Status</div>
                                <div className="col fw-bold">Residence</div>
                            </div>

                            {filteredUsers.length > 0 ? (
                                filteredUsers
                                    .sort((a, b) => a.user_id - b.user_id)
                                    .map((user) => (

                                        <div key={user.user_id} className="custom-gray-hover cursor-pointer row py-2 border-top" id="content" onClick={() => handleClickForEdit(user)}>
                                            <div className="col d-flex flex-row align-items-center">
                                                {user.photo_url ? (
                                                    <div className="me-3">
                                                        <img className="rounded-5" src={user.photo_url} alt="Loading" width={'40px'} />
                                                    </div>
                                                ) : (
                                                    <div className="me-3">
                                                        <img className="rounded-5" src="/images/user_placeholder.png" alt="Loading" width={'40px'} />
                                                    </div>
                                                )}
                                                <span>{user.first_name} {user.last_name}</span>
                                            </div>
                                            <div className="col d-lg-flex d-none flex-row align-items-center">{user.role_name}</div>
                                            <div className="col d-lg-flex d-none flex-row align-items-center">{user.status}</div>
                                            <div className="col d-flex flex-row align-items-center">
                                                {residences.map((residence) => (
                                                    residence.tenant_user_id === user.user_id ? (
                                                        <div key={residence.residence_id}>
                                                            {`${residence.street_name} ${residence.street_number}`}
                                                        </div>
                                                    ) : (
                                                        <div key={`not-${residence.residence_id}`}>- - -</div>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    ))) : (usersLoading ? (<tr><td>Loading...</td></tr>) : (<tr><td>No users found</td></tr>))
                            }

                        </div>
                    </div>
                </div>
            </div>

            <UserModal show={showEditModal} user={userToEdit} onClose={handleHideEditModal} />
            <CreateUserModal showModal={showCreateModal} handleClose={handleCloseCreateModal} />
        </>


    );
}

export default UserManager; 
