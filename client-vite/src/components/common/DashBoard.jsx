import { useAuth } from "../../Contexts/AuthContext";
import LoginButton from "./LoginButton";

const Dashboard = () => {
    const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn

    return (
        <>
            <h1> User is {isLoggedIn ? ('loggedIn') : ('loggedOut')} </h1>
            <h1> Username: {isLoggedIn ? (authUser.Name) : (null)} </h1>

            <LoginButton></LoginButton>
        </>
    );
}

export default Dashboard;