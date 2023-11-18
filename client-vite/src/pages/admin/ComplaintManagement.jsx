import React, { useState, useEffect } from 'react';
import ServerUrl from '../../constants/ServerUrl';
import { useAuth } from "../../contexts/AuthContext";
import AccessDenied from '../common/AccessDenied';
import { Modal, Button, Table } from 'react-bootstrap';

const initialSqlQuery = 'SELECT * FROM complaints';
const availableFilters = [
  { name: 'User id', key: 'user_id', options: [1, 2] },
  { name: 'Category ID', key: 'category_id', options: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
];

const FilterTest = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const { authUser, isLoggedIn } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);

  const selectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

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
  }, [selectedFilters]);

  const executeQuery = async (filterQuery) => {
    const fetchUrl = `${ServerUrl}/filter-test`;

    const response = await fetch(fetchUrl, {
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
    const updatedFilters = [...selectedFilters];
    const filterIndex = updatedFilters.findIndex(filter => filter.name === filterName);

    if (filterValue === '') {
      if (filterIndex !== -1) {
        updatedFilters.splice(filterIndex, 1);
      }
    } else {
      if (filterIndex !== -1) {
        updatedFilters[filterIndex].value = filterValue;
      } else {
        const key = availableFilters.find(filter => filter.name === filterName).key;
        updatedFilters.push({ name: filterName, key, value: filterValue });
      }
    }

    setSelectedFilters(updatedFilters);
  };

  console.log(isLoggedIn)
  console.log(authUser.role)

  if (isLoggedIn && authUser.Role === 'admin' || authUser.Role === 'dev' || authUser.Role === 'test') {


    return (
      <div className="container-fluid h-100">
        <div className='my-3 p-md-4 p-1'>
          <div className="row my-4">
            <div className="col">
              <h3>Complaint manager</h3>
            </div>

            {availableFilters.map((filter, index) => (
              <div key={index} className="col">
                <select
                  className="form-control"
                  onChange={(e) => toggleFilter(filter.name, e.target.value)}
                  value={
                    selectedFilters.find(
                      (selectedFilter) => selectedFilter.name === filter.name
                    )?.value || ''
                  }
                >
                  <option value="">{filter.name}</option>
                  {filter.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

              </div>
            ))}
          </div>
          {queryResult ? (
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                queryResult.length === 0 ? (
                  <p>No data found with the selected filter criteria.</p>
                ) : (
                  <div style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                    <Table bordered={false} hover>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {queryResult.map((complaint, index) => (
                          <tr
                            key={index}
                            onClick={() => selectComplaint(complaint)}
                            style={{ cursor: 'pointer' }}
                          >
                            <td>
                              {complaint.complaint_title}
                            </td>
                            <td>
                              {complaint.complaint_status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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

        <Modal show={showModal} onHide={handleModalClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedComplaint ? selectedComplaint.complaint_title : 'No Complaint Selected'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container p-xl-5 p-3">
              {selectedComplaint ? (
                <div>
                  <p>{selectedComplaint.status}</p>
                  <div className='bg-light p-3'>
                    {selectedComplaint.complaint_description || 'No details available for this complaint.'}
                  </div>
                </div>
              ) : (
                <div className="container d-flex flex-column justify-content-center align-items-center h-100">
                  <h3>No Complaint Selected</h3>
                </div>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );



  } else {
    return (
      <AccessDenied />
    )
  }



};

export default FilterTest;
