import React, { useState, useEffect } from 'react';
const ReportStructure = (props) => {

    const {
        complaint_title,
        category_name,
        complaint_description,
        complaint_date,
        street_name,
        house_number
    } = props;

    return (
        <div className='container p-mx-5 p-3 mt-3 overflow-auto'>
            <div className="row">
                <div className="col-md-6 text-left">
                    <h4>{complaint_title}: {street_name} #{house_number}</h4>
                    <h6>{category_name}</h6>
                </div>
                <div className="col-md-6 text-md-end">
                    <p>{complaint_date}</p>
                </div>
            </div>
            <div className="row text-left">
                <div className="col-12 text-left mt-3">
                    <p>{complaint_description}</p>
                </div>
            </div>
        </div>
    );
}

const ComplaintDetail = () => {
    const [ detail, setDetail ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        // Make an HTTP GET request to fetch complaints data
        fetch('/complaint-log') // Replace with the correct endpoint
            .then((response) => response.json())
            .then((responseData) => {
                setDetail(responseData); // Update the complaints state with the fetched data
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false); // Handle any errors and set loading to false
            });
    }, []);

    if (loading) {
        return (
            <p>Loading</p>
        );
    }

    return (
        <>
            <div id="scroll-container" className="scrollbar-hidden" style={{ maxHeight: "325px", overflowY: "auto" }}>
                {detail.map((complain, index) => (
                    <ReportStructure key={index} {...complain} />
                ))}
            </div>
        </>
    );
}

export default ComplaintDetail;