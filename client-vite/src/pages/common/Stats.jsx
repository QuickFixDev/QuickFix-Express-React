import { useAuth0 } from '@auth0/auth0-react';
import Graphic from '../../components/graphics/Graphic';
import AccessDenied from '../../components/access/AccessDenied';
import { useAuth } from "../../contexts/AuthContext";

const Stats = () => {
    const { authUser, isLoggedIn } = useAuth();

    if (isLoggedIn && authUser.Role === 'admin' || authUser.Role === 'dev') {
        return (
            <div className="row">
                <div className="list container-fluid p-md-5 p-3">
                    <div className="p-4 mb-4">
                        <h2>Stats</h2>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center shadow-md">
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