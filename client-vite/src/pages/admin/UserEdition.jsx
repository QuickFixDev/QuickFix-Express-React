import { useState, useEffect } from 'react';

function EditForm() {
    const [ formData, setFormData ] = useState({});
    const [ tableAttributes, setTableAttributes ] = useState([]);

    useEffect(() => {
        // Fetch table attributes from your backend API
        // You can use axios or fetch for this.
        fetch('/api/getTableAttributes')
            .then((response) => response.json())
            .then((data) => setTableAttributes(data));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [ name ]: value });
    };

    return (
        <form>
            {tableAttributes.map((attribute) => (
                <div key={attribute.name}>
                    <label>{attribute.name}</label>
                    <input
                        type="text"
                        name={attribute.name}
                        value={formData[ attribute.name ] || ''}
                        onChange={handleInputChange}
                    />
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}

export default EditForm;
