// import React, { useState } from 'react';
import React from 'react';
import Category from '../components/Category';

function ComplainForm() {
    // const [title, setTitle] = useState('');
    // const [category, setCategory] = useState('Category 1');
    // const [description, setDescription] = useState('');
    // 
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission logic here
    //     console.log('Title:', title);
    //     console.log('Category:', category);
    //     console.log('Description:', description);
    //     console.log('Title:', setTitle);
    //     console.log('Category:', setCategory);
    //     console.log('Description:', setDescription);
    // };

    return (
        <div className='container w-50 shadow-md py-5 mt-5'>
            <div className='container my-3 text-center'>
                <h1>
                    Submit complain
                </h1>
            </div>
            <div className='container mt-5'>
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInputGrid"
                                placeholder="name@example.com"
                            />
                            <label for="floatingInputGrid">Complain Subject</label>
                        </div>
                    </div>

                    <Category />

                    <div className="row g-2">
                        <div className="col">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInputGrid"
                                    placeholder="name@example.com"
                                    value="email@example.com" />
                                <label for="floatingInputGrid">Email address</label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ComplainForm;