const CategoryController = {};
const pool = require('../dbConnection'); // Import your database connection

CategoryController.createCategory = (req, res) => {
    const newCategory = req.body;

    const query = 'INSERT INTO categories (name) VALUES (?)';
    const values = [ newCategory.name ];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create category' });
        } else {
            res.status(201).json(result);
        }
    });
};

CategoryController.getAllCategories = (req, res) => {
    const sqlQuery = 'SELECT * FROM categories';

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching categories' });
        } else {
            res.json(results);
        }
    });
};

CategoryController.updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const { newCategoryName } = req.body;

    const query = 'UPDATE categories SET name = ? WHERE id = ?';
    const values = [ newCategoryName, categoryId ];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update category' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.json({ message: 'Category updated successfully' });
        }
    });
};

CategoryController.deleteCategory = (req, res) => {
    const categoryId = req.params.id;

    const query = 'DELETE FROM categories WHERE id = ?';
    const values = [ categoryId ];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete category' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.json({ message: 'Category deleted successfully' });
        }
    });
};

module.exports = CategoryController;
