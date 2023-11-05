import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    console.log(useAuth0());

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    console.log(user, isAuthenticated);

    return (
        isAuthenticated && (
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <div className="d-flex justify-content-center w-100 py-4">
                    <img className="rounded-circle" src={user.picture} alt={user.name} />
                </div>
                <div className="d-flex justify-content-center w-100 py-4">
                    <h2>{user.name}</h2>
                </div>
                <div className="d-flex justify-content-center w-100 py-4">
                    <p>{user.email}</p>
                </div>
            </div>
        )
    );
};

export default Profile;