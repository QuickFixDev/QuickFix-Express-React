import Graphic from '../../components/admin/Graphic';
import tentant from '../../contexts/UserContext'
import AccessDenied from '../common/AccessDenied';

const Stats = () => {
    if (tentant.role === "admin" || tentant.role === "dev") {
        return (
            <div className="row">

                <div className='container col-xl-6 col-lg-8 col-md-10 col-12 text-center p-lg-5 p-4 mt-5 shadow-md'>
                    <h1>Statistics</h1>
                    <Graphic />
                </div>
            </div>
        );
    }
    return (
        <AccessDenied />
    );
}

export default Stats;