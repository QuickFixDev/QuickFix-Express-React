import React from 'react';
import Complain from '../components/Complain';

const Home = () => {
  return (
    <>
      <div className="container mt-5 text-center">
        <h1>Your complains</h1>
      </div>
      <div className="container mt-5 p-3 text-center shadow-sm bg-light">
        {/* Loop */}
        <Complain />
        <Complain />
        <Complain />
      </div>

    </>
  );
};

export default Home;
