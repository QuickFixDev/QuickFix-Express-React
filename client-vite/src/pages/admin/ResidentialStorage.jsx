import { useEffect, useState } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { useAuth0 } from '@auth0/auth0-react';
import AccessDenied from '../common/AccessDenied';
import { useAuth } from '../../contexts/AuthContext';
import { useResidentials } from '../../contexts/ResidentialContext';

function ResidentialStorageComponent() {
    const { authUser, isLoggedIn } = useAuth();
    const { isAuthenticated } = useAuth0();
    const { residentials } = useResidentials();

    const [formData, setFormData] = useState({
        residential_name: '',
        country: '',
        state: '',
        city: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${ServerUrl}/residentials/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Residential created successfully:', data);
            })
            .catch((error) => console.error('Error creating residential:', error));
    };

    if (!isAuthenticated) {
        return <AccessDenied />;
    }

    return (
        <div className="container mt-md-5 mt-0 mb-md-5 mb-0 p-3 col-xl-8 col-md-10 col-12">
            <form onSubmit={handleSubmit} className="container">
                <h2 className="py-4 text-center fw-bold">Create new residential</h2>

                <div className="form-group">
                    <label className="my-2" htmlFor="residential_name">
                        Residential Name
                    </label>
                    <input
                        type="text"
                        name="residential_name"
                        value={formData.residential_name}
                        onChange={handleChange}
                        className="form-control bg-light"
                        id="residential_name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="my-2" htmlFor="country">
                        Country
                    </label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-control bg-light"
                        id="country"
                        required
                    />
                </div>

                <div className="row row-cols-lg-2 row-cols-1">
                    <div className="col">
                        <div className="form-group">
                            <label className="my-2" htmlFor="state">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="state"
                                required
                            />
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group">
                            <label className="my-2" htmlFor="city">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="city"
                                required
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-100 my-4 btn btn-primary">
                    Submit
                </button>
            </form >
        </div >
    );
}

const ResidentialStorage = () => {
    const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn

    if (isLoggedIn && (authUser.Role === 'admin' || authUser.Role === 'dev')) {
        return <ResidentialStorageComponent />
    } else {
        <AccessDenied />
    }
}

export default ResidentialStorage;
