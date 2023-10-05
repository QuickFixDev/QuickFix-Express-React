// import React, { useState } from 'react';
import React from 'react';

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
        <>
            <div className='container mt-5 text-center'>
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
                                value="mdo@example.com" />
                            <label for="floatingInputGrid">Email address</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label for="floatingSelectGrid">Works with selects</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComplainForm;