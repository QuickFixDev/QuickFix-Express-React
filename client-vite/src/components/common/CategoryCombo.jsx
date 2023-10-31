import { useState, useEffect } from 'react';
import ServerUrl from '../../constants/ServerUrl';
export default function CategoryCombo() {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch(`${ServerUrl}/complain-form`)
            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
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