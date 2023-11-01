import { useEffect, useState } from 'react';
import ServerUrl from '../../constants/ServerUrl';

function UserStorage() {
    const route = 'user-storage';
    const formName = 'Register a new User'

    const [ attributes, setAttributes ] = useState([]);
    const [ formData, setFormData ] = useState({});
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    useEffect(() => {
        fetch(`${ServerUrl}/${route}`)
            .then((response) => response.json())
            .then((data) => setAttributes(data))
            .catch((error) => console.error('Error fetching attributes:', error));
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [ name ]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${ServerUrl}/${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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
        <div className="container mt-5 p-5 w-50 shadow-md">
            <h1 className="text-center mb-5">{formName}</h1>
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
                            <label htmlFor={attribute}>{attribute}</label>
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            ) : (
                <p className="mt-3 text-center">Form submitted successfully!</p>
            )}
        </div>
    );
}

export default UserStorage;
