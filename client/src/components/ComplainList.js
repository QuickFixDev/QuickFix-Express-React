import React from 'react';
import handleScroll from '../utils/js/scrollShadow'

const ComplainItem = (props) => {
  const { subject, text, status } = props;

  return (
    <div className="container my-3 p-3 text-center border rounded" style={{ backgroundColor: "white" }}>
      <div className="row">
        <div className="col" style={{ maxWidth: "33%" }}>
          <div className="div font-weight-bold  overflow-hidden text-truncate" style={{ whiteSpace: "nowrap" }}>
            {subject}
          </div>
        </div>
        <div className="col" style={{ maxWidth: "33%" }}>
          <div className="div overflow-hidden text-truncate" style={{ whiteSpace: "nowrap" }}>
            {text}
          </div>
        </div>
        <div className="col" style={{ maxWidth: "33%" }}>
          <div className="div overflow-hidden text-truncate" style={{ whiteSpace: "nowrap" }}>
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

const ComplainList = () => {
  const complaints = [
    // AI-generated issues
    { subject: "Maintenance Request", text: "My sink is leaking, and I need someone to fix it.", status: "Pending" },
    { subject: "Noise Complaint", text: "The neighbors are making loud noises late at night, disturbing my sleep.", status: "Open" },
    { subject: "Security Concern", text: "I noticed a suspicious person loitering near the entrance. Please investigate.", status: "Pending" },
    { subject: "Parking Issue", text: "Someone parked their car in my designated spot. Can you address this issue?", status: "Open" },
    { subject: "Appliance Problem", text: "My refrigerator is not working properly. It needs urgent repair.", status: "Pending" },
    { subject: "Cleaning Request", text: "The common areas in the building need to be cleaned more frequently.", status: "Open" },
    { subject: "Internet Outage", text: "The internet service has been down for hours. We need a quick resolution.", status: "Pending" },
  ];

  return (
    <>
      <div id="scroll-container" className="container mt-3" style={{ maxHeight: "350px", overflowY: "auto" }} onScroll={handleScroll}>
        {complaints.map((complain, index) => (
          <ComplainItem key={index} {...complain} />
        ))}
      </div>
    </>
  );

};

export default ComplainList;