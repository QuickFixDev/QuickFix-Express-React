const user = {
    role: 'resident'
}

function isAdmin(req, res, next) {
    // Check user's role
    if (user && (user.role === 'dev' || user.role === 'admin')) {
        console.log(user.role, "authorized"); // Move this line here
        return next(); // Allow access for admin and dev
    }

    console.log("Access Denied")
    res.status(403).send('Access Denied');
}

function isResident(req, res, next) {
    // Check user's role
    if (user.role === 'resident') {
        console.log(user.role, "authorized");
        return next(); // Allow access for dev and resident
    }   
    
    console.log("Access Denied")
    res.status(403).send('Access Denied'); // Send a response here if access is denied
}

// export both functions
module.exports = {
    isAdmin,
    isResident,
    user
};
