import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faHouseCircleExclamation } from '@fortawesome/free-solid-svg-icons';


const Residences = () => {
    return (
        <div className="list container-fluid p-md-5 p-3">
            <div className="row d-flex flex-row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1  g-3">
                <div className="col">
                    <div className="container bg-light text-center rounded-4 p-3">
                        <div className="street my-3 text-primary">
                            <FontAwesomeIcon icon={faHouseCircleCheck} size="3x"></FontAwesomeIcon>
                        </div>
                        <div className="street my-3 ">
                            <h2>Street 123</h2>
                        </div>
                        <div className="owner my-3">
                            <p>John Doe</p>
                        </div>
                        <div className="state my-3">
                            <p>occupied</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="container bg-light text-center rounded-4 p-3">
                        <div className="street my-3">
                            <FontAwesomeIcon icon={faHouseCircleExclamation} size="3x"></FontAwesomeIcon>
                        </div>
                        <div className="street my-3 ">
                            <h2>Street 123</h2> {/* Apply margin bottom */}
                        </div>
                        <div className="owner my-3">
                            <p>No resident</p> {/* Apply margin bottom */}
                        </div>
                        <div className="state my-3">
                            <p>free</p> {/* Apply margin bottom */}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="container bg-light text-center rounded-4 p-3">
                        <div className="street my-3 text-primary">
                            <FontAwesomeIcon icon={faHouseCircleCheck} size="3x"></FontAwesomeIcon>
                        </div>
                        <div className="street my-3 ">
                            <h2>Street 123</h2>
                        </div>
                        <div className="owner my-3">
                            <p>John Doe</p>
                        </div>
                        <div className="state my-3">
                            <p>occupied</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="container bg-light text-center rounded-4 p-3">
                        <div className="street my-3">
                            <FontAwesomeIcon icon={faHouseCircleExclamation} size="3x"></FontAwesomeIcon>
                        </div>
                        <div className="street my-3 ">
                            <h2>Street 123</h2> {/* Apply margin bottom */}
                        </div>
                        <div className="owner my-3">
                            <p>No resident</p> {/* Apply margin bottom */}
                        </div>
                        <div className="state my-3">
                            <p>free</p> {/* Apply margin bottom */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Residences;
