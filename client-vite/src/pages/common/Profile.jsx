import ProfileComponent from '../../components/common/ProfileComponent';
import AccessDenied from '../../components/access/AccessDenied';
import { useAuth } from "../../contexts/AuthContext";
import { useAuth0 } from '@auth0/auth0-react';
import { useResidences } from '../../hooks/useResidences';

const Profile = () => {
  const { authUser } = useAuth()
  const { user } = useAuth0()
  const { residences, isLoading: residencesLoading } = useResidences({ tenant_id: authUser.Id })

  const residence = residences[0]

  return (
    <>
      <div className="container d-flex flex-row justify-content-center align-items-center h-90-vh">
        <div className="row text-center row-cols-1">
          <div className="col">
            <img className='rounded-full' src={user.picture} alt="" style={{ width: '200px' }} />
          </div>
          <div className="col mt-4">
            <h4 className='mt-1 fw-bold'>
              {authUser.FirstName} {authUser.LastName}
            </h4>
          </div>
          <div className="col mt-1 text-size-14">
            {authUser.Email}
          </div>  
          {!residencesLoading && (
            <div className="col mt-1 text-size-14">
              {residence.street_name} No. {residence.street_number}
            </div>
          )}
        </div>
      </div>
    </>
  )

};

export default Profile;