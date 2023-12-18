import { useState } from "react";
import AccessModal from "../modals/AccessModal";

const AccessRequest = ({ count }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleHideModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            {count > 0 ? (
                <>
                    <div onClick={handleShowModal} className="rounded-2 border-start border-success border-5 p-4 cursor-pointer   " style={{ backgroundColor: '#DFF9E7' }}>
                        <div className="row d-flex flex-row align-items-center">
                            <div className="col text-start">
                                <h5 className="fw-bold">New {count === 1 ? 'request' : 'requests'}</h5>
                                <span>
                                    You have {count} new access {count === 1 ? 'request' : 'requests'}
                                </span>
                            </div>
                            <div className="col text-end">
                                <button className="btn btn-success">Manage requests</button>
                            </div>
                        </div>
                    </div>

                    <AccessModal showModal={showModal} handleClose={handleHideModal}/>
                </>
            ) : (
                null
            )
            }
        </div >
    );
};

export default AccessRequest;