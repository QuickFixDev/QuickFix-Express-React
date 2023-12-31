/* eslint-disable react/prop-types */

const AboutHeader = () => {
    return (
        <>
            <div className="w-100 py-5 text-center my-5">
                <img src="/svg/QuickFixGray.svg" alt="" width={'200px'} />
            </div>
        </>
    );
};

const AboutStructure = ({ general, details }) => {
    return (
        <div className="container-fluid bg-light p-3">
            {general.map((item, index) => (
                <div className="container" key={index}>
                    <h3 className="py-4">About QuickFix</h3>
                    <p>{item.generalDescription}</p>
                    <h3 className="py-4">Features:</h3>
                </div>
            ))}
            {details.map((item, index) => (
                <div className="container" key={index}>
                    <p>
                        <h6>{item.subtitle}</h6>
                        <p>{item.description}</p>
                    </p>
                </div>
            ))}
        </div>
    );
};

const AboutContent = () => {
    const contentData = {
        general: [
            {
                title: "QuickFix",
                generalDescription: "QuickFix is a service designed to enhance the management of residential service issues. The system facilitates efficient communication between residents and management, allowing users to report and track various maintenance and service requests seamlessly.",
            },
        ],
        details: [
            {
                subtitle: "User Registration and Authentication:",
                description: "Users log in to their accounts securely via Auth0 authentication.",
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
        ],
    };

    return contentData;
};

const AboutPage = () => {
    const contentData = AboutContent();

    return (
        <div>
            <AboutHeader />
            <AboutStructure {...contentData} />
        </div>
    );
};

export default AboutPage;
