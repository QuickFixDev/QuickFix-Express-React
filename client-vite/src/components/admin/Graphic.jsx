import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PORT from '../../constants/constants';

const Stats = () => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:${PORT}/stats`)

            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData); // Update the component state with the fetched data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <span className="text-center fw-bold">Complaints by category</span>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category_name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="category_count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Stats;
