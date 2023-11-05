import { useAuth0 } from '@auth0/auth0-react';
import Graphic from '../../components/admin/Graphic';
import tentant from '../../contexts/UserContext'
import AccessDenied from '../common/AccessDenied';

const Stats = () => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        if (tentant.role === "admin" || tentant.role === "dev") {
            return (
                <div className="row">

                    <div className='container col-xl-6 col-lg-8 col-md-10 col-12 text-center p-lg-5 p-4 mt-md-5 mt-0 shadow-md'>
                        <h1 className='py-4'>Statistics</h1>
                        <Graphic />
                    </div>
                </div>
            );
        }
    }

    return (
        <AccessDenied />
    );
}

export default Stats;
