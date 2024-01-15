import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Modal, Button } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useCategories } from "../../hooks/useCategories";
import ServerUrl from "../../constants/ServerUrl";
import FieldWithValidation from "../../components/forms/FieldWithValidation";
import DropdownWithValidation from "../forms/DropdownWithValidation";
import sanitizeArray from "../../functions/sanitizeArray";

const CreateComplaintForm = ({ handleCancel, showModal, onClose }) => {
    const { authUser } = useAuth();
    const { categories } = useCategories();
    const [sanitizedArray, setSanitizedArray] = useState([]);
    const { control, register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm();

    useEffect(() => {
        if (categories) {
            const newArray = sanitizeArray({ array: categories, arrayId: 'category_id', arrayValue: 'category_name' });
            setSanitizedArray(newArray);
        }
    }, [categories]);


    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        setFormData((prevFormData) => ({ ...prevFormData, submitted_date: formattedDate }));
    }, []);

    const onSubmit = (data) => {
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
                onClose();
            })
            .catch((error) => console.error('Error registering user:', error));
    };

    // useEffect(() => {
    //     const currentDate = new Date();
    //     const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    //     setFormData({ ...formData, submitted_date: formattedDate });
    // }, []);


    const handleError = (error) => {

    }

    const okButtonProps = {
        disabled = isValid || isDirty
    }

    return (
        <Modal
            width={1000}
            centered
            title="Create a new report"
            open={showModal}
            onCancel={handleCancel}
            okButtonProps={okButtonProps}
            footer={[<Button type="submit">Submit</Button>]}
        >
            <form onSubmit={handleSubmit(onSubmit, handleError)}>

                <div className="mt-4">
                    <pre>
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                    <div className="row mt-2">
                        <FieldWithValidation
                            label="Title"
                            fieldName="title"
                            register={register}
                            errors={errors}
                            minLength={3}
                            value={formData.title}
                            onChange={(value) => setFormData({ ...formData, title: value })}
                        />
                    </div>
                    <div className="row mt-2">
                        <FieldWithValidation
                            label="Description"
                            fieldName="description"
                            register={register}
                            errors={errors}
                            minLength={50}
                            customAs="textarea"
                            rows={5}
                            value={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            styles={{
                                height: '150px'
                            }}
                        />
                    </div>
                    <div className="row mt-2">
                        <DropdownWithValidation
                            label="Category"
                            fieldName="category_id"
                            register={register}
                            errors={errors}
                            customAs='select'
                            value={formData.category_id}
                            options={sanitizedArray}
                            onChange={(value) => setFormData({ ...formData, category_id: value })}
                        />
                    </div>
                </div>
            </form>
        </Modal>




    );
};

export default CreateComplaintForm;