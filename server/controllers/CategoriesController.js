const CategoryController = {};
const pool = require('../dbConnection');

CategoryController.createCategory = (req, res) => {
    const formData = req.body;
    const query = `INSERT INTO users SET ?`;

    pool.query(query, formData, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Form submission failed' });
        } else {
            console.log('Form data inserted successfully');
            res.status(200).json({ message: 'Form submitted successfully' });
        }
    });
};

CategoryController.getAllCategories = (req, res) => {
    Category.findAll()
        .then(categories => {
            res.json(categories);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch categories' });
        });
};

CategoryController.updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const updatedCategory = req.body;

    Category.update(updatedCategory, { where: { id: categoryId } })
        .then(result => {
            if (result[ 0 ] === 1) {
                res.json({ message: 'Category updated successfully' });
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to update category' });
        });
};

CategoryController.deleteCategory = (req, res) => {
    const categoryId = req.params.id;

    Category.destroy({ where: { id: categoryId } })
        .then(result => {
            if (result === 1) {
                res.json({ message: 'Category deleted successfully' });
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete category' });
        });
};

module.exports = CategoryController;