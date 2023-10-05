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
        <div className="row justify-content-center align-items-center">
            <div className="col-md-4 text-center">
                <img src={user.profile_photo} alt="User Profile" className="img-fluid rounded-circle m-3" width="100px" />
            </div>
            <div className="col-md-8">
                <h2>{user.first_name} {user.last_name}</h2>
                <p>House Number: {user.house_number}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    );
}

export default Profile;