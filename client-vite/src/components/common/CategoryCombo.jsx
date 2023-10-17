import { useState, useEffect } from 'react';
import PORT from '../../constants/constants';

export default function CategoryCombo() {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        // Make an HTTP GET request to your Node.js server
        fetch(`http://localhost:${PORT}/complain-form`) // Replace with the correct endpoint
            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData); // Update the component state with the data
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false); // Handle any errors and set loading to false
            });
    }, []);

    return (
        <div className="col-md">
            <div className="form-floating">
                {loading ? (
                    <select className="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                        <option>loading...</option>
                    </select>
                ) : (
                    <select className="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                        {data.map((data) => (
                            <option key={data.category_id}>
                                {data.category_name}
                            </option>
                        ))}
                    </select>
                )}
                <label htmlFor="floatingSelectGrid">select a category</label>
            </div>
        </div>


    );
}