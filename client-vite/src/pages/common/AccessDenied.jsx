import { faCheck, faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function usePlural(isLoggedIn) {
    return isLoggedIn ? 'Reasons' : 'Reason'
}

function useUserInfo({ isLoggedIn, requiredRole, userRole, hasPaid }) {
    const HasPaid = {
        paidIcon: hasPaid ? faCheckCircle : faXmarkCircle,
        paidIconColor: hasPaid ? 'text-success' : 'text-danger',
        paidMessage: hasPaid ? 'You have paid' : 'You have not paid',
    }

    const IsLoggedIn = {
        loggedInIcon: isLoggedIn ? faCheckCircle : faXmarkCircle,
        loggedInIconColor: isLoggedIn ? 'text-success' : 'text-danger',
        loggedInMessage: isLoggedIn ? 'You are logged in' : 'You are not logged in',
    }

    const RequiredRole = {
        roleIcon: requiredRole.includes(userRole) ? faCheckCircle : faXmarkCircle,
        roleIconColor: requiredRole.includes(userRole) ? 'text-success' : 'text-danger',
        roleMessage: requiredRole.includes(userRole) ? `You have the required permissions` : `You don't have enough permissions`,
    }

    return [HasPaid, IsLoggedIn, RequiredRole]
}

const AccessDenied = ({ isLoggedIn, requiredRole, userRole, hasPaid }) => {
    const [HasPaid, IsLoggedIn, RequiredRole] = useUserInfo({ isLoggedIn, requiredRole, userRole, hasPaid })

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '90vh' }}>
            <div className="row row-cols-1 text-center">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <img src="/svg/RedWarning.svg" alt="warning" width={'100px'} />
                </div>
                <div className="col d-flex flex-column justify-content-center align-items-center py-4">
                    <span className="fw-bold">Access Denied</span>
                    <span>You don't have access to the page you're trying to reach</span>
                </div>

                <div className="col d-flex flex-justify-content-center align-items-center">

                </div>
            </div>
            <div className="row row-cols-2 text-center bg-light col-xl-4 col-lg-5 col-md-6 col-sm-10 py-3 border-start border-3">
                <div className="col-2 text-center">
                    <FontAwesomeIcon icon={IsLoggedIn.loggedInIcon} className={IsLoggedIn.loggedInIconColor}></FontAwesomeIcon>
                </div>
                <div className="col-10 text-start px-0">
                    {IsLoggedIn.loggedInMessage}
                </div>

                {isLoggedIn && (
                    <>
                        <div className="col-2 text-center">
                            <FontAwesomeIcon icon={RequiredRole.roleIcon} className={RequiredRole.roleIconColor}></FontAwesomeIcon>
                        </div>
                        <div className="col-10 text-start px-0">
                            {RequiredRole.roleMessage}
                        </div>

                        <div className="col-2 text-center">
                            <FontAwesomeIcon icon={HasPaid.paidIcon} className={HasPaid.paidIconColor}></FontAwesomeIcon>
                        </div>
                        <div className="col-10 text-start px-0">
                            {HasPaid.paidMessage}
                        </div>
                    </>
                )}
            </div>
            <div className="row row-cols-1 text-center">
                <div className="col d-flex flex-column justify-content-center align-items-center py-4">
                    <span>Do you think it's an error?</span>
                    <a href="">Contact an admin</a>
                </div>
            </div>
        </div>

    );
}

export default AccessDenied;