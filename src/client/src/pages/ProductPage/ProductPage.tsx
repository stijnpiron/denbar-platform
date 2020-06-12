import React, { useState } from 'react';
import { AuthenticationService } from '../../services/authentication.service';
import ProductRestService from '../../services/rest/product.rest.service';

const ProductPage: React.FC = () => {
  const productService = new ProductRestService();

  const products = async () => await productService.getProducts();

  const renderProduct = (product: any) => {
    return (
      <li key={product._id} className='list__item product'>
        <h3 className='product__name'>{product.name}</h3>
        <p className='product__description'>{product.description}</p>
      </li>
    );
  };

  return (
    <div>
      <ul className='list'>{products && products.length > 0 ? <pre>{products}</pre> : <p>No products found</p>}</ul>
    </div>
  );
};

export default ProductPage;
