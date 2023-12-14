import React, { useEffect, useState } from "react";
import AccessDenied from '../common/AccessDenied';
import { Checkbox } from 'antd';
import 'antd/lib/checkbox/style'; // Import the specific style for Checkbox
import 'antd/lib/style'; // Import the general styles for Ant Design

import { useAuth } from "../../contexts/AuthContext";
import { useCategories } from "../../hooks/useCategories";
import { useRoles } from "../../hooks/useRoles";
import { useResidences } from "../../hooks/useResidences";
import { useResidentials } from "../../hooks/useResidentials";
import { useComplaints } from "../../hooks/useComplaints";
import { useUsers } from "../../hooks/useUsers";
import { useComplaintStatuses } from "../../hooks/useComplaintStatuses";
import { useActivityStatuses } from "../../hooks/useActivityStatuses";

const LoggedUser = () => {
    const { authUser, isLoggedIn } = useAuth();
    const jsonLoggedUser = JSON.stringify(authUser, null, 2)

    return (
        < pre >
            {jsonLoggedUser}
        </pre >
    );
}

const UsersList = () => {
    const { users } = useUsers();
    const jsonUsers = JSON.stringify(users, null, 2)

    return (
        < pre >
            {jsonUsers}
        </pre >
    );
}

const RolesList = () => {
    const { roles } = useRoles();
    const jsonRoles = JSON.stringify(roles, null, 2)

    return (
        < pre >
            {jsonRoles}
        </pre >
    );
}

const ComplaintsList = () => {
    const { complaints } = useComplaints();
    const jsonComplaints = JSON.stringify(complaints, null, 2)

    return (
        < pre >
            {jsonComplaints}
        </pre >
    );
}

const ResidentialsList = () => {
    const { residentials } = useResidentials();
    const jsonResidentials = JSON.stringify(residentials, null, 2)

    return (
        < pre >
            {jsonResidentials}
        </pre >
    );
}

const ResidencesList = () => {
    const { residences } = useResidences();
    const jsonResidences = JSON.stringify(residences, null, 2)

    return (
        < pre >
            {jsonResidences}
        </pre >
    );
}

const CategoriesList = () => {
    const { categories } = useCategories();
    const jsonCategories = JSON.stringify(categories, null, 2)

    return (
        < pre >
            {jsonCategories}
        </pre >
    );
}

const ComplaintsStatusList = () => {
    const { complaintStatuses } = useComplaintStatuses();
    const jsonComplaintsStatus = JSON.stringify(complaintStatuses, null, 2)

    return (
        < pre >
            {jsonComplaintsStatus}
        </pre >
    );
}

const ActivityStatusesList = () => {
    const { activityStatuses } = useActivityStatuses();
    const jsonActivityStatuses = JSON.stringify(activityStatuses, null, 2)

    return (
        < pre >
            {jsonActivityStatuses}
        </pre >
    );
}

const ContextTest = () => {
    const { authUser, isLoggedIn } = useAuth();

    const [selectedComponents, setSelectedComponents] = useState([]);

    const handleComponentToggle = (component) => {
        setSelectedComponents((prevSelected) => {
            if (prevSelected.includes(component)) {
                return prevSelected.filter((selected) => selected !== component);
            } else {
                return [...prevSelected, component];
            }
        });
    };

    const componentsList = [
        {
            label: 'Logged User (yourself)',
            component: 'LoggedUser'
        },
        {
            label: 'Users List',
            component: 'UsersList'
        },
        {
            label: 'Roles List',
            component: 'RolesList'
        },
        {
            label: 'Complaints List',
            component: 'ComplaintsList'
        },
        {
            label: 'Residentials List',
            component: 'ResidentialsList'
        },
        {
            label: 'Residences List',
            component: 'ResidencesList'
        },
        {
            label: 'Categories List',
            component: 'CategoriesList'
        },
        {
            label: 'Complaints Status List',
            component: 'ComplaintsStatusList'
        },
        {
            label: 'Activity Statuses List',
            component: 'ActivityStatusesList'
        },
    ]


    if (authUser && authUser.Role == 'dev') {
        return (
            <div className="container-fluid px-5">

                <div className="row my-5">
                    <h4 className="fw-bold mb-4">Welcome to the DB view {authUser.FirstName}, select the lists you want to display</h4>
                    {componentsList.map((item, index) => (

                        <div key={index}> <Checkbox className="p-2" checked={selectedComponents.includes(item.component)}
                            onChange={() => handleComponentToggle(item.component)}>{item.label}</Checkbox>
                        </div>

                    ))}
                </div>

                {componentsList
                    .filter((item) => selectedComponents.includes(item.component))
                    .map((item, index) => (
                        <div key={index} className="row border rounded-3 my-2">
                            <h5 className="my-3 fw-bold">{item.label}</h5>
                            {React.createElement(eval(item.component))}
                        </div>
                    ))}
            </div>
        );
    } else {
        return (
            <AccessDenied />
        );
    }

};

export default ContextTest;