import { useAuth0 } from "@auth0/auth0-react"
import { useAuth } from '../../contexts/AuthContext';
import AccessDenied from '../common/AccessDenied';
import ServerUrl from "../../constants/ServerUrl";
import { useEffect, useState } from "react";

const MyComplaints = () => {
    const { authUser, isLoggedIn } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return (
            <AccessDenied />
        );
    }

    useEffect(() => {
        fetch(`${ServerUrl}/user/complaints/${authUser.Id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then((data) => {
                // Use setComplaints to update the state with the response data
                setComplaints(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors, e.g., display an error message to the user
            });
    }, [authUser.Id]);


    return (
        <>
            <div className="list container-fluid p-md-5 p-3">
                <div className="p-4 mb-4 border-start border-3 border-primary">
                    <h1>Your complaint history</h1>
                </div>
                <div className="row d-flex flex-row  row-cols-md-2 row-cols-1  g-3">

                    {complaints.map((complaint) => (
                        <div className="col">
                            <div className="container bg-light rounded-4 p-3">

                                <span className="badge bg-secondary">ID: {complaint.complaint_id}</span>
                                <div className="my-3">
                                    <div className="col bg-light mb-3 mr-3" key={complaint.complaint_id}>
                                        <div className="m-2">
                                            <h4>{complaint.complaint_title}</h4>
                                            <p>Status: {complaint.status}</p>
                                            <p>{complaint.complaint_description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );

}

const ReturningComponent = () => {
    const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn

    if (isLoggedIn && authUser.Role === 'resident' || authUser.Role === 'dev') {
        return <MyComplaints />
    } else {
        return <AccessDenied />
    }
}

export default ReturningComponent;