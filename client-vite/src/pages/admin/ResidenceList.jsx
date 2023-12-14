import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faHouseCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import AccessDenied from '../common/AccessDenied';
import { useAuth } from '../../contexts/AuthContext';
import ServerUrl from '../../constants/ServerUrl';
import { useEffect, useState } from 'react';
import { useResidences } from '../../hooks/useResidences';


const ResidenceList = () => {
    const { residences, isLoading } = useResidences();

    return (
        <div className="list container-fluid p-md-5 p-3">
            <div className="p-4 mb-4">
                <h2 className='fw-bold'>Available residences</h2>
            </div>
            <div className="row d-flex flex-row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-3 px-4">

                {isLoading ? (
                    <div className="container-fluid p-4 spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (

                    residences.map(residence => (
                        <div key={residence.residence_id} className="col">
                            <div className="container text-center rounded-4 p-3 hover-navlink">
                                {residence.status === 'available' ? (
                                    <div className="street my-3 text-primary">
                                        <FontAwesomeIcon icon={faHouseCircleCheck} size="3x"></FontAwesomeIcon>
                                    </div>
                                ) : (
                                    <div className="street my-3">
                                        <FontAwesomeIcon icon={faHouseCircleExclamation} size="3x"></FontAwesomeIcon>
                                    </div>
                                )}

                                <div className="street my-3 ">
                                    <h5>{residence.street_name} {residence.street_number}</h5>
                                </div>
                                <div className="state my-3">
                                    <p>{residence.status}</p>
                                </div>
                            </div>
                        </div>
                    )))}
            </div>

        </div>
    );
};


const Residences = () => {
    const { authUser, isLoggedIn } = useAuth();


    if (isLoggedIn && authUser.Role === 'resident' || authUser.Role === 'dev') {
        return <ResidenceList />
    } else {
        return (
            <AccessDenied />
        )
    }
}
export default Residences;
