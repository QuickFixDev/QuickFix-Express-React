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
            <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
};

export default Profile;