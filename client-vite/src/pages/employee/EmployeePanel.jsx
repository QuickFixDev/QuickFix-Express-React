import Graphic from '../../components/admin/Graphic'
import { useAuth } from '../../contexts/AuthContext';
import { Table } from 'react-bootstrap';
import { useComplaints } from "../../hooks/useComplaints";

const EmployeePanel = () => {
    const { authUser } = useAuth();
    const {complaints, loading} = useComplaints();

    return (
        <div className="container-fluid px-md-5 px-1">
            <div className="row">
                <h2 className="fw-bold py-5 px-4">Assigned complaints{authUser.FirstName}</h2>
            </div>
            <div className="row">
                <div className="col order-md-1 order-2">
                    <div className="h-100 rounded-3 shadow-sm p-3">

                        <Table className='table-hover'>
                            <thead>
                                <tr>
                                    <th>Assigned complaints</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.map ((complaint) => (
                                    <tr key={complaint.complaint_id}>
                                        <td>{complaint.complaint_title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeePanel;