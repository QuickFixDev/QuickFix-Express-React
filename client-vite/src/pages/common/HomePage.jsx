/* eslint-disable react/prop-types */

const HomeHeader = () => {
    return (
            <div className="w-100 py-5 text-center my-5">
                <h1 className="main-heading">QuickFix</h1>
            </div>
    );
};

const AboutStructure = ({ general, details }) => {
    return (
        <div className="container-fluid bg-light py-3">
            <div className="container w-75 mt-4 mb-4">
                {general.map((item, index) => (
                    <div className="container" key={index}>
                        <h3 className="mt-4 mb-3">About QuickFix</h3>
                        <p>{item.generalDescription}</p>
                        <h3 className="mt-4 mb-3">Features:</h3>
                    </div>
                ))}
                {details.map((item, index) => (
                    <div className="container" key={index}>
                        <ul>
                            <li>
                                <h6>{item.subtitle}</h6>
                                <p>{item.description}</p>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AboutContent = () => {
    const contentData = {
        general: [
            {
                title: "QuickFix",
                generalDescription: "QuickFix is a comprehensive Resident Services Management System designed to streamline and enhance the management of residential complexes and private residences. The system facilitates efficient communication between residents and management, allowing users to report and track various maintenance and service requests seamlessly.",
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

const HomePage = () => {
    const contentData = AboutContent();

    return (
        <div>
            <HomeHeader />
            <AboutStructure {...contentData} />
        </div>
    );
};

export default HomePage;
