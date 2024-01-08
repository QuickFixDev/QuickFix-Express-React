import { Button, Modal } from "antd"
import { useComplaintsHistory } from "../../hooks/useComplaintsHistory"
import { Steps } from 'antd';
import { useComplaintStatuses } from "../../hooks/useComplaintStatuses";
import { useCategories } from "../../hooks/useCategories";
import { Form, FloatingLabel } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import ServerUrl from "../../constants/ServerUrl";

const CreateComplaintModal = ({ showModal, handleCancel }) => {
    const { authUser } = useAuth()
    const { categories } = useCategories()

    const [formData, setFormData] = useState({
        user_id: authUser.Id,
        category_id: 0,
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${ServerUrl}/user/complaints/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Complaint registered:', data);
            })
            .catch((error) => console.error('Error registering user:', error));
    };

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        setFormData({ ...formData, submitted_date: formattedDate });
    }, []);

    return (
        <>
            <Modal width={1000} centered title="Create a new report" open={showModal} onCancel={handleCancel} footer={[<Button onClick={handleSubmit} key="submit">Submit</Button>]}>
                <div className="mt-4">

                    <FloatingLabel controlId="first_name" label="Title">
                        <Form.Control className="my-2" name='title' type="text" onChange={handleChange} value={formData.title}/>
                    </FloatingLabel>

                    <FloatingLabel controlId="first_name" label="Description">
                        <Form.Control className="my-2" name='description' as="textarea" rows={5} onChange={handleChange} value={formData.description}/>
                    </FloatingLabel>

                    <FloatingLabel controlId="first_name" label="Category">
                        <Form.Control className="my-2" name="category_id" as="select" onChange={handleChange} value={formData.category_id}>
                            <option value="">Select</option>
                            {categories.map((category) => (
                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                            ))}
                        </Form.Control>
                    </FloatingLabel>

                </div>
            </Modal>
        </>
    )
}

export default CreateComplaintModal