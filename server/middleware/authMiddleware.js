const user = {
    role: 'resident'
}

function isAdmin(req, res, next) {
    // Check user's role
    if (user && (tentant.role === 'dev' || tentant.role === 'admin')) {
        console.log(tentant.role, "authorized"); // Move this line here
        return next(); // Allow access for admin and dev
    }

    console.log("Access Denied")
    res.status(403).send('Access Denied');
}

function isResident(req, res, next) {
    // Check user's role
    if (tentant.role === 'resident') {
        console.log(tentant.role, "authorized");
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
