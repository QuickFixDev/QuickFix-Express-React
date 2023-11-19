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
                // Assuming the response data has a structure like [{ category_name: 'CategoryA', category_count: 5 }, ...]
                setData(responseData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="category_count"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                {/* Legend inside the PieChart */}
                <Legend
                    layout="horizontal"  // Set layout to "vertical" for column display
                    align="center"  // Align the legend to the center
                    formatter={(value, entry) => entry.payload.category_name}
                    wrapperStyle={{ padding: '0 0 50px 0 ' }}  // Add top margin of 20 pixels

                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default Stats;
