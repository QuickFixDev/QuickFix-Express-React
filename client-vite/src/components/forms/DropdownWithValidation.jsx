import React, { useEffect } from "react";
import { FloatingLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const DropdownWithValidation = ({ label, fieldName, register, errors, options, value, onChange }) => {
    useEffect(() => {
        register(fieldName, {
            required: `${label} is required`,
        });
    }, [register, fieldName, label]);

    const handleChange = (e) => {
        const { value } = e.target;
        onChange(value);
    };

    return (
        <Form.Group controlId={`validationCustom${fieldName}`}>
            <FloatingLabel label={label}>
                <Form.Control
                    className={`${errors[fieldName] && 'is-invalid'}`}
                    as="select"
                    {...register(fieldName, {
                        required: `${label} is required`,
                    })}
                    value={value}
                    onChange={handleChange}
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