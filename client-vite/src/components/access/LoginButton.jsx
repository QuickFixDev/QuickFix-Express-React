import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout";
import Login from "./Login";


const LoginButton = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    return (
        isAuthenticated ? <Logout /> : <Login />
    );


}

export default LoginButton;