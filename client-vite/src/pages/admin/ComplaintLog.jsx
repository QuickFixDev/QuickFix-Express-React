import ComplaintDetail from '../../components/admin/ComplaintDetail'
import Profile from '../../components/common/ProfileComponent'
import ComplaintList from '../../components/common/ComplaintList'
import tentant from '../../contexts/UserContext'
import AccessDenied from '../common/AccessDenied';

const ReportManagement = () => {
    if (tentant.role === "admin" || tentant.role === "dev") {
        return (
            <div className="container-fluid h-100">
                <div className="row h-100">
                    {/* Chat List Column */}
                    <div className="col-md-4 bg-light p-4 overflow-y-auto h-100">
                        <div id="scroll-container" className="scrollbar-hidden" style={{ maxHeight: "700", overflowY: "auto" }}>
                            <ComplaintList />
                        </div>
                    </div>

                    {/* Chat Content Column */}
                    <div className="col-md-8 h-100 p-4">
                        <div className="container d-flex flex-column align-content-center p-xl-5 p-3">
                            <Profile />
                            <ComplaintDetail />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <AccessDenied />
    );
}


export default ReportManagement;