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
  const [ filterQuery, setFilterQuery ] = useState(initialSqlQuery);
  const [ queryResult, setQueryResult ] = useState(null);

  const handleQueryExecution = () => {
    const sqlQuery = filterQuery; 
    const serverUrl = "http://localhost:5000/filter-test"; // Update with your actual server URL

    try {
      // Make an HTTP POST request to the server
      fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sqlQuery }),
      })
        .then(response => response.json())
        .then(data => {
          // Update the state with the query result
          setQueryResult(data);
        })
        .catch(error => {
          console.error("Error executing query:", error);
        });
    } catch (error) {
      console.error('Error while executing the query:', error);
    }
  };

  const buildFilterQuery = () => {
    const appliedFilters = selectedFilters.map(filter => `${filter.key} = '${filter.value}'`);
    const whereClause = appliedFilters.length > 0 ? `WHERE ${appliedFilters.join(' AND ')}` : '';
    handleQueryExecution();

    return `${initialSqlQuery} ${whereClause}`;
  };

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
        <div>
          {queryResult && (
            <div>
              <h2>Query Result</h2>
              <pre>{JSON.stringify(queryResult, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterTest;
