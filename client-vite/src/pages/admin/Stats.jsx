import { useAuth0 } from '@auth0/auth0-react';
import Graphic from '../../components/admin/Graphic';
import AccessDenied from '../common/AccessDenied';
import { useAuth } from "../../contexts/AuthContext";

const Stats = () => {
    const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn

    if (isLoggedIn && authUser.Role === 'admin' || authUser.Role === 'dev' || authUser.Role === 'test') {
        return (
            <div className="row">

                <div className='container p-lg-5 p-md-4 p-2 mt-md-5 mt-0'>
                    <div className="p-4 mb-4">
                        <h1>Stats</h1>
                    </div>
                    <div className="border rounded-3">
                        <Graphic />
                    </div>
                </div>
            </div>
        );
    } else {
        return <AccessDenied />
    }


}

export default Stats;
