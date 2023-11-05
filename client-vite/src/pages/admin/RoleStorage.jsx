import { useState } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { useAuth0 } from '@auth0/auth0-react';
import AccessDenied from '../common/AccessDenied';

function CreateRole() {
    const { isAuthenticated } = useAuth0();
    const [ formData, setFormData ] = useState({
        role_name: '',
    });
    const [ showModal, setShowModal ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [ name ]: value });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${ServerUrl}/admin/roles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                setShowModal(true); // Show the modal on success
                console.log('Role registered:', data);
            })
            .catch((error) => {
                setShowModal(true); // Show the modal on error
                console.error('Error registering role:', error);
            });
    };

    if (!isAuthenticated) {
        return <AccessDenied></AccessDenied>;
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center h-100 p-0">
            <div className="container shadow-md p-lg-5 p-md-3 p-1 col-xl-6 col-lg-10 col-12">
                <form onSubmit={handleSubmit} className="container mt-4">
                    <h1 className="pb-4 text-center">Create new role</h1>

                    <div className="form-group">
                        <label className="my-2" htmlFor="role_name">
                            Role name
                        </label>
                        <input
                            type="text"
                            name="role_name"
                            value={formData.role_name}
                            onChange={handleChange}
                            className="form-control bg-light"
                            id="role_name"
                        />
                    </div>

                    <button type="submit" className="w-100 my-4 btn btn-primary">
                        Submit
                    </button>
                </form>

                <div
                    className={`w-100 gray-overlay modal fade ${showModal ? 'show' : ''}`}
                    tabIndex="-1"
                    role="dialog"
                    style={showModal ? { display: 'block' } : {}}
                >
                    <div className="h-75 modal-dialog modal-dialog-centered" role="document">
                        <div className="p-3 modal-content p-2">
                            <div className={`modal-body`}>
                                {formData.role_name ? (
                                    <>
                                        <div className="alert alert-primary">
                                            <h4>Role registered successfully</h4>
                                            <p>New system role: {formData.role_name}</p>

                                        </div>
                                        <button
                                            type="button"
                                            className="w-100 btn btn-primary mt-3"
                                            data-dismiss="modal"
                                            onClick={handleCloseModal}
                                        >
                                            Close
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="alert alert-danger">
                                            <h4>Error registering role</h4>
                                            <p>No name provided</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="w-100 btn btn-danger mt-3"
                                            data-dismiss="modal"
                                            onClick={handleCloseModal}
                                        >
                                            Close
                                        </button>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateRole;
