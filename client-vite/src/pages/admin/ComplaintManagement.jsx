import { useState, useEffect } from 'react';

const initialSqlQuery = 'SELECT * FROM user_complaints';
const availableFilters = [
    { name: 'User id', key: 'user_id', options: [ 1, 2 ] },
    { name: 'Category ID', key: 'category_id', options: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] },
];

const FilterTest = () => {
    const [ selectedFilters, setSelectedFilters ] = useState([]);
    const [ queryResult, setQueryResult ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ selectedComplaint, setSelectedComplaint ] = useState(null);

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
        const serverUrl = "http://localhost:5000/filter-test";
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filterQuery }),
        });
        if (!response.ok) {
            throw Error(`Error: ${response.status}`);
        }
        return response.json();
    };

    const buildFilterQuery = () => {
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

    const selectComplaint = (complaint) => {
        setSelectedComplaint(complaint);
    };

    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-md-5 bg-light p-4" style={{ height: '100vh' }}>
                    <div className="filters">
                        <h3>Filters</h3>
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

                    <div className='bg-light my-3 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        <h3>Complains</h3>
                        {queryResult ? (
                            <div>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    queryResult.length === 0 ? (
                                        <p>No data found with the selected filter criteria.</p>
                                    ) : (
                                        <div>
                                            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                                                {queryResult.map((complaint, index) => (
                                                    <div className="container my-2 p-3 pb-1 bg-white complaint"
                                                        key={index}
                                                        onClick={() => selectComplaint(complaint)}
                                                        style={{ cursor: 'pointer' }}>
                                                        <h5>{complaint.complaint_title}</h5>
                                                        <p>{complaint.status}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            loading && <p>Loading...</p>
                        )}
                        {!queryResult && !loading && (
                            <p>No data found with the selected filter criteria.</p>
                        )}
                    </div>
                </div>

                <div className="col-md-7 bg-white p-4" style={{ height: '100vh' }}>
                    {selectedComplaint ? (
                        <div className="container d-flex flex-column align-content-center p-xl-5 p-3">
                            <h1>{selectedComplaint.complaint_title}</h1>
                            <p>{selectedComplaint.status}</p>
                            <div className='bg-light p-3 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 100px)' }}>
                                {selectedComplaint.complaint_description || 'No details available for this complaint.'}
                            </div>
                        </div>
                    ) : (
                        <div className="container d-flex flex-column align-content-center justify-content-center align-items-center p-xl-5 p-3 h-100">
                            <h3>No Complaint Selected</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterTest;
