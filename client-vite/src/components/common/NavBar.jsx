import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../access/LoginButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom';

function TopNavBar() {
    const { authUser, isLoggedIn } = useAuth();
    const { user, isAuthenticated } = useAuth0();

    // console.log('actions', import.meta.env.VITE_REACT_APP_GITHUB_ACTIONS)

    return (
        <nav className="container-fluid bg-dark">
            <div className="row py-3">
                <div className="d-flex col justify-content-start align-items-center">
                    <img src="/svg/QuickFixWhite.svg" alt="System Photo" className="user-photo mx-3" width={'50px'} />

                    <span className="nav-link text-white user-username d-sm-block d-none">
                        Quickfix
                    </span>

                </div>
                <div className="d-flex col justify-content-end align-items-center">

                    {isAuthenticated ? (
                        <>
                            <Link to={'/notification-panel'} className='text-white px-md-3'>
                                <FontAwesomeIcon icon={faBell} className='px-2' />
                                <span className='badge bg-danger p-2'>
                                    123
                                </span>
                            </Link>

                            <div className="d-flex flex-column align-items-end px-md-3 px-2">
                                <span className="text-white d-none d-md-block text-white user-username fw-bold">{user.name}</span>
                                <span className="text-white d-none d-md-block text-white user-email ">{user.email}</span>
                            </div>
                            {/* <div className='px-md-3 px-2 d-none d-sm-block text-white'>
                                <img src={user.picture} alt="User Photo" className="user-photo" width={'50px'} />
                            </div> */}

                            <div className="px-md-3 px-2 d-md-block d-none" >
                                <LoginButton />
                            </div>
                        </>

                    ) : (
                        <div className="me-3 d-md-block d-none" >
                            <LoginButton />
                        </div>
                    )}

                </div>
            </div>
        </nav >
    );
}

export default TopNavBar;
