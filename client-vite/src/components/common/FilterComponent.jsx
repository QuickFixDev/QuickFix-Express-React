import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BiFilter } from 'react-icons/bi';

const FilterComponent = ({ options, onSelectFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleSelect = (selectedOption) => {
    setSelectedFilter(selectedOption);
    onSelectFilter(selectedOption);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle className='p-3' variant="light" id="filter-dropdown">
        <BiFilter size={20} style={{ marginRight: '5px' }} /> {selectedFilter}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="All">All</Dropdown.Item>
        {options.map((option) => (
          <Dropdown.Item key={option} eventKey={option}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterComponent;
