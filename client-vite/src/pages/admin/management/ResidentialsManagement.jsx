import { useState } from "react";
import IconInfo from "../../../components/icons/IconInfo";
import { useResidentials } from "../../../hooks/useResidentials";
import { useUsers } from "../../../hooks/useUsers";
import EditResidentialModal from "../../../components/modals/EditResidentialModal";
import CreateResidentialModal from "../../../components/modals/CreateResidentialModal";
import { Button } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [showCreateResidentialModal, setShowCreateResidentialModal] = useState(false)

    const handleShowCreateResidentialModal = () => {
        setShowCreateResidentialModal(true)
    }

    const handleHideCreateResidentialModal = () => {
        setShowCreateResidentialModal(false)
    }

    return (
        <>
            <div className="row d-flex flex-row align-items-center">
                <div className="col-auto text-start">
                    <h2 className="m-0">Residentials manager</h2>
                </div>
                <div className="col text-start">
                    <IconInfo
                        message=
                        {
                            "Click on a residential to manage its data."
                        }
                    />
                </div>
                <div className="col text-end">
                    <button onClick={() => handleShowCreateResidentialModal()} className="btn btn-primary">
                        <div className="row">
                            <div className="col-auto">New</div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faHome} />
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <CreateResidentialModal showModal={showCreateResidentialModal} handleCancel={() => handleHideCreateResidentialModal()} />
        </>
    );
}

const ResidentialListHeader = () => {
    return (
        <div className="row py-2">
            <div className="col fw-bold">Name</div>
            <div className="col fw-bold">Country</div>
            <div className="col fw-bold">State</div>
            <div className="col fw-bold">City</div>
        </div>
    );
}

const ResidentialItem = ({ name, country, state, city }) => {
    return (
        <div className="row py-3 cursor-pointer custom-gray-hover border-top">
            <div className="col">{name}</div>
            <div className="col">{country}</div>
            <div className="col">{state}</div>
            <div className="col">{city}</div>
        </div>
    );
}

const ResidentialManagement = () => {
    const { residentials, isLoading: residentialsLoading } = useResidentials()
    const { users } = useUsers()
    const [showEditResidentialModal, setShowEditResidentialModal] = useState(false)
    const [residentialToEdit, setResidentialToEdit] = useState({})

    const handleShowEditResidentialModal = (residential) => {
        setShowEditResidentialModal(true)
        setResidentialToEdit(residential)
    }

    const handleHideEditResidentialModal = () => {
        setShowEditResidentialModal(false)
        setResidentialToEdit({})
    }

    return (
        <div className="p-5">
            <Header />

            <div className="mt-4" id="table">
                <ResidentialListHeader />

                {residentialsLoading ? (
                    <span>loading..</span>
                ) : (
                    residentials.map((residential) => (
                        <div key={residential.residential_id} onClick={() => handleShowEditResidentialModal(residential)}>
                            <ResidentialItem name={residential.residential_name} country={residential.country} state={residential.state} city={residential.city} />
                        </div>
                    ))
                )}

            </div>

            <EditResidentialModal showModal={showEditResidentialModal} handleCancel={() => handleHideEditResidentialModal()} residential={residentialToEdit} />
        </div>
    )
}

export default ResidentialManagement;