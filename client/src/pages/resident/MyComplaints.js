import React from 'react';
import ComplaintHeader from '../../components/common/ComplaintHeader';
import ComplaintList from '../../components/common/ComplaintList';
import Home from '../common/Home';
import user from '../../contexts/UserContext'

const MyReports = () => {
  if (user.role === "resident" || user.role === "dev") {
    return (
      <>
        <div className='container w-lg-50 shadow-md p-5 mt-5'>
          <div className=' px-3'>
            <ComplaintHeader />
          </div>
          <div className=' p-3 bg-light'>
            <div id="scroll-container" className="scrollbar-hidden" style={{ maxHeight: "325", overflowY: "auto" }}>
              <ComplaintList />
            </div>
          </div>
        </div>

      </>
    );
  }
  return (
    <Home />
  );
};

export default MyReports;