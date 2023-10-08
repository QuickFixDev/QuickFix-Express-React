import React, { useState } from 'react';
import CategoryCombo from '../../components/common/CategoryCombo';

function ComplainForm() {
    const [complaint_title, setComplainSubject] = useState('');
    const [category_name, setComplainCategory] = useState(''); // Use a separate state for category
    const [complaint_description, setComplainDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Complain Subject:', complaint_title);
        console.log('Category:', category_name); // Use complain_category state here
        console.log('Description:', complaint_description);
    };

    return (
        <div className='container w-50 shadow-md p-5 mt-5'>
            <div className='container my-3 text-center'>
                <h1>Complain form</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='container mt-5'>
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="complain_subject"
                                    placeholder="Complain subject"
                                    value={complaint_title}
                                    onChange={(e) => setComplainSubject(e.target.value)}
                                />
                                <label htmlFor="complain_subject">Complain Subject</label>
                            </div>
                        </div>

                        <div className="col-md">
                            <CategoryCombo
                                id="complain_category"
                                selectedCategory={category_name} // Pass selected category as a prop
                                onSelectCategory={(category) => setComplainCategory(category)} // Handle category selection
                            />
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
                                    value={complaint_description}
                                    onChange={(e) => setComplainDescription(e.target.value)}
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
