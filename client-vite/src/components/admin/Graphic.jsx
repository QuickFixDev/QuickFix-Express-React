import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ServerUrl from '../../constants/ServerUrl';
const Stats = () => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        fetch(`${ServerUrl}/admin/complaints/stats`)

            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="container">
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
                    <Bar dataKey="category_count" fill="#0D6EFD" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Stats;
