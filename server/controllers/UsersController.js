const userController = {};

userController.createUser = (req, res) => {
    const newUser = req.body;

    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    const values = [ newUser.name, newUser.email ];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create user' });
        } else {
            res.status(201).json(result);
        }
    });
};

userController.getAllUsers = (req, res) => {
    const sqlQuery = 'SELECT * FROM users';

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.json(results);
        }
    });
};

userController.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { newName, newEmail } = req.body;

    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    const values = [ newName, newEmail, userId ];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update user' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
    });
};

userController.deleteUser = async (req, res) => {
    const userId = req.params.id;

    const query = 'DELETE FROM users WHERE id = ?';
    const values = [ userId ];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
};

module.exports = userController;