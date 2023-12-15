import Graphic from '../../components/graphics/Graphic'
import { useAuth } from '../../contexts/AuthContext';
import { Table } from 'react-bootstrap';
import { useComplaints } from "../../hooks/useComplaints";
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminPanel = () => {
    const { authUser } = useAuth();
    const { complaints, isLoading: complaintsLoading } = useComplaints();

    return (
        <div className="container-fluid px-lg-5 px-1">
            <div className="row">
                <h2 className="fw-bold py-5 px-4">Welcome {authUser.FirstName}</h2>
            </div>
            {complaintsLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="row row-cols-lg-2 row-cols-1">
                    <div className="col order-lg-1 order-2">
                        <div className="h-100 rounded-3 shadow-sm p-3">

                            <Table className='table-hover'>
                                <thead>
                                    <tr>
                                        <th>New complaints</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.map((complaint) => (
                                        <tr key={complaint.id}>
                                            <td>
                                                <span className='d-block fw-bold'>
                                                    {complaint.title}
                                                </span>
                                                <span className='d-block '>
                                                    {complaint.description}
                                                </span>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        </div>
                    </div>
                    <div className="col order-lg-2 order-1 p-1">
                        <div className="rounded-3 shadow-sm">
                            <div className="row">
                                <div className="col">
                                    <Graphic></Graphic>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminPanel;