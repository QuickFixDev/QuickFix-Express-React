import ProfileComponent from '../../components/common/ProfileComponent';
import AccessDenied from './AccessDenied';
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { authUser, isLoggedIn } = useAuth(); // Remove setAuthUser and setIsLoggedIn
console.log(isLoggedIn)
  if (isLoggedIn) {
    return (
      <div className='container-fluid h-100 align d-flex justify-content-center align-items-center'>
        <ProfileComponent />
      </div>
    );
  } else {
    return <AccessDenied />
  }

  };

  export default Profile;
