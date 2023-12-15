// ComplaintFilter.js
import React, { useState, useEffect } from "react";
import ServerUrl from "../../constants/ServerUrl";
import AccessDenied from '../common/AccessDenied';

import SearchBar from "../../components/common/SearchBar";
import FilterComponent from "../../components/common/FilterComponent";
import { Checkbox } from "antd";
import ComplaintModal from "../../components/modals/ComplaintModal";

import { useComplaintsTest } from "../../hooks/useComplaintsTest";
import { useCategories } from "../../hooks/useCategories";
import { useAuth } from "../../contexts/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

const filterOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']


const Filter = () => {
  const { categories } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { authUser, isLoggedIn } = useAuth();
  const { complaints, loading } = useComplaintsTest();

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
  const { complaints, isLoading: complaintsLoading } = useComplaintsTest();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const { isLoggedIn } = useAuth();

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
  };

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
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||

      item.id.toString().includes(search.toLowerCase());
  });

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    const truncated = words.slice(0, limit).join(' ');
    return truncated + (words.length > limit ? '...' : '');
  };

  if (isLoggedIn) {
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
                  <th className="col-10">Complaint</th>
                  <th className="col-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((item) => (
                    <tr className="cursor-pointer" key={item.id} onClick={() => handleComplaintClick(item)}>
                      <td>
                        <div>
                          <strong>{item.title}</strong>
                        </div>
                        <div className="d-md-block d-none">{truncateText(item.description, 15)}</div>
                      </td>
                      <td>
                        {item.complaint_status}
                      </td>
                    </tr>
                  ))) : ( complaintsLoading ? ( <tr><td>Loading...</td></tr> ) : ( <tr><td>No complaints found</td></tr> ) )
                }
              </tbody>
            </table>

            {selectedComplaint && (
              <ComplaintModal complaint={selectedComplaint} onClose={handleCloseModal} />
            )}
          </div>
        </div>

      </div >
    );
  } else {
    return (
      <AccessDenied />
    )
  }
}

export default ComplaintFilter;
