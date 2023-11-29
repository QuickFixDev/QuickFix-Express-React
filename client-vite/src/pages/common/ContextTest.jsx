import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from 'react-router-dom';
import LoginButton from "../../components/common/LoginButton";
import { useCategories } from "../../contexts/CategoryContext";
import { useRoles } from "../../contexts/RoleContext";
import { useResidences } from "../../contexts/ResidenceContext";
import { useResidentials } from "../../contexts/ResidentialContext";
import { useEffect, useState } from "react";
import { useComplaints } from "../../contexts/ComplaintContext";
import { useUsers } from "../../contexts/UsersContext";

const ContextTest = () => {
    const { authUser, isLoggedIn } = useAuth();
    const { categories } = useCategories();
    const { roles } = useRoles();
    const { residences } = useResidences();
    const { residentials } = useResidentials();
    const { complaints } = useComplaints();
    const { users } = useUsers();

    const userFields = [
        { name: 'User Status', value: isLoggedIn ? 'loggedIn' : 'loggedOut' },
        { name: 'First Name', value: isLoggedIn ? authUser.FirstName : null },
        { name: 'Last Name', value: isLoggedIn ? authUser.LastName : null },
        { name: 'Role', value: isLoggedIn ? authUser.Role : null },
        { name: 'User ID', value: isLoggedIn ? authUser.Id : null },
    ];

    return (
        <div className="container p-sm-5 p-0">
            <div className="row border round">
                <div className="p-4">
                    <h2>User context</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Field</th>
                                <th scope="col">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userFields.map((field, index) => (
                                <tr key={index}>
                                    <td>{field.name}</td>
                                    <td>{field.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row border round">
                <div className="p-4">
                    <h2>Categories context</h2>
                    <p>Categories:</p>
                    {categories && categories.length > 0 ? (
                        <select className="form-select">
                            {categories.map((category, index) => (
                                <option key={index} value={category.category_id}>
                                    {category.category_id} {category.category_name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        'No categories available'
                    )}
                </div>
            </div>

            <div className="row border round">
                <div className="p-4">
                    <h2>Roles context</h2>
                    <p>Roles:</p>
                    {roles && roles.length > 0 ? (
                        <select className="form-select">
                            {roles.map((role, index) => (
                                <option key={index} value={role.role_id}>
                                    {role.role_name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        'No roles available'
                    )}
                </div>
            </div>

            <div className="row border round">
                <div className="p-4">
                    <h2>Residences context</h2>
                    <p>Residences:</p>
                    {residences && residences.length > 0 ? (
                        <select className="form-select">
                            {residences.map((residence, index) => (
                                <option key={index} value={residence.residence_id}>
                                    {residence.street_name} #{residence.street_number}
                                </option>
                            ))}
                        </select>
                    ) : (
                        'No residences available'
                    )}
                </div>
            </div>

            <div className="row border round">
                <div className="p-4">
                    <h2>Residentials context</h2>
                    <p>Residentials:</p>
                    {residentials && residentials.length > 0 ? (
                        <select className="form-select">
                            {residentials.map((residential, index) => (
                                <option key={index} value={residential.residential_id}>
                                    {residential.residential_name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        'No residentials available'
                    )}
                </div>
            </div>

            <div className="row border round">
                <div className="p-4">
                    <h2>Complaints context</h2>
                    <p>complaints:</p>
                    {complaints && complaints.length > 0 ? (
                        <select className="form-select">
                            {complaints.map((complaint, index) => (
                                <option key={index} value={complaint.complaint_id}>
                                    {complaint.complaint_title}
                                </option>
                            ))}
                        </select>
                    ) : (
                        'No complaints available'
                    )}
                </div>
            </div>

            <div className="row border round">
                <div className="p-4">
                    <h2>users context</h2>
                    <p>users:</p>
                    {users && users.length > 0 ? (
                        <select className="form-select">
                            {users.map((item, index) => (
                                <option key={index} value={item.user_id}>
                                    {item.first_name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        'No users available'
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContextTest;
