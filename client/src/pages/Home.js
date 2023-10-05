import React from 'react';
import Complain from '../components/Complain';

const Home = () => {
  return (
    <>

      <div className='container w-50 shadow-md py-5 px-3 mt-5'>
        <div className='container my-3 text-center'>
          <h1>
            Your complains
          </h1>
        </div>
        <div className='container mt-5'>
          {/* Loop */}
          <Complain />
          <Complain />
          <Complain />
        </div>
      </div>

    </>
  );
};

export default Home;
