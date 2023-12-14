import ProfileComponent from '../../components/common/ProfileComponent';
import AccessDenied from './AccessDenied';
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn
  if (isLoggedIn) {
    return (
      <div className='container-fluid d-flex justify-content-center align-items-center'>
        <ProfileComponent />
      </div>
    );
  } else {
    return <AccessDenied />
  }

  };

  export default Profile;
