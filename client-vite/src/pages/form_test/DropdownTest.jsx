// ReusableDropdown.js
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import sanitizeArray from '../../functions/sanitizeArray';

const ReusableDropdown = ({ title, items, onSelect }) => {
    return (
        <Dropdown onSelect={onSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {items.map((item, index) => (
                    <Dropdown.Item key={item.id} eventKey={item.id}>
                        {item.value}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

const returningItem = () => {
    const array = [
        {
            arrayId: 1,
            arrayText: 'abc'
        },
        {
            arrayId: 2,
            arrayText: 'abaaac'
        },
        {
            arrayId: 3,
            arrayText: 'absbc'
        },
    ]

    const sanitizedArray = sanitizeArray({ array, arrayId: 'arrayId', arrayValue: 'arrayText' });

    return (
        <ReusableDropdown items={sanitizedArray} />
    )
}
export default returningItem;
