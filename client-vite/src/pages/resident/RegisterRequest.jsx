import { useEffect, useState } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { useAuth0 } from '@auth0/auth0-react';
import AccessDenied from '../common/AccessDenied';
import { useAuth } from "../../contexts/AuthContext";
import { getRoles } from "../../contexts/RoleContext";



const RegisterRequest = () => {
    const { authUser, isLoggedIn } = useAuth();

    const { isAuthenticated } = useAuth0();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        role: 'resident',
        street_name: '',
        house_number: 0,
        phone: 0,
        email: ''
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


    if (isAuthenticated) {
        return (
            <AccessDenied></AccessDenied>
        );
    }

    return (
        <div className='container mt-md-5 mt-0 p-3 col-xl-8 col-md-10 col-12'>

            <form onSubmit={handleSubmit} className="container">
                <h2 className='py-4 text-center fw-bold'>Request access</h2>

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

                <div className="row row-cols-lg-2 row-cols-1">
                    <div className="col">
                        <div className="form-group">
                            <label className='my-2' htmlFor="street_name">street_name</label>
                            <input
                                type="text"
                                name="street_name"
                                value={formData.street_name}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="street_name"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label className='my-2' htmlFor="house_number">house_number</label>
                            <input
                                type="number"
                                name="house_number"
                                value={formData.house_number}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="house_number"
                            />
                        </div>
                    </div>
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

export default RegisterRequest;