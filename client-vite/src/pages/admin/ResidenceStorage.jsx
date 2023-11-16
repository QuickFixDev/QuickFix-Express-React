import { useEffect, useState } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { useAuth0 } from '@auth0/auth0-react';
import AccessDenied from '../common/AccessDenied';
import { useAuth } from '../../contexts/AuthContext';
import { getResidences } from '../../contexts/ResidenceContext';
import { getResidentials } from '../../contexts/ResidentialContext';

function ResidenceStorageComponent() {
    const { authUser, isLoggedIn } = useAuth();
    const { isAuthenticated } = useAuth0();
    const { residences } = getResidences();
    const { residentials } = getResidentials();


    const [formData, setFormData] = useState({
        residential_id: 0,
        zip_code: 0,
        street_name: '',
        street_number: 0,
        details: '',
        status: 'available', // Set a default status
        owner_user_id: '',
        tenant_user_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${ServerUrl}/residences/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Residence created successfully:', data);
            })
            .catch((error) => console.error('Error creating residence:', error));
    };

    if (!isAuthenticated) {
        return <AccessDenied />;
    }

    return (
        <div className="container mt-md-5 mt-0 mb-md-5 mb-0 p-3 col-xl-8 col-md-10 col-12">
            <form onSubmit={handleSubmit} className="container">
                <h1 className="py-4 text-center">Create new residence</h1>

                <div className="form-group">
                    <label className="my-2" htmlFor="residential_id">
                        Residential area
                    </label>

                    {residentials && residentials.length > 0 ? (
                        <select
                            type="number"
                            name="residential_id"
                            value={formData.residential_id}
                            onChange={handleChange}
                            className="form-control bg-light"
                            id="residential_id"
                            required
                        >
                            <option value=''>Select a residential</ option>
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

                <div className="form-group">
                    <label className="my-2" htmlFor="zip_code">
                        Zip Code
                    </label>
                    <input
                        type="text"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleChange}
                        className="form-control bg-light"
                        id="zip_code"
                        required
                    />
                </div>


                <div className="row row-cols-lg-2 row-cols-1">
                    <div className="col">
                        <div className="form-group">
                            <label className="my-2" htmlFor="street_name">
                                Street Name
                            </label>
                            <input
                                type="text"
                                name="street_name"
                                value={formData.street_name}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="street_name"
                                required
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label className="my-2" htmlFor="street_number">
                                Street Number
                            </label>
                            <input
                                type="text"
                                name="street_number"
                                value={formData.street_number}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="street_number"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="my-2" htmlFor="details">
                        Details
                    </label>
                    <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        className="form-control bg-light"
                        id="details"
                    />
                </div>

                <div className="form-group">
                    <label className="my-2" htmlFor="status">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-control bg-light"
                        id="status"
                    >
                        <option selected value="available">Available</option>
                        <option value="occupied">Occupied</option>
                    </select>
                </div>

                <div className="row row-cols-lg-2 row-cols-1">
                    <div className="col">
                        <div className="form-group">
                            <label className="my-2" htmlFor="owner_user_id">
                                Owner
                            </label>
                            <input
                                type="text"
                                name="owner_user_id"
                                value={formData.owner_user_id}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="owner_user_id"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label className="my-2" htmlFor="tenant_user_id">
                                Tenant
                            </label>
                            <input
                                type="text"
                                name="tenant_user_id"
                                value={formData.tenant_user_id}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="tenant_user_id"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-100 my-4 btn btn-primary">
                    Submit
                </button>
            </form >

            <pre>{JSON.stringify(formData, null, 2)}</pre>

        </div >
    );
}

const ResidenceStorage = () => {
    const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn

    if (isLoggedIn && authUser.Role === 'admin' || authUser.Role === 'dev') {
        return <ResidenceStorageComponent />
    } else {
        <AccessDenied />
    }
}

export default ResidenceStorage;
