import { useEffect, useState } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { useAuth0 } from '@auth0/auth0-react';
import AccessDenied from '../common/AccessDenied';
import { useAuth } from "../../contexts/AuthContext";
import { getRoles } from "../../contexts/RoleContext";
import { getResidences } from "../../contexts/ResidenceContext";


function UserStorageComponent() {
    const { authUser, isLoggedIn } = useAuth();
    const { isAuthenticated } = useAuth0();
    const { residences } = getResidences();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: 0,
        role_id: 0,
        residence: 0,
    });
    const { roles } = getRoles();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    authUser
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${ServerUrl}/admin/users/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('User registered damn:', data);
            })
            .catch((error) => console.error('Error registering user:', error));
    };

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        setFormData({ ...formData, complaint_date: formattedDate });
    }, []);


    if (!isAuthenticated) {
        return (
            <AccessDenied></AccessDenied>
        );
    }

    return (
        <div className='container mt-md-5 mt-0 p-3 col-xl-8 col-md-10 col-12'>

            <form onSubmit={handleSubmit} className="container">
                <h1 className='py-4 text-center'>Create new user</h1>

                <div className="row row-cols-lg-2 row-cols-1">
                    <div className="col">
                        <div className="form-group">
                            <label className='my-2' htmlFor="first_name">first_name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="first_name"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label className='my-2' htmlFor="last_name">last_name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="last_name"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className='my-2' htmlFor="role">Select role</label>

                    {roles && roles.length > 0 ?
                        (<select
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                            className="form-control bg-light"
                            id="role_id"
                        >
                            <option value="">Role list</option>
                            {roles.map((role, index) => (
                                <option key={index} value={role.role_id} onChange={handleChange}>
                                    {role.role_name}
                                </option>
                            ))}
                        </select>)
                        :
                        ('No roles available')
                    }
                </div>

                <div className="form-group">
                    <label className='my-2' htmlFor="residence">Select </label>

                    {residences && residences.length > 0 ?
                        (<select
                            name="residence"
                            value={formData.residence}
                            onChange={handleChange}
                            className="form-control bg-light"
                            id="residence"
                        >
                            <option value="">Residence list</option>
                            {residences.map((residence, index) => (
                                <option key={index} value={residence.residence_id}>
                                    {residence.street_name} #{residence.street_number}
                                </option>
                            ))}
                        </select>)
                        :
                        ('No residences available')
                    }
                </div>

                <div className="row row-cols-lg-2 row-cols-1">
                    <div className="col">
                        <div className="form-group">
                            <label className='my-2' htmlFor="email">email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="email"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label className='my-2' htmlFor="phone">phone_number</label>
                            <input
                                type="number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="phone"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-100 my-4 btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

const UserStorage = () => {
    const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn

    if (isLoggedIn && authUser.Role === 'admin' || authUser.Role === 'dev' || authUser.Role === 'test') {
        return <UserStorageComponent />
    } else {
        <AccessDenied />
    }
}

export default UserStorage;
