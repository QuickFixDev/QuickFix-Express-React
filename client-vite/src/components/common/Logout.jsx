import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
    const { logout } = useAuth0();

    return <button onClick={() => logout()} className="btn btn-outline-danger">Log out</button>;
};

export default Logout;