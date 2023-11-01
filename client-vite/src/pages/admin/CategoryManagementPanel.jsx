/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function CategoryList({ categories, setSelectedCategory, deleteCategory }) {
    return (
        <div className="category-list card border-0 shadow-md p-3">
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <h3>Category List</h3>
                <button className="btn btn-primary mb-3">
                    <Link className="text-white text-decoration-none" to="/category-storage">
                        <FontAwesomeIcon icon={faPlus} /> Create New Category
                    </Link>
                </button>
            </div>
            <div className="card-body">
                <ul className="list-group mt-3">
                    {categories.map((category) => (
                        <li key={category.category_id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <span className="me-3">{category.name}</span>
                                <span className="badge bg-secondary">{category.description}</span>
                            </div>
                            <div>
                                <button
                                    className="btn btn-outline-primary me-2"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => deleteCategory(category.category_id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function CategoryDetails({ category }) {
    return (
        <div className="category-details card border-0 shadow-md p-3">
            <div className="card-header bg-white border-0">
                <h3>Category Details</h3>
            </div>
            <div className="card-body">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name_input" value={category.name} />
                    <label htmlFor="name_input">Category Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="description_input" value={category.description} />
                    <label htmlFor="description_input">Description</label>
                </div>

                <div className="button-group">
                    <div className="d-flex flex-column my-3">
                        <button className="btn btn-primary my-1">Save Changes</button>
                        <button className="btn btn-outline-primary my-1">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CategoryManagementPanel() {
    const [ categories, setCategories ] = useState([]);
    const [ selectedCategory, setSelectedCategory ] = useState(null);

    useEffect(() => {
        fetch(`${ServerUrl}/category-management`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const deleteCategory = (categoryId) => {
        fetch(`${ServerUrl}/delete-category/${categoryId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(`HTTP error! Status: ${response.status}`);
                }
                const updatedCategories = categories.filter((category) => category.category_id !== categoryId);
                setCategories(updatedCategories);
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-6">
                    <CategoryList categories={categories} setSelectedCategory={setSelectedCategory} deleteCategory={deleteCategory} />
                </div>
                <div className="col-lg-6">
                    {selectedCategory && <CategoryDetails category={selectedCategory} />}
                </div>
            </div>
        </div>
    );
}

export default CategoryManagementPanel;
