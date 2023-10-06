import React from 'react';
import Category from '../components/Category';

function ComplainForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const complainSubject = document.getElementById('complainSubject').value;
        const complainDescription = document.getElementById('complainDescription').value;
        console.log('Complain Subject:', complainSubject);
        console.log('Description:', complainDescription);
    };

    return (
        <div className='container w-50 shadow-md py-5 mt-5'>
            <div className='container my-3 text-center'>
                <h1>Report complain</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='container mt-5'>
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="complainSubject"
                                    placeholder="Complain subject"
                                />
                                <label htmlFor="complainSubject">Complain Subject</label>
                            </div>
                        </div>

                        <div className="col-md">
                            <Category />
                        </div>
                    </div>
                    <div className="mt-1 row g-2">
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="complainDescription">Description</label>
                                <textarea
                                    className="form-control"
                                    id="complainDescription"
                                    rows="8"
                                    style={{ minHeight: "100px", resize: "none" }}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ComplainForm;
