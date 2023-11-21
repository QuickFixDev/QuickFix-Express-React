// complaintsFilter.js
import { useState } from 'react';

const AccumulativeFilterComponent = (categories, complaints) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilterChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((category) => category !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  const getFilteredComplaints = () => {
    if (selectedCategories.length === 0) {
      return complaints;
    } else {
      return complaints.filter((complaint) =>
        selectedCategories.includes(complaint.category_id)
      );
    }
  };

  return {
    selectedCategories,
    handleFilterChange,
    getFilteredComplaints,
  };
};

export default AccumulativeFilterComponent;
