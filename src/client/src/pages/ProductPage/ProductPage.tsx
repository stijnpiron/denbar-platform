import React, { useEffect } from 'react';
import ProductRestService from '../../services/product.rest.service';
import { useSelector, useDispatch } from 'react-redux';
import { ProductsState } from '../../interfaces/state/products-state.interface';
import { AppState } from '../../interfaces/state/app-state.interface';
import storeActions from '../../store/store.actions';
import { ObjectState } from '../../interfaces/state/state.interface';
import { Product } from '../../interfaces/product.interface';

const { loadProducts, loadProductsFailed, loadProductsSuccess } = storeActions.products.Actions;

const ProductPage: React.FC = () => {
  const { data } = useSelector((state: AppState) => state.products) || {};
  const { products, productQuantity }: ProductsState = data || {};
  const productService = new ProductRestService();
  const dispatch = useDispatch();

  const getProducts = async () => {
    dispatch(loadProducts());
    const productData: ProductsState = (await productService.getProducts()).data;

    if (productData.products) {
      dispatch(loadProductsSuccess(productData));
    } else {
      dispatch(loadProductsFailed());
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderProduct = (product: Product) => {
    return (
      <li key={product._id} className='list__item product'>
        <h3 className='product__name'>{product.name}</h3>
        <p className='product__description'>
          {product.category}({product.packing.quantity}-{product.packing.size})
        </p>
      </li>
    );
  };

  return (
    <div>
      <pre>Products:{productQuantity}</pre>
      <ul className='list'>{products?.length ? products.map(product => renderProduct(product)) : <p>No products loaded</p>}</ul>
    </div>
  );
};

export default ProductPage;
