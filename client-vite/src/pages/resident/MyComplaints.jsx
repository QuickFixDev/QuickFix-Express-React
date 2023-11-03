import { useAuth0 } from "@auth0/auth0-react"
import AccessDenied from '../common/AccessDenied';

const MyComplaints = () => {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return (
            <AccessDenied />
        );
    }

    const email = user.email

    return(
        <p>{email}</p>
    );

}

export default MyComplaints;