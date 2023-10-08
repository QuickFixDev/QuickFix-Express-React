import React from "react";

const AboutStructure = ({ general, details }) => (
  <div className="container w-75 p-md-5 p-3 rounded shadow-md">
    {general.map((item, index) => (
      <div className="container d-flex flex-column align-items-center" key={index}>
        <img className="" src={item.sistemPhoto} alt="sistem_photo" width={"200px"} />
        <h2 className="">{item.title}</h2>
        <p>{item.generalDescription}</p>
        <h3 className="align-self-start my-5">Features:</h3>
      </div>
    ))}


    {details.map((item, index) => (
      <div className="container d-flex flex-column align-items-start" key={index}>
        <ul>
          <li>
            <h5>{item.subtitle}</h5>
            <p>{item.description}</p>
          </li>
        </ul>
      </div>
    ))}
  </div>
);

const AboutContent = () => {
  const contentData = {
    general: [
      {
        sistemPhoto: "/images/QuickFix_logo.png",
        title: "QuickFix",
        generalDescription: "QuickFix is a comprehensive Resident Services Management System designed to streamline and enhance the management of residential complexes and private residences. The system facilitates efficient communication between residents and management, allowing users to report and track various maintenance and service requests seamlessly."
      }
    ],

    details: [
      {
        subtitle: "User Registration and Authentication:",
        description: "Users can create accounts and log in securely via Auth0 authentication.        ",
      },
      {
        subtitle: "User Profiles:",
        description: "Residents have profiles with essential information such as name, contact details, and address.",
      },
      {
        subtitle: "Complaint Reporting:",
        description: "Residents can submit service requests or complaints, categorizing them based on predefined categories such as water supply, electrical failures, and more."
      },
      {
        subtitle: "Complaint Tracking:",
        description: "Complaints can be categorized by status, such as: 'Open', 'In Progress', or 'Closed'"
      },
      {
        subtitle: "Service categories:",
        description: "The system maintains a list of predefined service categories with descriptions for easy complaint categorization."
      },
      {
        subtitle: "Dashboard and Reporting:",
        description: "Administrators have access to a dashboard displaying complaint statistics and user data."
      },
      {
        subtitle: "User-Friendly Interface:",
        description: "The user interface is designed for ease of use, with intuitive forms for complaint submission and profile management."
      },
      {
        subtitle: "User-Friendly Interface:",
        description: "The user interface is designed for ease of use, with intuitive forms for complaint submission and profile management."
      },
      // Add more details objects as needed
    ],
  };

  return (
    <div className="container mt-5">
      <AboutStructure {...contentData} />
    </div>
  );
};


export default AboutContent;