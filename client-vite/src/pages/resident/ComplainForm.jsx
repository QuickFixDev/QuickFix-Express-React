import { useState } from 'react';
import axios from 'axios';
import tentant from '../../contexts/UserContext'
import AccessDenied from '../common/AccessDenied';
import CategoryCombo from '../../components/common/CategoryCombo';


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
            .then((res) => console.log('Successful storage', res))
            .catch((error) => console.log(error));
    };

    if (tentant.role === "resident" || tentant.role === "dev") {
        return (

            <div className="container mt-5 p-5 w-75 shadow-md">
                <h1 className='text-center mb-5'>Submit complain</h1>
                <form onSubmit={handleSubmit}>

                    <div className="form-floating mb-3">
                        <input
                            placeholder="Complaint Date"
                            onChange={handleChange}
                            type="text"
                            name="complaint_date"
                            value={data.complaint_date}
                            className="form-control"
                            id="complaint_date"
                            hidden
                        />
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={handleChange}
                            type="number"
                            name="user_id"
                            className="form-control"
                            id="user_id"
                            value={tentant.id}
                            hidden
                        />
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

                    <div className="form-group">
                        <label className='mb-2' htmlFor="reportDescription">Description</label>
                        <textarea
                            type="text"
                            className="form-control mb-3"
                            name="complaint_description"
                            id="reportDescription"
                            rows="8"
                            placeholder="Enter report description"
                            onChange={handleChange}
                        ></textarea>
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
                        <CategoryCombo onChange={handleChange}
                            name="category_id"
                            className="form-control"
                            id="category_id"
                        />
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
