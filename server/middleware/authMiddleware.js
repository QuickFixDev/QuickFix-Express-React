const user = {
    role: 'resident'
}

function isAdmin(req, res, next) {
    // Check user's role
    if (user && (tentant.role === 'dev' || tentant.role === 'admin')) {
        console.log(tentant.role, "authorized");
        return next(); // Allow access for admin and dev
    }

    console.log("Access Denied")
    res.status(403).send('Access Denied');
}

function isResident(req, res, next) {
    if (tentant.role === 'resident') {
        console.log(tentant.role, "authorized");
        return next();
    }   
    
    console.log("Access Denied")
    res.status(403).send('Access Denied'); // Send a response if access is denied
}

module.exports = {
    isAdmin,
    isResident,
    user
};
