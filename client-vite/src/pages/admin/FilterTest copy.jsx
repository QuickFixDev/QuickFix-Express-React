/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const initialSqlQuery = 'SELECT * FROM user_complaints';
const availableFilters = [
  { name: 'User id', key: 'user_id', options: [ 1, 2 ] },
  { name: 'Category ID', key: 'category_id', options: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] },
  { name: 'Status', key: 'status', options: [ 'Open', 'In Progress', 'Closed' ] },
  { name: 'Complaint date', key: 'complaint_date', options: [ '00/00/0000', '00/00/0000', '00/00/0000' ] },
];

const FilterTest = () => {
  const [ selectedFilters, setSelectedFilters ] = useState([]);
  const [ queryResult, setQueryResult ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const fetchQueryResult = async () => {
      setLoading(true);
      try {
        const filterQuery = buildFilterQuery();
        const result = await executeQuery(filterQuery);
        setQueryResult(result);
      } catch (error) {
        console.error('Error executing query:', error);
        setQueryResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQueryResult();
  }, [ selectedFilters ]);

  const executeQuery = async (filterQuery) => {
    const serverUrl = `quickfix-server.azurewebsites.net/filter-test`;
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filterQuery }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  };

  const buildFilterQuery = () => {
    // Build the filter query based on selected filters
    const appliedFilters = selectedFilters.map(filter => `${filter.key} = ${filter.value}`);
    const whereClause = appliedFilters.length > 0 ? `WHERE ${appliedFilters.join(' AND ')}` : '';
    return `${initialSqlQuery} ${whereClause}`;
  };

  const toggleFilter = (filterName, filterValue) => {
    const updatedFilters = [ ...selectedFilters ];
    const filterIndex = updatedFilters.findIndex(filter => filter.name === filterName);

    if (filterValue === '') {
      if (filterIndex !== -1) {
        updatedFilters.splice(filterIndex, 1);
      }
    } else {
      if (filterIndex !== -1) {
        updatedFilters[ filterIndex ].value = filterValue;
      } else {
        const key = availableFilters.find(filter => filter.name === filterName).key;
        updatedFilters.push({ name: filterName, key, value: filterValue });
      }
    }

    setSelectedFilters(updatedFilters);
  };

  return (
    <div className="container mt-5">
      <div className="row">
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

      <div className="card p-3">
        <div className='border-start border-primary border-3 bg-light p-3 my-3'>
          {queryResult ? (
            <div>
              <h2>Query Result</h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                queryResult.length === 0 ? (
                  <p>No data found with the selected filter criteria.</p>
                ) : (
                  <pre>{JSON.stringify(queryResult, null, 2)}</pre>
                )
              )}
            </div>
          ) : (
            loading && <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterTest;
