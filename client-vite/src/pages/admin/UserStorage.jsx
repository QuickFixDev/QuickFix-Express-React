import { useEffect, useState } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { useAuth0 } from '@auth0/auth0-react';
import AccessDenied from '../common/AccessDenied';

function UserStorage() {
    const { isAuthenticated } = useAuth0();
    const [ formData, setFormData ] = useState({
        first_name: '',
        last_name: '',
        role: '',
        street_name: '',
        house_number: 0,
        phone_number: 0,
        email: ''
    });
    const [ roles, setRoles ] = useState([]); // State to store categories

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [ name ]: value });
    };

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
                console.log('User registered:', data);
            })
            .catch((error) => console.error('Error registering user:', error));
    };

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        setFormData({ ...formData, complaint_date: formattedDate });
    }, []);

    useEffect(() => {
        // Fetch categories when the component is mounted
        fetch(`${ServerUrl}/admin/users/new`)
            .then((response) => response.json())
            .then((data) => {
                setRoles(data);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    if (!isAuthenticated) {
        return (
            <AccessDenied></AccessDenied>
        );
    }

    return (
        <div className='container mt-5 shadow-md p-3 w-75'>

            <form onSubmit={handleSubmit} className="container mt-4">
                <h1 className='pb-4 text-center'>Submit new user</h1>
                
                <div className="form-group">
                    <label className='my-2' htmlFor="first_name">first_name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="form-control"
                        id="first_name"
                    />
                </div>
                
                <div className="form-group">
                    <label className='my-2' htmlFor="last_name">last_name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="form-control"
                        id="last_name"
                    />
                </div>
                
                <div className="form-group">
                    <label className='my-2' htmlFor="street_name">street_name</label>
                    <input
                        type="text"
                        name="street_name"
                        value={formData.street_name}
                        onChange={handleChange}
                        className="form-control"
                        id="street_name"
                    />
                </div>

                <div className="form-group">
                    <label className='my-2' htmlFor="house_number">house_number</label>
                    <input
                        type="number"
                        name="house_number"
                        value={formData.house_number}
                        onChange={handleChange}
                        className="form-control"
                        id="house_number"
                    />
                </div>
                
                <div className="form-group">
                    <label className='my-2' htmlFor="phone_number">phone_number</label>
                    <input
                        type="number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="form-control"
                        id="phone_number"
                    />
                </div>
                
                <div className="form-group">
                    <label className='my-2' htmlFor="email">email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        id="email"
                    />
                </div>

                <div className="form-group">
                    <label className='my-2' htmlFor="role">Select role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-control"
                        id="role"
                    >
                        <option value="0">Select a role</option>
                        {roles.map((roles) => (
                            <option key={roles.role} value={roles.role}>
                                {roles.role}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="w-100 my-4 btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default UserStorage;
