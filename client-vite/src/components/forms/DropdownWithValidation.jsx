import React, { useEffect } from "react";
import { FloatingLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const DropdownWithValidation = ({ label, fieldName, register, errors, options }) => {
    useEffect(() => {
        register(fieldName, {
            required: `${label} is required`,
        });
    }, [register, fieldName, label]);

    return (
        <Form.Group controlId={`validationCustom${fieldName}`}>
            <FloatingLabel label={label}>
                <Form.Control
                    className={`${errors[fieldName] && 'is-invalid'}`}
                    as="select"
                    {...register(fieldName, {
                        required: `${label} is required`,
                    })}
                >
                    <option value="">Select</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.value}
                        </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors[fieldName]?.message}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    );
};

export default DropdownWithValidation;