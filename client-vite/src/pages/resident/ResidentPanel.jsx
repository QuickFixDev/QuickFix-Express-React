import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ResidentPanel = () => {
  const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn

  return (
    <div className="list container-fluid p-md-5 p-3">
      <div className="p-4 mb-4 text-center">
        <h1>Welcome {authUser.FirstName}!</h1>
        <span>How can we assist you today?</span>
      </div>
      <div className="row d-flex flex-row row-cols-1  g-3">
        <div className="col">
          <button className="btn btn-outline-primary rounded-4 p-4 w-100">
            <span className="">Search for Avaiable properties</span>
          </button>
        </div>
        <div className="col">
          <Link to="/user/complaints/new">
            <button className="btn btn-outline-primary rounded-4 p-4 w-100">
              <span className="">Submit a new report</span>
            </button>
          </Link>
        </div>
        <div className="col">
          <Link to={`/user/complaints`}>
            <button className="btn btn-outline-primary rounded-4 p-4 w-100">
              <span className="">View previous reports</span>
            </button>
          </Link>
        </div>

      </div>

    </div>
  );

};

export default ResidentPanel;
