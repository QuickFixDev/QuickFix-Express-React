import Graphic from '../../components/graphics/Graphic'
import { useAuth } from '../../contexts/AuthContext';
import { Table } from 'react-bootstrap';
import { useComplaints } from "../../hooks/useComplaints";

const EmployeePanel = () => {
    const { authUser } = useAuth();
    const { complaints, loading } = useComplaints();

    return (
        <div className="container-fluid px-md-5 px-1">
            <div className="row">
                <h2 className="fw-bold py-5 px-4">Complaints assigned to you</h2>
            </div>
            <div aria-label='table'>

                <div className="row py-2 text-secondary" aria-label='header'>
                    <div className="col-6">Name</div>
                    <div className="col-3">Assigned by</div>
                    <div className="col-3">Status</div>
                </div>

                <div className="row py-2 border-top" aria-label=''>
                    <div className="col-6 fw-bold">text</div>
                    <div className="col-3">text</div>
                    <div className="col-3">text</div>
                </div>

                <div className="row py-2 border-top" aria-label=''>
                    <div className="col-6 fw-bold">text</div>
                    <div className="col-3">text</div>
                    <div className="col-3">text</div>
                </div>

            </div>
        </div>
    )
}

export default EmployeePanel;