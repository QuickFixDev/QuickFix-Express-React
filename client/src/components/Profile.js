import React from 'react';

const user = {
    first_name: 'First',
    last_name: 'Last',
    house_number: '123',
    email: 'email@example.com',
    profile_photo: './images/QuickFix_logo.png'
}

const Profile = () => {
    return (
        <div className="row">
            <div className="col">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={user.profile_photo} alt="User Profile" className="rounded-circle m-3" width="100px" />
                    <h2>{user.first_name} {user.last_name}</h2>
                    <p>Email: {user.email}</p>
                    <p>House Number: {user.house_number}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;