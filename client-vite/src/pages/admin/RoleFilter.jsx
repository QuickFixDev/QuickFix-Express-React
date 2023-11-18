// RoleFilter.js
import React, { useState, useEffect } from "react";
import ServerUrl from "../../constants/ServerUrl";
import { getRoles } from "../../contexts/RoleContext";
import SearchBar from "../../components/common/SearchBar";

const RoleFilter = () => {
  const { roles } = getRoles();
  const [search, setSearch] = useState('');

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
      <SearchBar onSearch={handleSearch} searchType='roles' />

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
