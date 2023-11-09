import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
    const { authUser, isLoggedIn } = useAuth();
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <div className="d-flex justify-content-center w-100 h-50">
                    <img className="rounded-circle" src={user.picture} alt={user.name} />
                </div>
                <div className="d-flex flex-column justify-content-center w-100">
                    <h1>{authUser.FirstName} {authUser.LastName}</h1>
                    <p>{user.email}</p>
                    <p>Residence: {authUser.StreetName} {authUser.HouseNumber}</p>

                </div>

            </div>
        )
    );
};

export default Profile;