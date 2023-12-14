// RoleFilter.js
import React, { useState, useEffect } from "react";
import ServerUrl from "../../constants/ServerUrl";
import { useRoles } from "../../hooks/useRoles";
import SearchBar from "../../components/common/SearchBar";
import FilterComponent from "../../components/common/FilterComponent";

const filterOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']

const RoleFilter = () => {
  const { roles } = useRoles();
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

  const filteredRoles = roles.filter((item) => {
    return search.toLowerCase() === '' ||
        item.role_name.toLowerCase().includes(search.toLowerCase()) ||
      item.role_id.toString().includes(search.toLowerCase());
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <SearchBar onSearch={handleSearch} searchType='roles' />

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
            <th>Role Name</th>
          </tr> 
        </thead>
        <tbody>
          {filteredRoles.map((item) => (
            <tr key={item.role_id}>
              <td>{item.role_id}</td>
              <td>{item.role_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoleFilter;
