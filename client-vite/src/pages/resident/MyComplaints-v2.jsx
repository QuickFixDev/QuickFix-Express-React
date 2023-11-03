import ComplaintHeader from '../../components/common/ComplaintHeader';
import ComplaintList from '../../components/common/ComplaintList';
import HomePage from '../common/HomePage';
import tentant from '../../contexts/UserContext'

const MyReports = () => {
  if (tentant.role === "resident" || tentant.role === "dev") {
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
    <HomePage />
  );
};

export default MyReports;
