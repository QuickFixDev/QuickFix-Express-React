import { useEffect, useState } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '../../contexts/AuthContext';
import AccessDenied from '../common/AccessDenied';
import { getCategories } from '../../contexts/CategoryContext';


function UserForm() {
    const { authUser, isLoggedIn } = useAuth();
    const { categories, loading } = getCategories();
    const { user } = useAuth0();

    console.log('----------------- auth id ----------------- : ', authUser.Id)

    const [formData, setFormData] = useState({
        user_id: authUser.Id,
        status: 'Open',
        category_id: 0,
        complaint_date: '',
        complaint_title: '',
        complaint_description: '',
    });

    console.log('form data: ', formData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${ServerUrl}/user/complaints/new`, {
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

    console.log('string', JSON.stringify(formData))

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        setFormData({ ...formData, complaint_date: formattedDate });
    }, []);

    return (
        <div className='container bg-white mt-md-5 mt-0 p-3 col-xl-8 col-md-10 col-12'>
            <form onSubmit={handleSubmit} className="container">
                <h1 className='py-4 text-center'>Tell us what happened</h1>
                <input hidden onChange={handleChange} type="number" name="user_id" value={formData.user_id} id='user_id' />
                <input hidden onChange={handleChange} type="text" name="status" value={formData.status} />
                <input hidden onChange={handleChange} type="text" name="complaint_date" value={formData.complaint_date} />

                <div className="row row-cols-md-2 row-cols-1">
                    <div className="col">
                        <div className="form-group">
                            <label className='my-2' htmlFor="complaint_title">Complaint Title</label>
                            <input
                                type="text"
                                name="complaint_title"
                                value={formData.complaint_title}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="complaint_title"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label className='my-2' htmlFor="category_id">Select the complaint type</label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="form-control bg-light"
                                id="category_id"
                            >
                                <option value="0">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className='my-2' htmlFor="complaint_title">Complaint description</label>
                    <textarea
                        type="text"
                        name="complaint_description"
                        value={formData.complaint_description}
                        onChange={handleChange}
                        className="form-control bg-light"
                        id="complaint_description"
                        rows={10}
                    />
                </div>

                <button type="submit" className="w-100 my-4 btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

const ReturningComponent = () => {
    const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn

    if (isLoggedIn && authUser.Role === 'resident' || authUser.Role === 'dev') {
        return <UserForm />
    } else {
        return <AccessDenied />
    }
}

export default ReturningComponent;
