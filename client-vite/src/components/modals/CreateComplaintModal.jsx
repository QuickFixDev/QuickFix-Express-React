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
    const { reset, control, register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm();

    const { Id: user_id } = authUser;

    useEffect(() => {
        if (categories) {
            const newArray = sanitizeArray({ array: categories, arrayId: 'category_id', arrayValue: 'category_name' });
            setSanitizedArray(newArray);
        }
    }, [categories]);

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    }, []);

    const onSubmit = (data) => {
        const newData = {
            ...data, user_id
        }
        console.log(newData)
        fetch(`${ServerUrl}/user/complaints/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Complaint registered:', data);
                onClose();
            })
            .catch((error) => console.error('Error registering user:', error));
    };

    const handleError = (error) => {
        console.log('handler error: ', error)
    }

    const okButtonProps = {
        disabled: !(isValid && isDirty)

    }

    console.log('isValid: ', isValid, 'isDirty: ', isDirty)

    return (
        <Modal
            width={1000}
            centered
            title="Create a new report"
            open={showModal}
            onCancel={handleCancel}
            okButtonProps={okButtonProps}
            afterClose={reset}
            // footer={[<Button type="primary" key="submit">Submit</Button>]}
            // footer={null}
            onOk={handleSubmit(onSubmit, handleError)}
        >
            {/* <form onSubmit={handleSubmit(onSubmit, handleError)}> */}

            <div className="mt-4">
                <div className="row mt-2">
                    <FieldWithValidation
                        label="Title"
                        fieldName="title"
                        register={register}
                        errors={errors}
                        minLength={3}
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
                        options={sanitizedArray}
                    />
                </div>
            </div>
            {/* <button disabled={!okButtonProps} type="submit" className="btn btn-primary mt-2">submit2</button> */}
            {/* </form> */}
        </Modal>




    );
};

export default CreateComplaintForm;