import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import CommentList from '../components/comments/CommentList';
import Filter from '../components/products/Filter';
import ProductList from '../components/product_list/ProductList';

import { useState, useEffect } from 'react';

const ProductPage = () => {

  const [productList, setProductList] = useState([]);
      useEffect(() => {
          const fetchProducts = async () => {
              try {
                  const response = await fetch('api/products/', {
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  });
                  if (response.ok) {
                      const data = await response.json();
                      console.log('PRODUCT DATA LIST:', data);
                      setProductList(data.data.products);
                  } else {
                      console.error('Failed to fetch products. Status:', response.status);
                  }
              } catch (error) {
                  console.error('Error fetching products:', error);
              }
          }
  
          fetchProducts();
      }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* <h1 className="text-3xl font-bold text-gray-900 mb-8">BorrowIt Demo</h1> */}
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <Filter 
                onFilterChange={(filters) => {
                  console.log('Filters changed:', filters);
                }}
              />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">Products</h2>
                <ProductList View="vertical" Products={productList} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
