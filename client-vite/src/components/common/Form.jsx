/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

function Form({ tableName, route, formName }) {
    const [ attributes, setAttributes ] = useState([]);
    const [ formData, setFormData ] = useState({});
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    console.log(tableName);

    useEffect(() => {
        fetch(route)
            .then((response) => response.json())
            .then((data) => setAttributes(data))
            .catch((error) => console.error('Error fetching attributes:', error));
    }, [ route ]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [ name ]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, formName, data: formData }), // Include table name and form name in the data
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Form submitted successfully');
                    setFormSubmitted(true);
                } else {
                    console.error('Form submission failed');
                }
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <div className="container">
            <h1 className="mt-5">{formName}</h1>
            {!formSubmitted ? (
                <form onSubmit={handleSubmit}>
                    {attributes.map((attribute) => (
                        <div key={attribute} className="mb-3 form-floating">
                            <input
                                type="text"
                                id={attribute}
                                name={attribute}
                                value={formData[ attribute ] || ''}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder={`Enter ${attribute}`}
                            />
                            <label htmlFor={attribute}>Enter {attribute}</label>
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            ) : (
                <p className="mt-3">Form submitted successfully!</p>
            )}
        </div>
    );
}

export default Form;
