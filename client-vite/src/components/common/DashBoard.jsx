    import { useAuth } from "../../Contexts/AuthContext";

    const Dashboard = () => {
        const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

        const logIn = (e) => {
            e.preventDefault();
            setIsLoggedIn(true);
            setAuthUser({
                Name: 'John Doe'
            })
        }

        const logOut = (e) => {
            e.preventDefault();
            setIsLoggedIn(false);
            setAuthUser(null);
        }

        return (
            <>
                <h1> User is {isLoggedIn ? ('loggedIn') : ('loggedOut')} </h1>
                <h1> Username: {isLoggedIn ? (authUser.Name) : (null)} </h1>

                {!isLoggedIn ?
                    (<button onClick={(e) => { logIn(e) }}>Log in</button>)
                    :
                    (<button onClick={(e) => { logOut(e) }}>Log Out</button>)
                }


            </>
        );
    }

    export default Dashboard;