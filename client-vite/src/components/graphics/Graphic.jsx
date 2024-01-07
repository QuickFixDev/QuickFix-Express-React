import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ServerUrl from '../../constants/ServerUrl';

const Stats = () => {
    const [data, setData] = useState([]);
    const COLORS = [
        "#09A7FF",
        "#7E09FF",
        "#D009FF",
        "#FF09BF",
        "#FF097E",
        "#FF8A09"
    ];

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
        <div className="col-9">
            <ResponsiveContainer height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="category_count"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="horizontal"
                        align="center"
                        formatter={(value, entry) => entry.payload.category_name}
                        wrapperStyle={{ padding: '0 0 50px 0 ' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Stats;
