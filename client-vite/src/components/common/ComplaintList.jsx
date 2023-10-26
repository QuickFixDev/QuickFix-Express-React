/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import PORT from '../../constants/constants';


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

  useEffect(() => {
    // Make an HTTP GET request to fetch complaints data
    
    fetch(`http://localhost:${PORT}/my-complaints`) // Replace with the correct endpoint
      .then((response) => response.json())
      .then((responseData) => {
        setComplaints(responseData); // Update the complaints state with the fetched data
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
      {complaints.map((complain, index) => (
        <ComplainItem key={index} {...complain} />
      ))}
    </>
  );

};

export default ComplaintList;