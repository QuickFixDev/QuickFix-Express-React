import tentant from '../../contexts/UserContext'
import AccessDenied from '../common/AccessDenied';

const ResidentPanel = () => {
  if (tentant.role === "resident" || tentant.role === "dev") {
    return (
      <div className='container w-lg-50 shadow-md py-5 px-3 mt-5'>
        <h1>
          hello world
        </h1>
      </div>

    );
  }
  return (
    <AccessDenied />
  );
};

export default ResidentPanel;