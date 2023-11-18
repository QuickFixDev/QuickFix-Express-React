// ComplaintFilter.js
import React, { useState, useEffect } from "react";
import ServerUrl from "../../constants/ServerUrl";
import { getComplaints } from "../../contexts/ComplaintContext";
import SearchBar from "../../components/common/SearchBar";
import FilterComponent from "../../components/common/FilterComponent";

const filterOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']

const ComplaintFilter = () => {
  const { complaints } = getComplaints();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearch = (value) => {
    setSearch(value);
  }

  useEffect(() => {
    console.log(search);
  }, [search]);

  const filteredComplaints = complaints.filter((item) => {
    return search.toLowerCase() === '' ||
      item.complaint_description.toLowerCase().includes(search.toLowerCase()) ||
      item.complaint_title.toLowerCase().includes(search.toLowerCase()) ||

      item.complaint_id.toString().includes(search.toLowerCase());
  });

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    const truncated = words.slice(0, limit).join(' ');
    return truncated + (words.length > limit ? '...' : '');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <SearchBar onSearch={handleSearch} searchType='complaints' />

        </div>
        <div className="col">
          <div className="container">
          <FilterComponent options={filterOptions} onSelectFilter={handleSelectFilter} />

          </div>
        </div>
      </div>

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Complaint</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map((item) => (
            <tr key={item.complaint_id}>
              <td>{item.complaint_id}</td>
              <td>
                <div>
                  <strong>{item.complaint_title}</strong>
                </div>
                <div className="d-md-block d-none">{truncateText(item.complaint_description, 15)}</div>
              </td>
              <td>
                {item.complaint_status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintFilter;
