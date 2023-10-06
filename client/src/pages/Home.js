import React from 'react';
import ComplainHeader from '../components/ComplainHeader';
import ComplainList from '../components/ComplainList';

const Home = () => {
  return (
    <>
      <div className='container w-lg-50 shadow-md py-5 px-3 mt-5'>
        <ComplainHeader />
        <ComplainList />
      </div>

    </>
  );
};

export default Home;
