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

const MyComplaints = () => {
    const { authUser, isLoggedIn } = useAuth();
    const { user, isAuthenticated } = useAuth0();
    const { categories } = useCategories();
    const { complaints, isLoading: complaintsLoading } = useComplaints({ userId: authUser.Id });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);

    if (!isAuthenticated) {
        return <AccessDenied />;
    }

    const handleFilterChange = (categoryId) => {
        setSelectedCategories((prevCategories) => {
            if (prevCategories.includes(categoryId)) {
                return prevCategories.filter((category) => category !== categoryId);
            } else {
                return [...prevCategories, categoryId];
            }
        });
    };

    const filteredCategories = categories.filter((category) =>
        selectedCategories.includes(category.category_id)
    );

    let filteredComplaints;


    if (selectedCategories.length === 0) {
        filteredComplaints = complaints;
    } else {
        filteredComplaints = complaints.filter((complaint) =>
            selectedCategories.includes(complaint.category_id)
        );
    }

    return (
        <>
            <div className="list container-fluid p-md-5 p-3">
                <div className="p-2 mb-4 ">
                    <div className="row row-cols-md-2 row-cols-1 align-items-center">
                        <div className="col text-start">
                            <h2 className="fw-bold">Your reports ({complaints.length})</h2>
                        </div>
                        {complaints.length > 0 && (
                            <div className="col text-md-end text-start p-md-1 py-3">
                                <Link to="/user/complaints/new">
                                    <button className="btn btn-primary">
                                        <div className="row p-2">
                                            <div className="col-auto">
                                                <FontAwesomeIcon icon={faPlusCircle} />
                                            </div>
                                            <div className="col">
                                                <span>Submit a new report</span>
                                            </div>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="container-fluid">
                    {complaintsLoading ? (
                        <LoadingSpinner />

                    ) : complaints.length > 0 ? (
                        <div className="row">
                            <div className="col-md-2 col-3">
                                <div className="row row-cols-1">
                                    <div className="col p-0 g-2 mb-2">
                                        <div>
                                            <p className="fw-">Filters</p>
                                            <p className="fw-bold">Status</p>
                                        </div>
                                        <div> <Checkbox className="p-2">Open</Checkbox> </div>
                                        <div> <Checkbox className="p-2">Closed</Checkbox> </div>
                                        <div> <Checkbox className="p-2">In progress</Checkbox> </div>
                                    </div>
                                    <div className="col p-0 g-2 mb-2">
                                        <div>
                                            <p className="fw-bold">Category</p>
                                        </div>
                                        <div>
                                            {categories.map((category) => (
                                                <div key={category.category_id}>
                                                    <Checkbox
                                                        checked={selectedCategories.includes(category.category_id)}
                                                        className="p-2"
                                                        onChange={() => handleFilterChange(category.category_id)}
                                                    >
                                                        {category.category_name}
                                                    </Checkbox>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row row-cols-1 row-cols-md-2 g-3 px-2">
                                    {filteredComplaints.map((complaint) => (
                                        <div className="col" key={complaint.complaint_id}>
                                            <div className="container shadow-md rounded-4 p-3">
                                                <div className="my-3">
                                                    <div className="m-2">
                                                        <h5>
                                                            <strong>{complaint.complaint_title}</strong>
                                                        </h5>
                                                        <p>Status: {complaint.complaint_status}</p>
                                                        <p>{complaint.complaint_description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="container-fluid p-3 text-center">
                            <p>You have no complaints submitted yet</p>
                            <NavLink to={'/user/complaints/new'} className="text-decoration-none">
                                <div className="container text-center rounded-4 p-5 hover-navlink">
                                    <div className="my-3">
                                        <FontAwesomeIcon icon={faPlusCircle} size="2x" />
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const ReturningComponent = () => {
    const { authUser, isLoggedIn } = useAuth();

    if (isLoggedIn && (authUser.Role === 'resident' || authUser.Role === 'dev')) {
        return <MyComplaints />;
    } else {
        return <AccessDenied />;
    }
};

export default ReturningComponent;
