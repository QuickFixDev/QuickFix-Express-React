userController = {};

userController.createUser = (req, res) => {
    const newUser = req.body;

    user.createUser(newUser)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create user' });
        });
};

userController.getAllUsers = (req, res) => {
    User.findAll()
        .then(items => {
            res.json(items);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        });
};

userController.updateUser = (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    User.update(updatedUser, { where: { id: userId } })
        .then(result => {
            if (result[ 0 ] === 1) {
                res.json({ message: 'User updated successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to update user' });
        });
};

userController.deleteUser = (res, res) => {
    const userId = req.params.id;

    User.destroy({ where: { id: userId } }) // Using Sequelize or your preferred ORM
        .then(result => {
            if (result === 1) {
                res.json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user' });
        });
};

module.exports = userController;