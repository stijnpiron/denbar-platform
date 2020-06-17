import React from 'react';
import { Link } from 'react-router-dom';

const OverviewPage: React.FC = () => {
  return (
    <>
      <div>Overview page</div>
      <Link to='/products'>Products</Link>
    </>
  );
};

export default OverviewPage;
