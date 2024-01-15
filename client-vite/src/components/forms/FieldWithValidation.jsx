import React, { useEffect } from "react";
import { FloatingLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const FieldWithValidation = ({ customAs, rows, label, fieldName, register, errors, minLength, pattern, styles }) => {
    useEffect(() => {
        register(fieldName, {
            required: `${label} is required`,
            minLength: {
                value: minLength,
                message: `This field should have at least ${minLength} characters`,
            },
            pattern: {
                value: pattern,
                message: `Invalid ${fieldName} format`,
            },
        });
    }, [register, fieldName, label, minLength, pattern]);

    return (
        <Form.Group controlId={`validationCustom${fieldName}`}>
            <FloatingLabel label={label}>
                <Form.Control
                    className={`${errors[fieldName] && 'is-invalid'}`}
                    type="text"
                    as={customAs}
                    placeholder=""
                    style={styles}
                    {...register(fieldName)}
                />
                <Form.Control.Feedback type="invalid">
                    {errors[fieldName]?.message}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    );
};

export default FieldWithValidation;
