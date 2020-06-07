// /client/src/App.js

import React, { useState, useEffect } from 'react';

// SERVICES
import productService from './services/productService';

function App() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  });

  const getProducts = async () => {
    console.log('hi');

    let res = await productService.getAll();
    console.log(res);
    setproducts(res.data.products);
  };

  const renderProduct = (product: any) => {
    return (
      <li key={product._id} className='list__item product'>
        <h3 className='product__name'>{product.name}</h3>
        <p className='product__description'>{product.description}</p>
      </li>
    );
  };

  return (
    <div className='App'>
      <ul className='list'>{products && products.length > 0 ? products.map((product: any) => renderProduct(product)) : <p>No products found</p>}</ul>
    </div>
  );
}

export default App;
