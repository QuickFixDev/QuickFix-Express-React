import { useState } from 'react';

const initialSqlQuery = 'SELECT * FROM user_complaints';
const availableFilters = [
  { name: 'User id', key: 'user_id', options: [ '1', '2', '3' ] },
  { name: 'Complaint Category', key: 'complain_category', options: [ 'Water', 'Electricity', 'Security' ] },
  { name: 'Role', key: 'role', options: [ 'Resident', 'Staff', 'Admin' ] },
  { name: 'Complaint date', key: 'complaint_date', options: [ '00/00/0000', '00/00/0000', '00/00/0000' ] }
];

const FilterTest = () => {
  const [ selectedFilters, setSelectedFilters ] = useState([]);

  const buildFilterQuery = () => {
    const appliedFilters = selectedFilters.map(filter => `${filter.key} = '${filter.value}'`);
    const whereClause = appliedFilters.length > 0 ? `WHERE ${appliedFilters.join(' AND ')}` : '';

    return `${initialSqlQuery} ${whereClause}`;
  };

  const [ filterQuery, setFilterQuery ] = useState(buildFilterQuery());

  const toggleFilter = (filterName, filterValue) => {
    const filterIndex = selectedFilters.findIndex(filter => filter.name === filterName);

    if (filterValue === '') {
      // Remove the filter if the value is empty
      if (filterIndex !== -1) {
        selectedFilters.splice(filterIndex, 1);
      }
    } else {
      if (filterIndex !== -1) {
        // If the filter is already selected, update the value
        selectedFilters[ filterIndex ].value = filterValue;
      } else {
        // Otherwise, add a new filter
        const key = availableFilters.find(filter => filter.name === filterName).key;
        selectedFilters.push({ name: filterName, key, value: filterValue });
      }
    }

    setSelectedFilters([ ...selectedFilters ]);
    setFilterQuery(buildFilterQuery());
  };

  return (
    <div className="container mt-5">
      <div className="card p-3">
        <div className='border-start border-primary border-3 bg-light p-3 my-3'>

          <p>{filterQuery}</p>
        </div>
        <div className='row'>
          {availableFilters.map((filter, index) => (
            <div key={index} className="form-group col">
              <label>{filter.name}:</label>
              <select
                className="form-control"
                onChange={(e) => toggleFilter(filter.name, e.target.value)}
                value={selectedFilters.find(selectedFilter => selectedFilter.name === filter.name)?.value || ''}
              >
                <option value="">Select</option>
                {filter.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterTest;
