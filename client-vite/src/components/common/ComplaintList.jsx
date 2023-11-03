/* eslint-disable react/prop-types */
import { useState } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { useAuth0 } from "@auth0/auth0-react";

const ComplainItem = (props) => {

  const { complaint_title, complaint_description, status } = props;

  return (
    <div className="container text-center py-3 mb-2  border rounded" style={{ backgroundColor: "white" }}>
      <div className="row">
        <div className="col-4">
          <div className="overflow-hidden text-truncate" style={{ whiteSpace: "nowrap" }}>
            {complaint_title}
          </div>
        </div>
        <div className="col-4">
          <div className="overflow-hidden text-truncate" style={{ whiteSpace: "nowrap" }}>
            {complaint_description}
          </div>
        </div>
        <div className="col-4">
          <div className="overflow-hidden text-truncate" style={{ whiteSpace: "nowrap" }}>
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

const ComplaintList = () => {
  const [ complaints, setComplaints ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { user } = useAuth0();

  const email = user.email;

  fetch(`${ServerUrl}/my-complaints?email=${email}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((responseData) => {
      setComplaints(responseData);
      console.log('', responseData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });

  if (loading) {
    return (
      <p>Loading</p>
    );
  }

  return (
    <>
      {complaints.map((complain, index) => (
        <ComplainItem key={index} {...complain} />
      ))}
    </>
  );

};

export default ComplaintList;