import React, { useState } from 'react';
import axios from 'axios';
import user from '../../contexts/UserContext'
import AccessDenied from '../common/AccessDenied';


const ComplainForm = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate
            .getHours()
            .toString()
            .padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate
                .getSeconds()
                .toString()
                .padStart(2, '0')}`;
    const data = {
        user_id: 1,
        complaint_date: formattedDate,
    };
    const [ values, setValues ] = useState({
        user_id: '',
        complaint_title: '',
        complaint_description: '',
        complaint_date: '',
        status: '',
        category_id: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Parse value to an integer if the name is "category_id"
        setValues({
            ...values,
            [ name ]: name === 'category_id' ? parseInt(value, 10) : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:3000/complain-form', values)
            .then((res) => console.log('Successful storage'))
            .catch((error) => console.log(error));
    };

    if (user.role === "resident" || user.role === "dev") {
        return (

            <div className="container mt-5 p-5 w-75 shadow-md">
                <h1 className='text-center mb-5'>Submit complain</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            placeholder="User ID"
                            onChange={handleChange}
                            type="number"
                            name="user_id"
                            className="form-control"
                            id="user_id"
                        />
                        <label htmlFor="user_id">User ID</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            placeholder="Complaint Title"
                            onChange={handleChange}
                            type="text"
                            name="complaint_title"
                            className="form-control"
                            id="complaint_title"
                        />
                        <label htmlFor="complaint_title">Complaint Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            placeholder="Complaint Description"
                            onChange={handleChange}
                            type="text"
                            name="complaint_description"
                            className="form-control"
                            id="complaint_description"
                        />
                        <label htmlFor="complaint_description">Complaint Description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            placeholder="Complaint Date"
                            onChange={handleChange}
                            type="text"
                            name="complaint_date"
                            value={data.complaint_date}
                            className="form-control"
                            id="complaint_date"
                            readOnly
                        />
                        <label htmlFor="complaint_date">Complaint Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select
                            onChange={handleChange}
                            name="status"
                            className="form-control"
                            id="status"
                        >
                            <option value="">Select</option>
                            <option value="Closed">Closed</option>
                            <option value="Open">Open</option>
                        </select>
                        <label htmlFor="status">Status</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select
                            onChange={handleChange}
                            name="category_id"
                            className="form-control"
                            id="category_id"
                        >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        <label htmlFor="category_id">Category ID</label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit Complaint
                    </button>
                </form>
            </div>
        );
    }
    return (
        <AccessDenied />
    );
};

export default ComplainForm;
