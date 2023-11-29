// ComplaintFilter.js
import React, { useState, useEffect } from "react";
import ServerUrl from "../../constants/ServerUrl";
import { useComplaints } from "../../contexts/ComplaintContext";
import SearchBar from "../../components/common/SearchBar";
import FilterComponent from "../../components/common/FilterComponent";
import { useCategories } from "../../contexts/CategoryContext";
import { useAuth } from "../../contexts/AuthContext";
import { Checkbox } from "antd";

const filterOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']


const Filter = () => {
  const { categories } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { authUser, isLoggedIn } = useAuth();
  const { complaints, loading } = useComplaints(authUser.Id);

  const handleFilterChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((category) => category !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  let filteredComplaints;

  if (selectedCategories.length === 0) {
    filteredComplaints = complaints;
  } else {
    filteredComplaints = complaints.filter((complaint) =>
      selectedCategories.includes(complaint.category_id)
    );
  }


  const filteredCategories = categories.filter((category) =>
    selectedCategories.includes(category.category_id)
  );

  return (
    <div className="col-md-2 col-3">
      <div className="row row-cols-1">
        <div className="col p-0 g-2 mb-2">
          <div>
            {categories && categories.length > 0 ?
              (
                categories.map((category) => (
                  <div key={category.category_id}>
                    <Checkbox
                      checked={selectedCategories.includes(category.category_id)}
                      className="p-2"
                      onChange={() => handleFilterChange(category.category_id)}
                    >
                      {category.category_name}
                    </Checkbox>
                  </div>
                ))
              ) : (
                <div>
                  hey
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );

}


const ComplaintFilter = () => {
  const { complaints } = useComplaints();
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
    <div className="list container-fluid p-md-5 p-3">
      <div className="row">
        <div className="col text-start">
          <h2 className="fw-bold">Complaint manager</h2>
        </div>
      </div>
      <div className="row py-3">
        <div className="col">
          <SearchBar onSearch={handleSearch} searchType='complaints' />
        </div>
        <div className="col-auto">
          <div className="container">
            <FilterComponent options={filterOptions} onSelectFilter={handleSelectFilter} />

          </div>
        </div>
      </div>


      <div className="row">

        <div className="col">
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
      </div>

    </div>
  );
}

export default ComplaintFilter;
