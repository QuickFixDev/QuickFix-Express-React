import React from "react";
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FieldWithValidation from "../../components/forms/FieldWithValidation";

const TestForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
                <FieldWithValidation label="first name" fieldName="firstName" register={register} errors={errors} minLength={3} />
                <FieldWithValidation label="last name" fieldName="lastName" register={register} errors={errors} minLength={3} />
                <FieldWithValidation label="email" fieldName="email" register={register} errors={errors} minLength={3} />
            </Row>
            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default TestForm;