import React, { useState, useEffect } from 'react';

const ProfileStructure = (props) => {
    const {
        first_name,
        last_name,
        street_name,
        house_number,
        email,
        profile_photo
    } = props;

    return (
        <div className="row">
            <div className="col">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={profile_photo} alt="User Profile" className="rounded-circle m-3" width="100px"/>
                    <h2>{first_name} {last_name}</h2>
                    <p>Email: {email}</p>
                    <p>{street_name} #{house_number}</p>
                </div>
            </div>
        </div>
    );
}

const ProfileComponent = () => {
    const [ info, setInfo ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        // Make an HTTP GET request to fetch complaints data
        fetch('/profile') // Replace with the correct endpoint
            .then((response) => response.json())
            .then((responseData) => {
                setInfo(responseData); // Update the complaints state with the fetched data
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
                {info.map((info, index) => (
                    <ProfileStructure key={index} {...info} />
                ))}
            </div>
        </>
    );
}

export default ProfileComponent;